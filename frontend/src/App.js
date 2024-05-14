import './App.css';
import RegisterForm from './components/register';
import { Col, Row, Container } from 'react-bootstrap';
import Chatroom from './components/chatroom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Waitingroom from './components/waitingroom';
import { useEffect, useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import axios from 'axios';
import LoginForm from './components/loginPage';

function App() {
  const [logged, setlogged] = useState();
  const [reg, setreg] = useState();
  async function checklogged() {
    if (!localStorage.getItem("token")) {
      setlogged(false);
    } else {
      const token = localStorage.getItem('token');

      axios.post('http://localhost:5000/validate-token', token, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          // If the response indicates a successful validation, set isLoggedIn to true
          if (response.data.message === 'Token is valid') {
            setlogged(true);
          }
        })
        .catch(error => {
          // Handle errors, such as failed validation or network issues
          console.error('Error:', error);
        })
        .finally(() => {
          // You can use the isLoggedIn variable here after the request is complete
          console.log('Is logged in:', logged);
        });

    }
  }
  useEffect(() => {
    checklogged();
  }, []); // Empty dependency array to only run this effect once on component mount

  function redirect() {
    if (reg) {
      setreg(false)
    } else { setreg(true) }
  }

  const [conn, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  let x = false;

  const joinChatroom = async (username, chatroom) => {
    try {
      const conn = new HubConnectionBuilder()
        .withUrl("http://localhost:5173/chat")
        .configureLogging(LogLevel.Information)
        .build();

      conn.on("JoinSpecificChat", (username, msg) => {
        console.log("asd", msg);

        setMessages(prevMessages => [...prevMessages, { username, msg }]);
        console.log(messages);
      });

      conn.on("receiveSpecificMessage", (username, msg) => {
        setMessages(prevMessages => [...prevMessages, { username, msg }]);
        console.log(messages);
      });


      await conn.start();
      await conn.invoke("JoinSpecificChat", { username, chatroom });
      setConnection(conn);
    } catch (e) {
      console.error(e);
    }
  }

  const sendMessage = async (messages) => {
    try {
      await conn.invoke("sendmessage", messages);
    } catch (e) {
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

          {!logged
            ? !reg ? <RegisterForm redirect={redirect}></RegisterForm>
              : <LoginForm redirect={redirect} changelogged={checklogged} ></LoginForm>

            : !conn
              ? <Waitingroom joinchatroom={joinChatroom}></Waitingroom>
              : <Chatroom messages={messages} sendMessage={sendMessage}></Chatroom>
          }
        </Container>
      </main>
    </div>
  );
}

export default App;
