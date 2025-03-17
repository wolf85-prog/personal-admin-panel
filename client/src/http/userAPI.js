import {$authHost, $host, $host_call} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, role) => {
    const {data} = await $host.post('api/user/registration', {username: null, email, password, role})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const addCode = async (phone, code) => {
    const {data} = await $host.post('api/user/code/add', {phone, code})
    return data.codeRes.code
}

export const getCode = async (phone, code) => {
    const {data} = await $host.post('api/user/code/get', {phone, code})
    console.log(data)
    return data.user.code
}

export const checkCode = async (phone, code) => {
    const {data} = await $host_call.post('/sms/send', {to_number: phone, code: `${code}`})
    console.log(data)
    return data.code
}