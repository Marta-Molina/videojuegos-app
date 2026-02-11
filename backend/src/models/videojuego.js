const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Videojuego = sequelize.define('Videojuego', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
    fechaLanzamiento: { type: DataTypes.DATEONLY, allowNull: true },
    compania: { type: DataTypes.STRING, allowNull: true },
    plataformas: { type: DataTypes.TEXT, allowNull: true, get() { const raw = this.getDataValue('plataformas'); return raw ? JSON.parse(raw) : []; }, set(val) { this.setDataValue('plataformas', JSON.stringify(val || [])); } },
    categorias: { type: DataTypes.TEXT, allowNull: true, get() { const raw = this.getDataValue('categorias'); return raw ? JSON.parse(raw) : []; }, set(val) { this.setDataValue('categorias', JSON.stringify(val || [])); } },
    precio: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
    imagen: { type: DataTypes.STRING, allowNull: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  }, {
    tableName: 'videojuegos',
    timestamps: true,
  });

  return Videojuego;
};
