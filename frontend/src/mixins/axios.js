import axios from '@/service/axios'

export default {
  beforeMounted () {
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  },
  methods: {
    async post (url, payload) {
      const result = await axios.post(url, payload)
      return result.data
    },
    async get (url, payload) {
      const result = await axios.get(url, {params: payload})
      return result.data
    },
    async delete (url, payload) {
      const result = await axios.delete(url, payload)
      return result.data
    },
    async delete (url, payload) {
      const result = await axios.put(url, payload)
      return result.data
    }
  }
}
