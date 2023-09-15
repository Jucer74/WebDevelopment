using StudentsMVC.Context;
using StudentsMVC.Models;

namespace StudentsMVC.Services;

public class StudentService : IStudentService
{
    // Global Variables
    private static List<Student> studentsList = LoadStudents();

    private readonly AppDbContext _appDbContext;

    public StudentService(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
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
        //return studentsList;
        return _appDbContext.Set<Student>().ToList<Student>();
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
