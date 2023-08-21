const express = require('express')
const initRout = require('./routes/web')
const configViewEngin = require('./config/ViewEngine')
const sequilize = require('sequelize')

require('dotenv').config();
require('./services/connectionDB')



const app = express()
const port = process.env.PORT || 3000;
const host = process.env.HOST_NAME;

app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true }))


configViewEngin(app)
initRout(app)


app.listen(port,host,()=>{
    console.log(`Example app listening at http://${host}:${port}`)
})