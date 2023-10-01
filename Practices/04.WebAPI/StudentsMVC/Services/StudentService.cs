using Newtonsoft.Json;
using RestSharp;
using StudentsMVC.Context;
using StudentsMVC.Models;
using System.Net;

namespace StudentsMVC.Services;

public class StudentService : IStudentService
{
    // Global Variables
    private static List<Student> studentsList = LoadStudents();

    private readonly AppDbContext _appDbContext;
    private readonly IConfiguration _configuration1;
    private readonly RestClient _restClient;

    private readonly string studentsApiEndpoint;

    public StudentService(AppDbContext appDbContext, IConfiguration configuration, RestClient restClient)
    {
        _appDbContext = appDbContext;
        _configuration1 = configuration;
        _restClient = restClient;
        studentsApiEndpoint = string.Format("{0}/students", configuration.GetSection("StudentsApi").Value!);
    }

    public Student Cteate(Student student)
    {
        student.Id = GetNextSequenceId();
        studentsList.Add(student);
        return student;
        
    }



    public void Delete(int id, Student student)
    {
        var original = studentsList.FirstOrDefault(x => x.Id == id);
        studentsList.Remove(original!);
    }

    public List<Student> GetAll()
    {
        return studentsList;
        return _appDbContext.Set<Student>().ToList<Student>();

        //var request = new RestRequest(studentsApiEndpoint);

        //var response = _restClient.Get(request);

        //var responseData = response.Content!;

        //var students = new List<Student>(); 

        //if (response.IsSuccessful && response.StatusCode == HttpStatusCode.OK)
        //{
        //    students = JsonConvert.DeserializeObject<List<Student>>(responseData);
        //}


        //return students!;

    }

    public Student GetById(int id)
    {
        var student = studentsList.FirstOrDefault(x => x.Id == id);
        return student!;
    }

    public Student Update(int id, Student student)
    {
        var original = studentsList.FirstOrDefault(x => x.Id == id);
        var index = studentsList.IndexOf(original!);
        studentsList[index] = student;  
        return student;
    }

    #region Private-Methods

    private static List<Student> LoadStudents()
    {
        List<Student> students = new List<Student>();

        students.Add(new Student() { Id = 1, FirstName = "John", LastName = "Doe", DateOfBirth = new DateTime(1980, 10, 10), Sex = 'M' });
        students.Add(new Student() { Id = 2, FirstName = "Barry", LastName = "Allen", DateOfBirth = new DateTime(2001, 7, 7), Sex = 'M' });
        students.Add(new Student() { Id = 3, FirstName = "Diana", LastName = "Prince", DateOfBirth = new DateTime(1950, 8, 8), Sex = 'F' });

        return students;
    }

    private int GetNextSequenceId()
    {
        return studentsList.Max(x => x.Id) + 1;
    }

    #endregion Private-Methods
}
