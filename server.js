require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const pool = require('./database/db');

app.use('/', express.static(path.join(__dirname, 'client/build')));

app.use(express.json());
app.use('/api/holdings/', require('./serverRoutes/holdingsRoutes'));
app.use('/api/portfolio/', require('./serverRoutes/portfolioRoutes'));
app.use('/api/auth/', require('./serverRoutes/authRoutes'));
app.use('/api/stocks/', require('./serverRoutes/apiRoutes'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

pool.connect();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on port: ${PORT}`));
