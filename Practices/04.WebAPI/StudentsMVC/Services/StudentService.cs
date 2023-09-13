using StudentsMVC.Models;

namespace StudentsMVC.Services;

public class StudentService : IStudentService
{

    // Global Variables
    private readonly List<Student> studentsList;

    public StudentService()
    {
        studentsList = LoadStudents();
    }

    public Student Create(Student student)
    {
        throw new NotImplementedException();
    }

    public void DeleteById(int id)
    {
        throw new NotImplementedException();
    }

    public List<Student> GetAll()
    {
        return studentsList;
    }

    public Student GetById(int id)
    {
        var student = studentsList.FirstOrDefault(x => x.Id == id);
        //validar null
        return student;
    }

    public Student Updates(int id, Student student)
    {
        throw new NotImplementedException();
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

    #endregion Private-Methods

}
