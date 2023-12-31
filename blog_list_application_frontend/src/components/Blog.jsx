import blogService from '../services/blogs'
import Comments from './Comments'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs, deleteBlog } from '../reducers/blogReducer'
import { Link, useParams, useNavigate } from 'react-router-dom'


const Blog = ({ singleBlog }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id

  let blog

  if (singleBlog) blog = singleBlog
  else {
    blog = blogs.find(blog => blog.id === id)
  }

  if (!blog) return null

  const sortBlogs = (id, increasedLikes) => {
    const updatedBlogs = blogs.map(blog => {
      if (blog.id === id) {
        const updatedBlog = {
          ...blog,
          likes: increasedLikes,
        }
        return updatedBlog
      }
      return blog
    })
    const sortedUpdatedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(sortedUpdatedBlogs))
  }

  const addLike = async () => {
    const updatedBlog = { likes: blog.likes + 1 }

    try {
      await blogService.update(blog.id, updatedBlog)
      sortBlogs(blog.id, blog.likes + 1)
    } catch {dispatch(setNotification(['Only logged in users can update blogs', 'error'], 5000))}
  }

  const deleteThisBlog = async (id, title, users, user) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== id)
    if (window.confirm(`Removing blog ${title}`)) dispatch(deleteBlog(id, updatedBlogs, users, user))
    navigate('/')
  }

  const showDelete = (
    user && blog && (user.username === blog.user.name) && <button onClick={() => deleteThisBlog(blog.id, blog.title, users, user)}>Remove</button>
  )

  const content = (
    singleBlog ?
      <div>
        <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}&nbsp;</Link>
      </div>
      :

      <div className='blog'>
        <h3>{blog.title} by {blog.author}</h3>
        <a className='blogLink' href={blog.url} target='_blank' rel='noopener noreferrer'>{blog.url}</a>
        <p>Likes: {blog.likes} &nbsp;&nbsp;&nbsp;
          <button onClick={addLike}>Like</button>
        </p>
        <p>Added by {blog.user.name}</p>
        {showDelete}
        <Comments />
      </div>
  )

  return content
}

export default Blog