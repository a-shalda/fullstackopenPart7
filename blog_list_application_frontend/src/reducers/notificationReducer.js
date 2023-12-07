import { createSlice } from '@reduxjs/toolkit'


let timeoutId
export const cleartimeOutId = () => timeoutId && clearTimeout(timeoutId)
export const settimeOutId = (newTimeoutId) => timeoutId = newTimeoutId

const notificationSlice = createSlice ({

  name: 'notification',
  initialState: null,
  reducers: {
    notification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return null
    }
  }
})

export const setNotification = (args, time) => {
  return async dispatch => {
    dispatch(notification(args))
    cleartimeOutId()
    const timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, time)
    settimeOutId(timeoutId)
  }
}


export const { notification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer