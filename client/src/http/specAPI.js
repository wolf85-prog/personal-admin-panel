import {$authHost, $host, $host_worker} from "./index";

export const getSpecialist = async (userId) =>{
    try {
       let response = await $host.get(`api/workers/user/get/${userId}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getSpecialist api", error.message);
    }
}

export const getSpecCount = async (userId, count, prev) =>{
    try {
       let response = await $host.get(`api/workers/count/get/${userId}/${count}/${prev}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getSpecCount api", error.message);
    }
}

export const editSpecialist = async (data, id) =>{
    try {
        await $host.patch(`api/workers/update/${id}`, data); 
    } catch (error) {
        console.log("error while calling editSpecialist api",error.message);
    }
}

export const addSpecialist = async (data) =>{
    try {
        let response = await $host.post(`api/workers/add`, data); 
        return response.data;
    } catch (error) {
        console.log("error while calling addSpecialist api",error.message);
    }
}

export const deleteSpecialist = async (id) =>{
    try {
        await $host.get(`api/workers/delete/${id}`); 
    } catch (error) {
        console.log("error while calling deleteSpecialist api",error.message);
    }
}

export const getSpecialistId = async (id) =>{
    try {
       let response = await $host.get(`api/workers/${id}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getSpecialistId api", error.message);
    }
}

export const getSpecialistChatId = async (id) =>{
    try {
       let response = await $host.get(`api/workers/chat/${id}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getSpecialistChatId api", error.message);
    }
}

export const blockedSpecialist = async (id) =>{
    try {
       let response = await $host.get(`api/workers/block/${id}`);
       return response.data;
    } catch (error) {
        console.log("error while calling blockedSpecialist api", error.message);
    }
}


export const sendSpecialistOtkaz = async (id, data) =>{
    try {
       let response = await $host_worker.post(`api/workers/otkaz/send/${id}`, data);
       return response.data;
    } catch (error) {
        console.log("error while calling sendSpecialistOtkaz api", error.message);
    }
}
