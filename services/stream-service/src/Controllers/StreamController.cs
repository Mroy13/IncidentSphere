using IncidentSphere.StreamService.Dtos;
using IncidentSphere.StreamService.Services;
using IncidentSphere.StreamService.Shared.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace IncidentSphere.StreamService.Controllers;

[ApiController]
[Route("api/streams")]
public class StreamController : ControllerBase
{
    private readonly IStreamService _streamService;

    public StreamController( IStreamService streamService)
    {
        _streamService =  streamService;
    }

    [HttpPost("schedule")]
    public async Task<IActionResult>ScheduleStream( [FromBody] ScheduleStreamRequest request, CancellationToken cancellationToken)
    {
        await _streamService.ScheduleStreamAsync(request, cancellationToken);

        return StatusCode(StatusCodes.Status201Created, ApiResponse<string>
              .SuccessResponse( string.Empty, "Stream scheduled successfully."));
    }
}