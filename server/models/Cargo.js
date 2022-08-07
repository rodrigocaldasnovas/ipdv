const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Cargo = db.define('Cargo', {
  nome: {
    type: DataTypes.STRING(60),
    allowNull: false,
    required: true
  }
},{
  tableName: 'cargos'
})

module.exports = Cargo

const Usuario = require('./Usuario');
Cargo.hasMany(Usuario,{
  foreignKey: 'cargos_id'
})
