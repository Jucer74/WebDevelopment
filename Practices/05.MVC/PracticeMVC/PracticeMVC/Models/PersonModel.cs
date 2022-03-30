using System;
using System.ComponentModel.DataAnnotations;

namespace PracticeMVC.Models
{
   public class PersonModel
   {
      public int Id { get; set; }
      
      public string FirstName { get; set; }
      public string LastName { get; set; }
      public DateTime DateOfBirth { get; set; }
      public char Sex { get; set; }
   }
}
