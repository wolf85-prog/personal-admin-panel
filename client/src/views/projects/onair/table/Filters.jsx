/* eslint-disable react/prop-types */
import { React, useEffect, useState } from 'react'
import { CIcon } from '@coreui/icons-react'
import { cilList, cilShieldAlt } from '@coreui/icons'
import DatePicker from 'react-datepicker'
import Select from 'react-select'

import {
  CCloseButton,
  CFormInput,
  CCol,
  CRow,
  CFormCheck,
  CFormSelect,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
} from '@coreui/react'

import 'react-datepicker/dist/react-datepicker.css'
import { ReactComponent as YourSvg } from './refresh.svg'

const specialistList = [
  { value: 'Иванов Иван Иванович', label: 'Иванов Иван Иванович' },
  { value: 'Петров Петр Иванович', label: 'Петров Петр Иванович' },
]
export default function Filters({ columnFilters, setColumnFilters }) {
  return (
    <>
      <CRow lg={{ gutter: 0 }} className="mb-1 justify-content-between">
        <CCol lg={6} style={{ display: 'flex' }} className="align-self-center ">
          <Select
            options={specialistList}
            defaultValue={specialistList[0]}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,

                backgroundColor: 'transparent',
                border: '1px solid hsla(0, 0%, 100%, 0.09)',
                borderRadius: '0.375rem',
                width: '220px',
                height: '30px',
              }),
              menu: (baseStyles, state) => ({
                ...baseStyles,

                backgroundColor: '#1f282c',
                margin: 'auto',
                width: '220px',
              }),
              menuList: (baseStyles, state) => ({
                ...baseStyles,

                backgroundColor: '#1f282c',
                textAlign: 'center',
                width: '220px',
              }),
              singleValue: (baseStyles, state) => ({
                ...baseStyles,

                color: '#e4e5e5',
                textAlign: 'center',
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                height: '30px',
                padding: 0,
                cursor: 'pointer',
                backgroundColor: state.isFocused ? '#34434a' : '',
              }),
              indicatorsContainer: (baseStyles, state) => ({
                ...baseStyles,
                display: 'none',
              }),
            }}
          />
          <CCloseButton
            className="uley_select_reset"
            style={{ height: '28px', width: '28px', marginLeft: '10px' }}
            onClick={() => setColumnFilters([])}
          />
        </CCol>

        <CCol
          lg={3}
          style={{ display: 'flex', justifyContent: 'end' }}
          className="align-self-center"
        >
          <div
            className="uley_select_reset align-self-center"
            style={{ height: '28px', width: '28px', marginRight: '10px' }}
          >
            <YourSvg />
          </div>
          <CRow>
            <CCol className="align-self-center text-end">Операция</CCol>
            <CCol
              style={{
                maxWidth: '10px',
                width: '10px',
                height: ' 30px',
                alignSelf: 'center',
              }}
              className="uley-smeta-generate-line"
            ></CCol>
            <CCol lg="auto">
              <CFormCheck id="flexCheckDefault" label="Диалог" />
              <CFormCheck id="flexCheckDefault1" label="Автодозвон" />
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </>
  )
}
