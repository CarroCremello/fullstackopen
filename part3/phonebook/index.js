require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

let person
let persons = []

morgan.token('body', (request) => {
  if (request.method !== 'POST') {
    return
  }
  return JSON.stringify(request.body)
})

app.options('/api/persons', cors())
app.options('/api/persons/:id', cors())

app.use(morgan(':method :url :status :response-time ms :body'))
app.use(express.json())
app.use(express.static('dist'))

app.get('/', (request, response) => {
  response.send('<h1>My Contacts</h1>')
})

app.get('/info', (request, response, next) => {
  const date = new Date()
  Person.countDocuments()
    .then(number => {
      response.send(
        `<h1>Info</h1>
        <p>Your phonebook has ${number} contacts</p>
        <p>${date}</p>`
      )
    })
    .catch(error => next(error))
})

app.get('/api/persons', cors(), (request, response, next) => {
  Person.find({})
    .then(contacts => {
      persons = contacts
      response.json(contacts)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', cors(), (request, response, next) => {
  const id = request.params.id

  Person.find({ _id : id })
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', cors(), (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(result => {
      console.log('result', result)
      console.log(`Added ${body.name} with number ${body.number} to the phonebook!`)
      response.json(person)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', cors(), (request, response, next) => {
  const id = request.params.id
  const newNumber = request.body.number
  Person.findByIdAndUpdate(id, { number : newNumber }, { new : true, runValidators: true })
    .then(updatedPerson => {
      if (!updatedPerson) {
        return response.status(404).end()
      }
      return response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', cors(), (request, response, next) => {
  const id = request.params.id

  Person.findByIdAndDelete(id)
    .then(() => {
      person = persons.filter(person => person.id === id)[0]
      persons = persons.filter(person => person.id !== id)
      response.json(person).status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error('error.message', error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'There was an problem with processing your request.' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})