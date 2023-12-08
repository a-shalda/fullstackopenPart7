import { useState } from 'react'
import blogService from '../services/blogs'
import BlogContent from './BlogContent'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs, deleteBlog } from '../reducers/blogReducer'


const Blog = ({ blog }) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  let initialLikes = 0
  blog.likes && (initialLikes = blog.likes)

  const [viewBlog, setViewBlog] = useState(false)
  const [likes, setLikes] = useState(initialLikes)

  let buttonLabel = ''
  !viewBlog ? buttonLabel='view' : buttonLabel='hide'

  const toggleViewBlog = () => setViewBlog(!viewBlog)

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

  const addLike = async () => {
    const updatedBlog = { likes: likes + 1 }

    try {
      await blogService.update(blog.id, updatedBlog)
      setLikes(likes + 1)
      sortBlogs(blog.id, likes + 1)
    } catch {dispatch(setNotification(['Only logged in users can update blogs', 'error'], 5000))}
  }

  const blogs = useSelector(state => state.blogs)

  const deleteThisBlog = async (id, title) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== id)
    if (window.confirm(`Removing blog ${title}`)) dispatch(deleteBlog(id, updatedBlogs))
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

export default Blog