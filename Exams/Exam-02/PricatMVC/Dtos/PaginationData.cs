namespace PricatMVC.Dtos;

public class PaginationData
{
    public int Page { get; set; }
    public int Limit { get; set; }
    public int First { get; set; }
    public int Previous { get; set; }
    public int Next { get; set; }
    public int Last { get; set; }
}