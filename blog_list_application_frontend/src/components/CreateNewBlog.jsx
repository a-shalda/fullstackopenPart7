import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { setUsers } from '../reducers/allUsersReducer'


const CreateNewBlog = () => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  const addThisBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

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
      dispatch(addBlog(updatedBlog))
      dispatch(setNotification([`A new blog ${updatedBlog.title} by ${updatedBlog.author} added`, 'success'], 5000))

      const updatedUsers = users.map(u => {
        if (u.id === user.id) {
          const updatedUser = {
            ...u,
            blogs: [
              ...u.blogs.concat(updatedBlog)
            ]
          }
          return updatedUser
        }
        return u
      })

      dispatch(setUsers(updatedUsers))
      navigate('/')
    }
    catch (exception) {dispatch(setNotification(['Invalid blog', 'error'], 5000))}


    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleCancel = () => navigate('/')

  return (
    <div className='wrapperForm'>
      <form className='form' onSubmit={addThisBlog}>
        <div className='form__row'>
        Title
          <input
            className='form__input'
            type="text"
            id='title'
            value={title}
            name="Title"
            placeholder='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div className='form__row'>
        Author
          <input
            className='form__input'
            type="text"
            id='author'
            value={author}
            name="Author"
            placeholder='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div className='form__row'>
        URL
          <input
            className='form__input'
            type="text"
            id='url'
            value={url}
            name="URL"
            placeholder='URL'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>

  )
}

export default CreateNewBlog