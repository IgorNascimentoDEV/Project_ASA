using Microsoft.EntityFrameworkCore;
using StockHub.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Capturando string de conexão do Banco de dados
var connectionString = builder.Configuration.GetConnectionString("Default");
//Realizando a config com o banco
builder.Services.AddDbContext<ConnectionContext>(options =>
{
    options.UseNpgsql(connectionString,
        b => b.MigrationsAssembly(typeof(ConnectionContext).Assembly.FullName));
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
