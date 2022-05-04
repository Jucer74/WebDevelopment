using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ReminderApp.Entities
{
    public partial class Category
    {
        [Key]
        public int Id { get; set; }
        public string Description { get; set; }

    }
}
