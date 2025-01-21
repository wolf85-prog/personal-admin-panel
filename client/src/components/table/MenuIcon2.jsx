/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react'

import { ReactComponent as YourSvg } from './icons/three-dots-vertical.svg'

export default function MenuIcon2({ items, shift }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(false)
  const menuRef = useRef(null)

  const displayResponsiveMenu = () => {
    setOpen(!open)
  }
  function handleActive() {
    setActive(!active)
  }

  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <div
      onMouseEnter={handleActive}
      onMouseLeave={handleActive}
      ref={menuRef}
      className="dropdown me-auto"
    >
      <YourSvg
        style={{ visibility: active ? 'visible' : 'hidden' }}
        onClick={displayResponsiveMenu}
        className="dropbtn "
      />

      {open && (
        <div
          id="myDropdown"
          className={open ? 'dropdown-content show text-center' : 'dropdown-content text-center'}
          style={{ right: shift }}
        >
          {items.map((item, index) => (
            <li key={item.name}>{item.name}</li>
          ))}
        </div>
      )}
    </div>
  )
}
