namespace IncidentSphere.StreamService.Configurations;

public class AppConfig
{
    public LiveKitConfig LiveKit { get; init; } = new();
    public DbConfig DbConfig { get; init; } = new();
}

public class LiveKitConfig
{
    public string Url { get; init; } = string.Empty;

    public string ApiKey { get; init; } = string.Empty;

    public string Secret { get; init; } = string.Empty;
}