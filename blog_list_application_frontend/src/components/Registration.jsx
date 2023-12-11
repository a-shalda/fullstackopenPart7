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
      <div className="header">
        <div className='header__links'>
          <p>Signup</p>
        </div>
      </div>
      <h2>Blogs App</h2>
      <div className='wrapperForm'>
        <form className='form' onSubmit={handleLogin}>
          <div className='form__row'>
          Username
            <input
              className='form__input'
              type="text"
              id='username'
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div className='form__row'>
          Name
            <input
              className='form__input'
              type="text"
              id='name'
              value={name}
              name="Name"
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div className='form__row'>
          Password
            <input
              className='form__input'
              type="password"
              id='password'
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" id="register-button">Sign up</button>
          <button type="button" id="cancel" onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </>
  )
}

export default Registration