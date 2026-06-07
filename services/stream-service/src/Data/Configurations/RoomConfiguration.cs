using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using IncidentSphere.StreamService.Models;

namespace IncidentSphere.StreamService.Data.Configurations
{
    public class RoomConfiguration : IEntityTypeConfiguration<Room>
    {
        public void Configure(EntityTypeBuilder<Room> entity)
        {
            entity.ToTable("rooms");

            entity.HasKey(x => x.Id);

            entity.Property(x => x.RoomName)
                .HasMaxLength(200)
                .IsRequired();

            entity.Property(x => x.Provider)
                .HasMaxLength(50);

            entity.HasIndex(x => x.StreamId);

            entity.HasIndex(x => x.Status);

            entity.HasOne<VideoStream>()
                .WithMany()
                .HasForeignKey(x => x.StreamId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.Property(x => x.Status)
                .HasConversion<int>();
        }
    }
}