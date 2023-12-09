import { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import CreateNewBlog from './components/CreateNewBlog'
import LoggedIn from './components/LoggedIn'

<<<<<<< HEAD
=======
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import User from './components/User'

import userService from './services/users'
import { setUsers } from './reducers/allUsersReducer'


>>>>>>> 9ddb80f (7.16-7.17)
import Users from './components/Users'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'


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


  return (
    <div>
      <Notification />

      {!user &&
        <>
          <h2>Blogs App</h2>
          <Togglable buttonLabel='log in'>
            <Login />
          </Togglable>
        </>
      }
      {user &&
        <div>
<<<<<<< HEAD
          {/* <Router> */}
          {user && (
            <>
              <p>
                <Link to='/blogs'>blogs&nbsp;</Link>
                <Link to='/users'>users&nbsp;</Link>
                {user.name} logged in
                <button
                  onClick={revokeToken}
                >Log out
                </button>
              </p>
              <h2>Blogs App</h2>
            </>
          )}
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <CreateNewBlog toggleCreate={toggleCreate} />
          </Togglable>

          <Users />
=======
          <Router>
            <LoggedIn />

            <Routes>
              <Route path="/" element={
                <>
                  <Togglable buttonLabel='new blog' ref={blogFormRef}>
                    <CreateNewBlog toggleCreate={toggleCreate} />
                  </Togglable>
                  <Blogs />
                </>
              } />
              <Route path="/users" element={<Users />} />
              <Route path="/blogs/:id" element={<Blog />} />
              <Route path="/users/:id" element={<User />} />
            </Routes>
          </Router>
>>>>>>> 9ddb80f (7.16-7.17)
        </div>
      }
    </div>
  )
}

export default App