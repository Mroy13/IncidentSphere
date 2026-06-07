namespace IncidentSphere.StreamService.Configurations
{
    public class DbConfig
    {
        public string Provider { get; set; } = "Postgres";
        public string ConnectionString { get; set; } = string.Empty;
    }
}
