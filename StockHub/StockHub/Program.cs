using Microsoft.EntityFrameworkCore;
using StockHub.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();// Capturando string de conexão do appsettings
var connectionString = builder.Configuration.GetConnectionString("Default");

// Configurando o DbContext
builder.Services.AddDbContext<ConnectionContext>(options =>
{
    options.UseNpgsql(connectionString,
        b => b.MigrationsAssembly(typeof(ConnectionContext).Assembly.FullName));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseAuthorization();

app.MapControllers();

app.Run();
