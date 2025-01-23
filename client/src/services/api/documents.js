import axios from 'axios'
import { json } from 'react-router-dom'

// const BASE_URL = 'https://tm.uley.team:6868/api/'
// const BASE_URL = 'https://tm.uley.team:7777/api/'
// const BASE_URL = 'http://localhost:8000/api/'
// const BASE_URL = 'http://localhost:6868/api/'
// const BASE_URL = 'http://localhost:7979/api/'
// const BASE_URL = 'http://localhost:77777/api/'
// const BASE_URL = 'https://uley.company:7979/api/'

const BASE_URL = process.env.REACT_APP_DOC_REST_API

export const axiosInstance = axios.create({ baseURL: BASE_URL })

export const getComplect = async (id) => {
  return (await axiosInstance.get(`documents/complect/${id}`)).data
}

export const hiddenDocument = async (item) => {
  return (await axiosInstance.post('documents/hidden/', item))
}


// Компании
export const getCompanies = async () => {
  return (await axiosInstance.get('companies')).data
}

export const getCompany = async (id) => {
  return (await axiosInstance.get(`companies/${id}`)).data
}

export const getCompanyComplects = async (id) => {
  return (await axiosInstance.get(`companies/${id}/complects`)).data
}

export const getCompaniesFilter = async () => {
  return (await axiosInstance.post('companies/filters')).data
}

export const getRequesitsFilter = async () => {
  return (await axiosInstance.post('companies/requesits')).data
}

export const createComplects = async (data) => {
  await axiosInstance.post('documents', data)
}

//Шаблоны

export const getTemplates = async () => {
  return (await axiosInstance.get('templates')).data
}

export const getTemplate = async (number) => {
  return (await axiosInstance.get(`templates/${number}`)).data
}

export const getTemplate2 = async (template_name, number) => {
  console.log(`${template_name} ${number}`)
  return (await axiosInstance.get(`templates/${template_name}/${number}`)).data
}

export const updateTemplateItem = async ({ item_id, data }) => {
  await axiosInstance.put(`templates/items/${item_id}`, data)
}

export const updateTemplate = async ({ item_id, data }) => {
  await axiosInstance.put(`templates/${item_id}`, data)
}
