import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import { setUsers } from '../reducers/allUsersReducer'
import { useSelector } from 'react-redux'



const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      return state.concat(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    deleteBlogFromState (state, action) {
      return action.payload
    }
  },
})

export const deleteBlog = (id, updatedBlogs) => {
  return async dispatch => {
    try {
      await blogService.deleteBlog(id)
      dispatch(setBlogs(updatedBlogs))
    } catch {
      dispatch(setNotification(['Network error', 'error'], 5000))
    }
  }
}


export const createBlog = (object, user, users) => {
  return async dispatch => {

    try {
      const blog = await blogService.create(object)
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
    }
    catch {dispatch(setNotification(['Invalid blog', 'error'], 5000))}
  }
}

export const { addBlog, replaceBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer