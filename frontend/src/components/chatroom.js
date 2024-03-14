import { Row, Col} from "react-bootstrap";
import MessageContainer from "./MessageContainer";
import SendMsgForm from "./sendMsgForm";

const ChatRoom = ({messages, sendMessage}) => <div>
    <Row className="px-5 py-5">
        <Col sm={10}>
            <MessageContainer messages={messages} />
        </Col>
        <Col sm={10}>
            <SendMsgForm sendMessage={sendMessage} />
        </Col>
    </Row>
</div>

export default ChatRoom;