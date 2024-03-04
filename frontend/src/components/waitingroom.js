import { useState } from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';

const Waitingroom = ({ joinchatroom }) => {
    const [username, setUsername] = useState('');
    const [chatroom, setChatroom] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        joinchatroom(username, chatroom);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="px-5 py-5">
                <Col sm={12}>
                    <Form.Group>
                        <Form.Control 
                            type='text' 
                            placeholder='Username' 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                        <Form.Control 
                            type='text' 
                            placeholder='Chatroom' 
                            onChange={(e) => setChatroom(e.target.value)} 
                        />
                    </Form.Group>
                </Col>
                <Col sm={12}>
                    <hr />
                    <Button variant='success' type='submit'>join</Button>
                </Col>
            </Row>
        </Form>
    );
};

export default Waitingroom;
