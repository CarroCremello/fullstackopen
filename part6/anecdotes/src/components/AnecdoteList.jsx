import { useAnecdotes, useAnecdoteActions } from '../store'
import anecdoteService from '../services'
import { useNotificationActions } from '../notificationStore'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote, removeAnecdote } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const handleVote = async (anecdote) => {
    vote(anecdote.id)
    await anecdoteService.updateVotes({ ...anecdote, votes: anecdote.votes + 1 })
    setNotification(`You voted '${anecdote.content}'`, 5)
  }

  const handleDelete = async (anecdote) => {
    await anecdoteService.deleteAnecdote(anecdote.id)
    removeAnecdote(anecdote.id)
  }

  return (
    <div>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
            {anecdote.votes === 0 && (
              <button onClick={() => handleDelete(anecdote)}>delete</button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
