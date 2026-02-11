const express = require('express');
const router = express.Router();
const { Videojuego, User } = require('../models');
const { authMiddleware } = require('../middleware/auth');

// List all videojuegos (public, but we'll include user info). Support pagination via ?page & ?limit
router.get('/', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1'));
    const limit = Math.min(100, parseInt(req.query.limit || '12'));
    const offset = (page - 1) * limit;
    const { count, rows } = await Videojuego.findAndCountAll({
      include: [{ model: User, as: 'user', attributes: ['id', 'nombre'] }],
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
    res.json({ total: count, page, limit, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
});

// List videojuegos of authenticated user
router.get('/mine', authMiddleware, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1'));
    const limit = Math.min(100, parseInt(req.query.limit || '12'));
    const offset = (page - 1) * limit;
    const { count, rows } = await Videojuego.findAndCountAll({
      where: { userId: req.user.id },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });
    res.json({ total: count, page, limit, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
});

// Get by id
router.get('/:id', async (req, res) => {
  try {
    const juego = await Videojuego.findByPk(req.params.id, { include: [{ model: User, as: 'user', attributes: ['id', 'nombre'] }] });
    if (!juego) return res.status(404).json({ message: 'No encontrado' });
    res.json(juego);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
});

// Create new (authenticated)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const payload = req.body || {};
    // ensure required fields
    if (!payload.nombre) return res.status(400).json({ message: 'nombre es requerido' });
    const newJuego = await Videojuego.create({ ...payload, userId: req.user.id });
    res.status(201).json(newJuego);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
});

// Delete (must be owner or admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const juego = await Videojuego.findByPk(req.params.id);
    if (!juego) return res.status(404).json({ message: 'No encontrado' });
    if (juego.userId !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'No autorizado' });
    await juego.destroy();
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
});

module.exports = router;
