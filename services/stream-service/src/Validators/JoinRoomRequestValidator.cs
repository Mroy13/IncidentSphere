using FluentValidation;
using IncidentSphere.StreamService.Dtos;

namespace IncidentSphere.StreamService.Validators;

public class JoinRoomRequestValidator : AbstractValidator<JoinRoomRequest>
{
    public JoinRoomRequestValidator()
    {
        RuleFor(x => x.StreamCode).NotEmpty();
    }
}