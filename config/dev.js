// DEVELOPMENT KEYS
require('dotenv').config()
module.exports = {
  SERVER_HOST:
    process.env.DEV_HOST,
  CLIENT_HOST:
    process.env.DEV_CLIENT_HOST,
  MONGODB_URI:
    'mongodb://localhost:27017/hack-subscriptions',

  MONGO_CLIENT_SECRET:
    'hackcheddar',

  SECRET_KEY:
    'hack-sub-secret-key',

  GOOGLE_CLIENT_ID:
    process.env.GOOGLE_CLIENT_ID,

  GOOGLE_CALLBACK_URL:
    process.env.GOOGLE_CALLBACK_URL,

  GOOGLE_CLIENT_SECRET:
    process.env.GOOGLE_CLIENT_SECRET,

  TWILIO_ACCOUNT_SID:
    process.env.TWILIO_ACCOUNT_SID,

  TWILIO_PHONE_NUMBER:
    process.env.TWILIO_PHONE_NUMBER,

  TWILIO_AUTH_TOKEN:
    process.env.TWILIO_AUTH_TOKEN,

  CLOUDINARY_CLOUD_NAME:
    process.env.CLOUDINARY_CLOUD_NAME,

  CLOUDINARY_API_KEY:
    process.env.CLOUDINARY_API_KEY,

  CLOUDINARY_API_SECRET:
    process.env.CLOUDINARY_API_SECRET,
}

