using System.ComponentModel.DataAnnotations;
namespace IncidentSphere.StreamService.Models
{
    public class VideoStream : BaseEntity
    {
        public Guid TenantId { get; set; }

        public Guid IncidentId { get; set; }
        public string Title { get; set; } = string.Empty;

        public StreamStatus Status { get; set; }

        public DateTime? ScheduledAt { get; set; }
        public DateTime? StartedAt { get; set; }
        public DateTime? EndedAt { get; set; }
        public Guid? ActiveRoomId { get; set; }
        public bool? IsDeleted { get; set; }
    }

    public class Tenant
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }


    public enum StreamStatus
    {
        [Display(Name = "Undefined")]
        Undefined = 0,

        [Display(Name = "Scheduled")]
        Scheduled = 1,

        [Display(Name = "Active")]
        Active = 2,

        [Display(Name = "Ended")]
        Ended = 3
    }
}
