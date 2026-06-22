using IncidentSphere.StreamService.Models;
using IncidentSphere.StreamService.Shared.Utilities;

namespace IncidentSphere.StreamService.Shared.Extensions;

public static class HttpContextExtensions
{
    public static UserContext GetCurrentUser(this HttpContext context)
    {
        var user = context.Items["User"] as UserContext;

        if (user is null)
        {
            throw new AppException("Unauthorized access.", 401);
        }

        return user;
    }
}