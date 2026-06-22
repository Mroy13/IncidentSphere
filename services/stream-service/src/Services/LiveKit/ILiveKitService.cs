namespace IncidentSphere.StreamService.Services.LiveKit;

public interface ILiveKitService
{
    Task CreateRoomAsync(string roomName);

    Task DeleteRoomAsync(string roomName);

    string GenerateToken(
        string roomName,
        string userId,
        string userName,
        bool canPublish = true);
}