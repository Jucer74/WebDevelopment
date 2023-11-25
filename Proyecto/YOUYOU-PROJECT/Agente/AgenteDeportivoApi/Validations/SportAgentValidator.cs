using FluentValidation;
using AgenteDeportivoApi.Dtos;

namespace AgenteDeportivoApi.Validations;

public class SportAgentValidator : AbstractValidator<SportAgentDto>
{
    public SportAgentValidator()
    {
        
            RuleFor(r => r.Deporte)
                .NotEmpty()
                .WithMessage("The Property Type is required.")
                .MaximumLength(50)
                .WithMessage("The maximum length of Property Type is 50 characters.");
        
    }
}