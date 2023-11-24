using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CitasMedicasApi.Models
{
    public partial class Medico
    {
        public int Id { get; set; }

        public string UserEmail { get; set; } = null!;

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string Password { get; set; } = null!;

        [JsonIgnore]
        public virtual ICollection<Especializacion> Especializaciones { get; set; } = new List<Especializacion>();
    }
}
