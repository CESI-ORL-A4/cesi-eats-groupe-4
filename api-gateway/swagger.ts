const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = [
    './src/routes/authRoutes.ts',
    './src/routes/usersRoutes.ts',
    './src/routes/ordersRoutes.ts'
];

swaggerAutogen(outputFile, endpointsFiles);
