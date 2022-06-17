const express = require('express')
const mongoose = require('mongoose')
const Msg = require('./models/messages')
const app = express()
const server = require('http').createServer(app)
const port = process.env.PORT || 3000
const io = require('socket.io')(server)
const path = require('path')

mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true })
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("connection failed"))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.use(express.static(__dirname + '/public'))

io.on('connection', socket => {
    // console.log('User Connected')

    socket.on('chat', msg => {
        // console.log('From client: ', message)
        const message = new Msg({msg})
        message.save().then(() => {
            io.emit('chat', msg)
        })
        
      })
})

server.listen(port, () => {
    console.log(`Server is Up and running ${port}`)
})