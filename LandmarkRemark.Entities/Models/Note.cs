using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LandmarkRemark.Entities.Models
{
    public partial class Note : Entity
    {
        public int NoteId { get; set; }
        public string Notes { get; set; }
        public decimal Lat { get; set; }

        public decimal Lng { get; set; }
        public string User { get; set; }
        public DateTime Date { get; set; }
        public string Address { get; set; }
        //date: new Date(),
        //draggable: true,
        //notes: "",
        //lat: this.lat,
        //lng: this.lng,
        //user: this.authService.authentication.userName,
        //isHome: true,
        //address: "Not obtained yet.",
        //isOwner: true,
        //id:0
    }
}
