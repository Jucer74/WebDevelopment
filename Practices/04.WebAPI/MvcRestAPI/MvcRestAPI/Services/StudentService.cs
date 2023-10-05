using Newtonsoft.Json;
using MvcRestAPI.Models;
using RestSharp;
using System.Net;
using Microsoft.Extensions.Options;

namespace MvcRestAPI.Services
{
    public class StudentService : IStudentService
    {


       private readonly IConfiguration _configuration;
       private readonly RestClient _restClient;
       private readonly string studentsApiEndpoint;
       private static List<Student> _studentsList = new List<Student>();

       public StudentService(IConfiguration configuration, RestClient restClient) { 
            _configuration = configuration;
            _restClient = restClient;
            studentsApiEndpoint = string.Format("{0}/students", configuration.GetSection("BaseUrl").Value!);
        }


        private int GetNextSequenceId()
        {
            return _studentsList.Max(x => x.Id) + 1;
        }

        public void Create(Student student)

        { 
            student.Id = GetNextSequenceId();

            var request = new RestRequest(studentsApiEndpoint, Method.Post);

            var body = JsonConvert.SerializeObject(student);

            request.AddParameter("application/json", body, ParameterType.RequestBody);

            var response = _restClient.Post(request);

        }

        public void Delete(int id, Student student)
        {
            var studentToDelete = GetById(id);

            if (studentToDelete.Id == student.Id)
            {
                var request = new RestRequest($"{studentsApiEndpoint}/{id}", Method.Delete);
                _restClient.Delete(request);
            }
        }

        public List<Student> GetAll()
        {
            var request = new RestRequest(studentsApiEndpoint);

            var response = _restClient.Get(request);

            var responseData = response.Content!;

            if (response.IsSuccessful && response.StatusCode == HttpStatusCode.OK)
            {
                _studentsList = JsonConvert.DeserializeObject<List<Student>>(responseData)!;
            }

             return _studentsList!;
        }

        public Student GetById(int id)
        {
            var request = new RestRequest($"{studentsApiEndpoint}/{id}", Method.Get);

            var response = _restClient.Get(request);

            var responseData = response.Content!;

            var student = new Student();

            if (response.IsSuccessful && response.StatusCode == HttpStatusCode.OK)
            {
                student = JsonConvert.DeserializeObject<Student>(responseData);
            }

            return student!;

        }

        public void Update(int id, Student student)
        {
            var studentToUpdate = GetById(id);

            if (studentToUpdate.Id == student.Id)
            {

                var request = new RestRequest($"{studentsApiEndpoint}/{id}", Method.Put);

                var body = JsonConvert.SerializeObject(student);

                request.AddParameter("application/json", body, ParameterType.RequestBody);

                _restClient.Put(request);
            }
        }
    }
}
