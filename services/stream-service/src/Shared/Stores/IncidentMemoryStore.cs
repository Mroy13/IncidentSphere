using IncidentSphere.StreamService.Models;

namespace IncidentSphere.StreamService.Shared.Stores;

public class IncidentMemoryStore : IIncidentMemoryStore
{
    private readonly List<Incident> _incidents =
[
    new Incident
    {
        Id = Guid.Parse("55555555-5555-5555-5555-555555555555"),
        TenantId = Guid.Parse("22222222-2222-2222-2222-222222222222"),
        Title = "Site Inspection"
    },

    new Incident
    {
        Id = Guid.Parse("66666666-6666-6666-6666-666666666666"),
        TenantId = Guid.Parse("22222222-2222-2222-2222-222222222222"),
        Title = "Ransomware Attack"
    },

    new Incident
    {
        Id = Guid.Parse("33333333-3333-3333-3333-333333333333"),
        TenantId = Guid.Parse("22222222-2222-2222-2222-222222222222"),
        Title = "Factory Fire"
    },

    new Incident
    {
        Id = Guid.Parse("44444444-4444-4444-4444-444444444444"),
        TenantId = Guid.Parse("22222222-2222-2222-2222-222222222222"),
        Title = "Chemical Leak"
    },

    new Incident
    {
        Id = Guid.Parse("77777777-7777-7777-7777-777777777777"),
        TenantId = Guid.Parse("22222222-2222-2222-2222-222222222222"),
        Title = "Construction Site Accident"
    }
];

    public Incident? Get(Guid incidentId)
    {
        return _incidents.FirstOrDefault(x => x.Id == incidentId);
    }
}