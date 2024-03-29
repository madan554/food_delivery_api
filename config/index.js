require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000, // Port for the server to listen on
  mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/food_delivery_app', // MongoDB connection URI
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key_here', // Secret key for JWT authentication
};
