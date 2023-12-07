import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Blog from './components/Blog'
import CreateNewBlog from './components/CreateNewBlog'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs, createBlog, initializeBlogs, deleteBlog } from './reducers/blogReducer'


const App = () => {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    console.log('first')
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      dispatch(setBlogs(sortedBlogs))
    })
      .catch(error => dispatch(setNotification(['Network error', 'error'], 5000)))

  }, [dispatch])


  const sortBlogs = (id, increasedLikes) => {

    const updatedBlogs = blogs.map(blog => {
      if (blog.id === id) {
        const updatedBlog = {
          ...blog,
          likes: increasedLikes,
          user: {
            ...user
          }
        }
        return updatedBlog
      }
      return blog
    })

    const sortedUpdatedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(sortedUpdatedBlogs))
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject, user))
  }

  const revokeToken = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const deleteThisBlog = async (id, title) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== id)
    if (window.confirm(`Removing blog ${title}`)) dispatch(deleteBlog(id, updatedBlogs))
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />

      {user === null &&
        <Togglable buttonLabel='log in'>
          <Login setUser={setUser} />
        </Togglable>
      }
      {user &&
        <div>
          <p>{user.name} logged in</p>
          <button
            onClick={revokeToken}
          >Log out
          </button>
          <h2>create new</h2>

          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <CreateNewBlog
              addBlog={addBlog}
              blogs={blogs}
            />
          </Togglable>

        </div>
      }
      {blogs && blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          deleteThisBlog={deleteThisBlog}
          sortBlogs={sortBlogs}
        />
      )}
    </div>
  )
}

export default App