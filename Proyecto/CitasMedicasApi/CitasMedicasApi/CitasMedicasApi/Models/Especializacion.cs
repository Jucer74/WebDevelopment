using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CitasMedicasApi.Models
{
    public partial class Especializacion
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        [JsonIgnore]
        public virtual ICollection<Medico> Medicos { get; set; } = new List<Medico>();
    }
}
