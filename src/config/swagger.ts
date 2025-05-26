import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Noticias',
      version: '1.0.0',
      description: 'API REST para noticias',
    },
    servers: [
      {
        url: '/api/v1',
        description: 'API v1',
      },
    ],
    components: {
      schemas: {
        News: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            link: { type: 'string' },
            description: { type: 'string' },
            date: { type: 'string', format: 'date-time' },
            image: { type: 'string' },
            section: { type: 'string' },
            source: { type: 'string' },
            tags: { 
              type: 'array',
              items: { type: 'string' }
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            error: { type: 'object' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts']
};

export const specs = swaggerJsdoc(options);