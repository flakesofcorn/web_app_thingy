using Microsoft.AspNetCore.SignalR;
using models;

namespace hubs;

public class Chathub : Hub
{
    public async Task joinchat(UserConnection conn)
    {
        await Clients.All
            .SendAsync(method:"reciviemessage", arg1:"admin", arg2:$"{conn.username} has joined");


    }

    public async Task JoinSpecificChat(UserConnection conn)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName:conn.chatroom);
        await Clients.Group(conn.chatroom)
            .SendAsync(method:"RecivieMessage", arg1:"admin", arg2:$"{conn.username} has joined {conn.chatroom}");
    }
}