const MessageContainer = ({ messages }) => {
    if (!messages || messages.length === 0) {
        return (
            <div>
                <table className="table table-striped table-bordered">
                    <tbody>
                        <tr>
                            <td>No messages</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div>
            <table className="table table-striped table-bordered">
                <tbody>
                    {messages.map((msg, index) => (
                        <tr key={index}>
                            <td>{msg.msg} - {msg.username}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MessageContainer;
