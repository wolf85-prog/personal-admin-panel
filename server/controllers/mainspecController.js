const {MainSpec} = require('../models/models')
const ApiError = require('../error/ApiError')
const { Op } = require('sequelize')

require("dotenv").config();

//const {specData} = require('../data/specData');
const host = process.env.HOST

const https = require('https');
const fs = require('fs');
const path = require('path')
const sharp = require('sharp');

//socket.io
const {io} = require("socket.io-client");
const socketUrl = process.env.SOCKET_APP_URL

class MainspecController {
    async getMainSpecByFilter(req, res) {
        const { dateFilter, mainSpecDateNotEmpty, projectId, workersFilter} = req.body;
        
        try {
            if (workersFilter === "true") {
                console.log(dateFilter)
                const workers = await MainSpec.findAll({
                    order: [["id", "DESC"]],
                    where: {
                        updatedAt: {
                            [Op.gte]: Date.parse(dateFilter),
                          },
                       
                        specId: {
                            [Op.and]: {
                                [Op.not]: null,
                                [Op.ne]: ''
                              }
                        }
                    },
                  });
                  return res.status(200).json(workers);

            }

            if (dateFilter) {
                const workers = await MainSpec.findAll({
                    order: [["id", "DESC"]],
                    where: {
                        updatedAt: {
                            [Op.gte]: Date.parse(dateFilter),
                          },
                    },
                  });
                  return res.status(200).json(workers);

            }
            if (mainSpecDateNotEmpty === "yes") {
                
                const workers = await MainSpec.findAll({
                    order: [["id", "DESC"]],
                    where: {
                        projectId: projectId,
                        date: {
                            [Op.ne]: null
                        }
                    },
                  });
                  return res.status(200).json(workers);

            }
            
    
          
        } catch (error) {
          return res.status(500).json(error.message);
        }
      }

    async getMainSpecProjectDate(req, res) {
        const {id, date} = req.body  
        try {
            const workers = await MainSpec.findAll({
                order: [
                    ['number', 'ASC'], //DESC, ASC
                ],
                where: {
                    date: {
                        [Op.eq]: date
                    },
                    projectId: id
                }
            })
            return res.status(200).json(workers);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getMainSpecProject(req, res) {
        const {id} = req.params  
        try {
            const workers = await MainSpec.findAll({
                order: [
                    ['number', 'ASC'], //DESC, ASC
                ],
                where: {
                    projectId: id
                }
            })
            return res.status(200).json(workers);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }


    async editMainspec(req, res) { 
        const {id} = req.params      
        try {    
            let exist=await MainSpec.findOne( {where: {id: id}} )
            
            if(!exist){
                res.status(500).json({msg: "user not exist"});
                return;
            }

            const {
                date, 
                vidWork,
                specId,
                specialization,
                stavka,
                comteg,
                comment,
                projectId, 
                hr,
                number,
                count,
                merch,
                taxi,
            } = req.body

            const newUser = await MainSpec.update(
                { 
                    date,
                    vidWork, 
                    specId,
                    specialization,
                    stavka,
                    comteg,
                    comment,
                    projectId, 
                    hr,
                    number,
                    count,
                    merch,
                    taxi,
                },
                { where: {id: id} })
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getMainSpecId(req, res) {
        const {id} = req.params
        try {
            const worker = await MainSpec.findOne({where: {id: id.toString()}})
            return res.status(200).json(worker);
        } catch (err) {
            return res.status(500).json(err);
        }
    }


    async addMainspec(req, res) {       
        try {    
            const {
                userId,
                projectId, 
                hr, 
                number, 
                date,
                specId,
                vidWork,
                specialization,
                stavka,
                taxi,
                merch,
                comment,
                comteg,
                count,
            } = req.body

            const newUser = await MainSpec.create({
                userId,
                projectId, 
                hr, 
                number,
                date,
                specId,
                vidWork,
                specialization,
                stavka,
                taxi,
                merch,
                comment,
                comteg,
                count,
            })
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async deleteMainspec(req, res) {      
        const {id} = req.params 
        try {              
            await MainSpec.destroy({
                where: { id: String(id) },
            })
            return res.status(200).json("Данные успешно удалены!");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async deleteMainspecProject(req, res) {      
        const {id} = req.params 
        try {              
            await MainSpec.destroy({
                where: { projectId: String(id) },
            })
            return res.status(200).json("Данные успешно удалены!");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getMainspecCountAll(req, res) {
        const {userId} = req.params 
        try {
            const count = await MainSpec.count({
                where: {
                    userId
                },
            });

            return res.status(200).json(count);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

module.exports = new MainspecController()