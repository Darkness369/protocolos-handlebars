const express = require('express')
const https = require('https')
const path = require('path')
const fs = require('fs')
const hbs = require('hbs'); 
const app = express()

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public')); // Carpeta de dominio publico cualquiera puede ver.
hbs.registerPartials(__dirname + '/views');


app.use('/', (req, res, next) => {
  // res.send('Hello from SSL server')
    res.render('home', { // Lo agrega
        nombre: 'Chris',
        
    }); 
})

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
  },
  app
)

sslServer.listen(3443, () => console.log('Secure server 🚀🔑 on port 3443'))
