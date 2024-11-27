import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router'
const  app = express();

 app.use(cors({
    credentials:true
 }))

 app.use(bodyParser.json());
 app.use(cookieParser());
 app.use(compression())

 const server = http.createServer(app);

server.listen(8080,() =>{
    console.log('Server is running on port 8080')
});

// const MONGO_URI = process.env.MONGO_URI

// mongoose.Promise = Promise;
// mongoose.connect(MONGO_URI);

// mongoose.connection.on('error',(err:Error)=>console.log(err))

app.route('/').get((req,res)=>{
    res.send('Hello World')
})

app.use('/',router());