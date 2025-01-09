import React from 'react'

const Admin = React.lazy(() => import('./pages/Admin'))
const Profile = React.lazy(() => import('./pages/Profile'))
const ProfileCompany = React.lazy(() => import('./pages/ProfileCompany'))
const Projects = React.lazy(() => import('./pages/Projects'))

const Specialist = React.lazy(() => import('./pages/Specialist'))
const Companys = React.lazy(() => import('./pages/Companys'))
const Platforms = React.lazy(() => import('./pages/Platforms'))

const PayRate = React.lazy(() => import('./views/estimates/PayRate'))

const Client = React.lazy(() => import('./pages/Client'))

const Air = React.lazy(() => import('./pages/Air'))

const routes = [
  { path: '/', exact: true, name: 'Пункт управления' },
  { path: '/dashboard', name: 'Пункт управления', Component: Admin },
  { path: '/air', name: 'В эфире', Component: Air },
  { path: '/profile', name: 'Профиль', Component: Profile },
  { path: '/profile_company', name: 'Профиль компании', Component: ProfileCompany },
  { path: '/projects', name: 'Проекты', Component: Projects },
  { path: "/specialist", name: 'Сотрудники', Component: Specialist },
  { path: "/payrate", name: 'Ставки', Component: PayRate },
  { path: "/companys", name: 'Компании', Component: Companys },
  { path: "/platforms", name: 'Локации', Component: Platforms },
  { path: "/client", name: 'Клиент', Component: Client },
]

export default routes
