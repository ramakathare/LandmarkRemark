using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LandmarkRemark.Entities.Models
{
    public partial class Note : Entity
    {
        [Key]
        public int NoteId { get; set; }
        [MaxLength(255)]
        [Required]
        public string Notes { get; set; }
        public decimal Lat { get; set; }

        public decimal Lng { get; set; }
        [Required]
        public string User { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string Address { get; set; }
    }
}
