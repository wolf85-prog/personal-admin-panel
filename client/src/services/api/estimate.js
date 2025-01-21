import axios from 'axios'
import { json } from 'react-router-dom'

// const BASE_URL = 'https://tm.uley.team:6868/api/'
// const BASE_URL = 'https://tm.uley.team:7777/api/'
// const BASE_URL = 'http://localhost:8000/api/'
// const BASE_URL = 'http://localhost:6868/api/'
// const BASE_URL = 'http://localhost:7777/api/'

const BASE_URL = process.env.REACT_APP_ESTIMATE_REST_API

export const axiosInstance = axios.create({ baseURL: BASE_URL })

export const getEstimates = async () => {
  return (await axiosInstance.get('estimate/final')).data
}

export const getEstimate = async (id) => {
  return (await axiosInstance.get(`estimate/final/${id}`)).data
}

export const getEstimateJobs = async (id) => {
  return (await axiosInstance.get(`estimate/final/${id}/jobs`)).data
}

// export const createRate = async (data) => {
//   await axiosInstance.post('rates', data)
// }
export const updateEstimateJob = async (job) => {
  await axiosInstance.post(`estimate/job/update`, job)
}
// export const updateRateItem = async ({ item_id, data }) => {
//   await axiosInstance.post(`rates/items/${item_id}`, data)
// }
