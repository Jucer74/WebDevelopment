namespace WebDev.Api.Model
{
   using System.ComponentModel.DataAnnotations;

   public class User
   {
      [Key]
      public int Id { get; set; }

      [Required]
      public char  Email { get; set; }

      [Required]
      public char Name { get; set; }

      [Required]
      public char Password { get; set; }

      [Required]
      public char Username { get; set; }
   }
}