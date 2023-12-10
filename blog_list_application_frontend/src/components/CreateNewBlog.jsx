import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'


const CreateNewBlog = ({ toggleCreate }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()
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

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          type="text"
          id='title'
          value={title}
          name="Title"
          placeholder='Title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          id='author'
          value={author}
          name="Author"
          placeholder='Author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          id='url'
          value={url}
          name="URL"
          placeholder='URL'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default CreateNewBlog