import { forwardRef, useEffect, useState } from 'react'
import React from 'react'
import dayjs from 'dayjs'
import 'react-datepicker/dist/react-datepicker.css'
import {
  CDropdown,
  CTableDataCell,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from '@coreui/react'

export const DateCell2 = ({ getValue, row, column, table }) => {
  const initialValue = dayjs(getValue()).format('HH:mm')
  const [value, setValue] = useState(initialValue)
  const onBlur = () => {
    if (column.id === 'start') {
      let date = dayjs(row.original.start)
      let newHour = value.split(':')
      let newDate = date.hour(newHour[0]).minute(newHour[1])

      row.original.start = newDate.format()
      // console.log(row.original)
      table.options.meta?.updateData(row.original)
    }
    if (column.id === 'stop') {
      let date = dayjs(row.original.stop)
      let newHour = value.split(':')
      let newDate = date.hour(newHour[0]).minute(newHour[1])

      row.original.stop = newDate.format()
      // console.log(row.original)
      table.options.meta?.updateData(row.original)
    }
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
