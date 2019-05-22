using Microsoft.EntityFrameworkCore.Migrations;

namespace YouTune.Migrations
{
    public partial class db_1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "YoutubeID",
                table: "Songs",
                nullable: true,
                oldClrType: typeof(long));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "YoutubeID",
                table: "Songs",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
