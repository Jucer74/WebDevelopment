﻿using System.ComponentModel.DataAnnotations;

namespace WebDev.Api.Model
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Email { get; set; } = null!;

        [Required]
        public string Name { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;

        [Required]
        public string Username { get; set; } = null!;

    }
}