namespace IncidentSphere.StreamService.Dtos;

public class CreateStreamResponse
{
    public Guid StreamId { get; set; }

    public string StreamCode { get; set; } = string.Empty;
}