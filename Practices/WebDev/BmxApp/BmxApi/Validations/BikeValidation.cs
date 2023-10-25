using FluentValidation;
using BmxApi.Dtos;

namespace BmxApi.Validations;

public class BikeValidator : AbstractValidator<BikeDto>
{
    public BikeValidator()
    {
        RuleFor(bike => bike.Name).NotEmpty().WithMessage("Name cannot be empty.");
        RuleFor(bike => bike.Brand).NotEmpty().WithMessage("Brand cannot be empty.");
        RuleFor(bike => bike.Model).NotEmpty().WithMessage("Model cannot be empty.");
        RuleFor(bike => bike.Color).NotEmpty().WithMessage("Color cannot be empty.");
        RuleFor(bike => bike.Frame).NotEmpty().WithMessage("Frame cannot be empty.");
        RuleFor(bike => bike.Fork).NotEmpty().WithMessage("Fork cannot be empty.");
        RuleFor(bike => bike.Bars).NotEmpty().WithMessage("Bars cannot be empty.");
        RuleFor(bike => bike.Stem).NotEmpty().WithMessage("Stem cannot be empty.");
        RuleFor(bike => bike.Grips).NotEmpty().WithMessage("Grips cannot be empty.");
        RuleFor(bike => bike.Seat).NotEmpty().WithMessage("Seat cannot be empty.");
        RuleFor(bike => bike.SeatPost).NotEmpty().WithMessage("SeatPost cannot be empty.");
        RuleFor(bike => bike.Cranks).NotEmpty().WithMessage("Cranks cannot be empty.");
        RuleFor(bike => bike.Pedals).NotEmpty().WithMessage("Pedals cannot be empty.");
        RuleFor(bike => bike.Sprocket).NotEmpty().WithMessage("Sprocket cannot be empty.");
        RuleFor(bike => bike.FrontWheel).NotEmpty().WithMessage("FrontWheel cannot be empty.");
        RuleFor(bike => bike.RearWheel).NotEmpty().WithMessage("RearWheel cannot be empty.");
        RuleFor(bike => bike.FrontTire).NotEmpty().WithMessage("FrontTire cannot be empty.");
        RuleFor(bike => bike.RearTire).NotEmpty().WithMessage("RearTire cannot be empty.");
        RuleFor(bike => bike.FrontHub).NotEmpty().WithMessage("FrontHub cannot be empty.");
        RuleFor(bike => bike.RearHub).NotEmpty().WithMessage("RearHub cannot be empty.");
        RuleFor(bike => bike.Chain).NotEmpty().WithMessage("Chain cannot be empty.");
        RuleFor(bike => bike.Pegs).NotEmpty().WithMessage("Pegs cannot be empty.");
    }
}