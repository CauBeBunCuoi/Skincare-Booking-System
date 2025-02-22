export const AppConfig = () => ({
    appConfig: {
        APP_PORT: process.env.APP_PORT || 8000,
        BASE_URL: process.env.BASE_URL || 'http://localhost:8000',
    },
    imagePathConfig: {
        ACCOUNT_IMAGE_PATH: process.env.ACCOUNT_IMAGE_PATH ,
        SERVICE_IMAGE_PATH: process.env.SERVICE_IMAGE_PATH ,
    }
  });
  