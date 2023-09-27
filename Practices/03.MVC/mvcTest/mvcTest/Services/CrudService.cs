using mvcTest.Models;

namespace mvcTest.Services
{
    public class CrudService
    {
        private static readonly List<Student> studentsList = LoadStudents();
        CrudService() { }

        private static List<Student> LoadStudents()
        {
            List<Student> students = new()
            {
                new Student() { StudentId = 1, StudentFirstName = "Carlos", StudentLastName = "Serrato", StudentDateOfBirth = DateTime.Now, StudentSex = 'M' }
            };

            return students;
        }

        public static List<Student> GetStudenList()
        {
            return studentsList;
        }

        private static int GenerateId()
        {
            return studentsList.Max(x => x.StudentId) + 1;
        }
        public static Student GetStudent(int id)
        {
            var student = studentsList.Find(student => student.StudentId == id);
            return student!;
        }

        public static void AddStudent(Student student)
        {
            student.StudentId = GenerateId();
            studentsList.Add(student);
        }

        public static void DeleteStudent(int id)
        {
            var StudentToDelete = GetStudent(id);

            if (StudentToDelete != null)
            {
                studentsList.Remove(StudentToDelete);
            }
        }

        public static void EditStudent(Student student, int id)
        {
            var StudentToEdit = GetStudent(id);
            if (StudentToEdit != null)
            {
                var index = studentsList.IndexOf(StudentToEdit);
                studentsList[index] = student;
            }
        }
    }
}
