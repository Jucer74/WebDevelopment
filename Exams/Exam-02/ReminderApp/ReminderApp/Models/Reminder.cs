using System;
using System.Collections.Generic;

#nullable disable

namespace ReminderApp.Entities
{
    public partial class Reminder
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public string CronExpression { get; set; }
        public int? NumberOfTimes { get; set; }
        public bool? Enabled { get; set; }
    }
}
