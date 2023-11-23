using System;
using System.Collections.Generic;

namespace CitasMedicasApi.Models;

public partial class Medico
{
    public int Id { get; set; }

    public string UserEmail { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int EspecializacionId { get; set; }

    public virtual Especializacion Especializacion { get; set; } = null!;
}
