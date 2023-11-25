using FluentValidation;
using RecipesApi.Dtos;

namespace RecipesApi.Validations;

public class CategoryValidator : AbstractValidator<CategoryDto>
{
    public CategoryValidator()
    {


        RuleFor(m => m.CategoryName)
            .NotEmpty()
            .WithMessage("The CategoryName is required.")
            .MaximumLength(50);

    }
}