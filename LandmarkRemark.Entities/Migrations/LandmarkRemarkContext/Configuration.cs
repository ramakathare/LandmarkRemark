namespace LandmarkRemark.Entities.Migrations.LandmarkRemarkContext
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<LandmarkRemark.Entities.LandmarkRemarkContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
            //AutomaticMigrationDataLossAllowed = true;
            MigrationsDirectory = @"Migrations\LandmarkRemarkContext";
            ContextKey = "LandmarkRemark.Entities.LandmarkRemarkContext";
        }

        protected override void Seed(LandmarkRemark.Entities.LandmarkRemarkContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }
}
