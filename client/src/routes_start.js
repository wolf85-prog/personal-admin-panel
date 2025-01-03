import React from 'react'
import { 
    ADMIN_ROUTE, 
    PROFILE_ROUTE,
    PROJECTS_ROUTE,
    COMPANYS_ROUTE,
    SPECIALIST_ROUTE,
    PLATFORMS_ROUTE,
    CHAT_MANAGER,
    CHAT_WORKER,

} from "./utils/consts";

const Admin = React.lazy(() => import('./pages/Admin'))
const Profile = React.lazy(() => import('./pages/Profile'))
const Projects = React.lazy(() => import('./pages/Projects'))

const Specialist = React.lazy(() => import('./pages/Specialist'))
const Companys = React.lazy(() => import('./pages/Companys'))
const Platforms = React.lazy(() => import('./pages/Platforms'))

const ChatWorker = React.lazy(() => import('./pages/ChatWorker'))
const ChatManager = React.lazy(() => import('./pages/ChatManager'))

export const authRoutes = [
    { path: ADMIN_ROUTE, name: 'Панель управления', Component: Admin },
    { path: PROFILE_ROUTE, name: 'Профиль', Component: Profile },
    { path: SPECIALIST_ROUTE, name: 'Специалисты', Component: Specialist },
    { path: COMPANYS_ROUTE, name: 'Компании', Component: Companys },
    { path: PROJECTS_ROUTE, name: 'Проекты', Component: Projects },
    { path: PLATFORMS_ROUTE, name: 'Площадки', Component: Platforms },

    { path: CHAT_MANAGER, name: 'Renthub', Component: ChatManager },
    { path: CHAT_WORKER, name: 'Workhub', Component: ChatWorker },

    { path: '/', name: 'Пункт управления', Component: Admin },
]
