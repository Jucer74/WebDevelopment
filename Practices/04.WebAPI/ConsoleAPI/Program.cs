// See https://aka.ms/new-console-template for more information
using ConsoleAPI.Models;
using Newtonsoft.Json;
using RestSharp;
using System.Net.WebSockets;

#region Global-Variables

string baseUrl = "http://localhost:3000/";
RestClient client = new RestClient(baseUrl);

#endregion Global-Variables

#region Main

try
{
    Menu();
}
catch (Exception e)
{
    Console.WriteLine(e);
}

#endregion Main

#region Functions


void Menu()
{
    var option = ' ';

    while (option != '0')
    {
        Console.Clear();
        Console.WriteLine(" REST Call Samples - Students ");
        Console.WriteLine("------------------------------");
        Console.WriteLine("1. GetAllStudents");
        Console.WriteLine("2. GetStudentById");
        Console.WriteLine("3. PostStudent");
        Console.WriteLine("4. PutStudent");
        Console.WriteLine("5. DeleteStudent");
        Console.WriteLine("0. Exit");
        Console.WriteLine("Select Option:");
        option = Console.ReadKey().KeyChar;
        Console.WriteLine();

        switch (option)
        {
            case '0':
                Console.WriteLine("Exit");
                break;

            case '1':
                ExecuteGetAllStudents();
                break;

            case '2':
                ExecuteGetStudentById();
                break;

            case '3':
                ExecutePostStudent();
                break;

            case '4':
                ExecutePutStudent();
                break;

            case '5':
                ExecuteDeleteStudent();
                break;

            default:
                Console.WriteLine("Invalid Option");
                break;
        }

        Console.WriteLine("\nPress any key to continue... ");
        Console.ReadKey();
    }
}

void ExecuteGetAllStudents()
{
    Console.WriteLine();
    Console.WriteLine("GetAllStudents");
    Console.WriteLine("--------------");

    var studentList = GetAllStudents();

    foreach (var student in studentList)
    {
        Console.WriteLine($"{student.Id}-{student.FirstName}-{student.LastName}-{student.DateOfBirth}-{student.Sex}");
    }
}

List<Student> GetAllStudents()
{
    var request = new RestRequest("people", Method.Get);
    var queryResult = client.Get(request);

    List<Student>? data = JsonConvert.DeserializeObject<List<Student>>(queryResult.Content!);

    return data!;
}

void PrintStudent(Student student)
{
    Console.WriteLine();
    Console.WriteLine("Student");
    Console.WriteLine("-------");
    Console.WriteLine($"Id            = {student.Id}");
    Console.WriteLine($"First Name    = {student.FirstName}");
    Console.WriteLine($"Last Name     = {student.LastName}");
    Console.WriteLine($"Date Of Birth = {student.DateOfBirth}");
    Console.WriteLine($"Sex           = {student.Sex}");
}

void ExecuteGetStudentById()
{
    Console.WriteLine();
    Console.WriteLine("GetStudentById");
    Console.WriteLine("--------------");

    Console.Write("Sudent Id: ");
    var studentId = Console.ReadLine();

    Student student = GetStudentById(Convert.ToInt32(studentId));

    PrintStudent(student);  
}


Student GetStudentById(int id)
{
    var request = new RestRequest($"people/{id}", Method.Get);
    
    var queryResult = client.Get(request);

    Student? data = JsonConvert.DeserializeObject<Student>(queryResult.Content!);

    return data!;
}

void ExecutePostStudent()
{
    Console.WriteLine();
    Console.WriteLine("PostStudent");
    Console.WriteLine("-----------");

    Console.Write("First Name: ");
    var firstName = Console.ReadLine();
    Console.Write("Last Name: ");
    var lastName = Console.ReadLine();
    Console.Write("Date Of Birth (MM/DD/YYYY): ");
    var strDateOfBirth = Console.ReadLine();
    var dateOfBirth = DateTime.Parse(strDateOfBirth);
    Console.Write("Sex (M/F): ");
    var strSex = Console.ReadLine();
    var sex = strSex[0];

    Student studentRequest = new Student()
    {
        FirstName = firstName,
        LastName = lastName,
        DateOfBirth = dateOfBirth,
        Sex = sex
    };

    Student student = PostStudent(studentRequest);

    PrintStudent(student);

}

Student PostStudent(Student student)
{
    var request = new RestRequest($"people", Method.Post);
    request.AddJsonBody(student);

    var queryResult = client.Post(request);

    Student? data = JsonConvert.DeserializeObject<Student>(queryResult.Content!);

    return data!;
}



void ExecutePutStudent()
{
    Console.WriteLine();
    Console.WriteLine("PutStudent");
    Console.WriteLine("----------");

    Console.Write("Sudent Id: ");
    var studentId = Console.ReadLine();
    var id = Convert.ToInt32(studentId);
    Console.Write("First Name: ");
    var firstName = Console.ReadLine();
    Console.Write("Last Name: ");
    var lastName = Console.ReadLine();
    Console.Write("Date Of Birth (MM/DD/YYYY): ");
    var strDateOfBirth = Console.ReadLine();
    var dateOfBirth = DateTime.Parse(strDateOfBirth);
    Console.Write("Sex (M/F): ");
    var strSex = Console.ReadLine();
    var sex = strSex[0];

    Student studentRequest = new Student()
    {
        Id = id,
        FirstName = firstName,
        LastName = lastName,
        DateOfBirth = dateOfBirth,
        Sex = sex
    };

    Student student = PutStudent(studentRequest);

    PrintStudent(student);

}

Student PutStudent(Student student)
{
    var request = new RestRequest($"people/{student.Id}", Method.Put);
    request.AddJsonBody(student);

    var queryResult = client.Put(request);

    Student? data = JsonConvert.DeserializeObject<Student>(queryResult.Content!);

    return data!;
}

void ExecuteDeleteStudent()
{
    Console.WriteLine();
    Console.WriteLine("DeleteStudent");
    Console.WriteLine("-------------");

    Console.Write("Sudent Id: ");
    var studentId = Console.ReadLine();
    var id = Convert.ToInt32(studentId);
    Student student = GetStudentById(id);

    PrintStudent(student);

    Console.WriteLine("\nAre You Sure to delete this record? ");
    Console.Write("(Y/N) :");
    var response = '\0';
    while(response != 'Y' && response != 'N')
    {
        response = Console.ReadKey(true).KeyChar.ToString().ToUpper()[0];
    }
    Console.WriteLine(response);

    if (response.Equals('Y'))
    {
        if(DeleteStudent(id))
        {
            Console.WriteLine("Record Deleted");
        }
        
    }
}

bool DeleteStudent(int id)
{
    var request = new RestRequest($"people/{id}", Method.Delete);

    var queryResult = client.Delete(request);

    var data = queryResult.Content!;

    return queryResult.IsSuccessStatusCode;
}
#endregion Functions