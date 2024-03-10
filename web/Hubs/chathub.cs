
using Microsoft.AspNetCore.SignalR;
using web.models;

namespace web.hubs;

public class Chathub : Hub
{

    private readonly SharedDB _shared;
    public Chathub(SharedDB shared) => _shared = shared;

    public async Task Joinchat(UserConnection conn)
    {
        await Clients.All
            .SendAsync(method:"reciviemessage", arg1:"admin", arg2:$"{conn.Username} has joined");


    }

    public async Task JoinSpecificChat(UserConnection conn)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName:conn.Chatroom);

        _shared.connections[Context.ConnectionId] = conn;

        await Clients.Group(conn.Chatroom)
            .SendAsync(method:"JoinSpecificChat", arg1:"admin", $"{conn.Username} has joined {conn.Chatroom}");
    }
    public async Task SendMessage(string msg)
    {
        if (_shared.connections.TryGetValue(Context.ConnectionId, out UserConnection conn))
        {
            await Clients.Group(conn.Chatroom)
                .SendAsync("RecivieSpecificMessage", arg1:conn.Username, arg2:msg);
            
        }
    }
}