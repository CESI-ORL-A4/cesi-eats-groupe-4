const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger_output.json';
const endpointsFiles = [
    './src/routes/authRoutes.ts',
    './src/routes/usersRoutes.ts',
    './src/routes/ordersRoutes.ts',
    './src/routes/catalogRoutes.ts',
    './src/routes/notificationsRoutes.ts'
    './src/routes/deliveriesRoutes.ts'
];

swaggerAutogen(outputFile, endpointsFiles);
