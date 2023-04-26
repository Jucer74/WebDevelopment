using Newtonsoft.Json;
using RestSharp;
using PricatMVC.Dtos;
using PricatMVC.Models;

namespace PricatMVC.Services
{
    public class ProductService
    {
        private readonly IConfiguration _configuration;
        private readonly string baseUrl;
        private readonly RestClient _restClient;
        public ProductService(RestClient restClient, IConfiguration configuration)
        {
            _configuration = configuration;
            baseUrl = configuration.GetSection("BaseUrl").Value;
            _restClient = restClient;
        }

        public async Task<List<Product>> GetAll()
        {
            var productList = await GetAllProducts();
            return productList;
        }

        public async Task<QueryResult<Product>> ByPage(int page, int limit)
        {
            var productList = await GetProductsByPage(page, limit);

            QueryResult<Product> queryResult = new QueryResult<Product>()
            {
                Models = productList,
                Pagination = new PaginationData()
                {
                    Page = page,
                    Limit = limit
                }
            };

            return queryResult;
        }

        public async Task<Product> GetById(int id)
        {
            var product = await GetProductById(id);
            return product;
        }

        public async Task<Product> CreateProduct(Product product)
        {
            var productResult = await PostProduct(product);
            return productResult;
        }

        public async Task<Product> EditProduct(int id, Product product)
        {
            var productResult = await PutProduct(product);
            return productResult;
        }

        public async Task DeleteProduct(int id)
        {
            await RemoveProduct(id);
        }


        private async Task<List<Product>> GetAllProducts()
        {
            var request = new RestRequest($"{baseUrl}/products", Method.Get);
            var response = await _restClient.GetAsync(request);

            List<Product>? data = JsonConvert.DeserializeObject<List<Product>>(response.Content!);

            return data!;
        }


        private async Task<List<Product>> GetProductsByPage(int page, int limit)
        {
            var request = new RestRequest($"{baseUrl}/products?_page={page}&_limit={limit}", Method.Get);
            var response = await _restClient.GetAsync(request);

            List<Product>? data = JsonConvert.DeserializeObject<List<Product>>(response.Content!);

            return data!;
        }


        private async Task<Product> GetProductById(int id)
        {
            var request = new RestRequest($"{baseUrl}/products/{id}", Method.Get);

            var response = await _restClient.GetAsync(request);

            Product? data = JsonConvert.DeserializeObject<Product>(response.Content!);

            return data!;
        }

        private async Task<Product> PostProduct(Product product)
        {
            var request = new RestRequest($"{baseUrl}/products", Method.Post);
            request.AddJsonBody(product);

            var response = await _restClient.PostAsync(request);

            Product? data = JsonConvert.DeserializeObject<Product>(response.Content!);

            return data!;
        }

        private async Task<Product> PutProduct(Product product)
        {
            var request = new RestRequest($"{baseUrl}/products/{product.Id}", Method.Put);
            request.AddJsonBody(product);

            var response = await _restClient.PutAsync(request);

            Product? data = JsonConvert.DeserializeObject<Product>(response.Content!);

            return data!;
        }

        private async Task<bool> RemoveProduct(int id)
        {
            var request = new RestRequest($"{baseUrl}/products/{id}", Method.Delete);

            var response = await _restClient.DeleteAsync(request);

            var data = response.Content!;

            return response.IsSuccessStatusCode;
        }

        public async Task<List<Product>> GetAllByCategoryId(int id)
        {
            List<Product>? data = await GetAll();
            if (data != null)
            {
                data = data.Where(data => data.CategoryId == id).ToList();
            }

            return data!;
        }

        public async Task<bool> RemoveProductByCategoryId(int id)
        {
            try 
            {
                List<Product> products = await GetAllByCategoryId(id);
                products.ForEach(async product => await RemoveProduct(product.Id));
                return true;
            }
            catch 
            {
                return false;
            }
        }
    }
}
