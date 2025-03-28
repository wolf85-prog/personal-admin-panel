import {$authHost, $host, $host_panel, $host_bot} from "./index";

export const getProjects = async (userId) =>{
    try {
       let response = await $host.get(`api/projects/user/get/${userId}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getSpecialist api", error.message);
    }
}

export const getProjectsDel = async (userId) =>{
    try {
       let response = await $host.get(`api/projects/delete/get/${userId}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getProjectsDel api", error.message);
    }
}

export const getProjectCount = async (count, prev) =>{
    try {
       let response = await $host.get(`api/projects/count/get/${count}/${prev}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getProjectCount api", error.message);
    }
}

export const editProject = async (data, id) =>{
    try {
        await $host.patch(`api/projects/update/${id}`, data); 
    } catch (error) {
        console.log("error while calling editProject api",error.message);
    }
}

export const addProject = async (data) =>{
    try {
        let response = await $host.post(`api/projects/add`, data); 
        return response.data;
    } catch (error) {
        console.log("error while calling addProject api",error.message);
    }
}

export const deleteProject = async (id) =>{
    try {
        await $host.get(`api/projects/delete/${id}`); 
    } catch (error) {
        console.log("error while calling deleteProject api",error.message);
    }
}

export const getProjectId = async (id) =>{
    try {
       let response = await $host.get(`api/projects/get/${id}`);
       return response.data;
    } catch (error) {
        console.log("error while calling getProjectId api", error.message);
    }
}

export const addProjectPanel = async (data) =>{
    try {
        let response = await $host_panel.post(`api/projectnew/add`, data); 
        return response.data;
    } catch (error) {
        console.log("error while calling addProject api",error.message);
    }
}


export const addProjectBot = async (data) =>{
    try {
        let response = await $host_bot.post(`web-send`, data); 
        return response.data;
    } catch (error) {
        console.log("error while calling addProjectBot api",error.message);
    }
}