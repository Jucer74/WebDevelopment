using System.ComponentModel.DataAnnotations;

namespace Pizzeria.Domain.Common;

public abstract class EntityBase
{
    [Key]
    public int Id { get; set; }
}
