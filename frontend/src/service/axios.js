import axios from 'axios'
// import store from '../store'
const token = localStorage.getItem('token')

axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL
// eslint-disable-next-line dot-notation
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use(request => {
  request.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`
  return request
})

export default axios
