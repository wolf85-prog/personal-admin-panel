import { forwardRef, useEffect, useState } from 'react'
import React from 'react'
import dayjs from 'dayjs'
import 'react-datepicker/dist/react-datepicker.css'
import { format, formatDate } from 'src/utils/formater'
import Select from 'react-select'
import {
  CDropdown,
  CTableDataCell,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from '@coreui/react'

export const SpecialityCell = ({ props: { getValue, row, column, table }, specialityList }) => {
  console.log(specialityList)
  const initialValue = format(getValue())
  const [cellValue, setCellValue] = useState(initialValue)
  const [selectVisible, setSelectVisible] = useState({})

  const onBlur = (cheked) => {
    row.original.specialityId = cheked.value
    row.original.speciality = cheked.label
    table.options.meta?.updateData(row.original)
  }

  useEffect(() => {
    setCellValue(initialValue)
  }, [initialValue])

  return (
    <CTableDataCell
      onClick={() => setSelectVisible(row.original.id + column.id)}
      onMouseLeave={() => setSelectVisible({})}
      style={{
        height: '30px',
        minHeight: '30px',
        maxHeight: '30px',
        padding: '0',
      }}
    >
      {selectVisible === row.original.id + column.id ? (
        <Select
          onChange={onBlur}
          onBlur={() => setSelectVisible({})}
          options={specialityList}
          styles={{
            container: (baseStyles, state) => ({
              ...baseStyles,

              width: '250px',
              height: '30px',
            }),
            control: (baseStyles, state) => ({
              ...baseStyles,

              backgroundColor: 'transparent',
              border: '1px solid hsla(0, 0%, 100%, 0.09)',
              borderRadius: '0.375rem',
              width: '250px',
              height: '30px',
            }),
            menu: (baseStyles, state) => ({
              ...baseStyles,

              backgroundColor: '#1f282c',
              margin: 'auto',
              width: '250px',
              height: '30px',
            }),
            menuList: (baseStyles, state) => ({
              ...baseStyles,

              backgroundColor: '#1f282c',
              textAlign: 'center',
              width: '250px',
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
      ) : (
        <p
          style={{
            height: '30px',
            minHeight: '30px',
            maxHeight: '30px',
            margin: 0,
          }}
          className="pt-1"
        >
          {cellValue}
        </p>
      )}
    </CTableDataCell>
  )
}
