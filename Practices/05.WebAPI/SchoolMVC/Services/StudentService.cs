using Newtonsoft.Json;
using RestSharp;
using SchoolMVC.Models;

namespace SchoolMVC.Services;

public class StudentService
{
    private readonly IConfiguration _configuration;
    private readonly string baseUrl;
    private readonly RestClient _restClient;
    public StudentService(RestClient restClient, IConfiguration configuration)
    {
        _configuration = configuration;
        baseUrl = configuration.GetSection("BaseUrl").Value;
        _restClient = restClient;
    }

    public async Task<List<Student>> GetAll()
	{
        var studentList = await GetAllStudents();
        return studentList;
	}

	public async Task<Student> GetById(int id)
	{
        var student = await GetStudentById(id);
        return student;
    }

	public async Task<Student> CreateStudent(Student student)
	{
        var studentResult = await PostStudent(student);
        return studentResult;
    }

    public async Task<Student> EditStudent(int id, Student student)
    {
        var studentResult = await PutStudent(student);
        return studentResult;
    }

    public async Task DeleteStudent(int id)
    {
        await RemoveStudent(id);
    }


    private async Task<List<Student>> GetAllStudents()
    {
        var request = new RestRequest("people", Method.Get);
        var queryResult = await _restClient.GetAsync(request);

        List<Student>? data = JsonConvert.DeserializeObject<List<Student>>(queryResult.Content!);

        return data!;
    }

    private async Task<Student> GetStudentById(int id)
    {
        var request = new RestRequest($"people/{id}", Method.Get);

        var queryResult = await _restClient.GetAsync(request);

        Student? data = JsonConvert.DeserializeObject<Student>(queryResult.Content!);

        return data!;
    }

    private async Task<Student> PostStudent(Student student)
    {
        var request = new RestRequest($"people", Method.Post);
        request.AddJsonBody(student);

        var queryResult = await _restClient.PostAsync(request);

        Student? data = JsonConvert.DeserializeObject<Student>(queryResult.Content!);

        return data!;
    }

    private async Task<Student> PutStudent(Student student)
    {
        var request = new RestRequest($"people/{student.Id}", Method.Put);
        request.AddJsonBody(student);

        var queryResult = await _restClient.PutAsync(request);

        Student? data = JsonConvert.DeserializeObject<Student>(queryResult.Content!);

        return data!;
    }

    private async Task<bool> RemoveStudent(int id)
    {
        var request = new RestRequest($"people/{id}", Method.Delete);

        var queryResult = await _restClient.DeleteAsync(request);

        var data = queryResult.Content!;

        return queryResult.IsSuccessStatusCode;
    }
}
