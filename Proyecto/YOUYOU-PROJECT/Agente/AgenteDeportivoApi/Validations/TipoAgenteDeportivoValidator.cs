using FluentValidation;
using AgenteDeportivoApi.Dtos;

namespace AgenteDeportivoApi.Validations
{
    public class TipoAgenteDeportivoValidator : AbstractValidator<TipoAgenteDeportivoDto>
    {
        public TipoAgenteDeportivoValidator()
        {

            RuleFor(r => r.first_name)
                .NotEmpty()
                .WithMessage("First name is required.")
                .MaximumLength(50)
                .WithMessage("The maximum length for first name is 50 characters.");

            RuleFor(r => r.last_name)
                .NotEmpty()
                .WithMessage("Last name is required.")
                .MaximumLength(50)
                .WithMessage("The maximum length for last name is 50 characters.");

            RuleFor(r => r.email)
                .NotEmpty()
                .WithMessage("Email is required.")
                .MaximumLength(50)
                .WithMessage("The maximum length for email is 50 characters.");

            RuleFor(r => r.gender)
                .NotEmpty()
                .WithMessage("Gender is required.");

            RuleFor(r => r.Phone)
                .NotEmpty()
                .WithMessage("Phone number is required.");

            RuleFor(r => r.Agent)
                .NotEmpty()
                .WithMessage("Agent name is required.");

            RuleFor(r => r.Country)
                .NotEmpty()
                .WithMessage("Country is required.");

            RuleFor(m => m.Agente_Deportivo_Id)
                .NotEmpty()
                .WithMessage("The maximum length for sport agent ID is 250 characters.");
        }
    }
}