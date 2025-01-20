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

export default function FiltersButtom({ styleClass, columnFilters, setColumnFilters }) {
  return (
    <>
      <CRow lg={{ gutterX: 5 }} className={styleClass}>
        <CCol lg={4} style={{ display: 'flex', gap: '10px' }} className="align-self-center">
          <div
            style={{ height: '30px', minWidth: '40px', cursor: 'pointer' }}
            className="py-1  small uley-data-main"
          >
            7
          </div>
          {/* <div style={{ height: '40px', width: '250px' }} className="py-2  small uley-data-main">
            177 000.00
          </div>
          <div style={{ height: '40px', width: '250px' }} className="py-2  small uley-data-main">
            62 000.00
          </div> */}
        </CCol>
        <CCol
          lg={4}
          style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}
          className="align-self-center"
        >
          <div
            style={{ height: '30px', width: '163px', marginRight: '80px', verticalAlign: 'top' }}
            className="py-1  small uley-data-main"
          >
            85
          </div>
        </CCol>

        <CCol
          lg={4}
          style={{ display: 'flex', gap: '10px', justifyContent: 'end' }}
          className="align-self-center"
        >
          <div style={{ height: '30px', width: '163px' }} className="py-1  small uley-data-main">
            113 000.00
          </div>
        </CCol>
      </CRow>
    </>
  )
}
