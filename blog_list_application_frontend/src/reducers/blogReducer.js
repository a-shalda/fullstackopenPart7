import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import { setUsers } from '../reducers/allUsersReducer'


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

export const deleteBlog = (id, updatedBlogs, users, user) => {
  return async dispatch => {
    try {
      await blogService.deleteBlog(id)
      dispatch(setBlogs(updatedBlogs))

      const updatedUsers = users.map(u => {
        if (u.id === user.id) {
          const updatedUser = {
            ...u,
            blogs: [
              ...u.blogs.filter(blog => blog.id !== id)
            ]
          }
          return updatedUser
        }
        return u
      })
      dispatch(setUsers(updatedUsers))
    } catch {
      dispatch(setNotification(['Network error', 'error'], 5000))
    }
  }
}

export const { addBlog, replaceBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer