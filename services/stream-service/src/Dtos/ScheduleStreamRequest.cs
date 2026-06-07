namespace IncidentSphere.StreamService.Dtos;

public class ScheduleStreamRequest
{
    public Guid TenantId { get; set; }

    public Guid IncidentId { get; set; }

    public string Title { get; set; } = string.Empty;

    public DateTime ScheduledAt { get; set; }
}