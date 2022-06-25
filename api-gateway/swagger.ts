const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = [
    './src/routes/authRoutes.ts',
    './src/routes/userRoutes.ts'
];

swaggerAutogen(outputFile, endpointsFiles);
