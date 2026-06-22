using IncidentSphere.StreamService.Configurations;
using Livekit.Server.Sdk.Dotnet;
using Microsoft.Extensions.Options;

namespace IncidentSphere.StreamService.Services.LiveKit;

public class LiveKitService : ILiveKitService
{
    private readonly AppConfig _config;
    private readonly RoomServiceClient _roomClient;

    public LiveKitService(IOptions<AppConfig> config)
    {
        _config = config.Value;

        _roomClient = new RoomServiceClient(
            host: _config.LiveKit.Url,
            apiKey: _config.LiveKit.ApiKey,
            apiSecret: _config.LiveKit.Secret
        );
    }

    public async Task CreateRoomAsync(string roomName)
    {

        await _roomClient.CreateRoom(
            new CreateRoomRequest
            {
                Name = roomName
            });
    }

    public async Task DeleteRoomAsync(string roomName)
    {
        await _roomClient.DeleteRoom(
            new DeleteRoomRequest
            {
                Room = roomName
            });
    }

    public string GenerateToken(
        string roomName,
        string userId,
        string userName,
        bool canPublish = true)
    {
        var grants = new VideoGrants
        {
            RoomJoin = true,
            Room = roomName,
            CanPublish = canPublish,
            CanSubscribe = true
        };

        return new AccessToken(
                _config.LiveKit.ApiKey,
                _config.LiveKit.Secret)
            .WithIdentity(userId)
            .WithName(userName)
            .WithGrants(grants) 
            .ToJwt();
    }
}
