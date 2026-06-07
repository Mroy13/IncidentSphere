using System.ComponentModel.DataAnnotations;
namespace IncidentSphere.StreamService.Models
{
    public class StreamParticipant : BaseEntity
    {
        public Guid StreamId { get; set; }
        public Guid UserId { get; set; }

        public StreamParticipantRole Role { get; set; } 
        public StreamParticipantStatus Status { get; set; } 
        public DateTime? JoinedAt { get; set; }
        public DateTime? LeftAt { get; set; }

        public string? ConnectionId { get; set; } 

        public bool IsMuted { get; set; }

        public bool IsVideoOn { get; set; }

        public bool IsScreenSharing { get; set; }
        public bool? IsDeleted { get; set; }
    }

    public enum StreamParticipantRole
    {
        [Display(Name = "Undefined")]
        Undefined = 0,

        [Display(Name = "Host")]
        Host = 1,

        [Display(Name = "Viewer")]
        Viewer = 2
    }

    public enum StreamParticipantStatus
    {
        [Display(Name = "Undefined")]
        Undefined = 0,

        [Display(Name = "Connected")]
        Connected = 1,

        [Display(Name = "Left")]
        Left = 2,

        [Display(Name = "Disconnected")]
        Disconnected = 3
    }
}
