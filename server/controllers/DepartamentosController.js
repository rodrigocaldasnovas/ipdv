var Departamento = require('../models/Departamento');
var CentroDeCusto = require('../models/CentroDeCusto')
const { Op } = require("sequelize");
const Usuario = require('../models/Usuario');

module.exports = class CentroDeCustosController {
  static async novo(req, res) {
    const { nome, centro_de_custos_id } = req.body
    if (!nome) {
      res.status(422).json({message: 'O nome é obrigatório'})
      return
    }
    if (!centro_de_custos_id) {
      res.status(422).json({message: 'O centro de custos é obrigatório'})
      return
    }
    const departamentoExist = await Departamento.findOne({where:{nome}})
    if (departamentoExist) {
      res.status(422).json({message: 'Já existe um departamento com esse nome'})
      return
    }
    const centroExist = await CentroDeCusto.findByPk(centro_de_custos_id)
    if (!centroExist) {
      res.status(422).json({message: 'Sem um centro de custos válido não posso salvar'})
      return
    }
    const departamento = new Departamento({
      nome, centro_de_custos_id
    })
    try {
      const novoDepartamento = await departamento.save()
      res.status(200).json({
        response: true,
        message: 'Inserido',
        payload: novoDepartamento
      })
    } catch(error) {
      res.status(500).json({message: error})
    }

  }
  static async departamentoPorId(req, res) {
    const id = req.params.id
    const departamento = await Departamento.findByPk(id)
    if (!departamento) {
      res.status(422).json({message: 'Esse departamento não existe'})
      return
    }
    res.status(200).json({
      response: true,
      message: 'Encontrado',
      payload: departamento
    })
  }
  static async atualize(req, res) {
    const id = req.params.id
    const { nome, centro_de_custos_id } = req.body
    const departamento = await Departamento.findByPk(id)
    if (!departamento) {
      res.status(422).json({message: 'Esse departamento não existe'})
      return
    }
    if (!nome) {
      res.status(422).json({message: 'O nome é obrigatório'})
      return
    }
    if (!centro_de_custos_id) {
      res.status(422).json({message: 'O centro de custos é obrigatório'})
      return
    }
    const departamentoExist = await Departamento.findOne({
      where:{
        nome:{
          [Op.eq]:nome,
        },id:{
          [Op.ne]:id
        }
      }
    })
    if (departamentoExist) {
      res.status(422).json({message: 'Já existe um departamento com esse nome'})
      return
    }
    const centroExist = await CentroDeCusto.findByPk(centro_de_custos_id)
    if (!centroExist) {
      res.status(422).json({message: 'Sem um centro de custos válido não posso salvar'})
      return
    }
    try {
      const result = await departamento.update({nome,centro_de_custos_id})
      res.status(200).json({
        response: true,
        message: "Alterado",
        payload: result
      })
    } catch(error) {
      res.status(500).json({message: error})
      return
    }
  }
  static async delete (req, res) {
    const id = req.params.id
    const departamento = await Departamento.findByPk(id)
    if (!departamento) {
      res.status(422).json({message: 'Esse departamento não existe'})
      return
    }
    const ususariosNesteDepartamento = await Usuario.findOne({
      where:{
        departamentos_id:{
          [Op.eq]:id
        }
      }
    })
    if (ususariosNesteDepartamento) {
      res.status(422).json({message: 'Há usuários dependentes desse departamento, resolva antes'})
      return
    }
    try {
      const result = await departamento.destroy()
      res.status(200).json({
        response: true,
        message: "Excluido: " + id,
      })
    } catch(error) {
      res.status(500).json({message: error})
      return
    }
  }
  static async pesquisa(req, res) {
    const { nome, porpagina, centro_de_custos_id } = req.query
    let { pagina } = req.query
    let offset = pagina ? ((pagina - 1) * porpagina) : 0
    let limit = porpagina ? porpagina : 15
    let paginas = 0
    let count = 0
    let rows = []
    let where = {}
    if (centro_de_custos_id && parseInt(centro_de_custos_id) !== 0) {
      where.centro_de_custos_id = {
          [Op.eq]: centro_de_custos_id
        }
    }
    if (nome) {
      where.nome = {
          [Op.like]: '%' + nome + '%'
        }
    }
    console.log(where)
    while (true) {
      const result = await Departamento.findAndCountAll({
        where,
        order: [
          ['nome', 'ASC'],
        ],
        offset,
        limit
      });
      count = result.count
      rows = result.rows
      if (count == 0) {
        paginas = 0
        pagina = 1
        break
      }
      paginas = Math.ceil(count / porpagina)
      if (pagina > paginas) {
        pagina = paginas
        offset = ((pagina - 1) * porpagina)
      } else {
        break
      }
    }
    res.status(200).json({
      response: true,
      payload: {
        count,
        rows,
        pagina,
        porpagina,
        paginas
      }
    })
  }
  static async todos(req, res) {
    const result = await Departamento.findAll({
      order: [
        ['nome', 'ASC'],
      ]
    });
    res.status(200).json({
      response: true,
      payload: result
    })
  }
}
