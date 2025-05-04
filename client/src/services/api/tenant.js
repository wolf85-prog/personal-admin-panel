import axios from 'axios'

// const BASE_URL = 'https://tm.uley.team:6868/api/'
// const BASE_URL = 'http://localhost:8000/api/'
// const BASE_URL = 'http://localhost:6868/api/'
// const BASE_URL = 'http://localhost:7777/api/'
// const BASE_URL = 'http://localhost:7979/api/'
// const BASE_URL = 'https://uley.company:7979/api/'


const BASE_URL = process.env.REACT_APP_TENANT_REST_API

export const axiosInstance = axios.create({ baseURL: BASE_URL })
axiosInstance.interceptors.request.use(config => {
  config.headers["Tenant-User"] =  localStorage.getItem('user');
  return config; 
});


export const createTenant = async (userId) => {
  await axiosInstance.post(`tenant/${userId}`)
}
