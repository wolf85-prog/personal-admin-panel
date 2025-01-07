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

export const TextEditableCell = ({data, itemId, updateData}) => {
  
  const initialValue = format(data)
  const [value, setValue] = useState(initialValue)
  const onBlur = (e) => {    
    updateData(itemId, e.target.value)
  }

  const handleUpdate = (e)=> {
    
    if (e.key === 'Enter') {
      
      e.preventDefault()
      updateData(itemId, null,  e.target.value)
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

        padding: '0',
        borderColor: 'inherit',
        borderStyle: 'solid',
        borderWidth: 0,
        // borderBottomWidth: '1px',
        textAlign: 'center',
       
      }}
    >
      <input
        style={{
          height: '30px',
          minHeight: '30px',
          maxHeight: '30px',

          padding: '0',
          borderColor: 'inherit',
          color: 'white',
          borderWidth: 0,
          textAlign: 'center',
          backgroundColor: 'inherit',
        }}
        value={value}
        onBlur={onBlur}
        onKeyDown={handleUpdate}
        onChange={(e) => setValue(e.target.value)}
      />
    </CTableDataCell>
  )
}
