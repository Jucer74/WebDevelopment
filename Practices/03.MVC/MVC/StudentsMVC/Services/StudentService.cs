using StudentsMVC.Models;

namespace StudentsMVC.Services;

public class StudentService : IStudentService
{

    private static List<Student> studentsList = LoadStudents();

    public StudentService()
    {
        
    }

    public Student Create(Student student)
    {
        throw new NotImplementedException();
    }

    public void Delete(int id)
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
        return student;
    }

    public Student Update(int id, Student student)
    {
        throw new NotImplementedException();
    }

    private static List<Student> LoadStudents()
    {
        var students = new List<Student>();

        students.Add(new Student() { Id = 1, FirstName = "John", LastName = "Doe", DateOfBirth = new DateTime(1974, 10, 8), Sex = 'M' });
        students.Add(new Student() { Id = 2, FirstName = "Pedro", LastName = "Perez", DateOfBirth = new DateTime(1990, 1, 18), Sex = 'M' });
        students.Add(new Student() { Id = 3, FirstName = "Juan", LastName = "Martinez", DateOfBirth = new DateTime(2001, 3, 5), Sex = 'M' });
        students.Add(new Student() { Id = 4, FirstName = "Camila", LastName = "Lopez", DateOfBirth = new DateTime(2010, 8, 8), Sex = 'F' });

        return students;
    }
}
