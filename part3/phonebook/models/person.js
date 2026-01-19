const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, { family: 4 })
  .then(result => {
    console.log('result', result)
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'The name must be at least 3 charecters long. "{VALUE}" is too short'],
    required: [true, 'Name required']
  },
  number: {
    type: String,
    validate: {
      validator: function (number) {
        return /^(?=.{8,}$)\d{3,4}-\d+$/.test(number)
      },
      message: props => `${props.value} is not a valid phone number! Allowed format: 123-4567890 or 1234-567890 and a minimum of 8 characters.`
    },
    required: [true, 'Phone number required']
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)