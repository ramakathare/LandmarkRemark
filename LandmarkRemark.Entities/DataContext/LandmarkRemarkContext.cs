using LandmarkRemark.Entities.Map;
using LandmarkRemark.Entities.Models;
using Repository.Pattern.Ef6;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LandmarkRemark.Entities
{
    
    public partial class LandmarkRemarkContext : DataContext
    {
        static LandmarkRemarkContext()
        {
            
            Database.SetInitializer<LandmarkRemarkContext>(new CreateDatabaseIfNotExists<LandmarkRemarkContext>());
        }

        public LandmarkRemarkContext()
            : base("Name=LandmarkRemarkConnection")
        {
            base.Configuration.LazyLoadingEnabled = false;
        }

        public DbSet<Note> Notes { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Configurations.Add(new NoteMap());
        }
    }
}
