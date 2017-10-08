using LandmarkRemark.Entities.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LandmarkRemark.Entities.Map
{
    
    public class NoteMap : EntityTypeConfiguration<Note>
    {
        public NoteMap()
        {
            // Primary Key
            this.HasKey(t => t.NoteId);

            this.Property(t => t.Notes)
                .HasMaxLength(255);

            this.Property(t => t.User)
                .HasMaxLength(100);

            this.Property(t => t.Address)
                .HasMaxLength(255);

            this.Property(t => t.Lat).HasPrecision(18, 12);
            this.Property(t => t.Lng).HasPrecision(18, 12);
        }
    }
}
