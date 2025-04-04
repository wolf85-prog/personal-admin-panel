const {Client} = require('../models/models')
const ApiError = require('../error/ApiError')
const { Op } = require('sequelize')

require("dotenv").config();

const host = process.env.HOST

const https = require('https');
const fs = require('fs');
const path = require('path')
const sharp = require('sharp');

//socket.io
const {io} = require("socket.io-client");
const socketUrl = process.env.SOCKET_APP_URL

class ClientController {

    async getClientByFilter(req, res) {
        const { id, rezerv} = req.body;        
        
        try {

            if (id) {
                const workers = await MainSpec.findOne({
                    order: [["id", "DESC"]],
                    where: {
                        id: id,
                    },
                  });
                  return res.status(200).json(workers);

            }
            if (rezerv) {
                
                const workers = await MainSpec.findAll({
                    order: [["id", "DESC"]],
                    where: {
                        projectId: rezerv,
                    },
                  });
                  return res.status(200).json(workers);

            }
    
          
        } catch (error) {
          return res.status(500).json(error.message);
        }
      }

    async getClientAll(req, res) {
        try {
            const workers = await Client.findAll({
                order: [
                    ['id', 'DESC'], //DESC, ASC
                ],
            })
            return res.status(200).json(workers);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getClient(req, res) {
        const {userId} = req.params
        try {
            const workers = await Client.findAll({
                order: [
                    ['id', 'DESC'], //DESC, ASC
                ],
                where: {
                    // chatId: {
                    //     [Op.ne]: null
                    // },
                    userId: userId
                }
            })
            return res.status(200).json(workers);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getClientCount(req, res) {
        const kol = req.params.count
        const prev = req.params.prev
        const {userId} = req.params
        try {
            const count = await Client.count({
                where: {
                    userId: userId
                }
            });
            //console.log(count)

            const k = parseInt(kol) + parseInt(prev)

            const workers = await Client.findAll({
                order: [
                    ['id', 'ASC'], //DESC, ASC
                ],
                where: {
                    userId: userId
                },
                offset: count > k ? count - k : 0,
                //limit : 50,
            })
            return res.status(200).json(workers);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async editClient(req, res) { 
        const {id} = req.params      
        try {    
            let exist=await Client.findOne( {where: {id: id}} )
            
            if(!exist){
                res.status(500).json({msg: "user not exist"});
                return;
            }

            const {
                userId,
                fio, 
                chatId,
                phone,
                city, 
                age, 
                company,
                comteg,
                comment,
                profile,
                reyting,
                email,
                blockW,
                block18,
                krest,
                sfera,
                dolgnost,
            } = req.body

            const newUser = await Client.update(
                { 
                    userId,
                    fio, 
                    chatId,
                    phone, 
                    city,
                    company,
                    comteg,
                    comment,
                    age,
                    reyting,
                    profile,
                    email,
                    blockW,
                    block18,
                    krest,
                    sfera,
                    dolgnost,
                },
                { where: {id: id} })
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getClientId(req, res) {
        const {id} = req.params
        try {
            const worker = await Client.findOne({where: {id: id.toString()}})
            return res.status(200).json(worker);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async getClientChatId(req, res) {
        const {id} = req.params
        try {
            const workers = await Client.findOne({where: {chatId: id.toString()}})
            return res.status(200).json(workers);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async addClient(req, res) {       
        try {      
            const {fio, userId} = req.body
            
            const currentMonth = new Date().getMonth() + 1
            let urlAvatar = ''        

            urlAvatar = 'https://uley.company:2000/uploads/2025-04-04T13:01:59.490Z.png'   

            const newUser = await Client.create({userId, fio, profile: urlAvatar, reyting: '3'})
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async deleteClient(req, res) {      
        const {id} = req.params 
        try {              
            await Client.destroy({
                where: { id: String(id) },
            })
            return res.status(200).json("Данные успешно удалены!");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getClientCountAll(req, res) {
        //const {userId} = req.params
        try {
            const count = await Client.count({
                // where: {
                //     userId: userId
                // }
            });

            return res.status(200).json(count);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getClientPhone(req, res) {
        const {id} = req.params
        try {
            const worker = await Client.findOne({where: {
                [Op.or]: [{phone: id.toString()}]
            }})
            return res.status(200).json(worker);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async getClientByPhone(req, res) {
        const {phone, phone2, phone3} = req.body
        try {
            const worker = await Client.findOne({where: {
                [Op.or]: [{phone: phone.toString()}, {phone: phone2.toString()}, {phone: phone3.toString()}]
            }})
            return res.status(200).json(worker);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async blockClient(req, res) { 
        const {id} = req.params      
        try {    
            let exist=await Client.findOne( {where: {chatId: id}} )
            
            if(!exist){
                res.status(500).json({msg: "user not exist"});
                return;
            }

            const newUser = await Client.update(
                { blockW: exist.dataValues.blockW !==null ? !exist.dataValues.blockW : true},
                { where: {chatId: id} })
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

module.exports = new ClientController()