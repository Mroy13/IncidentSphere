using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using IncidentSphere.StreamService.Models;

namespace IncidentSphere.StreamService.Data.Configurations
{
    public class VideoStreamConfiguration : IEntityTypeConfiguration<VideoStream>
    {
        public void Configure(EntityTypeBuilder<VideoStream> entity)
        {
            entity.ToTable("video_streams");

            entity.HasKey(x => x.Id);

            entity.Property(x => x.Title)
                .HasMaxLength(200)
                .IsRequired();

            entity.Property(x => x.StreamCode)
               .HasMaxLength(20)
               .IsRequired();

            entity.HasIndex(x =>new { x.TenantId, x.StreamCode })
           .IsUnique();

            entity.HasIndex(x => x.TenantId);

            entity.HasIndex(x => x.IncidentId);

            entity.HasIndex(x => x.Status);

            entity.Property(x => x.Status)
                .HasConversion<int>();
        }
    }
}