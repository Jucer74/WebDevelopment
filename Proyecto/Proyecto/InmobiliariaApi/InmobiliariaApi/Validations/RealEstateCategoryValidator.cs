using FluentValidation;
using InmobiliariaApi.Dtos;

namespace InmobiliariaApi.Validations;

public class RealEstateCategoryValidator : AbstractValidator<RealEstateCategoryDto>
{
    public RealEstateCategoryValidator()
    {
        RuleFor(r => r.URLImagen)
         .NotEmpty()
         .WithMessage("The image URL is required.")
         .MaximumLength(250)
         .WithMessage("The maximum length of the image URL is 250 characters.");

        RuleFor(r => r.Description)
        .NotEmpty()
        .WithMessage("The Description is required.")
        .MaximumLength(50)
        .WithMessage("The maximum length of Description is 50 characters.");

        RuleFor(r => r.Address)
            .NotEmpty()
            .WithMessage("The Address is required.")
            .MaximumLength(50)
            .WithMessage("The maximum length of Address is 50 characters.");

        RuleFor(r => r.Location)
            .NotEmpty()
            .WithMessage("The Location is required.")
            .MaximumLength(50)
            .WithMessage("The maximum length of Location is 50 characters.");

        RuleFor(r => r.Price)
            .NotEmpty()
            .WithMessage("The Price is required.");

        RuleFor(r => r.Rooms)
            .NotEmpty()
            .WithMessage("The Rooms is required.");

        RuleFor(r => r.Bathrooms)
            .NotEmpty()
            .WithMessage("The Bathrooms is required.");

        RuleFor(r => r.BuiltArea)
            .NotEmpty()
            .WithMessage("The Built Area is required.");

        RuleFor(r => r.Stratum)
            .NotEmpty()
            .WithMessage("The Stratum is required.");

        RuleFor(m => m.RealestateId)
        .NotEmpty()
        .WithMessage("The RealestateId is required.");
    }
}
