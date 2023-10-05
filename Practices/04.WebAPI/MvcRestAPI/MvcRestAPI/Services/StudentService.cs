using Newtonsoft.Json;
using MvcRestAPI.Models;
using RestSharp;
using System.Net;

namespace MvcRestAPI.Services
{
    public class StudentService : IStudentService
    {


       private readonly IConfiguration _configuration1;
       private readonly RestClient _restClient;
       private readonly string studentsApiEndpoint;
       public StudentService(IConfiguration configuration, RestClient restClient) { 
            _configuration1 = configuration;
            _restClient = restClient;
            studentsApiEndpoint = string.Format("{0}/students", configuration.GetSection("BaseUrl").Value!);
        }

        public Student Create(Student student)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id, Student student)
        {
            throw new NotImplementedException();
        }

        public List<Student> GetAll()
        {
            var request = new RestRequest(studentsApiEndpoint);

            var response = _restClient.Get(request);

            var responseData = response.Content!;

            var students = new List<Student>(); 

            if (response.IsSuccessful && response.StatusCode == HttpStatusCode.OK)
            {
                students = JsonConvert.DeserializeObject<List<Student>>(responseData);
            }

             return students!;
        }

        public Student GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Student Update(int id, Student student)
        {
            throw new NotImplementedException();
        }
    }
}
