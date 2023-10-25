## Author: [Juan Davdi Jimenez]

## Date: 2023-10-24

## Purpose: .NET Core backend for BMX API

# BMX API .NET Core

## Description

This is a .NET Core project for BMX API, with content endpoints for BMX, showing data in tables how to use the BMX API and use authentication with JWT and database with Entity Framework Core and MySQL.

## Getting Started with .NET Core

```bash
dotnet run
```

## Dependencies with version project

```bash
Project 'BmxApi' has the following package references
   [net7.0]:
   Top-level Package                                    Requested   Resolved
   > AutoMapper                                         12.0.1      12.0.1
   > FluentValidation                                   11.7.1      11.7.1
   > FluentValidation.AspNetCore                        11.3.0      11.3.0
   > Microsoft.AspNetCore.Authentication.JwtBearer      7.0.12      7.0.12
   > Microsoft.AspNetCore.OpenApi                       7.0.12      7.0.12
   > Microsoft.EntityFrameworkCore                      7.0.12      7.0.12
   > MySql.EntityFrameworkCore                          7.0.5       7.0.5
   > Newtonsoft.Json                                    13.0.3      13.0.3
   > Swashbuckle.AspNetCore                             6.5.0       6.5.0
   > System.IdentityModel.Tokens.Jwt                    7.0.2       7.0.2
```

## Documentation API with Swagger

```bash
http://localhost:5090/swagger/index.html
```

## Endpoints

```bash
# Auth endpoints
POST http://localhost:5090/api/Auth/Login # Return token
POST http://localhost:5090/api/Auth/Register # Return user

# User endpoints are protected with JWT
GET http://localhost:5090/api/User
GET http://localhost:5090/api/User/{id}
POST http://localhost:5090/api/User
PUT http://localhost:5090/api/User/{id}
DELETE http://localhost:5090/api/User/{id}

# Bike endpoints are protected with JWT
GET http://localhost:5090/api/Bike
GET http://localhost:5090/api/Bike/{id}
POST http://localhost:5090/api/Bike
PUT http://localhost:5090/api/Bike/{id}
DELETE http://localhost:5090/api/Bike/{id}

```

## License

[MIT](https://choosealicense.com/licenses/mit/)
