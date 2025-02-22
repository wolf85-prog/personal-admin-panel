require('dotenv').config()
const express = require('express')
const path = require('path')
const https = require('https');
const fs = require('fs');
const cors = require('cors')

const PORT = process.env.REACT_APP_PORT || 2001

const corsOptions = {
    origin: ['https://uley.company:2001/', 'http://localhost:3000/'],//(https://your-client-app.com)
    optionsSuccessStatus: 200,
};

const app = express()
app.use(cors(corsOptions))
app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'build')))
app.use((req, res, next) => {
    if (req.protocol === 'http') {
        return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }

    next();
});

// Certificate
const privateKey = fs.readFileSync('privkey.pem', 'utf8'); //fs.readFileSync('/etc/letsencrypt/live/proj.uley.team/privkey.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8'); //fs.readFileSync('/etc/letsencrypt/live/proj.uley.team/cert.pem', 'utf8');
const ca = fs.readFileSync('chain.pem', 'utf8'); //fs.readFileSync('/etc/letsencrypt/live/proj.uley.team/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

app.get('*', (req, res) => {
    //res.sendFile(path.join(__dirname, 'build', 'index.html'))
    res.sendFile(path.join(__dirname, 'build', 'index.html'), function(err) {
        if (err) {
          res.status(500).send(err)
        }
    })
})

const httpsServer = https.createServer(credentials, app);

const start = async () => {
    try {       
        httpsServer.listen(PORT, () => {
            console.log('HTTPS Server AdminClient running on port ' + PORT);
        });

    } catch (error) {
        console.log(error)
    }
}

start()

