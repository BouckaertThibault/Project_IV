using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Project_IV_Models.Models;

namespace Project_IV_API.Models
{
    public class Project_IV_APIContext : IdentityDbContext<User>
    {
        public Project_IV_APIContext (DbContextOptions<Project_IV_APIContext> options)
            : base(options)
        {
        }

        // ORM = Object Relational Mapping met de database
        public DbSet<Location> Location { get; set; }
        public DbSet<LocationsUsers> LocationsUsers { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<LocationsUsers>().ToTable("LocationsUsers");
            modelBuilder.Entity<Location>().ToTable("Location");
            modelBuilder.Entity<LocationsUsers>().HasKey(pa => new { pa.LocationID, pa.UserID });
            //modelBuilder.Seed();
        }

    }
}
