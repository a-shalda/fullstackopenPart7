import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'

const User = ({ users }) => {

  const id = useParams().id
  console.log(users)

  if (!users) return null

  const user = users.find(user => user.id === id)

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