using System.ComponentModel.DataAnnotations;
namespace IncidentSphere.StreamService.Models
{
    public class StreamInvite : BaseEntity
    {
        public Guid StreamId { get; set; }
        public Guid UserId { get; set; }
        public string Email { get; set; } = string.Empty;
        public string? InviteCode { get; set; }

        public StreamInviteStatus InviteStatus { get; set; }
        public DateTime? SentAt { get; set; }

        public DateTime? AcceptedAt { get; set; }
        public DateTime ExpiresAt { get; set; }
        public bool? IsDeleted { get; set; }
    }

    public enum StreamInviteStatus
    {
        [Display(Name = "Undefined")]
        Undefined = 0,

        [Display(Name = "Pending")]
        Pending = 1,

        [Display(Name = "Accepted")]
        Accepted = 2,

        [Display(Name = "Expired")]
        Expired = 3,

        [Display(Name = "Rejected")]
        Rejected = 4
    }
}
