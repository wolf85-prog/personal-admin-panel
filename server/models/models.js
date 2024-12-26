const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, allowNull: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})


const Project = sequelize.define('project', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    crmID: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},  //название проекта
    status: {type: DataTypes.STRING},
    specifika: {type: DataTypes.STRING},
    city: {type: DataTypes.STRING},
    dateStart: {type: DataTypes.STRING},  //дата начала проекта
    dateEnd: {type: DataTypes.STRING},  //дата окончания проекта
    teh: {type: DataTypes.TEXT},
    geo: {type: DataTypes.STRING},
    managerId: {type: DataTypes.STRING},
    managerId2: {type: DataTypes.STRING},
    companyId: {type: DataTypes.STRING},
    chatId: {type: DataTypes.STRING},
    spec: {type: DataTypes.STRING},
    comment: {type: DataTypes.TEXT},
    equipment: {type: DataTypes.STRING},
    number: {type: DataTypes.INTEGER},
    teh1: {type: DataTypes.STRING},
    teh2: {type: DataTypes.STRING},
    teh3: {type: DataTypes.STRING},
    teh4: {type: DataTypes.STRING},
    teh5: {type: DataTypes.STRING},
    teh6: {type: DataTypes.STRING},
    teh7: {type: DataTypes.STRING},
    teh8: {type: DataTypes.STRING},
    deleted: {type: DataTypes.BOOLEAN},
})

const Worker = sequelize.define('worker', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userfamily: {type: DataTypes.STRING},
    username: {type: DataTypes.STRING},
    phone: {type: DataTypes.STRING},
    dateborn: {type: DataTypes.STRING},  
    city: {type: DataTypes.STRING},
    companys: {type: DataTypes.STRING},
    stag: {type: DataTypes.STRING},
    worklist: {type: DataTypes.STRING},
    chatId: {type: DataTypes.STRING, unique: true},
    promoId: {type: DataTypes.STRING},
    from: {type: DataTypes.STRING},
    avatar: {type: DataTypes.STRING},
    comment: {type: DataTypes.TEXT}, 
    rank: {type: DataTypes.INTEGER}, 
    block: {type: DataTypes.BOOLEAN}, 
    deleted: {type: DataTypes.BOOLEAN},
    newcity: {type: DataTypes.STRING},
    great: {type: DataTypes.BOOLEAN},
})

const Platform = sequelize.define('platform', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    title: {type: DataTypes.STRING}, //
    city: {type: DataTypes.STRING}, //
    address: {type: DataTypes.STRING}, //
    track: {type: DataTypes.STRING}, //
    url: {type: DataTypes.STRING}, //
    karta: {type: DataTypes.STRING}, //
    comment: {type: DataTypes.TEXT},
})

const Company = sequelize.define('company', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    title: {type: DataTypes.STRING}, //
    city: {type: DataTypes.STRING},
    office: {type: DataTypes.STRING},
    sklad: {type: DataTypes.STRING},
    comment: {type: DataTypes.TEXT},
    projects: {type: DataTypes.TEXT},
    managers: {type: DataTypes.TEXT},
    dogovorDate: {type: DataTypes.STRING}, 
    dogovorNumber: {type: DataTypes.STRING}, 
    bugalterFio: {type: DataTypes.STRING}, 
    bugalterEmail: {type: DataTypes.STRING},
    bugalterPhone: {type: DataTypes.STRING},  
    GUID: {type: DataTypes.STRING}, 
    inn: {type: DataTypes.STRING}, //инн компании
    profile: {type: DataTypes.STRING},
    sfera: {type: DataTypes.TEXT},
    comteg: {type: DataTypes.TEXT},
})

module.exports = {
    User, 
    Project,
    Company,
    Platform,
    Worker,
}