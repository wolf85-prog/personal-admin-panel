import React from 'react'

const Admin = React.lazy(() => import('./pages/Admin'))
const Profile = React.lazy(() => import('./pages/Profile'))
const Projects = React.lazy(() => import('./pages/Projects'))

const Specialist = React.lazy(() => import('./pages/Specialist'))
const Companys = React.lazy(() => import('./pages/Companys'))
const Platforms = React.lazy(() => import('./pages/Platforms'))

const PayRate = React.lazy(() => import('./views/estimates/PayRate'))

const Client = React.lazy(() => import('./pages/Client'))

const routes = [
  { path: '/', exact: true, name: 'Пункт управления / ' },
  { path: '/dashboard', name: 'Пункт управления / ', Component: Admin },
  { path: '/profile', name: 'Профиль', Component: Profile },
  { path: '/projects', name: 'Проекты', Component: Projects },
  { path: "/specialist", name: 'Специалисты / Профиль', Component: Specialist },
  { path: "/payrate", name: 'Ставки', Component: PayRate },
  { path: "/companys", name: 'Компании / Профиль', Component: Companys },
  { path: "/platforms", name: 'Площадки', Component: Platforms },
  { path: "/client", name: 'Клиенты / Профиль', Component: Client },
]

export default routes
