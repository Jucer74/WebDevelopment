using MvcRestAPI.Models;
namespace MvcRestAPI.Services
{
    public interface IStudentService
    {
        List<Student> GetAll();

        Student GetById(int id);

        Student Create(Student student);

        Student Update(int id, Student student);

        void Delete(int id, Student student);
    }
}
