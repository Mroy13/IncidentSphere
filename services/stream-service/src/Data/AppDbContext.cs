using Microsoft.EntityFrameworkCore;
using IncidentSphere.StreamService.Models;
using System.Reflection;

namespace IncidentSphere.StreamService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<VideoStream> Streams => Set<VideoStream>();
        public DbSet<Room> Rooms => Set<Room>();
        public DbSet<StreamInvite> StreamInvites => Set<StreamInvite>();
        public DbSet<StreamParticipant> StreamParticipants => Set<StreamParticipant>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}