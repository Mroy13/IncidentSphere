using FluentValidation;

namespace IncidentSphere.StreamService.Shared.Utilities;

public static class ValidationExtensions
{
    public static async Task ValidateAndThrowAppAsync<T>(
        this IValidator<T> validator,
        T model,
        CancellationToken cancellationToken = default)
    {
        var result = await validator.ValidateAsync(model, cancellationToken);

        if (result.IsValid)
            return;

        var firstError = result.Errors.FirstOrDefault()?.ErrorMessage
                         ?? "Validation failed";

        throw new AppException(firstError, 400);
    }
}