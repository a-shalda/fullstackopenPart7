import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import blogService from './services/blogs'
import userService from './services/users'
import commentsService from './services/comments'

import { setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { setUsers } from './reducers/allUsersReducer'
import { setComments } from './reducers/commentReducer'
import { setNotification } from './reducers/notificationReducer'

import CreateNewBlog from './components/CreateNewBlog'
import LoggedIn from './components/LoggedIn'
import Comments from './components/Comments'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import User from './components/User'
import Users from './components/Users'
import WelcomeScreen from './components/welcomeScreen'
import Login from './components/Login'
import Registration from './components/Registration'
import Notification from './components/Notification'
import Togglable from './components/Togglable'


const App = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const blogFormRef = useRef()
  const toggleCreate = () => blogFormRef.current.toggleVisibility()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      dispatch(setBlogs(sortedBlogs))
    })
      .catch(error => dispatch(setNotification(['Network error', 'error'], 5000)))

  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
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


  return (
    <div>
      <Notification />
      <Router>

        {user && <LoggedIn />}

        <Routes>
          <Route path="/" element={
            user ? <Blogs /> : <WelcomeScreen />
          } />
          <Route path="/users" element={user && <Users />} />
          <Route path="/blogs" element={user && <Blogs />} />
          <Route path="/create" element={user && <CreateNewBlog />} />
          <Route path="/blogs/:id" element={user && <Blog />} />
          <Route path="/blogs/:id/comments" element={user && <Comments />} />
          <Route path="/users/:id" element={user && <User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App