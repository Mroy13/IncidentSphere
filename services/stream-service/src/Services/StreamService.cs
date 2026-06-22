using FluentValidation;
using IncidentSphere.StreamService.Dtos;
using IncidentSphere.StreamService.Models;
using IncidentSphere.StreamService.Repositories.Interfaces;
using IncidentSphere.StreamService.Services;
using IncidentSphere.StreamService.Services.LiveKit;
using IncidentSphere.StreamService.Shared.Extensions;
using IncidentSphere.StreamService.Shared.Stores;
using IncidentSphere.StreamService.Shared.Utilities;


public class StreamService : IStreamService
{
    private readonly IRepository<VideoStream> _streamRepository;
    private readonly IRepository<Room> _roomRepository;
    private readonly ILogger<StreamService> _logger;
    private readonly IValidator<CreateStreamRequest> _createStreamValidator;
    private readonly IValidator<JoinRoomRequest> _joinRoomValidator;
    private readonly ILiveKitService _liveKitService;
    private readonly IIncidentMemoryStore _incidentStore;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public StreamService(
        IRepository<VideoStream> streamRepository,
        IRepository<Room> roomRepository,
        ILogger<StreamService> logger,
        IValidator<CreateStreamRequest> validator,
        ILiveKitService liveKitService,
        IIncidentMemoryStore incidentStore,
        IHttpContextAccessor httpContextAccessor,
        IValidator<JoinRoomRequest> joinRoomValidator)
    {
        _streamRepository = streamRepository;
        _roomRepository = roomRepository;
        _logger = logger;
        _createStreamValidator = validator;
        _liveKitService = liveKitService;
        _incidentStore = incidentStore;
        _httpContextAccessor = httpContextAccessor;
        _joinRoomValidator = joinRoomValidator;
    }

    public async Task<CreateStreamResponse> CreateStreamAsync(
      CreateStreamRequest request,
      CancellationToken cancellationToken)
    {
        await _createStreamValidator.ValidateAndThrowAsync(request, cancellationToken);

        var user = _httpContextAccessor.HttpContext!.GetCurrentUser();

        var incident = _incidentStore.Get(request.IncidentId);

        if (incident is null)
            throw new AppException("Incident not found", StatusCodes.Status404NotFound);

        var stream = new VideoStream
        {
            TenantId = user.TenantId,
            IncidentId = request.IncidentId,
            Title = request.Title.Trim(),

            StreamCode = StreamCodeGenerator.Generate(),

            Status = request.IsManual
                ? StreamStatus.Active
                : StreamStatus.Scheduled,

            ScheduledAt = request.ScheduledAt?.ToUniversalTime(),

            StartedAt = request.IsManual
                ? DateTime.UtcNow
                : null
        };

        await _streamRepository.AddAsync(stream, cancellationToken);
        await _streamRepository.SaveChangesAsync(cancellationToken);

        _logger.LogInformation(
            "Stream created: {StreamId}, Code: {StreamCode}",
            stream.Id,
            stream.StreamCode);

        return new CreateStreamResponse
        {
            StreamId = stream.Id,
            StreamCode = stream.StreamCode
        };
    }

    public async Task<JoinRoomResponse> JoinRoomAsync(
    JoinRoomRequest request,
    CancellationToken cancellationToken)
    {
        await _joinRoomValidator.ValidateAndThrowAsync(request, cancellationToken);

        var stream = _streamRepository.Query()
            .FirstOrDefault(x => x.StreamCode == request.StreamCode);

        if (stream is null)
            throw new AppException("Stream not found", StatusCodes.Status404NotFound);

        Room? room = null;

        if (stream.ActiveRoomId.HasValue)
        {
            room = await _roomRepository.GetByIdAsync(
                stream.ActiveRoomId.Value,
                cancellationToken);
        }

        // -----------------------------
        // LAZY ROOM CREATION
        // -----------------------------
        if (room is null)
        {
            var roomName = $"incident-{stream.StreamCode}";

            await _liveKitService.CreateRoomAsync(roomName);

            room = new Room
            {
                StreamId = stream.Id,
                RoomName = roomName,
                Provider = "livekit",
                Status = RoomStatus.Active,
                StartedAt = DateTime.UtcNow
            };

            await _roomRepository.AddAsync(room, cancellationToken);
            await _roomRepository.SaveChangesAsync(cancellationToken);

            stream.ActiveRoomId = room.Id;
            stream.Status = StreamStatus.Active;
            stream.StartedAt = DateTime.UtcNow;

            _streamRepository.Update(stream);
            await _streamRepository.SaveChangesAsync(cancellationToken);
        }

        var user = _httpContextAccessor.HttpContext!
            .GetCurrentUser();

        var token = _liveKitService.GenerateToken(
            room.RoomName,
            user.UserId.ToString(),
            user.Name);

        return new JoinRoomResponse
        {
            RoomName = room.RoomName,
            Token = token,
            LiveKitUrl = "ws://YOUR_EC2_IP:7880"
        };
    }

    public async Task EndStreamAsync(Guid streamId)
    {
        var stream = await _streamRepository.GetByIdAsync(streamId);

        if (stream is null)
            throw new AppException("Stream not found", StatusCodes.Status404NotFound);

        if (stream.ActiveRoomId.HasValue)
        {
            var room = await _roomRepository.GetByIdAsync(stream.ActiveRoomId.Value);

            if (room != null)
            {
                await _liveKitService.DeleteRoomAsync(room.RoomName);

                room.Status = RoomStatus.Ended;
                room.EndedAt = DateTime.UtcNow;

                _roomRepository.Update(room);
            }
        }

        stream.Status = StreamStatus.Ended;
        stream.EndedAt = DateTime.UtcNow;

        _streamRepository.Update(stream);

        await _streamRepository.SaveChangesAsync();
    }
}