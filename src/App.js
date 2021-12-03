import './styles/App.css';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import io from 'socket.io-client';

function App() {
  const [socket, setSocket] = useState(null)
  const user = window.localStorage.getItem('token')
  const navigate = useNavigate()
  const [activeUsers,setActiveUsers] = useState([])
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const socket = io('http://localhost:4000', {
      transports: ['websocket'],
      query: "login=" + window.localStorage.getItem('token')
    });
    setSocket(socket)

    socket.on("newMessage", (lastMessages) => {
      setMessages(lastMessages)
    })
    socket.on("activeUsers", (activeUsers) => setActiveUsers(activeUsers))
  }, []);
  
  const sendMessage = (e) => {
    e.preventDefault()
    if(message.length > 0){
      if(!user) navigate('/')
      else{
        const newMessage = {
          user: user,
          message: message
        }
        socket.emit('message', newMessage)
        setMessage('')
      }
    }
  }

  return (
    <div className="app">
      <div className="sidebar">
        <h1>Active users</h1>
        {
          activeUsers.map(x => (
            <p>{x}</p>
          ))
        }
      </div>
      <div className="chat">
        <div id="chatMessagesBox">
          {
            messages.map(message => (
              <div className="chatMessage" key={message.id}>
                <img src="/img/logo192.png" alt="Logo" className="chatMessageIcon"/>
                <div className="chatMessageContent">
                  <div className="chatMessageName">{message.user}</div>
                  <div className="chatMessageText">{message.message}</div>
                </div>
              </div>
            ))
          }
        </div>
        <form className="chatSender">
          <input required type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
          <button onClick={sendMessage}>Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
