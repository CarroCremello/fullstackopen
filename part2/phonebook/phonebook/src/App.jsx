import { useState, useEffect } from 'react'
import personService from './services/persons'
import Heading from './components/Heading'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Contacts from './components/Contacts'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.error('error: ', error)
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

    // If name exists in contacts already, ask if wanting to update contact's number
    if ( persons.some(person => person.name === newName ) ) {
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook. Do you want to update this contact's number?`)
      if (confirmUpdate) {
        const existingPerson = persons.find(person => person.name === newName)
        const id = existingPerson.id
        const changedPerson = { ...existingPerson, number: newNumber }
        personService
          .update(id, changedPerson)
          .then(updatedPerson => {
            console.log('updatedPerson: ', updatedPerson)
            setPersons(persons.map(person => person.id !== id ? person : updatedPerson))
            // setPersons(persons.replace(updatedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.error('error: ', error)
          })
        return
      }
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        console.log('returnedPerson: ', returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.error('error: ', error)
      })
  }

  const deletePerson = (id) => {

    const person = persons.find(person => person.id === id)
    console.log('person: ', person)

    const confirmDelete = window.confirm(`Are you sure you want to delete ${person.name}?` )

    if (confirmDelete) {
      
      console.log('delete confirmed')
      personService
        .remove(id)
        .then(deletedPerson => {
          console.log('deletedPerson: ', deletedPerson)
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
        })
        .catch(error => {
          console.error('error: ', error)
        })
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
      <Contacts personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App