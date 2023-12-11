import { useSelector, useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'
import { Link, useNavigate } from 'react-router-dom'


const LoggedIn = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const revokeToken = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    dispatch(setUser(null))
    navigate('/')
  }

  const content =
    user && (
      <>
        <p>
          <Link to='/'>blogs&nbsp;</Link>
          <Link to='/users'>users&nbsp;</Link>
          {user.name} logged in
          <button
            onClick={revokeToken}
          >Log out
          </button>
        </p>
        <h2>LinkApp</h2>
      </>
    )

  return content
}

export default LoggedIn