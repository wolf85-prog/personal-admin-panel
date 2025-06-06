import React from 'react'
import { useLocation } from 'react-router-dom'

import routes from '../routes'

import arrowUp from 'src/assets/images/ArrowUp.png'

import { CBreadcrumb, CBreadcrumbItem, CButton } from '@coreui/react'

const AppBreadcrumb = (props) => {
  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="m-0 ms-2">
      {/* <CBreadcrumbItem href="/">Пункт управления</CBreadcrumbItem> */}
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index}
          >
            {breadcrumb.name} {props.tabs}
 
          </CBreadcrumbItem>
        )
      })}

      <div style={{marginLeft: '330px'}}>
        <img src={arrowUp} alt='' style={{position: 'absolute', top: '60px', right: '55px', width: '80px', transform: 'rotate(45deg)'}}/>                         
      </div>
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
