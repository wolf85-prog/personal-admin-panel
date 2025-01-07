import axios from 'axios'
import { json } from 'react-router-dom'

// const BASE_URL = 'https://tm.uley.team:6868/api/'
// const BASE_URL = 'https://tm.uley.team:7777/api/'
// const BASE_URL = 'http://localhost:8000/api/'
// const BASE_URL = 'http://localhost:6868/api/'
const BASE_URL = 'http://localhost:7979/api/'
// const BASE_URL = 'https://uley.company:7979/api/'

// const BASE_URL = process.env.REACT_APP_BASE_URL

export const axiosInstance = axios.create({ baseURL: BASE_URL })

export const getSpecialities = async () => {
  return (await axiosInstance.get('speciality')).data
}

export const getSpecialityGrups = async () => {
  return (await axiosInstance.get('group')).data
}

export const createSpecialityGroup = async (data) => {
  await axiosInstance.post('group', data)
}

export const updateSpecialityGroup = async (data) => {
  await axiosInstance.put('group', data)
}

export const duplicateSpeciality = async (data) => {
  await axiosInstance.put('speciality/duplicate', data)
}

export const updateSpeciality = async (data) => {
  await axiosInstance.put('speciality', data)
}