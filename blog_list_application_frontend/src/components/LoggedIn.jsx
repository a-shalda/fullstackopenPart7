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
        <div className='header'>
          <div className="header__links">
            <div className='header__left'>
              <Link to='/'>Blogs&nbsp;</Link>
              <Link to='/users'>Users&nbsp;</Link>
              <Link to='/create'>Create&nbsp;</Link>
            </div>
            <div className='header__right'>
              {user.name}
              <button
                onClick={revokeToken}
              >Log out
              </button>
            </div>
          </div>
        </div>
        <h2>Blogs App</h2>
      </>
    )

  return content
}

export default LoggedIn