using Microsoft.AspNetCore.Identity;
using Project_IV_Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_IV_Models
{
    public class SeedIdentity
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public SeedIdentity(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            this._userManager = userManager;
            this._roleManager = roleManager;
        }

        public async Task SeedIdentityProject_IV_API()
        {
            var user = await _userManager.FindByNameAsync("Thibault");


            if (user == null)
            {
                if (!(await _roleManager.RoleExistsAsync("Admin")))
                {
                    var role = new IdentityRole("Admin");
                    await _roleManager.CreateAsync(role);
                }

                user = new User()
                {
                    UserName = "Thibault",
                    Email = "thibault.bouckaert@student.howest.be",
                };

                var userResult = await _userManager.CreateAsync(user, "Project4@");
                var roleResult = await _userManager.AddToRoleAsync(user, "Admin");

                if (!userResult.Succeeded || !roleResult.Succeeded)
                {
                    throw new InvalidOperationException("Failed to build user and roles.");
                }
            }


        }
    }
}
