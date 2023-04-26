using PricatMVC.Models;

namespace PricatMVC.Dtos;

public class QueryResult <T>
{
    public List<T> Models { get; set; }
    public PaginationData Pagination { get; set; }
}
