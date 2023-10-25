using System.Text;
using AutoMapper;
using BmxApi.Dtos;
using BmxApi.Interfaces;
using BmxApi.Mapping;
using BmxApi.Repositories;
using BmxApi.Services;
using BmxApi.Validations;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace BmxApi.Extensions;

public static class ModulesExtension
{
    // Function AddServices
    public static IServiceCollection AddServices(this IServiceCollection services)
    {
        // Add auth service
        services.AddScoped<IAuthService, AuthService>();
        // Add auth repository
        services.AddScoped<IAuthRepository, AuthRepository>();

        // Add bike service
        services.AddScoped<IBikeService, BikeService>();
        // Add user service
        services.AddScoped<IUserService, UserService>();

        // Add bike repository
        services.AddScoped<IBikeRepository, BikeRepository>();
        // Add user repository
        services.AddScoped<IUserRepository, UserRepository>();

        return services;
    }

    // Function AddAutoMapper
    public static IServiceCollection AddMapping(this IServiceCollection services)
    {
        // Auto Mapper Configurations
        var mapperConfig = new MapperConfiguration(mc => { mc.AddProfile(new MappingProfile()); });

        IMapper mapper = mapperConfig.CreateMapper();
        services.AddSingleton(mapper);

        return services;
    }

    // Function AddFluentValidationAutoValidation
    public static IServiceCollection AddValidators(this IServiceCollection services)
    {
        // Add validators
        services.AddScoped<IValidator<BikeDto>, BikeValidator>();
        services.AddScoped<IValidator<UserDto>, UserValidator>();

        return services;
    }

    // Function Authenticate
    public static IServiceCollection AddAuthenticate(this IServiceCollection services, IConfiguration configuration)
    {
        // Configure strongly typed settings objects
        var appSettingsSection = configuration.GetSection("AppSettings").GetSection("SecretKey");
        // KeyBytes
        if (appSettingsSection.Value != null)
        {
            var keyBytes = Encoding.ASCII.GetBytes(appSettingsSection.Value);

            // Configure jwt authentication

            services.AddAuthentication(config =>
            {
                config.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                config.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(config =>
            {
                config.RequireHttpsMetadata = false;
                config.SaveToken = false;
                config.TokenValidationParameters = new TokenValidationParameters
                {
                    // Validate the JWT Issuer (iss) claim
                    ValidateIssuer = false,
                    // Validate the JWT Audience (aud) claim
                    ValidateAudience = false,
                    // Validate the token expiry
                    ValidateLifetime = true,
                    // Validate the token signing key
                    ValidateIssuerSigningKey = true,
                    // Set the token signing key
                    IssuerSigningKey = new SymmetricSecurityKey(keyBytes)
                };
            });
        }

        return services;
    }
}