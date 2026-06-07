using System.ComponentModel.DataAnnotations;
namespace IncidentSphere.StreamService.Models
{
    public class Room:BaseEntity
    {
        public Guid StreamId { get; set; }

        public string RoomName { get; set; } = string.Empty;

        public string Provider { get; set; } = "livekit";

        public RoomStatus Status { get; set; }

        public DateTime? StartedAt { get; set; }
        public DateTime? EndedAt { get; set; }
        public bool? IsDeleted { get; set; }
    }
    public enum RoomStatus
    {
        [Display(Name = "Undefined")]
        Undefined = 0,

        [Display(Name = "Created")]
        Created = 1,

        [Display(Name = "Active")]
        Active = 2,

        [Display(Name = "Paused")]
        Paused = 3,

        [Display(Name = "Ended")]
        Ended = 4,

        [Display(Name = "Failed")]
        Failed = 5,

        [Display(Name = "Deleted")]
        Deleted = 6
    }
}
