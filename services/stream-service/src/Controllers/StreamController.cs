using IncidentSphere.StreamService.Dtos;
using IncidentSphere.StreamService.Services;
using IncidentSphere.StreamService.Shared.Utilities;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/streams")]
public class StreamController : ControllerBase
{


    private readonly IStreamService _streamService;

    public StreamController(IStreamService streamService)
    {
        _streamService = streamService;
    }


    //create the interactive stream for the incident(manual)
    [HttpPost("create")]
    public async Task<ActionResult<ApiResponse<CreateStreamResponse>>> Create(
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


    //join the interactive stream for the incident
    [HttpPost("join")]
    public async Task<ActionResult<ApiResponse<JoinRoomResponse>>> Join(
        JoinRoomRequest request,
        CancellationToken cancellationToken)
    {
        var result = await _streamService.JoinRoomAsync(
            request,
            cancellationToken);

        return Ok(ApiResponse<JoinRoomResponse>.SuccessResponse(
                result,
                "Joined room"));
    }


    // stop the active interactive stream
    [HttpPost("end")]
    public async Task<ActionResult<ApiResponse<string>>> EndStream(EndStreamRequest request)
    {
        await _streamService.EndStreamAsync(request.StreamId);

        return Ok(ApiResponse<string>.SuccessResponse(
                string.Empty,
                "Stream ended successfully."));
    }
}