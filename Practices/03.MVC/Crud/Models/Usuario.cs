using System;
using System.Collections.Generic;

namespace Crud.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public int Edad { get; set; }

    public DateTime Fecha { get; set; }
}
