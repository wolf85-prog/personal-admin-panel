import {$authHost, $host} from "./index";

export const getPlatforms = async (userId) =>{
    try {
       let response = await $host.get(`api/platforms/user/get/${userId}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getPlatforms api", error.message);
    }
}

export const getPlatformId = async (id) =>{
    try {
       let response = await $host.get(`api/platforms/${id}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getProjectId api", error.message);
    }
}

export const getPlatformCount = async (userId, count, prev) =>{
    try {
       let response = await $host.get(`api/platforms/count/get/${userId}/${count}/${prev}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getCompanyCount api", error.message);
    }
}

export const editPlatform = async (data, id) =>{
    try {
        await $host.patch(`api/platforms/update/${id}`, data); 
    } catch (error) {
        console.log("error while calling editPlatform api",error.message);
    }
}

export const addPlatform = async (data) =>{
    try {
        let response = await $host.post(`api/platforms/add`, data); 
        return response.data;
    } catch (error) {
        console.log("error while calling addCompany api",error.message);
    }
}

export const deletePlatform = async (id) =>{
    try {
        await $host.get(`api/platforms/delete/${id}`); 
    } catch (error) {
        console.log("error while calling deleteCompany api",error.message);
    }
}


export const getPlatformCountAll = async (userId) =>{
    try {
        let response = await $host.get(`api/platforms/count/get/${userId}`); 
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