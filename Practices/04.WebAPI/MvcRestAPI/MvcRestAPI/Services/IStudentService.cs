using MvcRestAPI.Models;
namespace MvcRestAPI.Services
{
    public interface IStudentService
    {
        List<Student> GetAll();

        Student GetById(int id);

        void Create(Student student);

        void Update(int id, Student student);

        void Delete(int id, Student student);
    }
}
