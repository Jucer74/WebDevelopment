using System;
using System.Collections.Generic;

namespace WebDevApi.Models;

public partial class User
{
    public int Id { get; set; }

    public string Email { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Username { get; set; } = null!;
}
