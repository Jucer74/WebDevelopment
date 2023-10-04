using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MoneyBankMVC.Models;

namespace MoneyBankMVC.Data
{
    public class MoneyBankMVCContext : DbContext
    {
        public MoneyBankMVCContext (DbContextOptions<MoneyBankMVCContext> options)
            : base(options)
        {
        }

        public DbSet<MoneyBankMVC.Models.Account> Account { get; set; } = default!;
    }
}
