const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const CentroDeCusto = db.define('CentroDeCusto', {
  nome: {
    type: DataTypes.STRING(60),
    allowNull: false,
    required: true
  }
},{
  tableName: 'centro_de_custos'
})

module.exports = CentroDeCusto

const Departamento = require('./Departamento');
CentroDeCusto.hasMany(Departamento,{
  foreignKey: 'centro_de_custos_id'
})
