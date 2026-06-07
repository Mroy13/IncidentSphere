using IncidentSphere.StreamService.Dtos;


namespace IncidentSphere.StreamService.Services;

public interface IStreamService
{
    Task ScheduleStreamAsync(ScheduleStreamRequest request, CancellationToken cancellationToken = default);
}