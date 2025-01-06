/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { format } from '../../utils'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormCheck,
  CPopover,
  CButton,
  CForm,
  CFormInput,
  CCollapse,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from '@coreui/react'

import { getRates, updateRateItem, updateRateHour } from 'src/services/api/rates'
import {
  getSpecialityGrups,
  createSpecialityGroup,
  duplicateSpeciality,
} from 'src/services/api/speciality'

import MenuIcon3 from 'src/components/MenuIcon/MenuIcon'

const PayRate = () => {
  // const [rates, setRates] = useState()
  const queryClient = useQueryClient()
  // const [groupItems, setGroup] = useState(groups)

  const [editing, setEditing] = useState(false)

  const [showCollapsible, setShowCollapsible] = useState({})
  const hoursList = [1, 2, 4, 6, 8, 10, 12, 24]

  const handleCreateGroup = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const formValues = {
      name: formData.get('groupName'),
      order: 0,
    }

    mutateGroup(formValues)
  }

  const handleChangePayRate = (item) => {
    console.log(item)
    createRate(item)
  }
  const {
    isPendingGroups,
    errorGroups,
    data: groupItems,
  } = useQuery({
    queryKey: ['groups'],
    queryFn: getSpecialityGrups,
  })

  const {
    isPending,
    error,
    data: rates,
  } = useQuery({
    queryKey: ['rates'],
    queryFn: getRates,
  })
  const { mutate: mutateGroup } = useMutation({
    mutationFn: createSpecialityGroup,
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['groups'] })
    },
  })
  const { mutate: createRate } = useMutation({
    mutationFn: duplicateSpeciality,
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['rates'] })
    },
  })

  const { mutate: mutatePaument } = useMutation({
    mutationFn: updateRateItem,
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['rates'] })
    },
  })
  const { mutate: mutateHours } = useMutation({
    mutationFn: updateRateHour,
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ['rates'] })
    },
  })

  if (isPending) return <div style={{ color: 'hsla(0, 0%, 100%, .75)' }}>Загрузка...</div>

  if (error)
    return <div style={{ color: 'hsla(0, 0%, 100%, .75)' }}>Ошибка при загрузке ставок</div>

  const editItem = (item_id, e) => {
    if (e.key === 'Enter') {
      // call action
      // const payment = e.currentTarget.textContent
      // const data = { payment: parseInt(payment.replace(' ', ''), 10) }

      // const item = { item_id, data }
      // mutatePaument(item)
      e.preventDefault()
    }
    const payment = e.currentTarget.textContent
    const data = { payment: parseInt(payment.replace(' ', ''), 10) }

    const item = { item_id, data }
    mutatePaument(item)
  }

  const handleHoursUpdate = (rate_id, e) => {
    const hour = e.currentTarget.value
    const data = { hour: parseInt(hour, 10) }
    const item_data = { rate_id, data }
    mutateHours(item_data)
    setEditing(false)
  }

  const toggleCollapsable = (id) => () => {
    setShowCollapsible((set) => ({
      ...set,
      [id]: !set[id],
    }))
  }

  return groupItems.length > 0 ? (
    <>
      <CForm onSubmit={handleCreateGroup}>
        <CFormInput
          style={{ width: '250px' }}
          type="text"
          id="exampleFormControlInput1"
          placeholder="Создать группу"
          name="groupName"
        />
      </CForm>
      <CRow className="mt-2">
        <CCol xs>
          {groupItems.map((group, index) => (
            <CCard key={group.id} className="mb-2">
              <CCardHeader onClick={toggleCollapsable(group.id)}>
                <CRow className="justify-content-between">
                  <CCol className="align-self-start">{group.name}</CCol>
                  <CCol className="text-end">
                    <MenuIcon3
                      change={handleChangePayRate}
                      groupId={group.id}
                      // specialitiId={item.id}
                      items={[{ name: 'Удалить' }, { name: 'Добавить' }]}
                      shift={0}
                    />
                  </CCol>
                </CRow>
              </CCardHeader>
              {/* <CCollapse visible={visible} id={group.id}> */}
              {showCollapsible[group.id] && (
                <CCardBody>
                  <CTable
                    align="middle"
                    className="mb-0 border"
                    style={{
                      overflow: 'hidden',
                      width: '1262px',
                      borderRadius: '5px',
                      height: '30px',
                      minHeight: '30px',
                      maxHeight: '30px',
                    }}
                    responsive
                    hover
                  >
                    <CTableHead color="light  ">
                      <CTableRow>
                        <CTableHeaderCell
                          className="text-center"
                          style={{
                            width: '40px',
                            height: '30px',
                            minHeight: '30px',
                            maxHeight: '30px',
                          }}
                        >
                          №
                        </CTableHeaderCell>
                        <CTableHeaderCell
                          style={{
                            width: '195px',
                            minWidth: '195px',
                            height: '30px',
                            minHeight: '30px',
                            maxHeight: '30px',
                          }}
                        >
                          Специальность
                        </CTableHeaderCell>
                        <CTableHeaderCell
                          style={{
                            width: '114px',
                            minWidth: '114px',
                            height: '30px',
                            minHeight: '30px',
                            maxHeight: '30px',
                          }}
                          className="text-center"
                        >
                          №1
                        </CTableHeaderCell>
                        <CTableHeaderCell
                          style={{
                            width: '114px',
                            minWidth: '114px',
                            height: '30px',
                            minHeight: '30px',
                            maxHeight: '30px',
                          }}
                          className="text-center"
                        >
                          №2
                        </CTableHeaderCell>
                        <CTableHeaderCell
                          style={{
                            width: '114px',
                            minWidth: '114px',
                            height: '30px',
                            minHeight: '30px',
                            maxHeight: '30px',
                          }}
                          className="text-center"
                        >
                          №3
                        </CTableHeaderCell>
                        <CTableHeaderCell
                          style={{
                            width: '114px',
                            minWidth: '114px',
                            height: '30px',
                            minHeight: '30px',
                            maxHeight: '30px',
                          }}
                          className="text-center"
                        >
                          №4
                        </CTableHeaderCell>
                        <CTableHeaderCell
                          style={{
                            width: '114px',
                            minWidth: '114px',
                            height: '30px',
                            minHeight: '30px',
                            maxHeight: '30px',
                          }}
                          className="text-center"
                        >
                          №5
                        </CTableHeaderCell>
                        <CTableHeaderCell
                          style={{
                            width: '114px',
                            minWidth: '114px',
                            height: '30px',
                            minHeight: '30px',
                            maxHeight: '30px',
                          }}
                          className="text-center"
                        >
                          №6
                        </CTableHeaderCell>
                        <CTableHeaderCell
                          style={{
                            width: '114px',
                            minWidth: '114px',
                            height: '30px',
                            minHeight: '30px',
                            maxHeight: '30px',
                          }}
                          className="text-center"
                        >
                          №7
                        </CTableHeaderCell>
                        <CPopover
                          content="Фиксированная ставка"
                          placement="bottom"
                          trigger={['hover', 'focus']}

                          // delay={{ show: 0, hide: 100000 }}
                        >
                          <CTableHeaderCell className="text-center">№8</CTableHeaderCell>
                        </CPopover>

                        <CTableHeaderCell
                          style={{
                            width: '85px',
                            minWidth: '85px',
                            height: '30px',
                            minHeight: '30px',
                            maxHeight: '30px',
                          }}
                          className="text-center px-0"
                        >
                          Смена
                        </CTableHeaderCell>
                        <CTableHeaderCell className="text-center px-0"></CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {rates
                        .filter((item) => item.speciality.group.name === group.name)
                        .map((item, index) => (
                          <CTableRow key={item.id}>
                            <CTableDataCell className="text-center">{index + 1}</CTableDataCell>

                            <CTableDataCell
                              style={{
                                width: '195px',
                                minWidth: '195px',
                                maxWidth: '195px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                height: '30px',
                                minHeight: '30px',
                                maxHeight: '30px',
                              }}
                            >
                              {item.speciality.name.length > 20
                                ? `${item.speciality.name.substring(0, 20)}...`
                                : item.speciality.name}
                            </CTableDataCell>
                            <CTableDataCell
                              contentEditable="true"
                              // onBlur={(e) =>
                              //   editItem(item.rate_items.stavka1.id, e.currentTarget.textContent)
                              // }
                              onBlur={(e) => editItem(item.rate_items.stavka1.id, e)}
                              style={{
                                width: '114px',
                                minWidth: '114px',
                                height: '30px',
                                minHeight: '30px',
                                maxHeight: '30px',
                              }}
                              onKeyDown={(e) => editItem(item.rate_items.stavka1.id, e)}
                              className="text-center"
                            >
                              {format(item.rate_items.stavka1.payment)}
                            </CTableDataCell>
                            <CTableDataCell
                              contentEditable="true"
                              style={{
                                width: '114px',
                                minWidth: '114px',
                                height: '30px',
                                minHeight: '30px',
                                maxHeight: '30px',
                              }}
                              // onBlur={(e) =>
                              //   editItem(item.rate_items.stavka2.id, e.currentTarget.textContent)
                              // }
                              onKeyDown={(e) => editItem(item.rate_items.stavka2.id, e)}
                              className="text-center"
                            >
                              {format(item.rate_items.stavka2.payment)}
                            </CTableDataCell>
                            <CTableDataCell
                              contentEditable="true"
                              style={{
                                width: '114px',
                                minWidth: '114px',
                                height: '30px',
                                minHeight: '30px',
                                maxHeight: '30px',
                              }}
                              // onBlur={(e) =>
                              //   editItem(item.rate_items.stavka3.id, e.currentTarget.textContent)
                              // }
                              onKeyDown={(e) => editItem(item.rate_items.stavka3.id, e)}
                              className="text-center"
                            >
                              {format(item.rate_items.stavka3.payment)}
                            </CTableDataCell>
                            <CTableDataCell
                              contentEditable="true"
                              style={{
                                width: '114px',
                                minWidth: '114px',
                                height: '30px',
                                minHeight: '30px',
                                maxHeight: '30px',
                              }}
                              // onBlur={(e) =>
                              //   editItem(item.rate_items.stavka4.id, e.currentTarget.textContent)
                              // }
                              onKeyDown={(e) => editItem(item.rate_items.stavka4.id, e)}
                              className="text-center"
                            >
                              {format(item.rate_items.stavka4.payment)}
                            </CTableDataCell>
                            <CTableDataCell
                              contentEditable="true"
                              style={{
                                width: '114px',
                                minWidth: '114px',
                                height: '30px',
                                minHeight: '30px',
                                maxHeight: '30px',
                              }}
                              // onBlur={(e) =>
                              //   editItem(item.rate_items.stavka5.id, e.currentTarget.textContent)
                              // }
                              onKeyDown={(e) => editItem(item.rate_items.stavka5.id, e)}
                              className="text-center"
                            >
                              {format(item.rate_items.stavka5.payment)}
                            </CTableDataCell>
                            <CTableDataCell
                              contentEditable="true"
                              style={{
                                width: '114px',
                                minWidth: '114px',
                                height: '30px',
                                minHeight: '30px',
                                maxHeight: '30px',
                              }}
                              // onBlur={(e) =>
                              //   editItem(item.rate_items.stavka6.id, e.currentTarget.textContent)
                              // }
                              onKeyDown={(e) => editItem(item.rate_items.stavka6.id, e)}
                              className="text-center"
                            >
                              {format(item.rate_items.stavka6.payment)}
                            </CTableDataCell>
                            <CTableDataCell
                              contentEditable="true"
                              style={{
                                width: '114px',
                                minWidth: '114px',
                                height: '30px',
                                minHeight: '30px',
                                maxHeight: '30px',
                              }}
                              // onBlur={(e) =>
                              //   editItem(item.rate_items.stavka7.id, e.currentTarget.textContent)
                              // }
                              onKeyDown={(e) => editItem(item.rate_items.stavka7.id, e)}
                              className="text-center"
                            >
                              {format(item.rate_items.stavka7.payment)}
                            </CTableDataCell>
                            <CTableDataCell
                              contentEditable="true"
                              style={{
                                width: '114px',
                                minWidth: '114px',
                                height: '30px',
                                minHeight: '30px',
                                maxHeight: '30px',
                              }}
                              // onBlur={(e) =>
                              //   editItem(item.rate_items.stavka8.id, e.currentTarget.textContent)
                              // }
                              onKeyDown={(e) => editItem(item.rate_items.stavka8.id, e)}
                              className="text-center"
                            >
                              {format(item.rate_items.stavka8.payment)}
                            </CTableDataCell>

                            {/* <CTableDataCell className="text-center">{item.shift}</CTableDataCell> */}
                            <CTableDataCell
                              // onDoubleClick={() => setEditing(true)}
                              className="text-center"
                            >
                              {editing === item.id ? (
                                <select
                                  className="mb-0 uley_hour_input text-center form-control mx-auto"
                                  style={{
                                    boxShadow: 'inset 0 0 0 1px #2684ff',
                                    borderRadius: '0.375rem !important;',
                                    backgroundColor: 'transparent',
                                    color: 'white',
                                    padding: '0 5px',
                                    width: '40px',
                                    WebkitAppearance: 'none',
                                  }}
                                  value={item.shift}
                                  onChange={(e) => {
                                    handleHoursUpdate(item.id, e)
                                  }}
                                >
                                  {hoursList.map((num) => (
                                    <option
                                      style={{
                                        backgroundColor: '#1f272c',
                                        color: 'white',
                                        padding: '0 5px',
                                        width: '40px',
                                        WebkitAppearance: 'none',
                                        textAlign: 'center',
                                      }}
                                      className="uley_hour_input_item"
                                      value={num}
                                      key={num}
                                    >
                                      {num}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <p
                                  style={{
                                    width: '85px',
                                    minWidth: '85px',
                                    height: '30px',
                                    minHeight: '30px',
                                    maxHeight: '30px',
                                  }}
                                  onDoubleClick={() => setEditing(item.id)}
                                  className="mb-0"
                                >
                                  {item.shift}
                                </p>
                              )}
                            </CTableDataCell>

                            <CTableDataCell className="p-0 ">
                              <MenuIcon3
                                change={handleChangePayRate}
                                groupId={group.id}
                                specialitiId={item.id}
                                items={[{ name: 'Удалить' }, { name: 'Добавить' }]}
                                shift={0}
                              />
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                    </CTableBody>
                  </CTable>
                </CCardBody>
              )}

              {/* </CCollapse> */}
            </CCard>
          ))}
        </CCol>
      </CRow>
    </>
  ) : (
    <CForm onSubmit={handleCreateGroup}>
      <CFormInput
        style={{ width: '250px' }}
        type="text"
        id="exampleFormControlInput1"
        placeholder="Создать группу"
        name="groupName"
      />
    </CForm>
  )
}

export default PayRate
