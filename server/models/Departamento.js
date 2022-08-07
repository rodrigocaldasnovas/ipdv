const { DataTypes, Deferrable } = require('sequelize');
const db = require('../db/conn');

const Departamento = db.define('Departamento', {
  nome: {
    type: DataTypes.STRING(60),
    allowNull: false,
    required: true
  }
},{
  tableName: 'departamentos'
})


module.exports = Departamento

const CentroDeCusto = require('./CentroDeCusto');
const Usuario = require('./Usuario');
Departamento.belongsTo(CentroDeCusto,{
  foreignKey: 'centro_de_custos_id'
})
Departamento.hasMany(Usuario,{
  foreignKey: 'departamentos_id'
})
