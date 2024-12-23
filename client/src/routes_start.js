import React from 'react'
import { 
    ADMIN_ROUTE, 
    PROFILE_ROUTE,
    PROJECTS_ROUTE,

} from "./utils/consts";

const Admin = React.lazy(() => import('./pages/Admin'))
const Profile = React.lazy(() => import('./pages/Profile'))
const Projects = React.lazy(() => import('./pages/Projects'))

export const authRoutes = [
    { path: ADMIN_ROUTE, name: 'Панель управления', Component: Admin },
    { path: PROFILE_ROUTE, name: 'Профиль', Component: Profile },
    { path: PROJECTS_ROUTE, name: 'Профиль', Component: Projects },

    { path: '/', name: 'Пункт управления', Component: Admin },
]
