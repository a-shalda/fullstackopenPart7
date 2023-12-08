import { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Blog from './components/Blog'
import CreateNewBlog from './components/CreateNewBlog'
import LoggedIn from './components/LoggedIn'
import Users from './components/Users'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'


const App = () => {

  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
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


  return (
    <div>
      <h2>Blogs</h2>
      <Notification />

      {!user &&
        <Togglable buttonLabel='log in'>
          <Login />
        </Togglable>
      }
      {user &&
        <div>
          <LoggedIn />

          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <CreateNewBlog toggleCreate={toggleCreate} />
          </Togglable>

          <Users />

        </div>
      }
      {blogs && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App