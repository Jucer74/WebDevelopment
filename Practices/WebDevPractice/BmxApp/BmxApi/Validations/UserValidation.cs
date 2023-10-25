using BmxApi.Dtos;
using FluentValidation;

namespace BmxApi.Validations;

public class UserValidator : AbstractValidator<UserDto>
{
    public UserValidator()
    {
        RuleFor(user => user.Username).NotEmpty().WithMessage("Username cannot be empty.");
        RuleFor(user => user.Email).NotEmpty().WithMessage("Email cannot be empty.").EmailAddress().WithMessage("Please enter a valid email address.");
        RuleFor(user => user.Password).NotEmpty().WithMessage("Password cannot be empty.").MinimumLength(10).WithMessage("Password must be at least 10 characters long.");
    }
}