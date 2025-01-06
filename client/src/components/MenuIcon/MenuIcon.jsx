/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react'
import {
  CDropdown,
  CTableDataCell,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from '@coreui/react'
import { ReactComponent as YourSvg } from 'src/assets/icons/three-dots-vertical.svg'

import styles from './MenuIcon.module.css'

export default function MenuIcon3({ items, groupId, specialitiId, change }) {
  return (
    <div className="dropdown me-auto">
      <CDropdown direction="dropstart">
        <CDropdownToggle className={`${styles['reset-icon']} text-end p-0 m-0`} color="#00ff00">
          <YourSvg className="dropbtn" />
        </CDropdownToggle>
        <CDropdownMenu className="text-center pt-1">
          {items.map((item, index) => (
            <CDropdownItem
              onClick={() => {
                change({ type: item.name, groupId: groupId, specialitiId: specialitiId })
              }}
              key={item.name}
              style={{ cursor: 'pointer' }}
            >
              {item.name}
            </CDropdownItem>
          ))}
        </CDropdownMenu>
      </CDropdown>
    </div>
  )
}
