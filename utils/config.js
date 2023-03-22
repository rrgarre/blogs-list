require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const SECRET_FOR_JWT = process.env.SECRET_FOR_JWT

module.exports = {
  PORT,
  MONGODB_URI,
  SECRET_FOR_JWT
}