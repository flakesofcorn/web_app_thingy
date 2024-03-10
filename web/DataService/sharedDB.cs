using System.Collections.Concurrent;
using web.models;

namespace web.models;

public class SharedDB 
{
    private readonly ConcurrentDictionary<string, UserConnection> _connections;

    public ConcurrentDictionary<string, UserConnection> connections => _connections;
}