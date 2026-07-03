import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAnecdotes, useAnecdoteActions } from './store'
import anecdoteService from './services'

vi.mock('./services', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    updateVotes: vi.fn(),
    deleteAnecdote: vi.fn(),
  }
}))

describe('anecdote store', () => {
  const mockAnecdotes = [
    { id: '1', content: 'anecdote one', votes: 0 },
    { id: '2', content: 'anecdote two', votes: 0 },
  ]

  beforeEach(() => {
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)
  })

  it('is initialized with anecdotes returned by the backend', async () => {
    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      const anecdotes = await anecdoteService.getAll()
      result.current.initialize(anecdotes)
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })
})
