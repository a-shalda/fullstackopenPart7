import axios from 'axios'
const baseUrl = '/api/blogs'


const getComments = (url) => {
  const request = axios.get(`${baseUrl}/${url}/comments`)
  return request.then(response => response.data)
}

const postComment = async (comment) => {
  const response = await axios.post(baseUrl, comment)
  return response.data
}


export default { getComments, postComment }