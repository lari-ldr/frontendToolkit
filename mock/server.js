const express = require('express');
const cors = require('cors');

const prepareTree = require('./endpoints/tree');

const app = express();
const port = 3000;

// Configurar CORS para permitir todas as origens
app.use(cors());

// Ou especificar origens permitidas
// app.use(cors({ origin: 'http://localhost:5173' }));

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Mock Server');
});

prepareTree(app);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
