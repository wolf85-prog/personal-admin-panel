import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from 'src/components/index'

const DefaultLayout = () => {
  return (
    <div className="dark-theme">
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer lg></CContainer>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
