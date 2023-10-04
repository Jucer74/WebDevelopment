using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mvcTest.Models;
using ZstdSharp.Unsafe;

namespace mvcTest.Services
{
    public class CrudService : ICrudService
    {
        private readonly AppDbContext _context;
        public CrudService(AppDbContext context) {
            _context = context;
        }

        public List<Student> GetAll()
        {
            return _context.Set<Student>().ToList<Student>();
        }

        public Student GetById(int id)
        {
            var student =_context.Student.FirstOrDefault<Student>(student => student.StudentId == id);
            return student!;
        }

        public void Create(Student student)
        {
            _context.Add(student);
            _context.SaveChanges();
        }

        public void Update(int id, Student student)
        {
            _context.Update(student);
            _context.SaveChanges();

        }

        public void Delete(int id)
        {
            var studentToDelete = GetById(id);
            
            if (studentToDelete != null)
            {
                _context.Remove(studentToDelete);
                _context.SaveChanges();
            }

        }

    }
}
