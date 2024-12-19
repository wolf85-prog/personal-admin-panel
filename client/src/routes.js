import React from 'react'

const Admin = React.lazy(() => import('./pages/Admin'))

const routes = [
  { path: '/', exact: true, name: 'Пункт управления / ' },
  { path: '/dashboard', name: 'Пункт управления / ', Component: Admin },
]

export default routes
