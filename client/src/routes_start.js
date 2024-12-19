import React from 'react'
import { 
    ADMIN_ROUTE, 

} from "./utils/consts";

const Admin = React.lazy(() => import('./pages/Admin'))

export const authRoutes = [
    { path: ADMIN_ROUTE, name: 'Панель управления', Component: Admin },

    { path: '/', name: 'Пункт управления', Component: Admin },
]
