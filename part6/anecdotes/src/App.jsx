import Filter from './components/Filter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { useAnecdoteActions } from './store'
import { useEffect } from 'react'
import anecdoteServices from './services'

const App = () => {
  const { initialize } = useAnecdoteActions()

  useEffect(() => {
    anecdoteServices.getAll().then(anecdotes => initialize(anecdotes))
  }, [initialize])
  return (
    <div>
      <Notification />
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
