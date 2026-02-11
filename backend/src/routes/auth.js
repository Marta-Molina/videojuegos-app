const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

// Register
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    if (!email || !password || !nombre) return res.status(400).json({ message: 'nombre, email y password son requeridos' });
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Email ya registrado' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ nombre, email, password: hash });
    const safeUser = { id: user.id, nombre: user.nombre, email: user.email, role: user.role };
    res.status(201).json({ user: safeUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'email y password son requeridos' });
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Credenciales inválidas' });
    const payload = { id: user.id, email: user.email, role: user.role, nombre: user.nombre };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '12h' });
    const safeUser = { id: user.id, nombre: user.nombre, email: user.email, role: user.role };
    res.json({ accessToken: token, user: safeUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
});

module.exports = router;
