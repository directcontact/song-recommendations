require('dotenv').config();
module.exports = {
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_ID_SECRET: process.env.CLIENT_ID_SECRET,
    BASE_URL_DEV: process.env.BASE_URL_DEV,
    BASE_URL_PROD: process.env.BASE_URL_PROD,
    MONGO_ATLAS_ID: process.env.MONGO_ATLAS_ID,
    MONGO_ATLAS_PW: process.env.MONGO_ATLAS_PW,
    CALLBACK: process.env.CALLBACK,
    ENV: process.env.NODE_ENV
  }
};
