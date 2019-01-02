using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Project_IV_Models.Models;

namespace Project_IV_Models
{
    public class Project_IV_APIContext : IdentityDbContext<User>
    {
        public Project_IV_APIContext (DbContextOptions<Project_IV_APIContext> options)
            : base(options)
        {
        }

        


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            //modelBuilder.Seed();
        }

    }
}
