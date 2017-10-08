using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LandmarkRemark.Repository.DomainModel
{
    public class NotesModel
    {
        public int NoteId { get; set; }
        public string Notes { get; set; }
        public decimal Lat { get; set; }

        public decimal Lng { get; set; }
        public string User { get; set; }
        public DateTime Date { get; set; }
        public string Address { get; set; }

        public bool Draggable{get;set;}
        public bool IsHome { get; set; }
        
        public bool IsOwner { get; set; }
    }
}
