namespace IncidentSphere.StreamService.Models
{
    public class UserContext
    {
        public Guid UserId { get; set; }

        public Guid TenantId { get; set; }

        public string Name { get; set; } = string.Empty;
    }
}
