FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["BmxApi/BmxApi.csproj", "BmxApi/"]
RUN dotnet restore "BmxApi/BmxApi.csproj"
COPY . .
WORKDIR "/src/BmxApi"
RUN dotnet build "BmxApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BmxApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BmxApi.dll"]
