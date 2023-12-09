<<<<<<< HEAD
import { useEffect } from 'react'
import userService from '../services/users'
import { setNotification } from '../reducers/notificationReducer'
import { setUsers } from '../reducers/allUsersReducer'
import { useDispatch, useSelector } from 'react-redux'

=======
import { useSelector } from 'react-redux'

import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'
>>>>>>> 9ddb80f (7.16-7.17)



const Users = () => {
<<<<<<< HEAD
  const dispatch = useDispatch()
=======
>>>>>>> 9ddb80f (7.16-7.17)
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
<<<<<<< HEAD
                <td>{user.name}</td>
=======
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}&nbsp;</Link>
                </td>
>>>>>>> 9ddb80f (7.16-7.17)
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