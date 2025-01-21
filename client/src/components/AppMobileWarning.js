import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'


const AppMobileWarning = () => {
  return (
    <CContainer lg style={{ margin: 'auto'}}>
      <Suspense fallback={<CSpinner color="primary" />}>
        <h5>Внимание!</h5>
        <p> Мобильная версия приложения</p>  
        <p> находится в разработке.</p>
        <p> Рекомендуем использовать</p> 
        <p> PC-версию приложения.</p> 
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppMobileWarning)
