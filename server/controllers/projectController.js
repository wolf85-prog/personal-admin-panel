const ApiError = require('../error/ApiError')
const {Project} = require('../models/models');
const sequelize = require('../db')
const { Op, QueryTypes  } = require('sequelize')

class ProjectController {

    async getProjects(req, res) {
        try {
            const projects = await Project.findAll({
                order: [
                    ['id', 'DESC'],
                ],
            })
            return res.status(200).json(projects);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    

    async getProjectsId(req, res) {
        const {id} = req.params
        try {
            const projects = await Project.findAll({where: {projectId: id}})
            return res.status(200).json(projects);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async getProject(req, res) {
        try {
            const daysAgo10 = new Date(new Date().setDate(new Date().getDate() - 10));

            const projects = await Project.findAll({
                order: [
                    ['id', 'DESC'],
                ],
                where: {
                    datestart: {
                        [Op.gte]: daysAgo10
                    }
                }
            })
            return res.status(200).json(projects);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }


    async getProjectsAll(req, res) {
        try {
            const projects = await Project.findAll({
                order: [
                    ['id', 'DESC'],
                ],
                where: {
                    deleted: null,
                }
            })
            return res.status(200).json(projects);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getProjectsDelete(req, res) {
        try {
            const projects = await Project.findAll({
                order: [
                    ['id', 'DESC'],
                ],
                where: {
                    deleted: true,
                }
            })
            return res.status(200).json(projects);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getProjectId(req, res) {
        const {id} = req.params
        try {
            const projects = await Project.findOne({
                where: {id},
            })
            return res.status(200).json(projects);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getProjectChatId(req, res) {
        const {id} = req.params
        try {
            const projects = await Project.findAll({
                where: {chatId: id},
            })
            return res.status(200).json(projects);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }



    async getProjectCreate(req, res) {
        const {name, status, specifika, city, datestart, dateend, teh, 
            managerId, companyId, chatId, spec, geo, comment, equipment, index, number} = req.body

        try {
            // const generate = await sequelize.query('SELECT generate_series(1000,10000,1)', {
            //     // тип запроса - выборка
            //     type: QueryTypes.SELECT,
            //   })

            //   const generateId = generate[index].generate_series

            const crm = await sequelize.query("SELECT nextval('crm_id')");

            const resid = crm[0][0].nextval
            
              const obj = {                
                crmID: resid.toString(),
                name,
                status,
                specifika,
                city,
                dateStart: datestart, 
                dateEnd: dateend, 
                teh,
                geo,
                managerId,
                companyId,
                chatId,
                spec,  
                comment,
                equipment,
                number,
            }

            const project = await Project.create(obj)
            return res.status(200).json(project);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getProjectUpdate(req, res) {
        const {id} = req.params 
        const {name, status, datestart, dateend, teh, geo, managerId, managerId2, companyId, 
            comment, specifika, city, teh1, teh2, teh3, teh4, teh5, teh6, teh7, teh8, deleted} = req.body

        try {
            let exist=await Project.findOne( {where: {id: id}} )
            
            if(!exist){
                res.status(500).json({msg: "project not exist"});
                return;
            }

            const projects = await Project.update(
                {
                    name: name,
                    status: status,
                    specifika,
                    city,
                    dateStart: datestart, 
                    dateEnd: dateend, 
                    teh,
                    teh1,
                    teh2,
                    teh3,
                    teh4,
                    teh5,
                    teh6,
                    teh7,
                    teh8,
                    geo,
                    managerId,
                    managerId2,
                    companyId,
                    comment,
                    //chatId,
                    //spec,  
                    //equipment,
                    // number,
                    deleted,
                },
                {
                    where: {id: id}
                }
            )
            return res.status(200).json(projects);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getProjectDel(req, res) {
        const {id} = req.params
        try {
            const projects = await Project.destroy({
                where: {
                    id: id,
                }
            })
            return res.status(200).json(projects);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = new ProjectController()