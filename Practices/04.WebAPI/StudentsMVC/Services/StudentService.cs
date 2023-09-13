using StudentsMVC.Models;

namespace StudentsMVC.Services;

public class StudentService : IStudentService
{
    private static List<Student> studentsList = LoadStudents();

    public int StudentIndex { get; private set; }

    public StudentService() 
    {
    
    }
    public Student Create(Student student)
    {
        student.Id = GetNextSecuenceId();
        studentsList.Add(student);
       // throw new NotImplementedException();
       return  student;
    }

    public void DeleteById(int id)
    {
        var studentOriginal=studentsList.FirstOrDefault(x => x.Id == id+1);
        if (studentOriginal == null)
        {
           
            throw new Exception("Not Found");

        }
       // throw new NotImplementedException();
    }

    public List<Student> GetAll()
    {

        return studentsList;    
        //throw new NotImplementedException();
    }

    public Student GetById(int id)
    {
        var student = studentsList.FirstOrDefault(x => x.Id == id);
        return student;
        //throw new NotImplementedException();
    }

    public Student Update(int id, Student student)
    {
        //primero encontrarlo 
        var studentInList= studentsList.FirstOrDefault(x => x.Id == id);
        var studentIndex = studentsList.IndexOf(studentInList);
        // lo asigno
        studentInList = student;
        //actualizaco en lista
        studentsList[StudentIndex]=studentInList;

        return studentInList;
        //  throw new NotImplementedException();
    }

    private static List<Student> LoadStudents()
    {
        List<Student> students = new List<Student>();

        students.Add(new Student() { Id = 1, FirstName = "John", LastName = "Doe", DateOfBirth = new DateTime(1980, 10, 10), Sex = 'M' });
        students.Add(new Student() { Id = 2, FirstName = "Barry", LastName = "Allen", DateOfBirth = new DateTime(2001, 7, 7), Sex = 'M' });
        students.Add(new Student() { Id = 3, FirstName = "Diana", LastName = "Prince", DateOfBirth = new DateTime(1950, 8, 8), Sex = 'F' });

        return students;
    }

    private int GetNextSecuenceId()
    {
        var nextSecuenceId = studentsList.Max(x => x.Id) + 1;
        return nextSecuenceId;




    }

}
