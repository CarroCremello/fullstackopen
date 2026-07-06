
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const useAnecdoteStore = create(devtools((set) => ({
  anecdotes: [],
  filter: 'all',
  actions: {
    vote: (id) => set((state) => ({
      anecdotes: state.anecdotes.map(a =>
        a.id === id ? { ...a, votes: a.votes + 1 } : a
      )
    })),
    addAnecdote: (anecdote) => set((state) => ({
      anecdotes: state.anecdotes.concat(anecdote)
    })),
    removeAnecdote: (id) => set((state) => ({
      anecdotes: state.anecdotes.filter(a => a.id !== id)
    })),
    setFilter: value => set(() => ({ filter: value })),
    initialize: anecdotes => set(() => ({ anecdotes }))
  },
})))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  const filtered = filter === 'all'
    ? anecdotes
    : anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  return filtered.toSorted((a, b) => b.votes - a.votes)
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
