require('dotenv').config()
const fs = require('fs');
const https = require('https');

// Создание сервера
const express = require("express");
const socket = require("socket.io");
const cors = require('cors');

const PORT = process.env.PORT
const host_admin = process.env.HOST_ADMIN
const host_admin2 = process.env.HOST_ADMIN2
const host_admin3 = process.env.HOST_ADMIN3
const host_local = process.env.HOST_LOCAL
const host = process.env.HOST

const app = express();
app.use(cors())

// Enable CORS for all routes  localho.st
// app.use(cors({ 
//     origin: 'http://localhost:3000', 
// }));

// Certificate
const privateKey = fs.readFileSync('privkey.pem', 'utf8'); //fs.readFileSync('/etc/letsencrypt/live/proj.uley.team/privkey.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8'); //fs.readFileSync('/etc/letsencrypt/live/proj.uley.team/cert.pem', 'utf8');
const ca = fs.readFileSync('chain.pem', 'utf8'); //fs.readFileSync('/etc/letsencrypt/live/proj.uley.team/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`${host}:${PORT}`);
});

// Socket setup
const io = socket(httpsServer, {
    cors: {
        origin: [host_admin, host_admin2, host_admin3, host, host_local],
        optionsSuccessStatus: 200 // For legacy browser support
    }
});


let users = [];

const addUser = (userId, socketId) => {
    !users.some(user=>user.userId ===userId) &&
        users.push({userId, socketId})
}

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId)=>{
    console.log("getUser: ", users)
    return users.find((user) => user.userId === userId);
};



io.on("connection", (socket) => {

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    })

    //send and get message
    socket.on("sendMessage", ({senderId, receiverId, text, type, convId, messageId, replyId})=>{
        const user = getUser(receiverId)
        io.emit("getMessage", {
            senderId,
            text,
            type,
            convId,
            messageId,
            replyId,
        })
    })

    //send and get message
    socket.on("sendAdmin", ({senderId, receiverId, text, type, buttons, convId, messageId})=>{
        io.emit("getAdmin", {
            senderId,
            receiverId,
            text,
            type,
            buttons,
            convId,
            messageId,
        })
    })

    //send and get message
    socket.on("delAdmin", ({messageId, messageDate, chatId})=>{
        io.emit("getDelAdmin", {
            messageId,
            messageDate,
            chatId,
        })
    })


// Чат тех. поддержки
//------------------------------------------------------------------
    //send and get message in workers
    socket.on("sendMessageSupport", ({senderId, receiverId, text, type, convId, messageId, replyId, isBot})=>{
        const user = getUser(receiverId)
        io.emit("getMessageSupport", {
            senderId,
            text,
            type,
            convId,
            messageId,
            replyId,
            isBot, 
        })
    })

    //send and get message in workers
    socket.on("sendMessagePersonSupport", ({senderId, receiverId, text, type, convId, messageId, replyId, isBot})=>{
        const user = getUser(receiverId)
        io.emit("getMessagePersonSupport", {
            senderId,
            text,
            type,
            convId,
            messageId,
            replyId,
            isBot, 
        })
    })



    //send and get message
    socket.on("sendAdminSupport", ({senderId, receiverId, text, type, buttons, convId, messageId, isBot})=>{
        io.emit("getAdminSupport", {
            senderId,
            receiverId,
            text,
            type,
            buttons,
            convId,
            messageId,
            isBot,
        })
    })

    //send and get message
    socket.on("sendPersonSupport", ({senderId, receiverId, text, type, buttons, convId, messageId, isBot})=>{
        io.emit("getPersonSupport", {
            senderId,
            receiverId,
            text,
            type,
            buttons,
            convId,
            messageId,
            isBot,
        })
    })

    //send and get message
    socket.on("delAdminSupport", ({messageId, messageDate, chatId})=>{
        io.emit("getDelAdminSupport", {
            messageId,
            messageDate,
            chatId,
        })
    })

// Чат клиентов
//------------------------------------------------------------------
    //send and get message in workers
    socket.on("sendMessageCustomer", ({senderId, receiverId, text, type, convId, messageId, replyId, isBot})=>{
        const user = getUser(receiverId)
        io.emit("getMessageCustomer", {
            senderId,
            text,
            type,
            convId,
            messageId,
            replyId,
            isBot, 
        })
    })

    //send and get message
    socket.on("sendAdminCustomer", ({senderId, receiverId, text, type, buttons, convId, messageId, isBot})=>{
        io.emit("getAdminCustomer", {
            senderId,
            receiverId,
            text,
            type,
            buttons,
            convId,
            messageId,
            isBot,
        })
    })

    //send and get message
    socket.on("delAdminCustomer", ({messageId, messageDate, chatId})=>{
        io.emit("getDelAdminCustomer", {
            messageId,
            messageDate,
            chatId,
        })
    })


    // Чат сотрудников
//------------------------------------------------------------------
    //send and get message in workers
    socket.on("sendMessageWorker", ({senderId, receiverId, text, type, convId, messageId, replyId, isBot})=>{
        const user = getUser(receiverId)
        io.emit("getMessageWorker", {
            senderId,
            text,
            type,
            convId,
            messageId,
            replyId,
            isBot, 
        })
    })

    //send and get message
    socket.on("sendAdminWorker", ({senderId, receiverId, text, type, buttons, convId, messageId, isBot})=>{
        io.emit("getAdminWorker", {
            senderId,
            receiverId,
            text,
            type,
            buttons,
            convId,
            messageId,
            isBot,
        })
    })

    //send and get message
    socket.on("delAdminWorker", ({messageId, messageDate, chatId})=>{
        io.emit("getDelAdminWorker", {
            messageId,
            messageDate,
            chatId,
        })
    })



    // Notifications
    //------------------------------------------------------------------
    //send and get message in workers
    socket.on("sendNotif", ({task, tg_id, fio, sity, year_of_birth, rating, projects, specialities, 
        comtags, foto, phone})=>{
        io.emit("getNotif", {
            task,
            tg_id,
            fio,
            sity,
            year_of_birth, 
            rating, 
            projects, 
            specialities, 
            comtags, 
            foto,
            phone,
        })
    }) 


    //when disconnect
    socket.on("disconnect", ()=> {
        removeUser(socket.id);
        io.emit("getUsers", users)
    })

})
