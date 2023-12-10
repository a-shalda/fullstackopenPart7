import { createSlice } from '@reduxjs/toolkit'

const commentSlice = createSlice({
  name: 'comments',
  initialState: null,
  reducers: {
    setComments(state, action) {
      return action.payload
    }
  }
})

export const { setComments } = commentSlice.actions
export default commentSlice.reducer