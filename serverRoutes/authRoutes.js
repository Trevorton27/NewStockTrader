const express = require('express');
const router = express.Router();
const pool = require('../database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  try {
    const { user, email, password } = req.body;

    const userSelected = await pool.query(
      'SELECT * FROM users WHERE user_email = $1',
      [email]
    );

    if (userSelected.rows.length > 0) {
      return res.status(401).json('Invalid credentials.');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await pool.query(
      'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',
      [user, email, hashedPassword]
    );

    //console.log('newUser: ', newUser);
    res.json({ id: newUser.rows[0].user_id, name: newUser.rows[0].user_name });
  } catch (err) {
    console.error('error from server- create new holding', err.message);
    res.status(500).json({
      errorMessage: 'Something went wrong on the server. Please try again.'
    });
  }
});

router.get('/login', async (req, res) => {
  try {
    const { username, password } = req.query;
    const user = { name: username };
    const result = await pool.query(
      'SELECT * FROM users WHERE user_name = ($1)',
      [username]
    );

    const isAuthenticated = jwt.sign(user, process.env.TOKEN_SECRET_KEY, {
      expiresIn: '3600000'
    });

    const match = bcrypt.compare(password, result.rows[0].password);
    if (match) {
      res.json({
        id: result.rows[0].user_id,
        name: result.rows[0].user_name
      });
      // res.cookie('authToken', isAuthenticated, { httpOnly: true });
    } else {
      return res.status(401).json('Invalid credentials.');
    }
  } catch (err) {
    console.error('error from server- create new holding', err.message);
    res.status(500).json({
      errorMessage: 'Something went wrong on the server. Please try again.'
    });
  }
});

module.exports = router;
