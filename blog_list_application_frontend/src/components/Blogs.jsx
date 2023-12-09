import Blog from './Blog'

const Blogs = ({ blogs }) => {

  let allBlogs

  if (blogs) {
    allBlogs = blogs.map(blog => <Blog key={blog.id} blog={blog}/>)
  }
  return allBlogs
}

export default Blogs