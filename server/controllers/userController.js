const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Code} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}    
    )
}

class UserController {

    //registration
    async registration(req, res, next) {
        const {username, email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Неверный номер или пароль'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким телефоном уже существует!'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({username, email, password: hashPassword, role})
        const token = generateJwt(user.id, user.username, user.email, user.role)
        return res.json({token})
    }

    //login
    async login(req, res, next) {
        const {email, password} = req.body
        // Find user by email
        const user = await User.findOne({where: {email}})
        // Check if user exists
        if (!user) {
            return next(ApiError.internal('Неверный номер или пароль'))
        }
        // Check password
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Неверный номер или пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    //check
    async check(req, res, next) {
      const token = generateJwt(req.user.id, req.user.email, req.user.role)
      return res.json({token})
    }

    //check
    async addCode(req, res) {
        const {phone, code} = req.body
        const codeRes = await Code.create({phone, code})
        return res.json({codeRes})
    }

    //check
    async getCode(req, res) {
        const {phone, code} = req.body
        const user = await Code.findOne({
            where: {phone},
            order: [
                ['createdAt', 'DESC'],
            ],
        })
        return res.json({user})
    }

    //getAll
    async getAll(req, res) {
        const users = await User.findAll()
        return res.json(users)
    }

    async getOne(req, res) {
        const {id} = req.params
        const user = await User.findOne({where: {id}})
        return res.json(user)
    }
}

module.exports = new UserController()