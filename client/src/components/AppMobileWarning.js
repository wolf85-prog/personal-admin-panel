import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'


const AppMobileWarning = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <p className="app__mobile-message"> Мобильная версия приложения находится в разработке</p> 
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppMobileWarning)
