using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using IncidentSphere.StreamService.Models;

namespace IncidentSphere.StreamService.Data.Configurations
{
    public class StreamInviteConfiguration : IEntityTypeConfiguration<StreamInvite>
    {
        public void Configure(EntityTypeBuilder<StreamInvite> entity)
        {
            entity.ToTable("stream_invites");

            entity.HasKey(x => x.Id);

            entity.Property(x => x.Email)
                .HasMaxLength(200)
                .IsRequired();

            entity.Property(x => x.InviteCode)
                .HasMaxLength(100);

            entity.HasIndex(x => x.StreamId);

            entity.HasIndex(x => x.UserId);

            entity.HasIndex(x => x.InviteStatus);

            // Prevent duplicate invite
            entity.HasIndex(x =>
                new { x.StreamId, x.UserId })
                .IsUnique();

            // FK -> VideoStream
            entity.HasOne<VideoStream>()
                .WithMany()
                .HasForeignKey(x => x.StreamId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.Property(x => x.InviteStatus)
                .HasConversion<int>();
        }
    }
}