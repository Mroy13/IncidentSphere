using FluentValidation;
using IncidentSphere.StreamService.Dtos;

namespace IncidentSphere.StreamService.Validators;

public class ScheduleStreamRequestValidator : AbstractValidator<ScheduleStreamRequest>
{
    public ScheduleStreamRequestValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(x => x.TenantId)
            .NotEmpty();

        RuleFor(x => x.IncidentId)
            .NotEmpty();

        RuleFor(x => x.ScheduledAt)
            .Must(x => x > DateTime.UtcNow)
            .WithMessage("ScheduledAt must be in the future");
    }
}