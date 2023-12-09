import { useSelector, useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'


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
<<<<<<< HEAD
        <p>{user.name} logged in</p>
        <button
          onClick={revokeToken}
        >Log out
        </button>
        <h2>create new</h2>
=======
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
>>>>>>> 9ddb80f (7.16-7.17)
      </>
    )

  return content
}

export default LoggedIn