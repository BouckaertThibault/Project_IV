using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Project_IV_Models.Models
{
    public class User : IdentityUser
    {
        
        

        private ICollection<LocationsUsers> _locationsUsers;
        public virtual ICollection<LocationsUsers> LocationsUsers
        {
            get
            {
                return _locationsUsers ?? (_locationsUsers = new List<LocationsUsers>());
            }
            set
            {
                _locationsUsers = value;
            }
        }


    }
}
