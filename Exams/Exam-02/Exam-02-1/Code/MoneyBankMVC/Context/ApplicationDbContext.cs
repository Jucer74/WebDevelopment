using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace MoneyBankMVC.Models;

public partial class ApplicationDbContext : DbContext
{
     

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; }
}

