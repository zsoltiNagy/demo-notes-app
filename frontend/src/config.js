const config = {
  SENTRY_DSN: "https://0df09cc1d16341a89e0d908b870e9dde@o4505407740379136.ingest.sentry.io/4505407746932736",
  STRIPE_KEY: "pk_test_51NLlJ5A56nO3mGlBhlHtrersfmnyE306TZfpLiwqoMx2KoyL0QOQYTlfVVbUUzyiMAjjHIfCxkLWDMogxTkOGxHC00byoNrsHA",
  MAX_ATTACHMENT_SIZE: 5000000,
  // Backend config
  s3: {
    REGION: process.env.REACT_APP_REGION,
    BUCKET: process.env.REACT_APP_BUCKET,
  },
  apiGateway: {
    REGION: process.env.REACT_APP_REGION,
    URL: process.env.REACT_APP_API_URL,
  },
  cognito: {
    REGION: process.env.REACT_APP_REGION,
    USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
    APP_CLIENT_ID: process.env.REACT_APP_USER_POOL_CLIENT_ID,
    IDENTITY_POOL_ID: process.env.REACT_APP_IDENTITY_POOL_ID,
  },
};

export default config;
