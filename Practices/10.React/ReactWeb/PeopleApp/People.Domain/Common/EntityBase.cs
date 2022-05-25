using System.ComponentModel.DataAnnotations;

namespace People.Domain.Common
{
   public abstract class EntityBase
   {
      [Key]
      public int Id { get; set; }
   }
}