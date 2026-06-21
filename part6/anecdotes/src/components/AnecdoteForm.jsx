// import { useAnecdoteActions } from '../store'
import { useAnecdoteActions } from '../store'
import anecdoteService from '../services'

const AnecdoteForm = () => {
  // const { addAnecdote } = useAnecdoteActions()
  const { addAnecdote } = useAnecdoteActions()

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={ async (e) => {
        e.preventDefault()
        const newAnecdote = await anecdoteService.createNew(e.target.anecdote.value)
        addAnecdote(newAnecdote)
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
