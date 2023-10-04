using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.DotNet.Scaffolding.Shared.CodeModifier.CodeChange;
using MoneyBankMVC.Models;
using RestSharp;
using RestSharpMethod = RestSharp.Method; // Alias para RestSharp.Method


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
            var request = new RestRequest("api/accounts", RestSharpMethod.Post)
                .AddJsonBody(account);

            var response = await _restClient.ExecuteAsync<Account>(request);

            if (response.IsSuccessful)
            {
                return response.Data;
            }
