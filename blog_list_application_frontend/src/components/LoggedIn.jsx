import { useSelector, useDispatch } from 'react-redux'

import userService from '../services/users'
import commentsService from '../services/comments'
import blogService from '../services/blogs'

import { setUser } from '../reducers/userReducer'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { setBlogs } from '../reducers/blogReducer'
import { setUsers } from '../reducers/allUsersReducer'
import { setComments } from '../reducers/commentReducer'
import { setNotification } from '../reducers/notificationReducer'


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

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      dispatch(setBlogs(sortedBlogs))
    })
      .catch(error => dispatch(setNotification(['Network error', 'error'], 5000)))

  }, [dispatch])

  useEffect(() => {
    userService.getAllUsers().then(users => {
      dispatch(setUsers(users))
    })
      .catch(error => dispatch(setNotification(['Network error', 'error'], 5000)))

  }, [dispatch])

  useEffect(() => {
    commentsService.getComments().then(comments => {
      dispatch(setComments(comments))
    })
      .catch(error => error)

  }, [dispatch])

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