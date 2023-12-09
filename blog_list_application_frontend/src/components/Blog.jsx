import { useState } from 'react'
import blogService from '../services/blogs'
import BlogContent from './BlogContent'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs, deleteBlog } from '../reducers/blogReducer'

import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'


const Blog = ({ singleBlog }) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
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

  const deleteThisBlog = async (id, title) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== id)
    if (window.confirm(`Removing blog ${title}`)) dispatch(deleteBlog(id, updatedBlogs))
  }

  const showDelete = (
    user && blog && (user.username === blog.user.name) && <button onClick={() => deleteThisBlog(blog.id, blog.title)}>remove</button>
  )

  const content = (
    singleBlog ?
      <div className='blog'>
        <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}&nbsp;</Link>
      </div>
      :

      <div className='blog'>
        <h3>{blog.title} by {blog.author}</h3>
        <a href={blog.url}>{blog.url}</a>
        <p>Likes: {blog.likes}
          <button onClick={addLike}>like</button>
        </p>
        <p>{blog.user.name}</p>
        {showDelete}
      </div>
  )

  return content
}

export default Blog