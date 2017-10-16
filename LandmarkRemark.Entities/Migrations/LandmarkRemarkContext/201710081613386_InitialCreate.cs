namespace LandmarkRemark.Entities.Migrations.LandmarkRemarkContext
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Note",
                c => new
                    {
                        NoteId = c.Int(nullable: false, identity: true),
                        Notes = c.String(maxLength: 255),
                        Lat = c.Decimal(nullable: false, precision: 18, scale: 12),
                        Lng = c.Decimal(nullable: false, precision: 18, scale: 12),
                        User = c.String(maxLength: 100),
                        Date = c.DateTime(nullable: false),
                        Address = c.String(maxLength: 255),
                    })
                .PrimaryKey(t => t.NoteId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Note");
        }
    }
}
