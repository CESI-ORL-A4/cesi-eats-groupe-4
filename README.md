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

############## ORDER MICROSERVICE ##############

ORDER_SERVICE_DB_NAME=Orders
ORDER_SERVICE_DB_HOST=order-service-db
ORDER_SERVICE_DB_USERNAME=admin
ORDER_SERVICE_DB_PASSWORD=97ded!1lp

ORDER_SERVICE_API_HOST=order-service-api
ORDER_SERVICE_API_PORT=5000

############## CATALOG MICROSERVICE ##############

CATALOG_DB_USERNAME=admin
CATALOG_DB_PASSWORD=admin
CATALOG_DB_DATABASE=catalog
CATALOG_DB_PORT=27017
CATALOG_DB_HOST=catalog-service-db
CATALOG_SERVICE_API_HOST=catalog-service-api
CATALOG_SERVICE_API_PORT=8080

############## NOTIFICATION MICROSERVICE ##############

NOTIFICATION_DB_USERNAME=admin
NOTIFICATION_DB_PASSWORD=admin
NOTIFICATION_DB_DATABASE=notification
NOTIFICATION_DB_PORT=27017
NOTIFICATION_DB_HOST=notification-service-db
NOTIFICATION_SERVICE_API_HOST=notification-service-api
NOTIFICATION_SERVICE_API_PORT=8080

############## DELIVERY MICROSERVICE ##############

DELIVERY_SERVICE_DB_NAME=Deliveries
DELIVERY_SERVICE_DB_HOST=delivery-service-db
DELIVERY_SERVICE_DB_USERNAME=admin
DELIVERY_SERVICE_DB_PASSWORD=97ded!1lp

DELIVERY_SERVICE_API_HOST=delivery-service-api
DELIVERY_SERVICE_API_PORT=6000
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

`mkdir -p order-microservice/mongo/data`

`mkdir -p catalog-microservice/mongo/data`

`mkdir -p notification-microservice/mongo/data`

`mkdir -p delivery-microservice/mongo/data`
