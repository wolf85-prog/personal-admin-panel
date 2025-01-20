import React from 'react'
import { 
    ADMIN_ROUTE, 
    PROFILE_ROUTE,
    PROFILECOMPANY_ROUTE,
    PROJECTS_ROUTE,
    COMPANYS_ROUTE,
    SPECIALIST_ROUTE,
    PLATFORMS_ROUTE,
    CHAT_MANAGER,
    CHAT_WORKER,
    CHAT_SUPPORT,
    AIR_ROUTE,
    CLIENT_ROUTE,
    PAY_RATE_ROUTE,
    SETTINGS_ROUTE,
    ESTIMATE_ROUTE,
    PARTNER_ROUTE,
    DOCUMENT_ROUTE,
    DOCUMENT_COMPLECT_ROUTE

} from "./utils/consts";

const Admin = React.lazy(() => import('./pages/Admin'))
const Profile = React.lazy(() => import('./pages/Profile'))
const ProfileCompany = React.lazy(() => import('./pages/ProfileCompany'))
const Projects = React.lazy(() => import('./pages/Projects'))

// const Air = React.lazy(() => import('./pages/Air'))
const Air = React.lazy(() => import('./views/projects/onair/OnAir'))

const Specialist = React.lazy(() => import('./pages/Specialist'))
const Companys = React.lazy(() => import('./pages/Companys'))
const Platforms = React.lazy(() => import('./pages/Platforms'))

const PayRate = React.lazy(() => import('./views/estimates/PayRate'))
const Companies = React.lazy(() => import('./views/companies/Companies'))
const Document = React.lazy(() => import('./views/documents/Document'))
const DocumentsGenerator = React.lazy(() => import('./views/documents/DocumentsGenerator'))


const ChatWorker = React.lazy(() => import('./pages/ChatWorker'))
const ChatManager = React.lazy(() => import('./pages/ChatManager'))
const ChatSupport = React.lazy(() => import('./pages/ChatSupport'))
const Client = React.lazy(() => import('./pages/Client'))

const Settings = React.lazy(() => import('./pages/Settings'))

export const authRoutes = [
    { path: '/', name: 'Пункт управления', Component: Admin },
    { path: ADMIN_ROUTE, name: 'Панель управления', Component: Admin },

    { path: PROJECTS_ROUTE, name: 'Проекты', Component: Projects },
    { path: AIR_ROUTE, name: 'В эфире', Component: Air },
    { path: COMPANYS_ROUTE, name: 'Компании', Component: Companys },
    { path: PLATFORMS_ROUTE, name: 'Локации', Component: Platforms },
   

    { path: CHAT_MANAGER, name: 'Клиент', Component: ChatManager },
    { path: CLIENT_ROUTE, name: 'Профиль клиента', Component: Client },

    { path: CHAT_WORKER, name: 'Сотрудники', Component: ChatWorker },
    { path: SPECIALIST_ROUTE, name: 'Профиль сотрудника', Component: Specialist },

    { path: CHAT_SUPPORT, name: 'Техническая поддержка', Component: ChatSupport },

    { path: PROFILE_ROUTE, name: 'Профиль', Component: Profile },
    { path: PROFILECOMPANY_ROUTE, name: 'Профиль компании', Component: ProfileCompany },
    { path: SETTINGS_ROUTE, name: 'Настройки', Component: Settings },
    { path: PAY_RATE_ROUTE, name: 'Ставки', Component: PayRate },

    { path: PARTNER_ROUTE, name: 'Компаний', Component: Companies },
    { path: DOCUMENT_ROUTE, name: 'Докумненты', Component: DocumentsGenerator },
    { path: DOCUMENT_COMPLECT_ROUTE, name: 'Комплекты документов', Component: Document },
    

]
