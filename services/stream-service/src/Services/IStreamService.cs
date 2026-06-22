using IncidentSphere.StreamService.Dtos;
namespace IncidentSphere.StreamService.Services;

public interface IStreamService
{
    Task<CreateStreamResponse> CreateStreamAsync(CreateStreamRequest request, CancellationToken cancellationToken = default);
    Task<JoinRoomResponse> JoinRoomAsync(JoinRoomRequest request, CancellationToken cancellationToken);
    Task EndStreamAsync(Guid streamId);
}