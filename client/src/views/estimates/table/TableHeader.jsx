/* eslint-disable react/prop-types */
import React from 'react'
import { flexRender } from '@tanstack/react-table'
import { CIcon } from '@coreui/icons-react'
import { cilList, cilShieldAlt, cilMenu } from '@coreui/icons'
import {
  CTableHeaderCell,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
} from '@coreui/react'

export default function TableHeader({ header }) {
  return (
    <CTableHeaderCell
      style={{
        width: `${header.getSize()}px`,
        minWidth: `${header.getSize('minSize')}px`,
        // maxWidth: `${header.maxSize}px`,
        height: '30px',
        minHeight: '30px',
        maxHeight: '30px',
        cursor: 'pointer',
      }}
      onClick={header.column.getToggleSortingHandler()}
    >
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
    </CTableHeaderCell>
  )
}
