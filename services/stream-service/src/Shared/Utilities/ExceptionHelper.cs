using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace IncidentSphere.StreamService
.Shared.Utilities;

public static class ExceptionHelper
{
    public static AppException
        Handle(Exception exception)
    {
        if (exception
            is DbUpdateException
            dbException)
        {
            var postgresException =
                dbException.InnerException
                    as PostgresException;

            if (postgresException
                is not null)
            {
                return postgresException
                    .SqlState switch
                {
                    // unique constraint
                    "23505"
                        => new AppException(
                            "Duplicate data already exists.",
                            409),

                    // foreign key
                    "23503"
                        => new AppException(
                            "Invalid related resource.",
                            400),

                    // null violation
                    "23502"
                        => new AppException(
                            "Required field missing.",
                            400),

                    _ => new AppException(
                        "Internal server error.",
                        500)
                };
            }
        }

        return new AppException(
            "Internal server error.",
            500);
    }
}