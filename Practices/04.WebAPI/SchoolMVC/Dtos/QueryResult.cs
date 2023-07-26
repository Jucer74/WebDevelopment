using SchoolMVC.Models;

namespace SchoolMVC.Dtos;

public class QueryResult
{
    public List<Student> Students { get; set; }
    public PaginationData Pagination { get; set; }
}
