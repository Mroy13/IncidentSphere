using FluentValidation;
using IncidentSphere.StreamService.Configurations;
using IncidentSphere.StreamService.Data;
using IncidentSphere.StreamService.Models;
using IncidentSphere.StreamService.Repositories.Implementations;
using IncidentSphere.StreamService.Repositories.Interfaces;
using IncidentSphere.StreamService.Services;
using IncidentSphere.StreamService.Services.LiveKit;
using IncidentSphere.StreamService.Shared.Middleware;
using IncidentSphere.StreamService.Shared.Stores;
using IncidentSphere.StreamService.Validators;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("ClientApp", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:5173",
                "http://127.0.0.1:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<AppConfig>(
    builder.Configuration.GetSection("AppConfig"));

var appConfig = builder.Configuration
    .GetSection("AppConfig")
    .Get<AppConfig>();

if (appConfig?.DbConfig == null ||
    string.IsNullOrWhiteSpace(appConfig.DbConfig.ConnectionString))
{
    throw new Exception("Database config is missing or invalid");
}

builder.Services.AddDbContext<AppDbContext>(options =>
{
    if (appConfig.DbConfig.Provider == "Postgres")
    {
        options.UseNpgsql(appConfig.DbConfig.ConnectionString);
    }
    else
    {
        throw new Exception("Unsupported DB provider");
    }
});


builder.Services.AddValidatorsFromAssemblyContaining<ScheduleStreamRequestValidator>();

// Feature dependencies
//builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IRepository<VideoStream>, Repository<VideoStream>>();
builder.Services.AddScoped<IRepository<Room>, Repository<Room>>();

builder.Services.AddScoped<IStreamService, StreamService>();
builder.Services.AddSingleton<IIncidentMemoryStore, IncidentMemoryStore>();
builder.Services.AddScoped<ILiveKitService, LiveKitService>();
builder.Services.AddHttpContextAccessor();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("ClientApp");

app.UseMiddleware<ExceptionMiddleware>();
app.UseMiddleware<MockUserMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
