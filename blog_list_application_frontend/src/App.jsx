import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import blogService from './services/blogs'

import { setUser } from './reducers/userReducer'

import CreateNewBlog from './components/CreateNewBlog'
import LoggedIn from './components/LoggedIn'
import Comments from './components/Comments'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import User from './components/User'
import Users from './components/Users'
import WelcomeScreen from './components/welcomeScreen'
import Login from './components/Login'
import Registration from './components/Registration'
import Notification from './components/Notification'


const App = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])


  return (
    <div>
      <Notification />
      <Router>

        {user && <LoggedIn />}

        <Routes>
          <Route path="/" element={
            user ? <Blogs /> : <WelcomeScreen />
          } />
          <Route path="/users" element={user && <Users />} />
          <Route path="/blogs" element={user && <Blogs />} />
          <Route path="/create" element={user && <CreateNewBlog />} />
          <Route path="/blogs/:id" element={user && <Blog />} />
          <Route path="/blogs/:id/comments" element={user && <Comments />} />
          <Route path="/users/:id" element={user && <User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App