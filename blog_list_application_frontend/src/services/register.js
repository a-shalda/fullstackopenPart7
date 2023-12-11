import axios from 'axios'
const baseUrl = '/api/users'

const register = async registerInfo => {
  const response = await axios.post(baseUrl, registerInfo)
  return response.data
}

export default { register }