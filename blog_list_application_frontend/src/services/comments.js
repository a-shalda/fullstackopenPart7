import axios from 'axios'
const baseUrl = '/api/blogs'


const getComments = () => {
  const request = axios.get(`${baseUrl}/comments`)
  return request.then(response => response.data)
}

const postComment = async (url, comment) => {
  const newComment = {
    comment: comment,
    blogId: url
  }
  const response = await axios.post(`${baseUrl}/${url}/comments`, newComment)
  return response.data
}


export default { getComments, postComment }