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
import { format } from 'src/utils/formater'

const options = [
  { value: 'project', label: 'Проект' },
  { value: 'srm', label: 'ID' },
  // { value: 'date', label: 'Дата' },
  // { value: 'specialist', label: 'Специалист' },
  // { value: 'statuses', label: 'Статусы' },
]

const projList = [
  { value: 'Проект №1', label: '08.08 | Проект №1' },
  { value: 'Проект №2', label: '07.08 | Проект №2' },
  { value: 'Проект №3', label: '18.07 | Проект №3' },
  { value: 'Проект №4', label: '25.06 | Проект №4' },
  { value: 'Проект №5', label: '12.09 | Проект №5' },
  { value: 'Проект №6', label: '11.09 | Проект №6' },
]

const dateList = [
  { value: '13.09.2024', label: '08.08 | Проект №1' },
  { value: '14.09.2024', label: '07.08 | Проект №2' },
  { value: '15.09.2024', label: '18.07 | Проект №3' },
  { value: '16.09.2024', label: '25.06 | Проект №4' },
  { value: '17.09.2024', label: '23.06 | Проект №5' },
  { value: '17.09.2024', label: '23.06 | Проект №5' },
]
const srmList = [
  { value: '3204', label: '3204' },
  { value: '3205', label: '3205' },
  { value: '3206', label: '3206' },
  { value: '3207', label: '3207' },
  { value: '3208', label: '3208' },
  { value: '3209', label: '3209' },
  { value: '3210', label: '3210' },
  { value: '3211', label: '3211' },
]
const statusList = [
  { value: 'Start', label: 'Начал работу' },
  { value: 'End', label: 'Закончил работу' },
  { value: 'Drive', label: 'В пути' },
  { value: 'Spot', label: 'На месте' },
  { value: 'Yes', label: 'Подтвердил' },
]
const companyList = [
  { value: 'Компания 1', label: 'Компания 1' },
  { value: 'Компания 2', label: 'Компания 2' },
  { value: 'Компания 3', label: 'Компания 3' },
  { value: 'Компания 4', label: 'Компания 4' },
  { value: 'Компания 5', label: 'Компания 5' },
]
const specialistList = [
  { value: 'Захаров М. Н.', label: 'Захаров М. Н.' },
  { value: 'Иванов М. Н.', label: 'Иванов М. Н.' },
]
const periodList = [
  { value: 'Сутки', label: 'Сутки' },
  { value: 'Неделя', label: 'Неделя' },
  { value: 'Месяц [Т]', label: 'Месяц [Т]' },
  { value: 'Месяц [П]', label: 'Месяц [П]' },
  { value: 'Год', label: 'Год' },
]

const filters = {
  project: projList,
  srm: srmList,
  // statuses: statusList,
  // specialist: specialistList,
  period: periodList,
}

export default function FiltersButtom({ styleClass, columnFilters, setColumnFilters, estimates }) {
  // console.log(estimates)

  return (
    <>
      <CRow lg={{ gutterX: 5 }} className={styleClass}>
        <CCol lg={4} style={{ display: 'flex', gap: '10px' }} className="align-self-center">
          <div
            style={{ height: '40px', minWidth: '40px', cursor: 'pointer' }}
            className="py-2  small uley-data-main"
          >
            {estimates.length}
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
            style={{ height: '40px', width: '163px', marginRight: '80px', verticalAlign: 'top' }}
            className="py-2  small uley-data-main"
          >
            {estimates.reduce((acc, val) => {
              acc += Number(val.hours)

              return acc
            }, 0)}
          </div>
        </CCol>

        <CCol
          lg={4}
          style={{ display: 'flex', gap: '10px', justifyContent: 'end' }}
          className="align-self-center"
        >
          <div style={{ height: '40px', width: '163px' }} className="py-2  small uley-data-main">
            {format(
              estimates.reduce((acc, val) => {
                acc += Number(val.payment)

                return acc
              }, 0),
            )}
          </div>
        </CCol>
      </CRow>
    </>
  )
}
