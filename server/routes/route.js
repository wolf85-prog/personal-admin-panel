const Router = require('express')
const route = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const { getProjectsAll, 
    getProjectsDelete, getProjectId, 
    getProjectCreate, getProjectUpdate, 
    getProjectDel, getProjectChatId } = require('../controllers/projectController')

const { getSpecialist, getSpecCount, editSpecialist, 
    getSpecialistId, addSpecialist, deleteSpecialist, 
    getSpecCountAll, getSpecialistPhone, getSpecialistChatId, 
    blockSpecialist } = require('../controllers/specialistController')

const { getManagers, getManagerCount, editManager, getManagerId, 
    addManager, deleteManager, getManagerCountAll } = require('../controllers/managersController')

const { getCompanys, getCompanyCount, editCompany, getCompanyId, 
    addCompany, deleteCompany, getCompanyCountAll } = require('../controllers/companysController')

const { getPlatforms, getPlatformCount, editPlatform, getPlatformId, 
    addPlatform, deletePlatform, getPlatformCountAll } = require('../controllers/platformsController')

const { uploadFile } = require( "../controllers/fileController")

const upload = require('../middleware/file')
const uploadAvatar = require('../middleware/fileAvatar')

route.post('/user/registration', userController.registration)
route.post('/user/login', userController.login)
route.get('/user/auth', authMiddleware, userController.check)
route.get('/user/get', authMiddleware, userController.getAll)
route.get('/user/get/:id', authMiddleware, userController.getOne)


route.get('/projects/user/get/:userId', getProjectsAll)
route.get('/projects/delete/get/:userId', getProjectsDelete)
route.get('/projects/get/:id', getProjectId)
route.post('/projects/add', getProjectCreate)
route.patch('/projects/update/:id', getProjectUpdate)
route.get('/projects/delete/:id', getProjectDel)
route.get('/projects/chat/get/:id', getProjectChatId)



//----------------- Специалисты ---------------------------------
route.get('/specialist/get', getSpecialist)
route.get("/specialist/:id", getSpecialistId);
route.get('/specialist/count/get/:count/:prev', getSpecCount) //еще
route.patch('/specialist/update/:id', editSpecialist)
route.get("/specialist/delete/:id", deleteSpecialist);
route.post("/specialist/add", addSpecialist);
route.get("/specialist/count/get", getSpecCountAll);
route.get("/specialist/phone/:id", getSpecialistPhone);
route.get("/specialist/chat/:id", getSpecialistChatId);
route.get('/specialist/block/:id', blockSpecialist)


//----------------- Менеджеры ---------------------------------
route.get('/managers/get', getManagers)
route.get("/managers/:id", getManagerId);
route.get('/managers/count/get/:count/:prev', getManagerCount) //еще
route.patch('/managers/update/:id', editManager)
route.get("/managers/delete/:id", deleteManager);
route.post("/managers/add", addManager);
route.get("/managers/count/get", getManagerCountAll);
route.get("/managers/chat/:id", getManagerId);

//----------------- Компании ---------------------------------
route.get('/companys/get', getCompanys)
route.get("/companys/:id", getCompanyId);
route.get('/companys/count/get/:count/:prev', getCompanyCount) //еще
route.patch('/companys/update/:id', editCompany)
route.get("/companys/delete/:id", deleteCompany);
route.post("/companys/add", addCompany);
route.get("/companys/count/get", getCompanyCountAll);

//----------------- Площадки ---------------------------------
route.get('/platforms/get', getPlatforms)
route.get("/platforms/:id", getPlatformId);
route.get('/platforms/count/get/:count/:prev', getPlatformCount) //еще
route.patch('/platforms/update/:id', editPlatform)
route.get("/platforms/delete/:id", deletePlatform);
route.post("/platforms/add", addPlatform);
route.get("/platforms/count/get", getPlatformCountAll);


route.post("/file/upload", upload.single("photo"), uploadFile);
route.post("/file/avatar", uploadAvatar.single("avatar"), uploadFile);

module.exports = route