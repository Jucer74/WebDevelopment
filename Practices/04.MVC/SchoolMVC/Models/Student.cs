namespace SchoolMVC.Models;

public class Student{
    public int Id { get; set; } = 0;
    public string Name { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public DateTime DateOfBirth { get; set; } = default;
    public char sex { get; set; } = 'M';
    

}