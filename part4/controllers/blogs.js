const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    blog.user = user._id
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const id = request.params.id
    const newLikes = request.body.likes
    const updatedBlog = await Blog.findByIdAndUpdate(id, { likes : newLikes }, { new : true, runValidators: true })
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blogid = request.params.id
    const blog = await Blog.findById(blogid)

    if ( blog.user.toString() === user.id.toString() ) {
      await Blog.findByIdAndDelete(blogid)

      user.blogs = user.blogs.filter(
        blog => blog.toString() !== blogid.toString()
      )
      await user.save()
      response.status(204).end()
    }
    
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter