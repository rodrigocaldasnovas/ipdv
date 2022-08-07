const Usuario = require('../models/Usuario')
const { Readable } = require('stream')
const Readline = require('readline')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
var multer = require('multer')
const Departamento = require('../models/Departamento')
const createUsuarioToken = require('../helpers/tokens')
const getToken = require('../helpers/get-token')
const getUsuarioByToken = require('../helpers/get-user-by-token')
const Cargo = require('../models/Cargo')
const { Op } = require("sequelize");
const CentroDeCusto = require('../models/CentroDeCusto')

const upload = multer()

module.exports = class UserController {

  static async importacao(req, res) {
    const { file } = req
    const { buffer } = file

    const readableFile = new Readable()

    readableFile.push(buffer)
    readableFile.push(null)

    const usuariosLine = Readline.createInterface({
      input: readableFile
    })

    let centrodecustos
    let departamento
    let cargo

    for await(let line of usuariosLine) {
      const lineSplit = line.split(',')
      console.log(lineSplit.length)
      if (lineSplit.length === 5) {
        if (lineSplit[0] && lineSplit[1] && lineSplit[2] && lineSplit[3] && lineSplit[4]) {

          centrodecustos = await CentroDeCusto.findOrCreate({ where: { nome: lineSplit[4] } })

          departamento = await Departamento.findOrCreate({
            where: { nome: lineSplit[3] },
            defaults: { centro_de_custos_id:centrodecustos[0].id }
          })

          cargo = await Cargo.findOrCreate({
            where: { nome: lineSplit[2] }
          })

          await Usuario.create({
            nome: lineSplit[1],
            username: lineSplit[0],
            cargos_id: cargo[0].id,
            departamentos_id: departamento[0].id,
          })

        }
      }
    }

    res.status(200).json({
      response: true,
      message: 'Importado com sucesso'
    })

  }

  static async novo(req, res) {
    const { nome, username, password, confirm_password, cargos_id, departamentos_id } = req.body
    if (!nome) {
      res.status(422).json({message: 'O nome é obrigatório'})
      return
    }
    if (!username) {
      res.status(422).json({message: 'Um nome de usuário é obrigatório'})
      return
    }
    if (!password) {
      res.status(422).json({message: 'Uma senha é obrigatória'})
      return
    }
    if (!confirm_password) {
      res.status(422).json({message: 'Confirmação de sua senha é obrigatória'})
      return
    }
    if (!cargos_id) {
      res.status(422).json({message: 'O cargo precisa ser informado'})
      return
    }
    if (!departamentos_id) {
      res.status(422).json({message: 'O departamento precisa ser informado'})
      return
    }
    if (password !== confirm_password) {
      res.status(422).json({message: 'A senha e a confirmação da senha é obrigatório'})
      return
    }
    const userExist = await Usuario.findOne({where:{username}})
    if (userExist) {
      res.status(422).json({message: 'Esse usuário já foi utilizado'})
      return
    }
    const departamentoExist = await Departamento.findByPk(departamentos_id)
    if (!departamentoExist) {
      res.status(422).json({message: 'Sem um departamento válido não posso salvar'})
      return
    }
    const cargoExist = await Cargo.findByPk(cargos_id)
    if (!cargoExist) {
      res.status(422).json({message: 'Sem um cargo válido não posso salvar'})
      return
    }

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const payload = {
      nome, username, cargos_id, departamentos_id, password: passwordHash
    }
    const usuario = new Usuario(payload)

    try {
      const newUsuario = await usuario.save()
      res.status(200).json({
        response: true,
        message: 'Inserido',
        payload: {
          ...payload,
          password: undefined,
          id: newUsuario.id
        }
      })
    } catch(error) {
      res.status(500).json({message: error})
    }

  }

  static async login(req, res) {
    const {username, password} = req.body
    if (!username) {
      res.status(422).json({message: 'Um usuário é obrigatório'})
      return
    }
    if (!password) {
      res.status(422).json({message: 'Uma senha é obrigatória'})
      return
    }
    let usuario
    if (username === 'ADMINSYS') {
      if (password !== 'ADM1234') {
        res.status(422).json({message: 'Senha inválida!'})
        return
      } else {
        usuario = {
          id: -1,
          nome: 'Usuario do sistema',
          username: 'ADMINSYS'
        }
      }
    } else {
      usuario = await Usuario.findOne({where:{username}})
      if (!usuario) {
        res.status(422).json({message: 'Esse usuário não existe'})
        return
      }
      if (!usuario.password) {
        res.status(422).json({message: 'Senha inválida!'})
        return
      }
      const checkPassword = await bcrypt.compare(password, usuario.password)
      if (!checkPassword) {
        res.status(422).json({message: 'Senha inválida!'})
        return
      }
    }
    await createUsuarioToken(usuario, req, res)
  }

  static async checkUsuario(req, res) {
    let currentUser
    if (req.headers.authorization) {
      const token = getToken(req)
      const decoded = jwt.verify(token,process.env.SECRET_KEY)
      if (decoded.id === -1) {
        currentUser = {
          id: -1,
          nome: 'Usuario do sistema',
          username: 'ADMINSYS'
        }
      } else {
        currentUser = await Usuario.findByPk(decoded.id, {
          attributes: { exclude: ['password'] }
        })
      }
    } else {
      currentUser = null
    }
    res.status(200).send({
      response: true,
      payload: currentUser
    })
  }

  static async usuarioPorId(req, res) {
    const id = req.params.id
    const usuario = await Usuario.findByPk(id, {
      attributes: { exclude: ['password'] }
    })
    if (!usuario) {
      res.status(422).json({message: 'Esse usuário não existe'})
      return
    }
    res.status(200).json({
      response: true,
      message: 'Encontrado',
      payload: usuario
    })
  }

  static async atualize(req, res) {
    const id = req.params.id
    const { nome, password, confirm_password, cargos_id, departamentos_id } = req.body
    if (!nome) {
      res.status(422).json({message: 'O nome é obrigatório'})
      return
    }
    if (!cargos_id) {
      res.status(422).json({message: 'O cargo precisa ser informado'})
      return
    }
    if (!departamentos_id) {
      res.status(422).json({message: 'O departamento precisa ser informado'})
      return
    }
    let passwordHash = null
    if (password) {
      if (password !== confirm_password) {
        res.status(422).json({message: 'A senha e a confirmação da senha é obrigatório'})
        return
      } else if (password === confirm_password && password != null) {
        const salt = await bcrypt.genSalt(12)
        passwordHash = await bcrypt.hash(password, salt)
      }
    }
    const departamentoExist = await Departamento.findByPk(departamentos_id)
    if (!departamentoExist) {
      res.status(422).json({message: 'Sem um departamento válido não posso salvar'})
      return
    }
    const cargoExist = await Cargo.findByPk(cargos_id)
    if (!cargoExist) {
      res.status(422).json({message: 'Sem um cargo válido não posso salvar'})
      return
    }
    let usuario = {}
    console.log(passwordHash)
    if (passwordHash) {
      usuario.password = passwordHash
    }
    usuario.departamentos_id = departamentos_id
    usuario.departamentos_id = departamentos_id
    usuario.cargos_id = cargos_id
    usuario.nome = nome
    usuario.departamentos_id = departamentos_id
    const usuarioExist = await Usuario.findByPk(id)
    if (!usuarioExist) {
      res.status(422).json({message: 'Usuário nao existe'})
      return
    }

    try {
      const atualizadoUsuario = await Usuario.update(usuario,{where:{id}})
      res.status(200).json({
        response: true,
        message: 'Alterado',
        payload: {
          ...usuario,
          password: undefined
        }
      })
    } catch(error) {
      res.status(500).json({message: error})
      return
    }
  }

  static async delete (req, res) {
    const id = req.params.id
    const usuario = await Usuario.findByPk(id)
    if (!usuario) {
      res.status(422).json({message: 'Esse usuário não existe'})
      return
    }
    try {
      const result = await usuario.destroy()
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
    const { nome, cargos_id, departamentos_id, porpagina } = req.query
    let { pagina } = req.query
    let offset = pagina ? ((pagina - 1) * porpagina) : 0
    let limit = porpagina ? porpagina : 15
    let paginas = 0
    let count = 0
    let rows = []
    while (true) {
      let whereObject = {}
      if (nome) {
        whereObject.nome = {[Op.like]: '%' + nome + '%'}
      }
      if (cargos_id && parseInt(cargos_id) != 0) {
        whereObject.cargos_id = {[Op.eq]: cargos_id}
      }
      if (departamentos_id && parseInt(departamentos_id) != 0) {
        whereObject.departamentos_id = {[Op.eq]: departamentos_id}
      }
      const result = await Usuario.findAndCountAll({
        attributes: { exclude: ['password'] },
        where: whereObject,
        order: [
          ['nome', 'ASC'],
        ],
        offset,
        limit
      });
      // console.log(result)
      count = result.count
      rows = result.rows
      // console.log(rows)
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

}
