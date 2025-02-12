import {$authHost, $host} from "./index";


export const addConversation= async (data)=>{
    try {
        let response = await $host.post('api/sconversation/add', data);
        if (response.data === null) {
            return null;
        }
        return response.data
    } catch (error) {
        console.log("error while calling setConversation api", error.message);
        
    }
}

export const getSConversation= async (id)=>{
    try {
       let response= await $host.get(`api/sconversation/get/${id}`);
       if (response.data === null) {
            return null;
       }
        return response.data
    } catch (error) {
        console.log("error while calling getConversation api", error.message);
        
    }
}

export const getSConversations= async ()=>{
    try {
       let response= await $host.get(`api/sconversations/get`);
       return response.data;
    } catch (error) {
        console.log("error while calling getConversations api", error.message);       
    }
}

// message
export const newMessage = async (data) =>{
    try {
        await $host.post(`api/smessage/add`, data); 
    } catch (error) {
        console.log("error while calling newMessage api",error.message);
    }
}

export const delSMessage = async (id) =>{
    try {
        await $host.delete(`api/smessage/delete/${id}`); 
    } catch (error) {
        console.log("error while calling delMessage api",error.message);
    }
}


export const getSMessages = async(id)=>{
    try {
        let response= await $host.get(`api/smessage/get/${id}`);
        
        return response.data;
    } catch (error) {
        console.log("error while calling getMessages api",error.message);
        
    }
}

export const getSLastMessages = async(id)=>{
    try {
        let response= await $host.get(`api/smessage/last/get/${id}`);
        
        return response.data;
    } catch (error) {
        console.log("error while calling getLastMessages api",error.message);
        
    }
}

export const getSAllMessages = async()=>{
    try {
        let response= await $host.get(`api/smessage/get`);
        
        return response.data;
    } catch (error) {
        console.log("error while calling getAllMessages api",error.message);
        
    }
}

export const getSMessagesCount = async(count)=>{
    try {
        let response= await $host.get(`api/smessage/get/count/${count}`);
        
        return response.data;
    } catch (error) {
        console.log("error while calling getMessagesCount api",error.message);
        
    }
}

//file
export const uploadFile = async (data) =>{
    try {
        return await $host.post(`api/file/upload`, data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    } catch (error) {
        console.log("error while calling uploadFile api",error.message);
        
    }
}

//distrib files
export const distribFile = async (data) =>{
    try {
        return await $host.post(`api/file/distrib`, data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    } catch (error) {
        console.log("error while calling distribFile api",error.message);
        
    }
}

//avatar files
export const uploadAvatar = async (data) =>{
    try {
        return await $host.post(`api/file/avatar`, data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    } catch (error) {
        console.log("error while calling uploadAvatar api",error.message);
        
    }
}
