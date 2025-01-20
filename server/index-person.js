require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const {Plan, Distributionw} = require('./models/models')
const { Op } = require('sequelize')
const cors = require('cors')
const fs = require('fs');
const https = require('https')
const Route = require('./routes/route')
const errorHandler = require('./middleware/ErrorHandling')
const path = require('path')
const bodyParser = require("body-parser");

//планировщик
const cron = require('node-cron');

//fetch api
const fetch = require('node-fetch');
const axios = require("axios");

//socket.io
const {io} = require("socket.io-client")
const socketUrl = process.env.SOCKET_APP_URL


let tasks = []

// Port that the webserver listens to
const port = process.env.PORT || 2000;

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const app = express();

const corsOptions = {
    origin: ['https://uley.company:2001', 'http://localhost:3000', 'https://uley.company'],//(https://your-client-app.com)
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions))
app.use(express.json())
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.resolve(__dirname, 'images')))
app.use(express.static(path.resolve(__dirname, 'uploads')))
app.use(express.static(path.resolve(__dirname, 'avatars')))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/avatars', express.static(path.join(__dirname, 'avatars')))

app.use('/api', Route);

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

// Обработка ошибок, последний middleware
app.use(errorHandler)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        
        httpsServer.listen(port, async() => {
            console.log('HTTPS Server Admin-panel running on port ' + port);

            // Создание задания cron, которое запускается в нужное время
            // cron.schedule("0 3 * * *", async function() { 
            //     //Запущена задача на каждый день в 03:00
            //     console.log("Запуск обновления данных..."); 
            //     try {
            //         //обновление данных специалистов
            //         await fetch(`${hostAdmin}api/workers/update/get`)
            //     } catch (error) {
            //        console.log(error.message) 
            //     }      
            // });  
               
        }); 

    } catch (error) {
        console.log('Подключение к БД сломалось!', error)
    }
}

start()