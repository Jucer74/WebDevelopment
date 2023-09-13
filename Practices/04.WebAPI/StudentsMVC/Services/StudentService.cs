using StudentsMVC.Models;

namespace StudentsMVC.Services;

public class StudentService : IStudentService
{

    // Global Variables
    private static List<Student> studentsList = LoadStudents();

    public StudentService()
    {

    }

    public Student Create(Student student)
    {
        student.Id = GetNextSequenceId();
        studentsList.Add(student);
        return student;
    }

    public void DeleteById(int id)
    {
        var studentOriginal = studentsList.FirstOrDefault(x => x.Id == id);

        if(studentOriginal != null)
        {
            throw new Exception("Not Found");
        }
        
        studentsList.Remove(studentOriginal);

        
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
        var studentOriginal = studentsList.FirstOrDefault(x => x.Id == id);

        var studentIndex = studentsList.IndexOf(studentOriginal);

         var studentInList = student;

        studentsList[studentIndex] = studentInList;

        return studentInList;
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
        var nextSequenceId = studentsList.Max(x => x.Id) + 1;
        return nextSequenceId;
    }

    #endregion Private-Methods
}
