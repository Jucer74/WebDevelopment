using StudentsMVC.Models;

namespace StudentsMVC.Services;

public interface IStudentService
{
    Student Create(Student student);
    List<Student> GetAll();
    Student GetById(int id);
    Student Updates(int id, Student student);
    void DeleteById(int id);
}
