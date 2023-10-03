namespace Students_MVC.Controllers
{
    internal class Student
    {
        internal int id;
        internal string sex;

        public string FirstName { get; internal set; }
        public string LastName { get; internal set; }
        public DateTime DateOfBirth { get; internal set; }
    }
}