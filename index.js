const express = require('express')
const app = express()
const server = require('http').createServer(app)
const port = process.env.PORT || 3000
const io = require('socket.io')(server)
const path = require('path')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.use(express.static(__dirname + '/public'))

io.on('connection', socket => {
    // console.log('User Connected')

    socket.on('chat', message => {
        // console.log('From client: ', message)
        io.emit('chat', message)
      })
})

server.listen(port, () => {
    console.log(`Server is Up and running ${port}`)
})