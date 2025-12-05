import { useState } from 'react'

import Heading from './components/Heading'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [idCount, setIdCount] = useState(persons.length + 1)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    const filter = event.target.value
    console.log(filter)
    setSearchTerm(filter)
    if (filter !== '' || filter !== null) {
      setShowAll(false)
    }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
        
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
        id: idCount,
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setIdCount(idCount + 1)
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <Heading type="h1" text="Phonebook" />
      <span>Filter contacts: </span>
      <input 
        value={searchTerm}
        onChange={handleSearch}
      />

      <Heading type="h2" text="Add new contact" />
      <form onSubmit={addPerson}>
        <div>
          <span>Name: </span>
          <input 
            value={newName}
            onChange={handleNameChange}
            required
          />
        </div>
         <div>
          <span>Number: </span>
          <input 
            value={newNumber}
            onChange={handleNumberChange}
            required
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <Heading type="h2" text="Contacts" />
      <ul>
        {personsToShow.map((person)=> <Person key={person.id} person={person} />)}
      </ul>
    </div>
  )
}

export default App