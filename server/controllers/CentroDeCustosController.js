const CentroDeCusto = require('../models/CentroDeCusto')
const Departamento = require('../models/Departamento')
const { Op } = require("sequelize");

module.exports = class CentroDeCustosController {
  static async novo(req, res) {
    const { nome } = req.body
    if (!nome) {
      res.status(422).json({message: 'O nome é obrigatório'})
      return
    }
    const centroExist = await CentroDeCusto.findOne({where:{nome}})
    if (centroExist) {
      res.status(422).json({message: 'Já existe um centro de custos com esse nome'})
      return
    }
    const centrodecustos = new CentroDeCusto({
      nome
    })
    try {
      const novoCentroDeCustos = await centrodecustos.save()
      res.status(200).json({
        response: true,
        message: 'Inserido',
        payload: novoCentroDeCustos
      })
    } catch(error) {
      res.status(500).json({message: error})
    }
  }
  static async centroPorId(req, res) {
    const id = req.params.id
    const centro = await CentroDeCusto.findByPk(id)
    if (!centro) {
      res.status(422).json({message: 'Esse centro de custos não existe'})
      return
    }
    res.status(200).json({
      response: true,
      message: 'Encontrado',
      payload: centro
    })
  }
  static async atualize(req, res) {
    const id = req.params.id
    const { nome } = req.body
    const centro = await CentroDeCusto.findByPk(id)
    if (!centro) {
      res.status(422).json({message: 'Esse centro de custos não existe'})
      return
    }
    if (!nome) {
      res.status(422).json({message: 'O nome é obrigatório'})
      return
    }
    const centroExist = await CentroDeCusto.findOne({
      where:{
        nome:{
          [Op.eq]:nome,
        },id:{
          [Op.ne]:id
        }
      }
    })
    if (centroExist) {
      res.status(422).json({message: 'Já existe um centro de custos com esse nome'})
      return
    }
    try {
      const result = await centro.update({nome})
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
    const { nome } = req.body
    const centro = await CentroDeCusto.findByPk(id)
    if (!centro) {
      res.status(422).json({message: 'Esse centro de custos não existe'})
      return
    }
    const departamentosNesteCusto = await Departamento.findOne({
      where:{
        centro_de_custos_id:{
          [Op.eq]:id
        }
      }
    })
    if (departamentosNesteCusto) {
      res.status(422).json({message: 'Há departamentos dependentes desse centro de custos, resolva antes'})
      return
    }
    try {
      const result = await centro.destroy()
      res.status(200).json({
        response: true,
        message: "Excluido: " + id,
      })
    } catch(error) {
      res.status(500).json({message: error})
      return
    }
  }
  static async pesquisa (req, res) {
    const { nome, porpagina } = req.query
    let { pagina } = req.query
    let offset = pagina ? ((pagina - 1) * porpagina) : 0
    let limit = porpagina ? porpagina : 15
    let paginas = 0
    let count = 0
    let rows = []
    let where = {}
    const nomeCheck = nome ? nome : ""
    if (nome) {
      where = {
        nome: {
          [Op.like]: '%' + nomeCheck + '%'
        }
      }
    }
    while (true) {
      const result = await CentroDeCusto.findAndCountAll({
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
        pagina: parseInt(pagina),
        porpagina: parseInt(porpagina),
        paginas,
        rows
      }
    })
  }
  static async todos(req, res) {
    const result = await CentroDeCusto.findAll({
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
