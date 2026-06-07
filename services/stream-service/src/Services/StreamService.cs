using FluentValidation;
using IncidentSphere.StreamService.Dtos;
using IncidentSphere.StreamService.Models;
using IncidentSphere.StreamService.Repositories.Interfaces;
using IncidentSphere.StreamService.Shared.Utilities;

namespace IncidentSphere.StreamService.Services;

public class StreamService : IStreamService
{
    private readonly IRepository<VideoStream> _streamRepository;
    private readonly ILogger<StreamService> _logger;
    private readonly IValidator<ScheduleStreamRequest> _validator;

    public StreamService(
        IRepository<VideoStream> streamRepository,
        ILogger<StreamService> logger,
        IValidator<ScheduleStreamRequest> validator)
    {
        _streamRepository = streamRepository;
        _logger = logger;
        _validator = validator;
    }

    public async Task ScheduleStreamAsync(
        ScheduleStreamRequest request,
        CancellationToken cancellationToken = default)
    {
        try
        {
            await _validator.ValidateAndThrowAppAsync(request, cancellationToken);

            var stream = new VideoStream
            {
                TenantId = request.TenantId,
                IncidentId = request.IncidentId,
                Title = request.Title.Trim(),
                ScheduledAt = request.ScheduledAt.ToUniversalTime(),
                Status = StreamStatus.Scheduled,
            };

            await _streamRepository.AddAsync(stream, cancellationToken);
            await _streamRepository.SaveChangesAsync(cancellationToken);

            _logger.LogInformation("""
                Stream scheduled successfully.
                StreamId: {StreamId}
                IncidentId: {IncidentId}
                """, stream.Id, stream.IncidentId);
        }
        catch (AppException)
        {
            throw;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to schedule stream.");

            throw ExceptionHelper.Handle(ex);
        }
    }
}