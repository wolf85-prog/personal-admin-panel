import { forwardRef, useEffect, useState } from 'react'
import React from 'react'
import dayjs from 'dayjs'
import 'react-datepicker/dist/react-datepicker.css'
import { format, formatDate } from 'src/utils/formater'
import {
  CDropdown,
  CTableDataCell,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from '@coreui/react'

export const MoneyCell = ({ getValue, row, column, table }) => {
  const initialValue = format(getValue())
  const [value, setValue] = useState(initialValue)
  const onBlur = () => {
    if (column.id === 'gsm') {
      row.original.gsm = Number(value)
    }
    if (column.id === 'taxi') {
      row.original.taxi = Number(value)
    }
    if (column.id === 'transport') {
      row.original.transport = Number(value)
    }
    console.log(row.original)
    table.options.meta?.updateData(row.original)
  }

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <CTableDataCell
      style={{
        height: '30px',
        minHeight: '30px',
        maxHeight: '30px',
        maxWidth: `${column.getSize('maxSize')}px`,
        padding: '0',
        borderColor: 'inherit',
        borderStyle: 'solid',
        borderWidth: 0,
        borderBottomWidth: '1px',
        textAlign: 'center',
        backgroundColor: 'inherit',
      }}
    >
      <input
        style={{
          height: '30px',
          minHeight: '30px',
          maxHeight: '30px',
          maxWidth: `${column.getSize('maxSize')}px`,
          padding: '0',
          borderColor: 'inherit',
          color: 'white',
          borderWidth: 0,
          textAlign: 'center',
          backgroundColor: 'inherit',
        }}
        value={value}
        onBlur={onBlur}
        onChange={(e) => setValue(e.target.value)}
      />
    </CTableDataCell>
  )
}
