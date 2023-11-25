namespace InmobiliariaApi.Dtos;

public class RealEstateCategoryDto
{
    public int Id { get; set; }
    public string URLImagen { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Address { get; set; } = null!;
    public string Location { get; set; } = null!;
    public int Price { get; set; }
    public int Rooms { get; set; }
    public int Bathrooms { get; set; }
    public int BuiltArea { get; set; }
    public int Stratum { get; set; }
    public string Contact { get; set; } = null!;
    public int RealestateId { get; set; }
}
