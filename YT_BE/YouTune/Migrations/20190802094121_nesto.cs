using Microsoft.EntityFrameworkCore.Migrations;

namespace YouTune.Migrations
{
    public partial class nesto : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "SongId",
                table: "Artists",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Artists_SongId",
                table: "Artists",
                column: "SongId");

            migrationBuilder.AddForeignKey(
                name: "FK_Artists_Songs_SongId",
                table: "Artists",
                column: "SongId",
                principalTable: "Songs",
                principalColumn: "SongId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Artists_Songs_SongId",
                table: "Artists");

            migrationBuilder.DropIndex(
                name: "IX_Artists_SongId",
                table: "Artists");

            migrationBuilder.DropColumn(
                name: "SongId",
                table: "Artists");
        }
    }
}
