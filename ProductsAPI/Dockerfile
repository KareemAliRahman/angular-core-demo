FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
# ENV ASPNETCORE_ENVIRONMENT=”Development”
WORKDIR /app


# Copy csproj and restore as distinct layers
COPY ./ProductsAPI ./
RUN dotnet restore

# Copy everything else and build
# RUN dotnet publish -c Release -o out

# Build runtime image
# FROM mcr.microsoft.com/dotnet/aspnet:5.0
# WORKDIR /app
# COPY --from=build-env /app/out .

# ENV ASPNETCORE_URLS=http://+:44365
# ENV ASPNETCORE_URLS="https://+;http://+" 
# ENV ASPNETCORE_HTTPS_PORT=44365
# EXPOSE 44365
# ENTRYPOINT ["dotnet", "ProductsAPI.dll"]
ENTRYPOINT ["dotnet", "run", "--urls", "http://0.0.0.0:44365"]