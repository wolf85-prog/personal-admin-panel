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
            
            if (currentMonth === 4) {
                //апрель
                urlAvatar = 'https://proj.uley.team/upload/2024-04-23T08:08:31.547Z.jpg'
            } 
            else if (currentMonth === 5) {
                //май
                urlAvatar = 'https://proj.uley.team/upload/2024-05-02T06:01:44.244Z.jpg'
            } 
            else if (currentMonth === 6) {
                //июнь
                urlAvatar = 'https://proj.uley.team/upload/2024-06-06T07:51:23.345Z.jpg'
            }
            else if (currentMonth === 7) {
                //июль
                urlAvatar = 'https://proj.uley.team/upload/2024-06-06T07:52:17.472Z.jpg'
            }
            else if (currentMonth === 8) {
                //август
                urlAvatar = 'https://proj.uley.team/upload/2024-06-06T07:53:06.699Z.jpg'
            }
            else if (currentMonth === 9) {
                //сентябрь
                urlAvatar = 'https://proj.uley.team/upload/2024-06-06T07:54:00.494Z.jpg'
            }
            else if (currentMonth === 10) {
                //октябрь
                urlAvatar = 'https://proj.uley.team/upload/2024-06-06T07:54:13.965Z.jpg'
            }
            else if (currentMonth === 11) {
                //ноябрь
                urlAvatar = 'https://proj.uley.team/upload/2024-06-06T07:54:28.857Z.jpg'
            }
            else if (currentMonth === 12) {
                //декабрь
                urlAvatar = 'https://proj.uley.team/upload/2024-06-06T07:54:44.499Z.jpg'
            } 

            const newUser = await Client.create({userId, fio, profile: urlAvatar})
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
        const {userId} = req.params
        try {
            const count = await Client.count({
                where: {
                    userId: userId
                }
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