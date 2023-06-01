using Projects.Services;
using Projects.Types.Models;

var originsSettingsName = "_originsSettings";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(
		name: originsSettingsName,
        policy  =>
        {
            policy.WithOrigins("http://localhost");
        });
});

// Add services to the container.

builder.Services.AddControllers();

builder.Services.Configure<ApiKeysDatabaseSettings>(builder.Configuration.GetSection("ApiKeysDatabase"));

builder.Services.AddSingleton<ApiKeysService>();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseCors(originsSettingsName);

app.UseAuthorization();

app.MapControllers();

app.Run();
