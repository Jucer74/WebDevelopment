using System.ComponentModel.DataAnnotations;

namespace FrontendBmxAspMVC.Models;

public class Bike
{
    [Key] public int Id { get; set; }

    [Required] public string? Name { get; set; }

    [Required] public string? Brand { get; set; }

    [Required] public string? Model { get; set; }

    [Required] public string? Color { get; set; }

    [Required] public string? Frame { get; set; }

    [Required] public string? Fork { get; set; }

    [Required] public string? Bars { get; set; }

    [Required] public string? Stem { get; set; }

    [Required] public string? Grips { get; set; }

    [Required] public string? Seat { get; set; }

    [Required] public string? SeatPost { get; set; }

    [Required] public string? Cranks { get; set; }

    [Required] public string? Pedals { get; set; }

    [Required] public string? Sprocket { get; set; }

    [Required] public string? FrontWheel { get; set; }

    [Required] public string? RearWheel { get; set; }

    [Required] public string? FrontTire { get; set; }

    [Required] public string? RearTire { get; set; }

    [Required] public string? FrontHub { get; set; }

    [Required] public string? RearHub { get; set; }

    [Required] public string? Chain { get; set; }

    [Required] public string? Pegs { get; set; }
}