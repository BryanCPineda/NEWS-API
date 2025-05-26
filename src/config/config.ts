import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  db: {
    uri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.jk1aq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.DB_CLUSTER}`,
  },
  nodeEnv: process.env.NODE_ENV || 'development',
  enableSwagger: process.env.ENABLE_SWAGGER === 'true',
};

export default config;
