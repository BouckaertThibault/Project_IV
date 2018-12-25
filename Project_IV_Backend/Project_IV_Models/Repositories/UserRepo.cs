using Microsoft.EntityFrameworkCore;
using Project_IV_Models;
using Project_IV_Models.Models;
using Project_IV_Models.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project_IV_Models.Repositories
{
    public class UserRepo : GenericRepo<User>, IUserRepo
    {
        private readonly Project_IV_APIContext context;

        public UserRepo(Project_IV_APIContext context) : base(context)
        {
            this.context = context;
        }

        public async Task<User> FindByIdAsync(string id)
        {
            var user = await this.context.Users
                .Where(u => u.Id == id)
                .AsNoTracking()
                .FirstOrDefaultAsync();
            return user;
        }

        public async Task<User> FindByUsernameAsync(string name)
        {
            var user = await this.context.Users
                .Where(u => u.UserName == name)
                .AsNoTracking()
                .FirstOrDefaultAsync(); ;
            return user;
        }

        public new async Task<IEnumerable<User>> GetAllAsync()
        {
            var users = await this.context.Users
                .OrderBy(u => u.UserName)
                .AsNoTracking()
                .ToListAsync();
            return users;
        }
    }
}
