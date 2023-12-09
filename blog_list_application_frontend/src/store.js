import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
<<<<<<< HEAD
=======
import allUsersReducer from './reducers/allUsersReducer'
>>>>>>> 9ddb80f (7.16-7.17)

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer
  }
})

export default store