import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentation de Dice-forge API',
      version: '1.0.0',
      description: 'Documentation de l\'API de Dice-forge',
    },
  },
  apis: ['./app/**/**/*.js'], // Chemin vers les fichiers .js de vos routes
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
};

export default setupSwagger;
