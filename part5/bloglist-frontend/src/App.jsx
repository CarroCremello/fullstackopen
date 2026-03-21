import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Button from './components/Button'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUsername('')
      setPassword('')
    } catch {
      console.log('wrong credentials')
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out', user.name)

    try {
      setUser(null)
      window.localStorage.removeItem('loggedBlogappUser')
    } catch {
      console.log('unable to logout')
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    console.log('adding blog with title ', blogTitle, ', author ', blogAuthor, ' and url ', blogUrl)

    try {
      const newBlog = {
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl
      }
      await blogService.add(newBlog)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
    } catch {
      console.log("couldn't add blog")
      setErrorMessage("couldn't add blog")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  const blogList = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const blogForm = () => (
    <>
      <h2>Add blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>
            title
            <input
              type="text"
              value={blogTitle}
              onChange={({ target }) => setBlogTitle(target.value)}
            />
          </label>
          <br />
          <label>
            author
            <input
              type="text"
              value={blogAuthor}
              onChange={({ target }) => setBlogAuthor(target.value)}
            />
          </label>
          <br />
          <label>
            url
            <input
              type="text"
              value={blogUrl}
              onChange={({ target }) => setBlogUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">Add</button>
      </form>
    </>
  )

  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          {user.name} is logged in 
          <Button type="submit" text="logout" onClick={handleLogout} />
          {blogForm()}
        </div>
      )}
      {user && blogList()}
      
    </div>
  )
}

export default App