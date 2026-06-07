using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IncidentSphere.StreamService.Migrations
{
    /// <inheritdoc />
    public partial class AddSoftDeleteSupport : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "video_streams",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "stream_participants",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "stream_invites",
                type: "boolean",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "rooms",
                type: "boolean",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "video_streams");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "stream_participants");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "stream_invites");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "rooms");
        }
    }
}
