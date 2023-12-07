import { useState } from 'react'
import blogService from '../services/blogs'
import BlogContent from './BlogContent'
import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'


const Blog = ({ blog, deleteThisBlog, user, sortBlogs }) => {

  const dispatch = useDispatch()

  let initialLikes = 0
  blog.likes && (initialLikes = blog.likes)

  const [viewBlog, setViewBlog] = useState(false)
  const [likes, setLikes] = useState(initialLikes)

  let buttonLabel = ''
  !viewBlog ? buttonLabel='view' : buttonLabel='hide'

  const toggleViewBlog = () => setViewBlog(!viewBlog)

  const addLike = async () => {
    const updatedBlog = { likes: likes + 1 }

    try {
      await blogService.update(blog.id, updatedBlog)
      setLikes(likes + 1)
      sortBlogs(blog.id, likes + 1)
    } catch {dispatch(setNotification(['Only logged in users can update blogs', 'error'], 5000))}
  }

  const showDelete = (
    user && blog && (user.username === blog.user.name) && <button onClick={() => deleteThisBlog(blog.id, blog.title)}>remove</button>
  )

  // const content = (
  //   !viewBlog ?
  //     <div className='blog'>
  //       <p>{blog.title} by {blog.author} <button onClick={toggleViewBlog}>{buttonLabel}</button></p>
  //     </div> :
  //     <div className='blogView'>
  //       <p>{blog.title} by {blog.author} <button onClick={toggleViewBlog}>{buttonLabel}</button></p>
  //       <p>{blog.url}</p>
  //       <p>Likes: {likes}
  //         <button onClick={addLike}>like</button>
  //       </p>
  //       <p>{blog.user.name}</p>
  //       {showDelete}
  //     </div>
  // )

  // return content

  return <BlogContent
    blog={blog}
    viewBlog={viewBlog}
    toggleViewBlog={toggleViewBlog}
    buttonLabel={buttonLabel}
    likes={likes}
    addLike={addLike}
    showDelete={showDelete}
  />
}

Blog.propTypes = {
  deleteThisBlog: PropTypes.func.isRequired,
}

export default Blog