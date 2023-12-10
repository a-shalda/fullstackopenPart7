import { useSelector, useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'


const LoggedIn = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const revokeToken = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    dispatch(setUser(null))
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
        <h2>Blogs App</h2>
      </>
    )

  return content
}

export default LoggedIn