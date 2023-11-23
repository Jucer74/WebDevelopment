using System;
using System.Collections.Generic;

namespace CitasMedicasApi.Models;

public partial class Especializacion
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Medico> Medicos { get; set; } = new List<Medico>();
}
