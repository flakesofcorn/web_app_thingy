import './App.css';
import { Col, Row, Container } from 'react-bootstrap';
import Chatroom from './components/chatroom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Waitingroom from './components/waitingroom';
import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

function App() {
  const [conn, setConnection] = useState();
  const [messages, setMessages] = useState([]);

  const joinChatroom = async (username, chatroom) => {
    try {
      const conn = new HubConnectionBuilder()
        .withUrl("http://localhost:5173/chat")
        .configureLogging(LogLevel.Information)
        .build();

      conn.on("JoinSpecificChat", (username, msg) => {
        console.log(msg);
        messages.push(JSON.stringify(username, msg));
      });

      conn.on("receiveSpecificMessage", (username, msg) => {
        setMessages(prevMessages => [...prevMessages, { username, msg }]);
        console.log(messages);
      });

      await conn.start();
      await conn.invoke("JoinSpecificChat", { username, chatroom }); 
      setConnection(conn);
    } catch(e) {
      console.error(e);
    }
  }

  return (
    <div>
      <main className="main">
        <Container>
          <Row className="px-5 my-5">
            <Col sm="12">
              <h1>Welcome</h1>
            </Col>
          </Row>
          { ! conn
            ? <Waitingroom joinchatroom={joinChatroom}></Waitingroom>
            : <Chatroom messages={messages}></Chatroom>
          }
        </Container>
      </main>
    </div>
  );
}

export default App;
