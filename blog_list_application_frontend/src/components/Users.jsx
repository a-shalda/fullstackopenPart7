import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {

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