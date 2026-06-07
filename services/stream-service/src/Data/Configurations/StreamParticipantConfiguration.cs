using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using IncidentSphere.StreamService.Models;

namespace IncidentSphere.StreamService.Data.Configurations
{
    public class StreamParticipantConfiguration : IEntityTypeConfiguration<StreamParticipant>
    {
        public void Configure(EntityTypeBuilder<StreamParticipant> entity)
        {
            entity.ToTable("stream_participants");

            entity.HasKey(x => x.Id);

            entity.Property(x => x.ConnectionId)
                .HasMaxLength(100);

            entity.HasIndex(x => x.StreamId);

            entity.HasIndex(x => x.UserId);

            entity.HasIndex(x => x.Status);

            // Prevent duplicate participant
            entity.HasIndex(x =>
                new { x.StreamId, x.UserId })
                .IsUnique();

            // FK -> VideoStream
            entity.HasOne<VideoStream>()
                .WithMany()
                .HasForeignKey(x => x.StreamId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.Property(x => x.Status)
                .HasConversion<int>();

            entity.Property(x => x.Role)
                .HasConversion<int>();
        }
    }
}