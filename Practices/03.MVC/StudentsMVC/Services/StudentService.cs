using StudentsMVC.Models;
using StudentsMVC.Services;

namespace StudentsMVC.Services
{
    public class StudentService : IStudentService
    {
        //Global Variables
        private static List<Student> studentList = LoadStudents();
        public StudentService()
        {
        }

        public Student Create(Student student)
        {
            student.Id = GetNextSequenceId();
            studentList.Add(student);

            return student;
        }

        public void DeleteById(int id)
        {
            var studentOriginal = studentList.FirstOrDefault(x => x.Id == id + 1);

            if(studentOriginal != null)
            {
                throw new Exception("Not Found");
            }

            studentList.Remove(studentOriginal);
        }

        public List<Student> GetAll()
        {
            return studentList;
        }

        public Student GetById(int id)
        {
            var student = studentList.FirstOrDefault(x => x.Id == id);
            return student;
        }

        public Student Update(int id, Student student)
        {
            var studentOriginal = studentList.FirstOrDefault(x => x.Id == id);
            var studentIndex = studentList.IndexOf(studentOriginal);

            studentList[studentIndex] = student;

            return student;
        }

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
            var nextSequenceId = studentList.Max(x => x.Id) + 1;
            return nextSequenceId;
        }

    }
}
