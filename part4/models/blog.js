const mongoose = require('mongoose')
const config = require('../utils/config')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    minLength: [3, 'The title must be at least 3 charecters long. "{VALUE}" is too short'],
    required: [true, 'Title required']
  },
  author: {
    type: String,
    minLength: [3, "The author's name must be at least 3 charecters long. '{VALUE}' is too short"],
    required: [true, 'Author name required']
  },
  url: {
    type: String,
    required: [true, 'Url required']
  },
  likes: {
    type: Number,
    default: 0
  },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { family: 4 })

module.exports = mongoose.model('Blog', blogSchema)