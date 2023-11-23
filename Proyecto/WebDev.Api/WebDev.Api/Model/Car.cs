﻿namespace WebDev.Api.Model
{

    using System.ComponentModel.DataAnnotations;
    public class Car
    {
        [Key] public int Id { get; set; }

        [Required] public string? Name { get; set; }

        [Required] public string? Brand { get; set; }

        [Required] public string? Model { get; set; }

        [Required] public string? Color { get; set; }

    }
}