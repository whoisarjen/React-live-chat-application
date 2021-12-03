const app = require('express')();
const cors = require('cors')
app.use(cors())
const server = require('http').createServer(app);
const io = require('socket.io')(server);


const roomName = 123
let active = {}
let lastMessages = []

function activeUsers(){
    let activeUsers = []
    for(let i=0; i<Object.keys(active).length; i++){
        activeUsers.push(active[Object.keys(active)[i]])
    }
    io.in(roomName).emit("activeUsers", activeUsers)
}

io.on('connection', async (socket) => {
    console.log("connected")
    socket.join(roomName);
    active[socket.id] = socket.handshake.query.login
    socket.on("message", (object) => {
        let newMessage = object
        newMessage.id = new Date().getTime()
        lastMessages.push(newMessage)
        io.in(roomName).emit("newMessage", lastMessages)
        activeUsers()
    });

    socket.on("disconnect", () => {
        console.log("disconnected")
        if(active[socket.id]) delete active[socket.id]
        activeUsers()
    })
    
    io.in(roomName).emit("newMessage", lastMessages)
    activeUsers()
});
server.listen(4000);