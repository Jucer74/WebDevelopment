using SchoolMVC.Models;
namespace SchoolMVC.Services
{
    public interface ISudentService
    {
        Student Create(Student student);
        List<Student> GetAll();

        Student GetById(int id);

        Student Update(int id, Student student);

        void DeleteById(int id);
    }
}










