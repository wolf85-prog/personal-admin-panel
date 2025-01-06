import React from 'react'
import { CFooter, CButton  } from '@coreui/react'

const AppFooter = () => {

  return (
    <CFooter style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <a href='https://t.me/ULEY_Workhub_Bot'><CButton color="dark">Найти специалистов</CButton></a>
        <a href='https://t.me/ULEY_Projects_Bot'><CButton color="dark">Найти оборудование</CButton></a>
    </CFooter>
  )
}

export default React.memo(AppFooter)
