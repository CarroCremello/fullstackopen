// import { useAnecdoteActions } from '../store'
import { useAnecdoteActions } from '../store'
import anecdoteService from '../services'
import { useNotificationActions } from '../notificationStore'

const AnecdoteForm = () => {
  // const { addAnecdote } = useAnecdoteActions()
  const { addAnecdote } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={ async (e) => {
        e.preventDefault()
        const newAnecdote = await anecdoteService.createNew(e.target.anecdote.value)
        addAnecdote(newAnecdote)
        setNotification(`You created '${newAnecdote.content}'`, 5)
        e.target.reset()
        // e.target.anecdote.value = ''
      }}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
