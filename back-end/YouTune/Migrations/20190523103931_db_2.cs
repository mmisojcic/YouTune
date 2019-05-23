using Microsoft.EntityFrameworkCore.Migrations;

namespace YouTune.Migrations
{
    public partial class db_2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DateTime",
                table: "Reports",
                newName: "Timestamp");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Timestamp",
                table: "Reports",
                newName: "DateTime");
        }
    }
}
