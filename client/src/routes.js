import React from 'react'

const Admin = React.lazy(() => import('./pages/Admin'))
const Profile = React.lazy(() => import('./pages/Profile'))
const ProfileCompany = React.lazy(() => import('./pages/ProfileCompany'))
const Projects = React.lazy(() => import('./pages/Projects'))

const Specialist = React.lazy(() => import('./pages/Specialist'))
const Companys = React.lazy(() => import('./pages/Companys'))
const Platforms = React.lazy(() => import('./pages/Platforms'))

const PayRate = React.lazy(() => import('./views/estimates/PayRate'))
const Estimate = React.lazy(() => import('./views/estimates/Estimate'))
const Companies = React.lazy(() => import('./views/companies/Companies'))
const Document = React.lazy(() => import('./views/documents/Document'))

const Client = React.lazy(() => import('./pages/Client'))

const Air = React.lazy(() => import('./pages/Air'))

const routes = [
  { path: '/', exact: true, name: 'Пункт управления' },
  { path: '/dashboard', name: 'Пункт управления', Component: Admin },
  
  { path: '/project', name: 'Проекты', Component: Projects },
  { path: '/on_air', name: 'В эфире', Component: Air },
  { path: '/profile', name: 'Профиль', Component: Profile },
  { path: '/my_company', name: 'Профиль компании', Component: ProfileCompany },
  
  
  { path: "/payrate", name: 'Ставки', Component: PayRate },
  { path: "/company", name: 'Компании', Component: Companys },
  { path: "/location", name: 'Локации', Component: Platforms },
  

  { path: "/profile_customer", name: 'Профиль клиента', Component: Client },
  { path: "/profile_worker", name: 'Профиль сотрудника', Component: Specialist },

  { path: "/estimate_all", name: 'Сметы', Component: Estimate },
  { path: "/rate", name: 'Ставки', Component: PayRate },
  { path: "/partner", name: 'Контрагенты', Component: Companies },
  { path: "/document", name: 'Документы', Component: Document },
]

export default routes
