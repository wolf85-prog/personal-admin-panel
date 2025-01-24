/* eslint-disable react/prop-types */
import { React, useEffect, useState } from 'react'
import { CIcon } from '@coreui/icons-react'
import { cilList, cilShieldAlt } from '@coreui/icons'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import InputMask from 'react-input-mask'
import styles from './Projects.module.css'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableFoot,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCardTitle,
  CCardText,
  CButton,
  CCardFooter,
} from '@coreui/react'

export default function Projects({ styleClass, setProjectFilter, projectFilter }) {
  // const [active, setActive] = useState(1)
  return (
    <>
      <CRow lg={{ gutterX: 5 }} className={styleClass}>
        <CCol
          lg={12}
          style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}
          className="align-self-center"
        >
          <div
            style={{ height: '157px', minWidth: '306px', cursor: 'pointer', marginBottom: 0 }}
            // className={[styles.active, 'py-1 small uley-data-main'].join(' ')}
            className={
              projectFilter === 1
                ? [styles.active, 'py-1 small uley-data-main'].join(' ')
                : 'py-1 small uley-data-main'
            }
            onClick={() => setProjectFilter(1)}
          >
            <p style={{ margin: 0, padding: '5px', textAlign: 'left' }}>24.01</p>
            <p style={{ margin: 0, padding: '5px' }}>Проект №1</p>
            <p style={{ margin: 0, padding: '5px', color: 'gray' }}>JamTech</p>
            <p style={{ margin: 0, padding: '5px', color: '#00ff00' }}>В эфире</p>
            <p style={{ margin: 0, padding: '5px', textAlign: 'end' }}>09:00</p>
          </div>
          <div
            style={{ height: '157px', minWidth: '306px', cursor: 'pointer', marginBottom: 0 }}
            className={
              projectFilter === 2
                ? [styles.active, 'py-1 small uley-data-main'].join(' ')
                : 'py-1 small uley-data-main'
            }
            onClick={() => setProjectFilter(2)}
          >
            <p style={{ margin: 0, padding: '5px', textAlign: 'left' }}>24.01</p>
            <p style={{ margin: 0, padding: '5px' }}>Проект №2</p>
            <p style={{ margin: 0, padding: '5px', color: 'gray' }}>LSL</p>
            <p style={{ margin: 0, padding: '5px', color: '#00ff00' }}>В эфире</p>
            <p style={{ margin: 0, padding: '5px', textAlign: 'end' }}>10:00</p>
          </div>
          <div
            style={{ height: '157px', minWidth: '306px', cursor: 'pointer', marginBottom: 0 }}
            className={
              projectFilter === 3
                ? [styles.active, 'py-1 small uley-data-main'].join(' ')
                : 'py-1 small uley-data-main'
            }
            onClick={() => setProjectFilter(3)}
          >
            <p style={{ margin: 0, padding: '5px', textAlign: 'left' }}>24.01</p>
            <p style={{ margin: 0, padding: '5px' }}>Проект №3</p>
            <p style={{ margin: 0, padding: '5px', color: 'gray' }}>Luxury Sound</p>
            <p style={{ margin: 0, padding: '5px', color: '#00ff00' }}>В эфире</p>
            <p style={{ margin: 0, padding: '5px', textAlign: 'end' }}>10:30</p>
          </div>
          <div
            style={{ height: '157px', minWidth: '306px', cursor: 'pointer', marginBottom: 0 }}
            className={
              projectFilter === 4
                ? [styles.active, 'py-1 small uley-data-main'].join(' ')
                : 'py-1 small uley-data-main'
            }
            onClick={() => setProjectFilter(4)}
          >
            <p style={{ margin: 0, padding: '5px', textAlign: 'left' }}>24.01</p>
            <p style={{ margin: 0, padding: '5px' }}>Проект №4</p>
            <p style={{ margin: 0, padding: '5px', color: 'gray' }}>Soundcafe</p>
            <p style={{ margin: 0, padding: '5px', color: '#00ff00' }}>В эфире</p>
            <p style={{ margin: 0, padding: '5px', textAlign: 'end' }}>14:00</p>
          </div>
        </CCol>
      </CRow>
    </>
  )
}
