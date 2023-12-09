import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'


const BlogContent = ({ blog, likes, addLike, showDelete }) => {

  const content = (
    <div className='blog'>
      <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}&nbsp;</Link>
    </div>
    // <div className='blog blogView'>
    //   <p>{blog.title} by {blog.author} <button onClick={toggleViewBlog}>{buttonLabel}</button></p>
    //   <p>{blog.url}</p>
    //   <p>Likes: {likes}
    //     <button onClick={addLike}>like</button>
    //   </p>
    //   <p>{blog.user.name}</p>
    //   {showDelete}
    // </div>
  )

  return content
}

export default BlogContent