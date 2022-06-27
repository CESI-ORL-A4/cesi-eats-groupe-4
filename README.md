# Setup environment variables

Create a .env file in the root directory with the following variables defined:

```ini
############## RABBITMQ ##############

RABBITMQ_HOST=rabbitmq
RABBITMQ_DEFAULT_PASS=dkoefi!ooz93
RABBITMQ_DEFAULT_USER=admin

############## API GATEWAY ##############

API_GATEWAY_PORT=4000

############## AUTH MICROSERVICE ##############

AUTH_JWT_ACCESS_SECRET=llkdkofp20
AUTH_JWT_ACCESS_TOKEN_LIFE=8h
AUTH_JWT_REFRESH_SECRET=ll!03ofp20
AUTH_JWT_REFRESH_TOKEN_LIFE=7d

AUTH_SERVICE_DB_HOST=auth-service-db
AUTH_SERVICE_DB_PASSWORD=pkSodmp45ni
AUTH_SERVICE_API_HOST=auth-service-api
AUTH_SERVICE_API_PORT=8080

############## USER MICROSERVICE ##############

USER_SERVICE_DB_HOST=user-service-db
USER_SERVICE_DB_PASSWORD=A/Sdministrateurdu45
USER_SERVICE_API_HOST=user-service-api
USER_SERVICE_API_PORT=3000

DEFAULT_USER_TECHNIC_EMAIL=technic@gmail.com
DEFAULT_USER_TECHNIC_PASS=admin
```
# Run the app

Docker is required to run the app.

From the root directory execute:

`docker-compose build`

`docker-compose up`

# Data persistence

To keep the data of the two SQL Server database when the containers go down, create two empty directories by executing the two following commands from the root directory:

`mkdir auth-microservice/mssql/data`

`mkdir user-microservice/mssql/data`
