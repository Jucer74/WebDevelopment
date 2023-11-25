using AgenteDeportivoApi.Models;

namespace AgenteDeportivoApi.Dtos;

public class TipoAgenteDeportivoDto
{
    public int Id { get; set; }
    public string first_name { get; set; } = null!;
    public string last_name { get; set; } = null!;
    public string email { get; set; } = null!;
    public string gender { get; set; } = null!;
    public string Phone { get; set; } = null!;
    public string Agent { get; set; } = null!;
    public string Country { get; set; } = null!;
    public int Agente_Deportivo_Id { get; set; } 
    
}
