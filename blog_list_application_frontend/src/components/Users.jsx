import { useEffect } from 'react'
import userService from '../services/users'
import { setNotification } from '../reducers/notificationReducer'
import { setUsers } from '../reducers/allUsersReducer'
import { useDispatch, useSelector } from 'react-redux'


const Users = () => {

  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    userService.getAllUsers().then(users => {
      dispatch(setUsers(users))
    })
      .catch(error => dispatch(setNotification(['Network error', 'error'], 5000)))

  }, [dispatch])

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
                <td>{user.name}</td>
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