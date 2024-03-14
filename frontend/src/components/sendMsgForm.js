import { sendMessage } from "@microsoft/signalr/dist/esm/Utils";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";


const SendMsgForm  = ({ sendMessage }) => {
    const[Msg, setMsg] = useState('');

    return <Form onSubmit={e => {
        e.preventDefault();
        sendMessage(Msg);
        setMsg('');

    }}>
        <InputGroup className="mb-3">
            {/* <InputGroup.Text>chat</InputGroup.Text>  */}
            <Form.Control onChange={e => setMsg(e.target.value)} value={Msg} placeholder="Type your message"></Form.Control>
            <Button variant="Primary" type="submit" disabled={!Msg}>send</Button>
        </InputGroup>
    </Form>

}

export default SendMsgForm;