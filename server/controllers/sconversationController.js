const {Conversation} = require("../models/support");
const { Op } = require('sequelize')
const ApiError = require('../error/ApiError')

class SconversationController {

    //создать беседу
    async newConversationSupport(req, res) {        
        try {
            const {senderId, receiverId} = req.body

            let conversation

            //найти беседу
            conversation = await Conversation.findOne({
                where: { 
                    members: {
                        [Op.contains]: [senderId]
                    } 
                },
            }) 
            if (conversation) {
                return res.status(200).json(conversation);
            }

            conversation = await Conversation.create({
                members: [senderId, receiverId]
            }) 
            return res.status(200).json(conversation)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    
    async getConversationSupport(req, res) {  
        try {
            const chatId = req.params.id
    
            const conversation = await Conversation.findOne({
                where: {
                    members: {
                        [Op.contains]: [chatId]
                    }
                },
            })
            return res.status(200).json(conversation);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    async getConversationsSupport(req, res) {  
        try {   
            const conversations = await Conversation.findAll({
                order: [
                    ['id', 'DESC'],
                ],
            })
            return res.status(200).json(conversations);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = new SconversationController()