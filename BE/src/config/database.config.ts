export const DatabaseConfig = () => ({
    mongoDbConfig: {
        CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017/DB_nest_format_1',
    }
  });
  