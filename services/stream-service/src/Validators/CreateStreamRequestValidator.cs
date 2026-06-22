using FluentValidation;
using IncidentSphere.StreamService.Dtos;

namespace IncidentSphere.StreamService.Validators;

public class CreateStreamRequestValidator : AbstractValidator<CreateStreamRequest>
{
    public CreateStreamRequestValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(x => x.IncidentId)
            .NotEmpty();

        RuleFor(x => x.ScheduledAt)
            .Must((request, scheduledAt) =>
            {
                if (request.IsManual)
                {
                    return true;
                }

                return scheduledAt > DateTime.UtcNow;
            })
            .WithMessage("ScheduledAt must be in future");
    }
}