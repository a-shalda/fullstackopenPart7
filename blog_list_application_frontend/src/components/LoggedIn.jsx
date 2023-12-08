import { useSelector, useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'


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
        <p>{user.name} logged in</p>
        <button
          onClick={revokeToken}
        >Log out
        </button>
        <h4>create new</h4>
      </>
    )

  return content
}

export default LoggedIn