import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import userService from '../services/users'
import { setUsers } from '../reducers/allUsersReducer'
import { setNotification } from '../reducers/notificationReducer'

import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'



const Users = () => {
  const dispatch = useDispatch()


  // useEffect(() => {
  //   userService.getAllUsers().then(users => {
  //     dispatch(setUsers(users))
  //   })
  //     .catch(error => dispatch(setNotification(['Network error', 'error'], 5000)))

  // }, [dispatch])

  const users = useSelector(state => state.users)



  let table

  if (users) {
    table = (
      <table>
        <thead>
          <tr>
            <td><h4>Users</h4></td>
            <td><h4>Posts</h4></td>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.name}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}&nbsp;</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }


  return table
}

export default Users