using Project_IV_Models.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Project_IV_Models.Repositories.Interfaces
{
    public interface IUserRepo : IGenericRepo<User>
    {
        Task<User> FindByUsernameAsync(string name);
        new Task<IEnumerable<User>> GetAllAsync();
        Task<User> FindByIdAsync(string id);
    }
}
