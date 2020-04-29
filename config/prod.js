// PRODUCTION KEYS
require('dotenv').config()

module.exports = {
  // APP
  SERVER_HOST:
    process.env.DEV_HOST,

  CLIENT_HOST:
    process.env.PROD_HOST,

  // MONGODB
  MONGO_CLIENT_SECRET:
    process.env.MONGO_CLIENT_SECRET,

  MONGODB_URI:
    process.env.MONGODB_URI,

  SECRET_KEY:
    process.env.SECRET_KEY,

  // GOOGLE
  GOOGLE_CALLBACK_URL:
    process.env.GOOGLE_CALLBACK_URL,

  GOOGLE_CLIENT_SECRET:
    process.env.GOOGLE_CLIENT_SECRET,

  GOOGLE_CLIENT_ID:
    process.env.GOOGLE_CLIENT_ID,

  // TWILIO
  TWILIO_PHONE_NUMBER:
    process.env.TWILIO_PHONE_NUMBER,

  TWILIO_ACCOUNT_SID:
    process.env.TWILIO_ACCOUNT_SID,

  TWILIO_AUTH_TOKEN:
    process.env.TWILIO_AUTH_TOKEN,

  // Cloudinary
  CLOUDINARY_CLOUD_NAME:
    process.env.CLOUDINARY_CLOUD_NAME,

  CLOUDINARY_API_SECRET:
    process.env.CLOUDINARY_API_SECRET,

  CLOUDINARY_API_KEY:
    process.env.CLOUDINARY_API_KEY,



}