import { useState } from 'react'

import Heading from './components/Heading'
import Person from './components/Person'

const App = () => {
  const [idCount, setIdCount] = useState(1)
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const addPerson = (event) => {
    event.preventDefault()

    if ( persons.some(person => person.name === newName ) || persons.some(person => person.number === newNumber) ) {
      if ( persons.some(person => person.name === newName ) ) {
        alert(`${newName} is already added to phonebook`)
      }
      if ( persons.some(person => person.number === newNumber ) ) {
        alert(`${newNumber} is already added to phonebook`)
      }
    }
    else {
      const newPerson = {
        id: idCount + 1,
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setIdCount(idCount + 1)
      setNewName('')
    }
  }

  return (
    <div>
      <Heading type="h2" text="Phonebook" />
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
            required
          />
        </div>
         <div>
          number: 
          <input 
            value={newNumber}
            onChange={handleNumberChange}
            required
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