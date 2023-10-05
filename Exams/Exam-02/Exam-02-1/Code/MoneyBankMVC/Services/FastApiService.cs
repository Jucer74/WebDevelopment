using System;
using System.Collections.Generic;
using MoneyBankMVC.Controllers;
using MoneyBankMVC.Models;
using RestSharp;
using RestSharpMethod = RestSharp.Method; // Alias para RestSharp.Method

namespace MoneyBankMVC.Services
{
    public class FastAPIService
    {
        public  string fastApiBaseUrl = "localhost:8000"; // Ajusta la URL de tu servicio FastAPI
        public RestClient restClient;


        public RestClient RestClient { get => restClient; set => restClient = value; }

        public FastAPIService()
        {
            restClient = new RestClient(fastApiBaseUrl);

        }

        public RestClient GetRestClient()
        {

            return restClient;
        }


        public async Task<Account> CreateAsync(string endpoint, object data, RestClient restClient)
        {
            var request = new RestRequest(endpoint, RestSharpMethod.Post)
                .AddJsonBody(data);

            var response = await restClient.ExecuteAsync<Account>(request);

            if (response.IsSuccessful)
            {
                return response.Data;
            }
            else
            {
                // Lanza una excepción con el mensaje de error de la respuesta
                throw new Exception($"Error al realizar la solicitud a {endpoint}: {response.ErrorMessage}");
            }
        }


        // Define métodos para otras operaciones como obtener todos los registros, obtener un registro por ID, eliminar, actualizar, etc.
    }


}
