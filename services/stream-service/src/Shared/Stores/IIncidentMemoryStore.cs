using IncidentSphere.StreamService.Models;

namespace IncidentSphere.StreamService.Shared.Stores;

public interface IIncidentMemoryStore
{
    Incident? Get(Guid incidentId);
}