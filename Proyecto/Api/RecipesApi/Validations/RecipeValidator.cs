using FluentValidation;
using RecipesApi.Dtos;

namespace RecipesApi.Validations;

public class RecipeValidator : AbstractValidator<RecipeDto>
{
    public RecipeValidator()
    {
        RuleFor(m => m.Name)
            .NotEmpty()
            .WithMessage("The Name is required.")
            .MaximumLength(70)
            .WithMessage("The maximum length of Name is 70 characters.");

        RuleFor(m => m.Ingredients)
            .NotEmpty()
            .WithMessage("The Ingredients is required.")
            .MaximumLength(255)
            .WithMessage("The maximum length of Ingredients is 255 characters.");

        RuleFor(m => m.Difficulty)
            .MaximumLength(50)
            .WithMessage("The maximum length of Difficulty is 50 characters.");

        RuleFor(m => m.EstimatedTime)
            .MaximumLength(50)
            .WithMessage("The maximum length of EstimatedTime is 50 characters.");

        RuleFor(m => m.CategoryId)
            .NotEmpty()
            .WithMessage("The CategoryId is required.");
    }
}