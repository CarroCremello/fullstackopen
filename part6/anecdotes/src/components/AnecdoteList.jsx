import { useAnecdotes, useAnecdoteActions } from '../store'
import anecdoteService from '../services'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes().toSorted((a, b) => b.votes - a.votes)
  const { vote } = useAnecdoteActions()

  const handleVote = async (anecdote) => {
    vote(anecdote.id)
    await anecdoteService.updateVotes({ ...anecdote, votes: anecdote.votes + 1 })
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
