namespace IncidentSphere.StreamService.Dtos;

public class CreateStreamRequest
{
    public Guid IncidentId { get; set; }

    public string Title { get; set; } = string.Empty;

    public bool IsManual { get; set; }

    public DateTime? ScheduledAt { get; set; }
}