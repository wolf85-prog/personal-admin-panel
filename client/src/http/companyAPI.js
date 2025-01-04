import {$authHost, $host} from "./index";

export const getCompany = async (userId) =>{
    try {
       let response = await $host.get(`api/companys/user/get/${userId}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getCompany api", error.message);
    }
}

export const getCompanyCount = async (userId, count, prev) =>{
    try {
       let response = await $host.get(`api/companys/count/get/${userId}/${count}/${prev}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getCompanyCount api", error.message);
    }
}

export const editCompany = async (data, id) =>{
    try {
        await $host.patch(`api/companys/update/${id}`, data); 
    } catch (error) {
        console.log("error while calling editCompany api",error.message);
    }
}

export const addCompany = async (data, userId) =>{
    try {
        let response = await $host.post(`api/companys/add/${userId}`, data); 
        return response.data;
    } catch (error) {
        console.log("error while calling addCompany api",error.message);
    }
}

export const deleteCompany = async (id) =>{
    try {
        await $host.get(`api/companys/delete/${id}`); 
    } catch (error) {
        console.log("error while calling deleteCompany api",error.message);
    }
}


export const getCompanyCountAll = async (userId) =>{
    try {
        let response = await $host.get(`api/companys/count/get/${userId}`); 
        return response.data; 
    } catch (error) {
        console.log("error while calling getCompanyCountAll api",error.message);
    }
}

//file
export const uploadAvatar = async (data) =>{
    try {
        return await $host.post(`api/file/avatar`, data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    } catch (error) {
        console.log("error while calling uploadFile api",error.message);
        
    }
}