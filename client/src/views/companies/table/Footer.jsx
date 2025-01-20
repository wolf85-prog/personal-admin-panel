/* eslint-disable react/prop-types */
import { React, useEffect, useState } from 'react'
import { CIcon } from '@coreui/icons-react'
import { cilList, cilShieldAlt } from '@coreui/icons'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import InputMask from 'react-input-mask'
import {
  CCloseButton,
  CFormInput,
  CCol,
  CRow,
  CFormCheck,
  CButton,
  CFormSelect,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
} from '@coreui/react'

import 'react-datepicker/dist/react-datepicker.css'

export default function Footer({ styleClass }) {
  return (
    <div style={{ marginTop: '16px' }}>
      <CRow lg={{ gutterX: 5 }} className={styleClass}>
        <CCol lg={8} style={{ display: 'flex', gap: '10px' }}>
          <div
            style={{
              height: '40px',
              minWidth: '40px',
              cursor: 'pointer',
              // marginLeft: '100px',
            }}
            className="py-2  small uley-data-main"
          >
            5
          </div>

          <div
            style={{ height: '40px', width: '163px', marginLeft: '150px' }}
            className="py-2  small uley-data-main"
          >
            100 000.00
          </div>
          <div style={{ height: '40px', width: '163px' }} className="py-2  small uley-data-main">
            25 000.00
          </div>
          <div
            style={{ height: '40px', width: '163px', color: 'yellow' }}
            className="py-2  small uley-data-main"
          >
            75 000.00
          </div>
        </CCol>
        <CCol lg={4} style={{ display: 'flex', gap: '10px', justifyContent: 'end' }}>
          <div style={{ height: '40px', width: '163px' }} className="py-2  small uley-data-main">
            28 205.12
          </div>
        </CCol>
      </CRow>
    </div>
  )
}
