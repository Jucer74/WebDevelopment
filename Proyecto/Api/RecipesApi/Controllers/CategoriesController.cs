using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RecipesApi.Dtos;
using RecipesApi.Models;
using RecipesApi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RecipesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;

        public CategoriesController(ICategoryService categoryService, IMapper mapper)
        {
            _categoryService = categoryService;
            _mapper = mapper;
        }

        // GET: api/<CategoriesController>
        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _categoryService.GetAllCategories();
            return Ok(_mapper.Map<List<Category>, List<CategoryDto>>(categories));
        }

        // GET api/<CategoriesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            var category = await _categoryService.GetCategoryById(id);
            return Ok(_mapper.Map<Category, CategoryDto>(category));
        }

        // POST api/<CategoriesController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CategoryDto categoryDto)
        {
            var category = await _categoryService.CreateCategory(_mapper.Map<CategoryDto, Category>(categoryDto));
            return Ok(_mapper.Map<Category, CategoryDto>(category));
        }

        // PUT api/<CategoriesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CategoryDto categoryDto)
        {
            var category = await _categoryService.UpdateCategory(id, _mapper.Map<CategoryDto, Category>(categoryDto));
            return Ok(_mapper.Map<Category, CategoryDto>(category));
        }

        // DELETE api/<CategoriesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _categoryService.DeleteCategory(id);
            return Ok();
        }

        // GET api/<CategoriesController>/5/Recipes
        [HttpGet("{id}/Recipes")]
        public async Task<IActionResult> GetRecipesByCategoryId(int id)
        {
            var recipes = await _categoryService.GetRecipesByCategoryId(id);
            return Ok(_mapper.Map<List<Recipe>, List<RecipeDto>>(recipes));
        }
    }
}