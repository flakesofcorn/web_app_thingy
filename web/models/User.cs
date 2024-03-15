namespace web.models;


// createing the model for the user
public class User
{
    public int ID {get; set;}
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public bool Admin { get; set; } = false;   
}

