import React from 'react'

const Admin = React.lazy(() => import('./pages/Admin'))
const Profile = React.lazy(() => import('./pages/Profile'))
const Projects = React.lazy(() => import('./pages/Projects'))

const routes = [
  { path: '/', exact: true, name: 'Пункт управления / ' },
  { path: '/dashboard', name: 'Пункт управления / ', Component: Admin },
  { path: '/profile', name: 'Профиль', Component: Profile },
  { path: '/projects', name: 'Проекты', Component: Profile },
]

export default routes
