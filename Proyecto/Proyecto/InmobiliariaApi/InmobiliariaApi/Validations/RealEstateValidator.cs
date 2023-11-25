using FluentValidation;
using InmobiliariaApi.Dtos;

namespace InmobiliariaApi.Validations;

public class RealEstateValidator : AbstractValidator<RealEstateDto>
{
    public RealEstateValidator() 
    { 
        RuleFor(r => r.PropertyType)
            .NotEmpty()
            .WithMessage("The Property Type is required.")
            .MaximumLength(50)
            .WithMessage("The maximum length of Property Type is 50 characters.");
    }
}
