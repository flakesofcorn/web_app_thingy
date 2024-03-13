import { Row, Col} from "react-bootstrap";
import MessageContainer from "./MessageContainer";

const ChatRoom = ({messages}) => <div>
    <Row className="px-5 py-5">
        <Col sm={10}>
            <MessageContainer messages={messages} />
        </Col>
    </Row>
</div>

export default ChatRoom;