using Newtonsoft.Json;
using RestSharp;
using PricatMVC.Dtos;
using PricatMVC.Models;

namespace PricatMVC.Services
{
    public class CategoryService
    {
        private readonly IConfiguration _configuration;
        private readonly string baseUrl;
        private readonly RestClient _restClient;
        private static ProductService _productoService;
        public CategoryService(RestClient restClient, IConfiguration configuration, ProductService productService)
        {
            _configuration = configuration;
            baseUrl = configuration.GetSection("BaseUrl").Value;
            _restClient = restClient;
            _productoService = productService;
        }

        public async Task<List<Category>> GetAll()
        {
            var categoryList = await GetAllCategories();
            return categoryList;
        }

        public async Task<QueryResult<Category>> ByPage(int page, int limit)
        {
            var categoryList = await GetCategoriesByPage(page, limit);

            QueryResult<Category> queryResult = new QueryResult<Category>()
            {
                Models = categoryList,
                Pagination = new PaginationData()
                {
                    Page = page,
                    Limit = limit
                }
            };

            return queryResult;
        }

        public async Task<Category> GetById(int id)
        {
            var category = await GetCategoryById(id);
            return category;
        }

        public async Task<Category> CreateCategory(Category category)
        {
            var categoryResult = await PostCategory(category);
            return categoryResult;
        }

        public async Task<Category> EditCategory(int id, Category category)
        {
            var categoryResult = await PutCategory(category);
            return categoryResult;
        }

        public async Task DeleteCategory(int id)
        {
            await RemoveCategory(id);

            await _productoService.RemoveProductByCategoryId(id);
        }


        private async Task<List<Category>> GetAllCategories()
        {
            var request = new RestRequest($"{baseUrl}/categories", Method.Get);
            var response = await _restClient.GetAsync(request);

            List<Category>? data = JsonConvert.DeserializeObject<List<Category>>(response.Content!);

            return data!;
        }

        private async Task<List<Category>> GetCategoriesByPage(int page, int limit)
        {
            var request = new RestRequest($"{baseUrl}/categories?_page={page}&_limit={limit}", Method.Get);
            var response = await _restClient.GetAsync(request);

            List<Category>? data = JsonConvert.DeserializeObject<List<Category>>(response.Content!);

            return data!;
        }


        private async Task<Category> GetCategoryById(int id)
        {
            var request = new RestRequest($"{baseUrl}/categories/{id}", Method.Get);

            var response = await _restClient.GetAsync(request);

            Category? data = JsonConvert.DeserializeObject<Category>(response.Content!);

            return data!;
        }

        private async Task<Category> PostCategory(Category category)
        {
            var request = new RestRequest($"{baseUrl}/categories", Method.Post);
            request.AddJsonBody(category);

            var response = await _restClient.PostAsync(request);

            Category? data = JsonConvert.DeserializeObject<Category>(response.Content!);

            return data!;
        }

        private async Task<Category> PutCategory(Category category)
        {
            var request = new RestRequest($"{baseUrl}/categories/{category.Id}", Method.Put);
            request.AddJsonBody(category);

            var response = await _restClient.PutAsync(request);

            Category? data = JsonConvert.DeserializeObject<Category>(response.Content!);

            return data!;
        }

        private async Task<bool> RemoveCategory(int id)
        {
            var request = new RestRequest($"{baseUrl}/categories/{id}", Method.Delete);

            var response = await _restClient.DeleteAsync(request);

            var data = response.Content!;

            return response.IsSuccessStatusCode;
        }

    }
}
