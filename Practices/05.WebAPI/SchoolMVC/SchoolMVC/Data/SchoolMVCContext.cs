using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SchoolMVC.Models;

namespace SchoolMVC.Data
{
    public class SchoolMVCContext : DbContext
    {
        public SchoolMVCContext (DbContextOptions<SchoolMVCContext> options)
            : base(options)
        {
        }

        public DbSet<SchoolMVC.Models.Student> Student { get; set; } = default!;
    }
}
