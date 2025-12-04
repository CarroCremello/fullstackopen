import { useState } from 'react'

import Heading from './components/Heading'
import Person from './components/Person'

const App = () => {
  const [idCount, setIdCount] = useState(1)
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      id: idCount + 1,
      name: newName
    }
    setPersons(persons.concat(newPerson))
    setIdCount(idCount + 1)
    setNewName('')
  }

  return (
    <div>
      <Heading type="h2" text="Phonebook" />
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Heading type="h2" text="Numbers" />
      <ul>
        {persons.map((person)=> <Person key={person.id} person={person} />)}
      </ul>
    </div>
  )
}

export default App