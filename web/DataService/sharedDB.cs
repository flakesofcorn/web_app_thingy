using System.Collections.Concurrent;
using web.models;

namespace web.models;

public class SharedDB 
{
    // creates a simple local databse for messages in a local chatroom /gets deleted whenn all users leave chatroom
    private readonly ConcurrentDictionary<string, UserConnection> _connections = new ConcurrentDictionary<string, UserConnection>();

    public ConcurrentDictionary<string, UserConnection> connections => _connections;
}