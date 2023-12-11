import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'


const CreateNewBlog = ({ toggleCreate }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    dispatch(createBlog(blogObject, user, users))

    setTitle('')
    setAuthor('')
    setUrl('')
    toggleCreate()
  }

  const handleCancel = () => navigate('/')

  return (
    <div className='wrapperForm'>
      <form className='form' onSubmit={addBlog}>
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