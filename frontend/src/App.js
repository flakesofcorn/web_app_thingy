import './App.css';
import { Col, Row, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Waitingroom from './components/waitingroom';
import { useState } from 'react';
import {HubConnectionBuilder, LogLevel} from '@microsoft/signalr';

function App() {

  const[conn, setConnection] = useState();

  const joinchatroom = async (username, chatroom) => {
    try {
      const conn = HubConnectionBuilder()
                  .withurl("http://localhost:5173/chat")
                  .configurelogging(LogLevel.Information)
                  .build();
      conn.on("JoinSpecificChat", (username, msg) => {
        console.log(msg);
      });

      await conn.start();
      await conn.invoke("JoinSpecificChat", {username, chatroom});
 
      setConnection(conn);

    } catch(e) {
      console.log(e);
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
          <Waitingroom joinchatroom={joinchatroom}></Waitingroom>
        </Container>

      </main>

    </div>
  );
}

export default App;
