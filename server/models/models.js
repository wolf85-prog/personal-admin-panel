const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, allowNull: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Manager = sequelize.define('manager', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fio: {type: DataTypes.STRING},
    chatId: {type: DataTypes.STRING, unique: true},
    phone: {type: DataTypes.STRING}, //телефон менеджера
    phone2: {type: DataTypes.STRING}, //телефон менеджера
    city: {type: DataTypes.STRING},
    dolgnost: {type: DataTypes.STRING}, 
    companyId: {type: DataTypes.STRING}, // id заказчика  
    projects: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING}, //почта менеджера
    avatar: {type: DataTypes.TEXT},
    userId: {type: DataTypes.STRING}, 
})


const Project = sequelize.define('project', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.STRING}, 
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

const Specialist = sequelize.define('specialist', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},  
    userId: {type: DataTypes.STRING}, 
    fio: {type: DataTypes.STRING},
    chatId: {type: DataTypes.STRING, unique: true},
    phone: {type: DataTypes.STRING},
    phone2: {type: DataTypes.STRING},
    specialization: {type: DataTypes.TEXT},  
    city: {type: DataTypes.STRING},
    skill: {type: DataTypes.TEXT},
    promoId: {type: DataTypes.STRING}, 
    rank: {type: DataTypes.INTEGER}, 
    merch: {type: DataTypes.STRING},
    company: {type: DataTypes.STRING},
    comteg: {type: DataTypes.TEXT},
    comteg2: {type: DataTypes.TEXT},
    comment: {type: DataTypes.TEXT}, 
    comment2: {type: DataTypes.TEXT}, 
    age: {type: DataTypes.STRING},
    reyting: {type: DataTypes.STRING},
    inn: {type: DataTypes.STRING}, 
    passport: {type: DataTypes.TEXT},
    profile: {type: DataTypes.TEXT},
    dogovor: {type: DataTypes.BOOLEAN}, 
    samozanjatost: {type: DataTypes.BOOLEAN},
    passportScan: {type: DataTypes.TEXT},
    email: {type: DataTypes.STRING},  
    blockW: {type: DataTypes.BOOLEAN},
    deleted: {type: DataTypes.BOOLEAN}, //distrib
    great: {type: DataTypes.BOOLEAN}, //hello
    block18: {type: DataTypes.BOOLEAN}, 
    krest: {type: DataTypes.BOOLEAN}, //bad
})

const Platform = sequelize.define('platform', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    userId: {type: DataTypes.STRING}, //id менеджера
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
    userId: {type: DataTypes.STRING}, 
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
    Manager,
    Project,
    Company,
    Platform,
    Specialist,
}