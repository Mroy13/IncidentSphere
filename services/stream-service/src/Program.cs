using FluentValidation;
using IncidentSphere.StreamService.Configurations;
using IncidentSphere.StreamService.Data;
using IncidentSphere.StreamService.Models;
using IncidentSphere.StreamService.Repositories.Implementations;
using IncidentSphere.StreamService.Repositories.Interfaces;
using IncidentSphere.StreamService.Services;
using IncidentSphere.StreamService.Shared.Middleware;
using IncidentSphere.StreamService.Validators;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<DbConfig>(builder.Configuration.GetSection("DbConfig"));

var dbConfig = builder.Configuration
    .GetSection("DbConfig")
    .Get<DbConfig>();

if (dbConfig == null || string.IsNullOrWhiteSpace(dbConfig.ConnectionString))
    throw new Exception("DbConfig is missing or invalid");

// EF Core setup using strict config
builder.Services.AddDbContext<AppDbContext>(options =>
{
    if (dbConfig.Provider == "Postgres")
    {
        options.UseNpgsql(dbConfig.ConnectionString);
    }
    else
    {
        throw new Exception("Unsupported DB provider");
    }
});


builder.Services.AddValidatorsFromAssemblyContaining<ScheduleStreamRequestValidator>();

// Feature dependencies
builder.Services.AddScoped<IRepository<VideoStream>, Repository<VideoStream>>();

builder.Services.AddScoped<IStreamService, StreamService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseMiddleware<ExceptionMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();
