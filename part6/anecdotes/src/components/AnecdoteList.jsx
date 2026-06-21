import { useAnecdotes, useAnecdoteActions } from '../store'
import anecdoteService from '../services'
import { useNotificationActions } from '../notificationStore'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes().toSorted((a, b) => b.votes - a.votes)
  const { vote } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const handleVote = async (anecdote) => {
    vote(anecdote.id)
    await anecdoteService.updateVotes({ ...anecdote, votes: anecdote.votes + 1 })
    setNotification(`You voted '${anecdote.content}'`, 5)
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
