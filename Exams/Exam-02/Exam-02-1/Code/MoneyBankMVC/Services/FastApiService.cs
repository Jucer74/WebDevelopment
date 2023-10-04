using System;
using System.Collections.Generic;
using MoneyBankMVC.Models;
using RestSharp;
using RestSharpMethod = RestSharp.Method; // Alias para RestSharp.Method

namespace MoneyBankMVC.Services
{
    public class FastAPIService
    {
        private readonly string fastApiBaseUrl = "localhost:8000"; // Ajusta la URL de tu servicio FastAPI
        private readonly RestClient _restClient;

        public FastAPIService()
        {
            _restClient = new RestClient(fastApiBaseUrl);
        }

        public RestClient Get_restClient<T>()
        {
            return _restClient;
        }

        public T Create<T>(string endpoint, object data, RestClient _restClient)
        {
            var request = new RestRequest(endpoint, RestSharpMethod.Post)
                .AddJsonBody(data);

            var response = _restClient.Execute<Account>(request);

            if (response.IsSuccessful)
            {
                return response.Data;
            }
            else
            {
                throw new Exception($"Error al realizar la solicitud a {endpoint}: {response.ErrorMessage}");
            }
        }

        // Define métodos para otras operaciones como obtener todos los registros, obtener un registro por ID, eliminar, actualizar, etc.
    }

    internal class RestClient
    {
        private string fastApiBaseUrl;

        public RestClient(string fastApiBaseUrl)
        {
            this.fastApiBaseUrl = fastApiBaseUrl;
        }
    }
}
