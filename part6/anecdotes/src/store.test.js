import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAnecdotes, useAnecdoteActions, useAnecdoteStore } from './store'
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
    useAnecdoteStore.setState({ anecdotes: [], filter: 'all' })
    vi.clearAllMocks()
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)
  })

  it('voting increases the vote count for an anecdote', () => {
    useAnecdoteStore.setState({
      anecdotes: [{ id: 'test-1', content: 'test anecdote', votes: 0 }]
    })

    useAnecdoteStore.getState().actions.vote('test-1')

    const anecdotes = useAnecdoteStore.getState().anecdotes
    expect(anecdotes[0].votes).toBe(1)
  })

  it('is initialized with anecdotes returned by the backend', async () => {
    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })
})
