# Setup env variables

Create a .env file in the root directory with the following variables defined:

```ini
############## AUTH MICROSERVICE ##############

AUTH_JWT_ACCESS_SECRET=llkdkofp20
AUTH_JWT_ACCESS_TOKEN_LIFE=8h
AUTH_JWT_REFRESH_SECRET=ll!03ofp20
AUTH_JWT_REFRESH_TOKEN_LIFE=7d

AUTH_DEFAULT_TECHNIC_EMAIL=technic@gmail.com
AUTH_DEFAULT_TECHNIC_PASS=lpf!49k

AUTH_SERVICE_DB_HOST=auth-service-db
AUTH_SERVICE_DB_PASSWORD=pkSodmp45ni
AUTH_SERVICE_API_PORT=8080

############## USER MICROSERVICE ##############

USER_SERVICE_DB_HOST=user-service-db
USER_SERVICE_DB_PASSWORD=A/Sdministrateurdu45
USER_SERVICE_API_PORT=3000
```
# Run the app

Docker is required to run the app.

From the root directory execute:

`docker-composer build`
`docker-composer up`
