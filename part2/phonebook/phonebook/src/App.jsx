import { useState, useEffect } from 'react'
import axios from 'axios'

import Heading from './components/Heading'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Contacts from './components/Contacts'

const App = () => {
  const [persons, setPersons] = useState([])
  const [idCount, setIdCount] = useState(persons.length + 1)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

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
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      <Heading type="h2" text="Add new contact" />
      <PersonForm 
        addPerson={addPerson}
        newName={newName} 
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <Heading type="h2" text="Contacts" />
      <Contacts personsToShow={personsToShow} />
    </div>
  )
}

export default App