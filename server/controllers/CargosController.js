const { Op } = require("sequelize");
const Cargo = require("../models/Cargo");
const Usuario = require("../models/Usuario");

module.exports = class CentroDeCustosController {

  static async novo(req, res) {
    const { nome } = req.body
    if (!nome) {
      res.status(422).json({message: 'O nome é obrigatório'})
      return
    }
    const cargoExist = await Cargo.findOne({where:{nome}})
    if (cargoExist) {
      res.status(422).json({message: 'Já existe um cargo com esse nome'})
      return
    }
    const cargo = new Cargo({
      nome
    })
    try {
      const novoCargo = await cargo.save()
      res.status(200).json({
        response: true,
        message: 'Inserido',
        payload: novoCargo
      })
    } catch(error) {
      res.status(500).json({message: error})
    }
  }

  static async cargoPorId(req, res) {
    const id = req.params.id
    const cargo = await Cargo.findByPk(id)
    if (!cargo) {
      res.status(422).json({message: 'Esse cargo não existe'})
      return
    }
    res.status(200).json({
      response: true,
      message: 'Encontrado',
      payload: cargo
    })
  }

  static async atualize(req, res) {
    const id = req.params.id
    const { nome } = req.body
    const cargo = await Cargo.findByPk(id)
    if (!cargo) {
      res.status(422).json({message: 'Esse cargo não existe'})
      return
    }
    if (!nome) {
      res.status(422).json({message: 'O nome é obrigatório'})
      return
    }
    const cargoExist = await Cargo.findOne({
      where:{
        nome:{
          [Op.eq]:nome,
        },id:{
          [Op.ne]:id
        }
      }
    })
    if (cargoExist) {
      res.status(422).json({message: 'Já existe um cargo com esse nome'})
      return
    }
    try {
      const result = await cargo.update({nome})
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
    const cargo = await Cargo.findByPk(id)
    if (!cargo) {
      res.status(422).json({message: 'Esse cargo não existe'})
      return
    }
    const usuariosNesteCusto = await Usuario.findOne({
      where:{
        cargos_id:{
          [Op.eq]:id
        }
      }
    })
    if (usuariosNesteCusto) {
      res.status(422).json({message: 'Há usuários com esse cargo, resolva antes'})
      return
    }
    try {
      const result = await cargo.destroy()
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
      const result = await Cargo.findAndCountAll({
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
        pagina: parseInt(pagina),
        porpagina: parseInt(porpagina),
        paginas
      }
    })
  }

  static async todos(req, res) {
    const result = await Cargo.findAll({
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
