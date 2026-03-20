const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')


describe('when there are some blogs saved initially', () => {
  let token
  let savedUser

  const initialBlogs = [
    {
      title: "Hello World!",
      author: "John Doe",
      url: "https://fullstackopen.com/en",
      likes: 3
    },
    {
      title: "Beautiful World",
      author: "Jane Doe",
      url: "https://fullstackopen.com/en"
    },
  ]

  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({
      username: 'root',
      passwordHash,
    })
    savedUser = await user.save()

    const blogObjects = initialBlogs.map(blog => new Blog({
      ...blog,
      user: savedUser._id,
    }))

    const savedBlogs = await Blog.insertMany(blogObjects)

    savedUser.blogs = savedBlogs.map(blog => blog._id)
    await savedUser.save()

    const loginResponse = await api
      .post('/api/login')
      .send({
        username: 'root',
        password: 'sekret',
      })

    token = loginResponse.body.token
  })

  describe('check blogs', () => {
    test('all blog posts are returned', async () => {
      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, initialBlogs.length)
    })

    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('unique identifier property of blog posts is named id', async () => {
      const response = await api.get('/api/blogs')
      const blog = response.body[0]
      assert.ok(blog.id)
      assert.strictEqual(blog._id, undefined)
    })
  })

  describe('add blog', () => {
    test('a valid blog can be added with a valid token', async () => {
      const newBlog = {
        title: 'With Token',
        author: 'Test Ed',
        url: 'https://testingblog.com',
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      const titles = response.body.map(blog => blog.title)

      assert.strictEqual(response.body.length, initialBlogs.length + 1)
      assert(titles.includes('With Token'))
    })

    test('adding a blog fails with status code 401 if token is not provided', async () => {
      const newBlog = {
        title: 'No Token',
        author: 'Test Ed',
        url: 'https://testingblog.com',
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

      assert.match(response.body.error, /token/i)
    })

    test('likes default to 0 if not added', async () => {
      const newBlog = {
        title: 'Testing adding blog without likes',
        author: 'Test Ed',
        url: 'https://testingblog.com',
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      const blog = response.body.filter(blog => blog.title === 'Testing adding blog without likes')

      assert.strictEqual(blog[0].likes, 0)
    })

    test('title and url required', async () => {
      const newBlog = {
        author: 'Test Ed',
        likes: 5,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)

      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, initialBlogs.length)
    })
  })

  describe('update blog', () => {
    test('a blog likes can be updated', async () => {
      const blogsAtStart = await api.get('/api/blogs')
      const blogToUpdate = blogsAtStart.body[0]

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({ likes: 10 })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await api.get('/api/blogs')
      const updatedBlog = blogsAtEnd.body.find(blog => blog.id === blogToUpdate.id)

      assert.strictEqual(updatedBlog.likes, 10)
    })
  })

  describe('delete blog', () => {
    test('a blog can be deleted', async () => {
      const blogsAtStart = await api.get('/api/blogs')
      const blogToDelete = blogsAtStart.body[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await api.get('/api/blogs')
      const titles = blogsAtEnd.body.map(blog => blog.title)

      assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length - 1)
      assert(!titles.includes(blogToDelete.title))
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})