export const config = {
  PORT: parseInt(process.env.API_PORT, 10),
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'super secret key',
};
