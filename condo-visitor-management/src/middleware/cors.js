const cors = require('cors');

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests from WordPress site
    const allowedOrigins = [
      'http://localhost:8080', // For local development
      'http://localhost:3000', // For local development
      'https://your-wordpress-site.com', // Replace with your WordPress site
      // Add your WordPress site URL here
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);