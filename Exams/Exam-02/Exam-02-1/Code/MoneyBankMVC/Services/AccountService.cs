using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MoneyBankMVC.Models;
using RestSharp;

namespace MoneyBankMVC.Services
{
    public class AccountService : IAccountService
    {
        private readonly string fastApiBaseUrl = "http://127.0.0.1:8000"; // Ajusta la URL de tu servicio FastAPI
        private readonly RestClient _restClient;

        public AccountService()
        {
            _restClient = new RestClient(fastApiBaseUrl);
        }

        public async Task<Account> Create(Account account)
        {
            var request = new RestRequest("api/v1/accounts", Method.Post)
                .AddJsonBody(account);

            var response = await _restClient.ExecuteAsync<Account>(request);

            if (response.IsSuccessful)
            {
                return response.Data;
            }
            else
            {
                throw new Exception($"Error creating account: {response.StatusCode}");
            }
        }

        public async Task DeleteById(int id)
        {
            var request = new RestRequest($"api/v1/accounts/{id}", Method.Delete);

            var response = await _restClient.ExecuteAsync(request);

            if (!response.IsSuccessful)
            {
                throw new Exception($"Error deleting account: {response.StatusCode}");
            }
        }

        public async Task<List<Account>> GetAll()
        {
            var request = new RestRequest("api/v1/accounts", Method.Get);

            var response = await _restClient.ExecuteAsync<List<Account>>(request);

            if (response.IsSuccessful)
            {
                return response.Data;
            }
            else
            {
                throw new Exception($"Error getting accounts: {response.StatusCode}");
            }
        }

        public async Task<Account> GetById(int id)
        {
            var request = new RestRequest($"api/v1/accounts/{id}", Method.Get);

            var response =await _restClient.ExecuteAsync<Account>(request);

            if (response.IsSuccessful)
            {
                return response.Data;
            }
            else
            {
                throw new Exception($"Error getting account: {response.StatusCode}");
            }
        }

        public async Task<Account> Update(int id, Account account)
        {
            var request = new RestRequest($"api/v1/accounts/{id}", Method.Put)
                .AddJsonBody(account);

            var response = await _restClient.ExecuteAsync<Account>(request);

            if (response.IsSuccessful)
            {
                return response.Data;
            }
            else
            {
                throw new Exception($"Error updating account: {response.StatusCode}");
            }
        }

        public async Task<Account> Deposit(int id, decimal amount)
        {
            var request = new RestRequest($"api/v1/accounts/{id}/deposit", Method.Put)
                .AddJsonBody(new { Amount = amount });

            var response = await _restClient.ExecuteAsync<Account>(request);

            if (response.IsSuccessful)
            {
                return response.Data;
            }
            else
            {
                throw new Exception($"Error depositing to account: {response.StatusCode}");
            }
        }

        public async Task<Account> Withdraw(int id, decimal amount)
        {
            var request = new RestRequest($"api/v1/accounts/{id}/withdraw", Method.Put)
                .AddJsonBody(new { Amount = amount });

            var response = await _restClient.ExecuteAsync<Account>(request);

            if (response.IsSuccessful)
            {
                return response.Data;
            }
            else
            {
                throw new Exception($"Error withdrawing from account: {response.StatusCode}");
            }
        }
    }
}
