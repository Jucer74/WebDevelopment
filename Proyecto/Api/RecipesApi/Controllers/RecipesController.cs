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
    public class RecipesController : ControllerBase
    {
        private readonly IRecipeService _recipeService;
        private readonly IMapper _mapper;

        public RecipesController(IRecipeService recipeService, IMapper mapper)
        {
            _recipeService = recipeService;
            _mapper = mapper;
        }

        // GET: api/<RecipesController>
        [HttpGet]
        public async Task<IActionResult> GetAllRecipes()
        {
            var recipe = await _recipeService.GetAllRecipes();
            return Ok(_mapper.Map<List<Recipe>, List<RecipeDto>>(recipe));
        }

        // GET api/<RecipesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRecipeById(int id)
        {
            var recipe = await _recipeService.GetRecipeById(id);
            return Ok(_mapper.Map<Recipe, RecipeDto>(recipe));
        }

        // POST api/<RecipesController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RecipeDto recipeDto)
        {
            var recipe = await _recipeService.CreateRecipe(_mapper.Map<RecipeDto, Recipe>(recipeDto));
            return Ok(_mapper.Map<Recipe, RecipeDto>(recipe));
        }

        // PUT api/<RecipesController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] RecipeDto recipeDto)
        {
            var recipe = await _recipeService.UpdateRecipe(id, _mapper.Map<RecipeDto, Recipe>(recipeDto));
            return Ok(_mapper.Map<Recipe, RecipeDto>(recipe));
        }

        // DELETE api/<RecipesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _recipeService.DeleteRecipe(id);
            return Ok();
        }
    }
}
