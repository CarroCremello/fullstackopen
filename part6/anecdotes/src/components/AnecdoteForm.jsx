import { useAnecdoteActions } from '../store'

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdoteActions()

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={(e) => {
        e.preventDefault()
        addAnecdote(e.target.anecdote.value)
        e.target.anecdote.value = ''
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
