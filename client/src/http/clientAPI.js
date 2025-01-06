import {$authHost, $host, $host_worker} from "./index";

export const getClient = async (userId) =>{
    try {
       let response = await $host.get(`api/client/user/get/${userId}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getClient api", error.message);
    }
}

export const getClientCount = async (userId, count, prev) =>{
    try {
       let response = await $host.get(`api/client/count/get/${userId}/${count}/${prev}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getClientCount api", error.message);
    }
}

export const editClient = async (data, id) =>{
    try {
        await $host.patch(`api/client/update/${id}`, data); 
    } catch (error) {
        console.log("error while calling editClient api",error.message);
    }
}

export const addClient = async (data) =>{
    try {
        let response = await $host.post(`api/client/add`, data); 
        return response.data;
    } catch (error) {
        console.log("error while calling addClient api",error.message);
    }
}

export const deleteClient = async (id) =>{
    try {
        await $host.get(`api/client/delete/${id}`); 
    } catch (error) {
        console.log("error while calling deleteClient api",error.message);
    }
}

export const getClientId = async (id) =>{
    try {
       let response = await $host.get(`api/client/${id}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getClientId api", error.message);
    }
}

export const getClientChatId = async (id) =>{
    try {
       let response = await $host.get(`api/client/chat/${id}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getClientChatId api", error.message);
    }
}

export const blockedClient = async (id) =>{
    try {
       let response = await $host.get(`api/client/block/${id}`);
       return response.data;
    } catch (error) {
        console.log("error while calling blockedSpecialist api", error.message);
    }
}


export const sendSpecialistOtkaz = async (id, data) =>{
    try {
       let response = await $host_worker.post(`api/specialist/otkaz/send/${id}`, data);
       return response.data;
    } catch (error) {
        console.log("error while calling sendSpecialistOtkaz api", error.message);
    }
}
