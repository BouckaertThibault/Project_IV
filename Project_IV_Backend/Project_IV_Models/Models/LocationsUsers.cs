using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Project_IV_Models.Models
{
    public class LocationsUsers
    {
        /* 
        * Tussentabel.
        */
        
        public Guid LocationID { get; set; }
        public string UserID { get; set; }

        public virtual User User { get; set; }
        public virtual Location Location { get; set; }
    }
}
