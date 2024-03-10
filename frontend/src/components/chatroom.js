import { Row, Col} from "react-bootstrap";

const ChatRoom = ({messages}) => <div>
    <Row className="px-5 py-5">
        <Col sm={10}>
            <messagecontainer messages={messages} />
        </Col>
    </Row>
</div>

export default ChatRoom;