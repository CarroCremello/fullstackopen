import './index.css'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Button from './components/Button'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({})
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

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
      const newMessage = { 
        type: "error",
        text: 'Wrong username or password'
      }
      setMessage(newMessage)
      setTimeout(() => {
        setMessage(null)
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
      setBlogFormVisible(false)
      const newMessage = { 
        type: "success",
        text: `${blogTitle} by ${blogAuthor} added`
      }
      setMessage(newMessage)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch {
      console.log("Couldn't add blog")
      const newMessage = { 
        type: "error",
        text: "Couldn't add blog"
      }
      setMessage(newMessage)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>Cancel</button>
        </div>
      </div>
    )
  }

  const blogList = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const blogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>Add blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            blogTitle={blogTitle}
            blogAuthor={blogAuthor}
            blogUrl={blogUrl}
            handleBlogTitle={({ target }) => setBlogTitle(target.value)}
            handleBlogAuthor={({ target }) => setBlogAuthor(target.value)}
            handleBlogUrl={({ target }) => setBlogUrl(target.value)}
            handleSubmit={addBlog}
          />
          <button onClick={() => setBlogFormVisible(false)}>Cancel</button>
        </div>
      </div>
    )
  }


  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={message} />

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