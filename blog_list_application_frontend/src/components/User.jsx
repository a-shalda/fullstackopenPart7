import { useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'

const User = () => {

  const id = useParams().id
  const users = useSelector(state => state.users)

  if (!users) return null
  const user = users.find(user => user.id === id)
  if (!user) return null

  return (
    <>
      <h2>{user.name}</h2>
      <h4>Added blogs</h4>
      {user && user.blogs.map(blog => {
        return (
          <li key={blog.id}>{blog.title}</li>
        )
      })}
    </>
  )

}

export default User