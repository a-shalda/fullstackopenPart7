import Blog from './Blog'
import { useSelector } from 'react-redux'


const Blogs = () => {

  const blogs = useSelector(state => state.blogs)

  if (!blogs) return null

  let allBlogs

  if (blogs) {
    allBlogs = blogs.map(blog => <Blog key={blog.id} singleBlog={blog}/>)
  }
  return <div className='blogs'>{allBlogs}</div>
}

export default Blogs