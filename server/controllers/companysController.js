const {Company, CompanyProf} = require('../models/models')
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

class CompanysController {

    async getCompanys(req, res) {
        const {userId} = req.params
        try {
            const company = await Company.findAll({
                order: [
                    ['id', 'DESC'], //DESC, ASC
                ],
                where: {
                    userId: userId
                }
            })
            return res.status(200).json(company);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getCompanyCount(req, res) {
        const kol = req.params.count
        const prev = req.params.prev
        const {userId} = req.params
        try {
            const count = await Company.count({
                where: {
                    userId: userId
                }
            });
            //console.log(count)

            const k = parseInt(kol) + parseInt(prev)

            const managers = await Company.findAll({
                order: [
                    ['id', 'ASC'], //DESC, ASC
                ],
                where: {
                    userId: userId
                },
                offset: count > k ? count - k : 0,
                //limit : 50,
            })
            return res.status(200).json(managers);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }


    async editCompany(req, res) { 
        const {id} = req.params      
        try {    
            let exist=await Company.findOne( {where: {id: id}} )
            
            if(!exist){
                res.status(500).json({msg: "user not exist"});
                return;
            }

            const {
                userId,
                title, 
                city,
                office,
                sklad,
                comment,
                projects,
                managers,
                dogovorDate, 
                dogovorNumber, 
                bugalterFio, 
                bugalterEmail,
                bugalterPhone,  
                inn, //инн компании
                profile,
                sfera,
                comteg,
                reyting,
            } = req.body

            const newUser = await Company.update(
                { 
                    userId,
                    title, 
                    city,
                    office,
                    sklad,
                    comment,
                    projects,
                    managers,
                    dogovorDate, 
                    dogovorNumber, 
                    bugalterFio, 
                    bugalterEmail,
                    bugalterPhone,  
                    inn, //инн компании
                    profile,
                    sfera,
                    comteg,
                    reyting,
                },
                { where: {id: id} })
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getCompanyId(req, res) {
        const {id} = req.params
        try {
            const manager = await Company.findOne({where: {id: String(id)}})
            return res.status(200).json(manager);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async addCompany(req, res) {  
        try {    
            const {title, userId} = req.body

            const newUser = await Company.create({title, userId})
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async deleteCompany(req, res) {      
        const {id} = req.params 
        try {              
            await Company.destroy({
                where: { id: String(id) },
            })
            return res.status(200).json("Данные успешно удалены!");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getCompanyCountAll(req, res) {
        const {userId} = req.params
        try {
            const count = await Company.count({
                // where: {
                //     userId: userId
                // }
            });

            return res.status(200).json(count);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async addCompanyProf(req, res) {  
        try {    
            const {title, userId} = req.body

            const newUser = await CompanyProf.create({title, userId})
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async editCompanyProf(req, res) { 
        const {id} = req.params      
        try {    
            let exist=await CompanyProf.findOne( {where: {id: id}} )
            
            if(!exist){
                res.status(500).json({msg: "user not exist"});
                return;
            }

            const {
                userId,
                title, 
                city,
                office,
                sklad,
                comment,
                projects,
                managers,
                dogovorDate, 
                dogovorNumber, 
                bugalterFio, 
                bugalterEmail,
                bugalterPhone,  
                inn, //инн компании
                profile,
                sfera,
                comteg,
                rekviziti,
            } = req.body

            const newUser = await CompanyProf.update(
                { 
                    userId,
                    title, 
                    city,
                    office,
                    sklad,
                    comment,
                    projects,
                    managers,
                    dogovorDate, 
                    dogovorNumber, 
                    bugalterFio, 
                    bugalterEmail,
                    bugalterPhone,  
                    inn, //инн компании
                    profile,
                    sfera,
                    comteg,
                    rekviziti,
                },
                { where: {id: id} })
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getCompanyProfId(req, res) {
        const {userId} = req.params
        try {
            const company = await CompanyProf.findOne({where: {userId: String(userId)}})
            return res.status(200).json(company);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async getCompanyProf(req, res) {
        try {
            const company = await CompanyProf.findAll({
                order: [
                    ['id', 'DESC'], //DESC, ASC
                ],
            })
            return res.status(200).json(company);
        } catch (err) {
            return res.status(500).json(err);
        }
    }

}

module.exports = new CompanysController()