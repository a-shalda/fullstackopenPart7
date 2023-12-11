import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'


const Login = () => {

  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUser(user))
      navigate('/')
    } catch (exception) { dispatch(setNotification(['Wrong credentials', 'error'], 5000)) }

    setUsername('')
    setPassword('')
  }

  const handleCancel = () => navigate('/')

  return (
    <>
      <div className="header">
        <div className='header__links'>
          <p>Login</p>
        </div>
      </div>
      <h2>Blogs App</h2>
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
        <button type="submit" id="login-button">Log in</button>
        <button type="button" id="cancel" onClick={handleCancel}>Cancel</button>
      </form>
    </>
  )
}

export default Login