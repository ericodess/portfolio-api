#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base

WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

WORKDIR /src

COPY ["Projects.csproj", "."]

RUN dotnet restore "./Projects.csproj"

COPY . .

WORKDIR "/src/."

RUN dotnet build "Projects.csproj" -c Release -o /app/build

FROM build AS publish

RUN dotnet publish "Projects.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final

WORKDIR /app

COPY --from=publish /app/publish .

EXPOSE 9001

ENV ASPNETCORE_URLS=http://*:9001

ENTRYPOINT ["dotnet", "Projects.dll"]