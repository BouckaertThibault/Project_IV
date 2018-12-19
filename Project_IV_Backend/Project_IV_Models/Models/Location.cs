using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Project_IV_Models.Models
{

    public class Location
    {
        [Key]
        public Guid ID { get; set; }

        public string Naam { get; set; }
        public string Beschrijving { get; set; }
        public int Temperatuur { get; set; }
        public int Windsnelheid { get; set; }
        public string Windrichting { get; set; }
        public int Luchtdruk { get; set; }
        public int Bewolking { get; set; }
        public int Vochtigheid { get; set; }
        public int Neerslag { get; set; }

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
