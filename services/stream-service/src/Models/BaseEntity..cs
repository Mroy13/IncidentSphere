using System.ComponentModel.DataAnnotations;

namespace IncidentSphere.StreamService.Models
{
    public abstract class BaseEntity
    {
        public Guid Id { get; private set; } = Guid.NewGuid();

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        public Guid? CreatedById { get; private set; }
        public string? CreatedByName { get; set; } 

        public Guid? UpdatedById { get; set; }
        public string? UpdatedByName { get; set; }


    }

}
