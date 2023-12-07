import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import Blog from './components/Blog'
import CreateNewBlog from './components/CreateNewBlog'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    })
  }, [])

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
    setBlogs(sortedUpdatedBlogs)
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

    try {
      const blog = await blogService.create(blogObject)
      const updatedBlog = {
        author: blog.author,
        id: blog.id,
        likes: blog.likes,
        title: blog.title,
        url: blog.url,
        user: {
          name: user.name
        }
      }

      setBlogs(blogs.concat(updatedBlog))
      dispatch(setNotification([`A new blog ${blogObject.title} by ${blogObject.author} added`, 'success'], 5000))

    } catch {dispatch(setNotification(['Invalid blog', 'error'], 5000))}
  }

  const revokeToken = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const deleteThisBlog = async (id, title) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== id)
    if (window.confirm(`Removing blog ${title}`)) {
      try {
        await blogService.deleteBlog(id)
        setBlogs(updatedBlogs)
      } catch {dispatch(setNotification(['You can remove only your blogs', 'error'], 5000))}
    }
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
              setBlogs={setBlogs} />
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