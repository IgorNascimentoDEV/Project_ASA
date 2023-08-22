using Api.Domain.Interfaces;
using Api.Infrastructure.Context;
using Api.Infrastructure.Repositories;
using Microsoft.AspNetCore.Connections;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container. Configuração para utilizar o join do fluent API

builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});

// Middleware
builder.Services.AddCors();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Adicionando injeção de dependencias
builder.Services.AddScoped<IBaseRepository, BaseRepository>();
builder.Services.AddScoped<IColaboradorRepository, ColaboradorRepository>();
builder.Services.AddScoped<IMovimentacaoRepository, MovimentacaoRepository>();

//Configurando autoMapper
builder.Services.AddAutoMapper(typeof(Program));

//Capturando string de conexão do Banco de dados
var connectionString = builder.Configuration.GetConnectionString("Default");

// Configurando o DbContext
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseNpgsql(connectionString,
              assembly => assembly.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();
app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.Run();