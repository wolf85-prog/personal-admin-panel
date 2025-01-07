import axios from 'axios'

// const BASE_URL = 'https://tm.uley.team:6868/api/'
// const BASE_URL = 'http://localhost:8000/api/'
// const BASE_URL = 'http://localhost:6868/api/'
// const BASE_URL = 'http://localhost:7777/api/'
// const BASE_URL = 'http://localhost:7979/api/'
// const BASE_URL = 'https://uley.company:7979/api/'


const BASE_URL = process.env.TENANT_REST_API

export const axiosInstance = axios.create({ baseURL: BASE_URL })

export const getRates = async () => {
  return (await axiosInstance.get('rates')).data
}

export const getRate = async (id) => {
  return (await axiosInstance.get(`rates/${id}`)).data
}

export const createRate = async (data) => {
  await axiosInstance.post('rates', data)
}
export const updateRateHour = async ({ rate_id, data }) => {
  console.log(rate_id, data)
  await axiosInstance.post(`rates/${rate_id}`, data)
}
export const updateRateItem = async ({ item_id, data }) => {
  await axiosInstance.post(`rates/items/${item_id}`, data)
}
