namespace IncidentSphere.StreamService.Dtos;

public class JoinRoomResponse
{
    public string Token { get; set; } = string.Empty;

    public string RoomName { get; set; } = string.Empty;

    public string LiveKitUrl { get; set; } = string.Empty;
}