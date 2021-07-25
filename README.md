## Products app: 
### Angular - dotnet core 5.0 - postgres/mssql demo

## App architecture:
- **api**: dotnet core app
- **front**:
  - angular
  - tailwind css
- **database**:
  - mssql, or
  - postgres

## build environment instructions:
### for postgres db (recommended)
- make sure docker is installed
- git clone <repo>
- docker-compose -f docker-compose-postgres.yml up -d

### for mssql db
- make sure docker is installed
- git clone <repo>
- docker-compose -f docker-compose-mssql.yml up -d

### sagger api for the product dotnet app
- http://localhost:44365/swagger/index.html


### login with 3 users with different roles:
- admin:
  - username: admin
  - password: admin
- manager:
  - username: manager
  - password: manager
- customer:
  - username: customer
  - password: customer

### rebuild docker-compose file after changes
- docker-compose -f docker-compose-postgres.yml up -d --build

### destroy containers
- docker-compose -f docker-compose-postgres.yml down