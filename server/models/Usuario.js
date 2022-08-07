const { DataTypes, Deferrable } = require('sequelize');
const db = require('../db/conn');

const Usuario = db.define('Usuario', {
  nome: {
    type: DataTypes.STRING(40),
    allowNull: false,
    required: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    required: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    required: false,
    allowNull: true
  }
},{
  tableName: 'usuarios'
})

module.exports = Usuario

const Cargo = require('./Cargo');
const Departamento = require('./Departamento');
Usuario.belongsTo(Departamento,{
  foreignKey: 'departamentos_id'
})
Usuario.belongsTo(Cargo,{
  foreignKey: 'cargos_id'
})
