using IncidentSphere.StreamService.Dtos;
using IncidentSphere.StreamService.Services;
using IncidentSphere.StreamService.Shared.Utilities;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/stream")]
public class StreamController : ControllerBase
{
    private readonly IStreamService _streamService;

    public StreamController(IStreamService streamService)
    {
        _streamService = streamService;
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create(
        CreateStreamRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _streamService.CreateStreamAsync(
            request,
            cancellationToken);

        return StatusCode(
            StatusCodes.Status201Created,
            ApiResponse<CreateStreamResponse>.SuccessResponse(
                result,
                "Stream created"));
    }

    [HttpPost("join")]
    public async Task<IActionResult> Join(
        JoinRoomRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _streamService.JoinRoomAsync(
            request,
            cancellationToken);

        return StatusCode(
            StatusCodes.Status200OK,
            ApiResponse<JoinRoomResponse>.SuccessResponse(
                result,
                "Joined room"));
    }

    [HttpPost("end")]
    public async Task<IActionResult> EndStream(
    [FromBody] EndStreamRequest request)
    {
        await _streamService.EndStreamAsync(request.StreamId);

        return StatusCode(
            StatusCodes.Status200OK,
            ApiResponse<string>.SuccessResponse(
                string.Empty,
                "Stream ended successfully."));
    }
}