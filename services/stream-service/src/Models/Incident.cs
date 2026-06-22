namespace IncidentSphere.StreamService.Models;

public class Incident
{
    public Guid Id { get; set; }

    public Guid TenantId { get; set; }

    public string Title { get; set; } = string.Empty;
}