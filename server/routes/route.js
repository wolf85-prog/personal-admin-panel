const Router = require('express')
const route = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const { getProjects, getProjectsId, getProjectNew, getProjectsAll, 
    getProjectsDelete, getProjectNewId, 
    getProjectNewCreate, getProjectNewUpdate, 
    getProjectNewDel, getProjectNewChatId } = require('../controllers/projectController')

route.post('/user/registration', userController.registration)
route.post('/user/login', userController.login)
route.get('/user/auth', authMiddleware, userController.check)
route.get('/user/get', authMiddleware, userController.getAll)
route.get('/user/get/:id', authMiddleware, userController.getOne)


route.get('/projects/get', getProjectsAll)
route.get('/projects/delete/get', getProjectsDelete)
route.get('/projects/get/:id', getProjectNewId)
route.post('/projects/add', getProjectNewCreate)
route.patch('/projects/update/:id', getProjectNewUpdate)
route.get('/projects/delete/:id', getProjectNewDel)
route.get('/projects/chat/get/:id', getProjectNewChatId)

module.exports = route