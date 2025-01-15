const Router = require('express')
const route = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

const { addUser, getUsers, getUser, editUser, editUserAvatar} = require('../controllers/userbotController')
const { newConversation, getConversation, getConversations } = require('../controllers/conversationController')

const { getUserWorkers, getUserWorker, editUserWorker} = require('../controllers/wuserbotController')
const { newMessageWorker, delMessageWorker, getMessagesWorker, getMessagesWorker2, getAllMessagesWorker, getMessagesWorkerCount } = require('../controllers/wmessageController')
const { newConversationWorker, getConversationWorker, getConversationsW } = require('../controllers/wconversationController')

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
    addCompany, deleteCompany, getCompanyCountAll, addCompanyProf, editCompanyProf, getCompanyProfId } = require('../controllers/companysController')

const { getPlatforms, getPlatformCount, editPlatform, getPlatformId, 
    addPlatform, deletePlatform, getPlatformCountAll } = require('../controllers/platformsController')

const { uploadFile } = require( "../controllers/fileController")

const { getMainSpecProject, getMainSpecId, editMainspec, deleteMainspec, 
    addMainspec, getMainspecCountAll, deleteMainspecProject } = require('../controllers/mainspecController')

const { addCrmID, getCrmID } = require('../controllers/crmIDController')

const { getClient, getClientCount, editClient, 
    getClientId, addClient, deleteClient, 
    getClientCountAll, getClientPhone, getClientChatId, 
    blockClient } = require('../controllers/clientController')

const upload = require('../middleware/file')
const uploadAvatar = require('../middleware/fileAvatar')

route.post('/user/registration', userController.registration)
route.post('/user/login', userController.login)
route.get('/user/auth', authMiddleware, userController.check)
route.get('/user/get', authMiddleware, userController.getAll)
route.get('/user/get/:id', authMiddleware, userController.getOne)


route.get('/userbots/get', getUsers)
route.get('/userbots/get/:id', getUser)
route.patch('/userbots/update/:id', editUser)
route.patch('/userbots/updatefile/:id', editUserAvatar)


route.post('/conversation/add', newConversation)
route.get('/conversation/get/:id', getConversation)
route.get('/conversations/get', getConversations)


//----------------WORKERS--------------------------------
route.get('/wuserbots/get', getUserWorkers)
route.get('/wuserbots/get/:id', getUserWorker)
route.patch('/wuserbots/update/:id', editUserWorker)

route.post('/wmessage/add', newMessageWorker)
route.delete('/wmessage/delete/:id', delMessageWorker)
route.get('/wmessage/get', getAllMessagesWorker)
route.get('/wmessage/get/:id', getMessagesWorker)
route.get('/wmessage/get/count/:count', getMessagesWorkerCount)
route.get('/wmessage2/get/:id/:count/:prev', getMessagesWorker2) //еще

route.post('/wconversation/add', newConversationWorker)
route.get('/wconversation/get/:id', getConversationWorker)
route.get('/wconversations/get', getConversationsW)


route.get('/projects/user/get/:userId', getProjectsAll)
route.get('/projects/delete/get/:userId', getProjectsDelete)
route.get('/projects/get/:id', getProjectId)
route.post('/projects/add', getProjectCreate)
route.patch('/projects/update/:id', getProjectUpdate)
route.get('/projects/delete/:id', getProjectDel)
route.get('/projects/chat/get/:id', getProjectChatId)



//----------------- Специалисты ---------------------------------
route.get('/specialist/user/get/:userId', getSpecialist)
route.get("/specialist/:id", getSpecialistId);
route.get('/specialist/count/get/:userId/:count/:prev', getSpecCount) //еще
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
route.get('/companys/user/get/:userId', getCompanys)
route.get("/companys/:id", getCompanyId);
route.get('/companys/count/get/:userId/:count/:prev', getCompanyCount) //еще
route.patch('/companys/update/:id', editCompany)
route.get("/companys/delete/:id", deleteCompany);
route.post("/companys/add", addCompany);
route.get("/companys/count/get", getCompanyCountAll);

route.post("/companyprof/add", addCompanyProf);
route.patch('/companyprof/update/:id', editCompanyProf)
route.get("/companyprof/:userId", getCompanyProfId);

//----------------- Площадки ---------------------------------
route.get('/platforms/user/get/:userId', getPlatforms)
route.get("/platforms/:id", getPlatformId);
route.get('/platforms/count/get/:userId/:count/:prev', getPlatformCount) //еще
route.patch('/platforms/update/:id', editPlatform)
route.get("/platforms/delete/:id", deletePlatform);
route.post("/platforms/add", addPlatform);
route.get("/platforms/count/get", getPlatformCountAll);


route.post("/file/upload", upload.single("photo"), uploadFile);
route.post("/file/avatar", uploadAvatar.single("avatar"), uploadFile);


//----------------- Основной состав (специалисты) ---------------------------------
route.get('/mainspec/project/get/:id', getMainSpecProject)
route.get("/mainspec/:id", getMainSpecId);
route.patch('/mainspec/update/:id', editMainspec)
route.get("/mainspec/delete/:id", deleteMainspec);
route.get("/mainspec/project/delete/:id", deleteMainspecProject);
route.post("/mainspec/add", addMainspec);
route.get("/mainspec/count/get/:userId", getMainspecCountAll);

route.get("/crmid/add", addCrmID);
route.get("/crmid/get", getCrmID);


//----------------- Клиенты ---------------------------------
route.get('/client/user/get/:userId', getClient)
route.get("/client/:id", getClientId);
route.get('/client/count/get/:userId/:count/:prev', getClientCount) //еще
route.patch('/client/update/:id', editClient)
route.get("/client/delete/:id", deleteClient);
route.post("/client/add", addClient);
route.get("/client/count/get", getClientCountAll);
route.get("/client/phone/:id", getClientPhone);
route.get("/client/chat/:id", getClientChatId);
route.get('/client/block/:id', blockClient)

module.exports = route