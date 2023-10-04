using Microsoft.AspNetCore.Mvc;
using mvcTest.Models;

namespace mvcTest.Services
{
    public interface ICrudService
    {
        List<Student> GetAll();

        Student GetById(int id);

        void Create(Student student);

        void Update(int id, Student student);

        void Delete(int id);
    }
}
