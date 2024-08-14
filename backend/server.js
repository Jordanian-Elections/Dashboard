

const express = require('express');
const cors = require('cors');
const knex = require('knex');
const knexConfig = require('./knexfile');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes'); // Correct the typo
const circlesRoutes = require('./routes/circlesRoutes');
const listRoutes = require('./routes/listRoutes');
const candidateRoutes = require('./routes/candidateRoutes');


const app = express();
const db = knex(knexConfig.development);

app.use(cors());
app.use(express.json()); // This is enough for parsing JSON, no need for bodyParser.json()

app.use(express.urlencoded({ extended: true }));

// Use the routes
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/circles', circlesRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/candidates', candidateRoutes);


// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
