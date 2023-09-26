import axios from 'axios'

export default function useFetch() {
  const get = async (url: string) => {
    try {
      const { data } = await axios.get(url)
      return data
    } catch (error) {
      console.error(error)
    }
  }

  const post = async (url: string, body: any) => {
    try {
      const { data } = await axios.post(url, body)
      return data
    } catch (error) {
      console.error(error)
    }
  }

  const patch = async (url: string, body: any) => {
    try {
      const { data } = await axios.patch(url, body)
      return data
    } catch (error) {
      console.error(error)
    }
  }

  const put = async (url: string, body: any) => {
    try {
      const { data } = await axios.put(url, body)
      return data
    } catch (error) {
      console.error(error)
    }
  }

  return {
    get,
    post,
    patch,
    put,
  }
}
