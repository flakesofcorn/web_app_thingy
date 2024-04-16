using web.hubs;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.SignalR;
using web.models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
/* 
a bunch of complicated stuff here.
builds the backend app and createa cors to localhost:3000(frontend)
*/


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options => 
{
    options.AddPolicy("reactapp", builder => 
    {
        builder.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddSingleton<SharedDB>();




// Add services to the container.
builder.Services.AddSignalR();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
// routes hub requests to "/chat" to the chathub 

app.MapHub<Chathub>(pattern:"/chat");

app.UseCors("reactapp");

app.Run();