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
  CButton,
  CFormSelect,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
} from '@coreui/react'

import 'react-datepicker/dist/react-datepicker.css'

const options = [
  { value: 'company', label: 'Компания' },
  { value: 'manager', label: 'Менеджер' },
]

const managerList = [
  { value: 'Захаров М. Н.', label: 'Захаров М. Н.' },
  { value: 'Рогов А. Е.', label: 'Рогов А. Е.' },
  { value: 'Игнатов А. П.', label: 'Игнатов А. П.' },
  { value: 'Никитина А. И.', label: 'Никитина А. И.' },
]
const companyList = [
  { value: 'Компания 1', label: 'Компания 1' },
  { value: 'Компания 2', label: 'Компания 2' },
  { value: 'Компания 3', label: 'Компания 3' },
  { value: 'Компания 4', label: 'Компания 4' },
  { value: 'Компания 5', label: 'Компания 5' },
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

const specialistList = [
  { value: 'Иванов Иван Иванович', label: 'Иванов Иван Иванович' },
  { value: 'Петров Петр Иванович', label: 'Петров Петр Иванович' },
]
const monthsList = [
  { value: '01', label: 'Январь' },
  { value: '02', label: 'Февраль' },
  { value: '03', label: 'Март' },
  { value: '04', label: 'Апрель' },
  { value: '05', label: 'Май' },
  { value: '06', label: 'Июнь' },
  { value: '07', label: 'Июль' },
  { value: '08', label: 'Август' },
  { value: '09', label: 'Сентябрь' },
  { value: '10', label: 'Октябрь' },
  { value: '11', label: 'Ноябрь' },
  { value: '12', label: 'Декабрь' },
]
const periodList = [
  { value: 'Сутки', label: 'Сутки' },
  { value: 'Неделя', label: 'Неделя' },
  { value: 'Месяц [Т]', label: 'Месяц [Т]' },
  { value: 'Месяц [П]', label: 'Месяц [П]' },
  { value: 'Год', label: 'Год' },
]

const yearsList = [
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
]
const filters = {
  project: projList,
  manager: managerList,
  company: companyList,
  period: periodList,
}

export default function Filters({ styleClass, columnFilters, setColumnFilters }) {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const [filterType, setFilterType] = useState(options[0])
  const [filter, setFilter] = useState(companyList)

  const handleChangeFilterType = (selectedOption) => {
    setFilterType(selectedOption)
    setFilter(filters[selectedOption.value])
  }

  useEffect(() => {}, [columnFilters])

  const handleFilterChange = (tt) => {
    // setColumnFilters((prev) =>
    //   prev.filter((f) => f.id !== filterType.value).concat({ id: filterType, value: tt }),
    // )
    // setColumnFilters([{ id: filterType.value, value: tt.value }])
    console.log('dffffff')
  }

  return (
    <>
      <CRow lg={{ gutter: 0 }} className="mb-3">
        <CCol lg={6} style={{ display: 'flex', gap: '5px' }} className="align-self-center">
          <Select
            options={options}
            defaultValue={filterType}
            onChange={handleChangeFilterType}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,

                backgroundColor: 'transparent',
                border: '1px solid hsla(0, 0%, 100%, 0.09)',
                borderRadius: '0.375rem',
                width: '115px',
                height: '30px',
              }),
              menu: (baseStyles, state) => ({
                ...baseStyles,

                backgroundColor: '#1f282c',
                margin: 'auto',
                width: '115px',
              }),
              menuList: (baseStyles, state) => ({
                ...baseStyles,

                backgroundColor: '#1f282c',
                textAlign: 'center',
                width: '115px',
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
          <Select
            options={filter}
            defaultValue={filter[0]}
            onChange={handleFilterChange}
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
          <Select
            options={yearsList}
            defaultValue={yearsList[0]}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,

                backgroundColor: 'transparent',
                border: '1px solid hsla(0, 0%, 100%, 0.09)',
                borderRadius: '0.375rem',
                width: '70px',
              }),
              menu: (baseStyles, state) => ({
                ...baseStyles,

                backgroundColor: '#1f282c',
                margin: 'auto',
                width: '70px',
              }),
              menuList: (baseStyles, state) => ({
                ...baseStyles,

                backgroundColor: '#1f282c',
                textAlign: 'center',
                width: '70px',
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
          <Select
            options={monthsList}
            defaultValue={monthsList[0]}
            className=""
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                marginRight: '15px',
                backgroundColor: 'transparent',
                border: '1px solid hsla(0, 0%, 100%, 0.09)',
                borderRadius: '0.375rem',
                width: '120px',
              }),
              menu: (baseStyles, state) => ({
                ...baseStyles,

                backgroundColor: '#1f282c',
                margin: 'auto',
                width: '120px',
              }),
              menuList: (baseStyles, state) => ({
                ...baseStyles,

                backgroundColor: '#1f282c',
                textAlign: 'center',
                width: '120px',
                '::-webkit-scrollbar': {
                  display: 'none',
                },
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
            style={{ height: '28px', width: '28px' }}
            // onClick={() => setColumnFilters([])}
            onClick={() => console.log('dddddd')}
          />
        </CCol>

        <CCol
          lg={6}
          style={{ display: 'flex', gap: '5px' }}
          className="align-self-center justify-content-end"
        >
          <CRow>
            <CCol className="align-self-center text-end">Оплата</CCol>
            <CCol
              style={{
                maxWidth: '10px',
                height: ' 30px',
                alignSelf: 'center',
                width: '10px',
              }}
              className="uley-smeta-generate-line"
            ></CCol>
            <CCol lg="auto">
              <CFormCheck style={{ marginBottom: 0 }} id="flexCheckDefault" label="Оплачено" />
              <CFormCheck style={{ marginBottom: 0 }} id="flexCheckDefault1" label="Не оплачено" />
            </CCol>
          </CRow>
          <CRow>
            <CCol className="align-self-center text-end">Договор</CCol>
            <CCol
              style={{
                maxWidth: '10px',
                height: ' 30px',
                alignSelf: 'center',
                width: '10px',
              }}
              className="uley-smeta-generate-line"
            ></CCol>
            <CCol lg="auto">
              <CFormCheck style={{ marginBottom: 0 }} id="flexCheckDefault" label="Подписано" />
              <CFormCheck style={{ marginBottom: 0 }} id="flexCheckDefault1" label="Не подписано" />
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </>
  )
}
