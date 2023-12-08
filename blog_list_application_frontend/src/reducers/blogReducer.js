import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'


const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    // vote(state, action) {
    //   const id = action.payload
    //   const toVote = state.find(s => s.id === id )
    //   const voted = { ...toVote, votes: toVote.votes + 1 }
    //   return state.map(s => s.id===id ? voted : s)
    // },
    // replaceBlog(state, action) {
    //   const replaced = action.payload
    //   return state.map(s => s.id===replaced.id ? replaced : s)
    // },
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

// export const initializeBlogs = (blogs) => {
//   return async dispatch => {
//     try {
//       const blogs = await blogService.getAll()
//       const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
//       dispatch(setBlogs(sortedBlogs))
//     } catch {
//       dispatch(setNotification(['Network error', 'error'], 5000))
//     }
//   }
// }

export const createBlog = (object, user) => {
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
    }
    catch {dispatch(setNotification(['Invalid blog', 'error'], 5000))}
  }
}

// export const voteBlog = (object) => {
//   const toVote = { ...object, votes: object.votes + 1 }
//   return async dispatch => {
//     const blog = await blogService.update(toVote)
//     dispatch(replaceBlog(blog))
//   }
// }

export const { addBlog, replaceBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer