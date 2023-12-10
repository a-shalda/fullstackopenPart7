import axios from 'axios'
const baseUrl = '/api/blogs'


const getComments = (url) => {
  const request = axios.get(`${baseUrl}/${url}/comments`)
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