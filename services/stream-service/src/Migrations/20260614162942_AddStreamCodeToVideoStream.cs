using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IncidentSphere.StreamService.Migrations
{
    /// <inheritdoc />
    public partial class AddStreamCodeToVideoStream : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "StreamCode",
                table: "video_streams",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_video_streams_TenantId_StreamCode",
                table: "video_streams",
                columns: new[] { "TenantId", "StreamCode" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_video_streams_TenantId_StreamCode",
                table: "video_streams");

            migrationBuilder.DropColumn(
                name: "StreamCode",
                table: "video_streams");
        }
    }
}
