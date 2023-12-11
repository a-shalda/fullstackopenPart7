import { useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'

const User = () => {

  const id = useParams().id
  const users = useSelector(state => state.users)

  if (!users) return null
  const user = users.find(user => user.id === id)
  if (!user) return null

  return (
    <div className='user'>
      <h3>{user.name}&apos;s blogs</h3>
      {user && user.blogs.map(blog => {
        return (
          <li key={blog.id}>{blog.title}</li>
        )
      })}
    </div>
  )

}

export default User