import { useState } from 'react'
import blogService from '../services/blogs'
import registerService from '../services/register'

import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'

const Registration = () => {

  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await registerService.register({
        username, name, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUser(user))
      navigate('/')
    } catch (exception) { dispatch(setNotification(['Wrong credentials', 'error'], 5000)) }

    setUsername('')
    setName('')
    setPassword('')
  }

  const handleCancel = () => navigate('/')

  return (
    <>
      <h2>LinkApp</h2>
      <h3>Registration</h3>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            id='username'
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          name
          <input
            type="text"
            id='name'
            value={name}
            name="Name"
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            id='password'
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="register-button">Register</button>
        <button type="button" id="cancel" onClick={handleCancel}>Cancel</button>
      </form>
    </>
  )
}

export default Registration