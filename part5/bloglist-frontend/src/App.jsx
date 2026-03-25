import './index.css'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Button from './components/Button'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({})
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

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>Log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            handleMessage={setMessage}
            handleUser={setUser}
          />
          <button onClick={() => setLoginVisible(false)}>Cancel</button>
        </div>
      </div>
    )
  }

  const blogList = () => (
    <div>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} />
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
            handleBlogs={setBlogs}
            displayBlogForm={setBlogFormVisible}
            handleMessage={setMessage}
          />
          <button onClick={() => setBlogFormVisible(false)}>Cancel</button>
        </div>
      </div>
    )
  }

  const handleLike = async (updatedBlog) => {
    const returnedBlog = await blogService.like(updatedBlog.id, updatedBlog)

    setBlogs(prevBlogs =>
      prevBlogs.map(blog =>
        blog.id === returnedBlog.id ? returnedBlog : blog
      )
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
          <Button type="submit" text="Logout" onClick={handleLogout} />
          {blogForm()}
        </div>
      )}
      {user && blogList()}
      
    </div>
  )
}

export default App