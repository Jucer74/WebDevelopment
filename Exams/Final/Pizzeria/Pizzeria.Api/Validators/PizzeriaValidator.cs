using FluentValidation;
using Pizzeria.Api.Dtos;

namespace Pizzeria.Api.Validators;

public class PizzeriaValidator : AbstractValidator<PizzeriaDto>
{
    public PizzeriaValidator()
    {
        RuleFor(m => m.Id)
            .NotEmpty()
            .WithMessage("El Tamaño es requerido.");

        RuleFor(m => m.Nombre)
            .NotEmpty()
            .WithMessage("El Nombre es requerido.")
            .MaximumLength(50)
            .WithMessage("Nombre no puede superar los 50 caracteres.");

        RuleFor(m => m.Tamaño)
            .NotEmpty()
            .WithMessage("El Tamaño es requerido.");

        RuleFor(m => m.Precio)
            .NotEmpty()
            .WithMessage("El Precio es requerido.");

    }
}
