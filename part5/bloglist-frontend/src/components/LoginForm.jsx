import { useState } from "react"
import loginService from "../services/login"

const LoginForm = ({
   handleMessage,
   handleUser
  }) => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({ username, password })
      handleUser(user)
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
      handleMessage(newMessage)
      setTimeout(() => {
        handleMessage(null)
      }, 5000)
    }
  }
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
      </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm