const cors = require('cors');

const corsOptions = {
  origin: '*', // Permitir todos los orígenes para entorno cerrado
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);