import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import AnecdoteList from './AnecdoteList'
import { useAnecdoteActions, useAnecdotes, useAnecdoteStore } from '../store'

vi.mock('../services', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    updateVotes: vi.fn(),
    deleteAnecdote: vi.fn(),
  }
}))

vi.mock('../notificationStore', () => ({
  useNotification: vi.fn(() => null),
  useNotificationActions: vi.fn(() => ({ setNotification: vi.fn() })),
}))

describe('AnecdoteList', () => {
  const anecdotes = [
    { id: '1', content: 'least votes', votes: 1 },
    { id: '2', content: 'most votes', votes: 10 },
    { id: '3', content: 'middle votes', votes: 5 },
  ]

  afterEach(() => cleanup())

  beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes, filter: 'all' })
    vi.clearAllMocks()
  })

  it('displays anecdotes sorted by votes in descending order', () => {
    const { container } = render(<AnecdoteList />)
    const anecdoteItems = container.querySelector('div').children

    expect(anecdoteItems[0].textContent).toContain('most votes')
    expect(anecdoteItems[1].textContent).toContain('middle votes')
    expect(anecdoteItems[2].textContent).toContain('least votes')
  })

  it('displays only anecdotes matching the filter', () => {
    const { result } = renderHook(() => useAnecdoteActions())
    act(() => {
      result.current.setFilter('most')
    })

    render(<AnecdoteList />)

    expect(screen.getByText('most votes')).toBeDefined()
    expect(screen.queryByText('least votes')).toBeNull()
    expect(screen.queryByText('middle votes')).toBeNull()
  })

})
