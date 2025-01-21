/* eslint-disable react/prop-types */
import React, { useEffect, useState, Suspense, useContext } from 'react'
import { format } from 'src/utils/formater'
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
  CContainer,
  CSpinner,
  CCollapse,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from '@coreui/react'
import { TextEditableCell } from 'src/components/table/TextEditableCell'
import { MoneyEditableCell } from 'src/components/table/MoneyEditableCell'
import { getRates, updateRateItem, updateRateHour } from 'src/services/api/rates'
import {
  getSpecialityGrups,
  createSpecialityGroup,
  updateSpeciality,
  updateSpecialityGroup,
} from 'src/services/api/speciality'

import MenuIcon3 from 'src/components/MenuIcon/MenuIcon'
import { AppSidebar, AppFooter, AppHeader } from '../../components/index'

import { useUsersContext } from '../../chat-app-new/context/usersContext'

const PayRate = () => {
  const { userId, token } = useUsersContext()

  const queryClient = useQueryClient()
  // const [groupItems, setGroup] = useState(groups)

  // console.log(process.env.REACT_APP_TENANT_REST_API)
  // console.log(token)
  // console.log(localStorage.getItem('user'))

  const [editing, setEditing] = useState(false)

  const [showCollapsible, setShowCollapsible] = useState('')
  const hoursList = [1, 2, 4, 6, 8, 10, 12, 24]

  const handleCreateGroup = (item) => {
    // e.preventDefault()
    // const formData = new FormData(e.currentTarget)
    console.log(item)
    if (item.type === 'Удалить') {
      item.type = 'delete'
      mutateGroup(item)
    }
    if (item.type === 'Добавить') {
      const formValues = {
        type: 'add',
      }
      mutateGroup(formValues)
    }
  }

  const handleChangePayRate = (item) => {
    console.log(item)
    if (item.type === 'Удалить') {
      item.type = 'delete'
      mutateSpeciality(item)
    }
    if (item.type === 'Добавить') {
      item.type = 'add'
      mutateSpeciality(item)
    }
  }
  const {
    isPendingGroups,
    errorGroups,
    data: groupItems,
  } = useQuery({
    queryKey: ['groups'],
    queryFn: getSpecialityGrups,
  })

  if (groupItems && showCollapsible === '') {
    const obj = groupItems.reduce((o, key) => ({ ...o, [key.id]: true }), {})
    setShowCollapsible(obj)
  }

  const {
    isPending,
    error,
    data: rates,
  } = useQuery({
    queryKey: ['rates'],
    queryFn: getRates,
  })

  const { mutate: mutateSpeciality } = useMutation({
    mutationFn: updateSpeciality,
    onSettled: async () => {
      return await queryClient.invalidateQueries(['groups','rates'] )
    },
  })
  const { mutate: mutateGroup } = useMutation({
    mutationFn: createSpecialityGroup,   
    onSettled: async () => {
      return await queryClient.invalidateQueries(['groups', 'rates'])
      
    },
  })

  const { mutate: updateGroup } = useMutation({
    mutationFn: updateSpecialityGroup,
    onSettled: async () => {
      return await queryClient.invalidateQueries(['groups', 'rates'])
    },
  })

  const { mutate: mutatePaument } = useMutation({
    mutationFn: updateRateItem,
    onSettled: async () => {
      return await queryClient.invalidateQueries( ['groups','rates'] )
    },
  })
  const { mutate: mutateHours } = useMutation({
    mutationFn: updateRateHour,
    onSettled: async () => {
      return await queryClient.invalidateQueries(['groups','rates'])
    },
  })

  if (isPending)
    return (
      <div className="dark-theme">
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <CContainer lg>
              <div style={{ color: 'hsla(0, 0%, 100%, .75)' }}>Загрузка...</div>
            </CContainer>
          </div>
          <AppFooter />
        </div>
      </div>
    )

  if (error)
    return (
      <div className="dark-theme">
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <CContainer lg>
              <div style={{ color: 'hsla(0, 0%, 100%, .75)' }}>Ошибка при загрузке ставок</div>
            </CContainer>
          </div>
          <AppFooter />
        </div>
      </div>
    )
  

  const editItemNew = (item_id, value) => {
    console.log(value)
    console.log(item_id)    
    
    const valueParsed = parseInt(value.replace(/\s/g, ""), 10)
    const data = { payment: valueParsed }

    console.log(data)


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

  const handleUpdateSpecialityName = (specialitiId, name) => {
    const data = {
      specialitiId: specialitiId,
      groupId: null,
      type: 'update_name',
      specialityName: name,
    }

    mutateSpeciality(data)
  }
  const handleUpdateGroupName = (groupId, name) => {
    console.log(groupId)
    console.log(name)
    const data = {
      groupId: groupId,
      name: name,
    }

    updateGroup(data)
  }
  const toggleCollapsable = (id) => () => {
    setShowCollapsible((set) => ({
      ...set,
      [id]: !set[id],
    }))
  }

  return groupItems.length > 0 ? (
    <div className="dark-theme">
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer lg>
            <Suspense fallback={<CSpinner color="primary" />}>
              {/* <CForm onSubmit={handleCreateGroup}>
                <CFormInput
                  style={{ width: '250px' }}
                  type="text"
                  id="exampleFormControlInput1"
                  placeholder="Создать группу"
                  name="groupName"
                />
              </CForm> */}
              <CRow className="mt-2">
                <CCol xs>
                  {groupItems.map((group, index) => (
                    <CCard key={group.id} className="mb-2">
                      <CCardHeader>
                        <CRow className="justify-content-between">
                          <CCol lg={2} className="align-self-start">
                            <TextEditableCell
                              data={group.name}
                              itemId={group.id}
                              updateData={handleUpdateGroupName}
                            />
                          </CCol>
                          <CCol
                            style={{ cursor: 'pointer', minHeight: '26px' }}
                            onClick={toggleCollapsable(group.id)}
                            className="align-self-start"
                          ></CCol>
                          <CCol lg={1} className="text-end">
                            <MenuIcon3
                              change={handleCreateGroup}
                              groupId={group.id}
                              // specialitiId={item.id}
                              items={[{ name: 'Удалить' }, { name: 'Добавить' }]}
                              shift={0}
                            />
                          </CCol>
                        </CRow>
                      </CCardHeader>

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
                                    <CTableDataCell className="text-center">
                                      {index + 1}
                                    </CTableDataCell>

                                    {/* <CTableDataCell
                                 contentEditable="true"
                                //  onBlur={(e) => handleChangePayRate(item.specialitiId, e)}
                                 onKeyDown={(e) => {
                                  console.log("1111")
                                  handleUpdateSpecialityName(item.specialitiId, group.id, e)
                                 }}
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
                                </CTableDataCell> */}
                                    <TextEditableCell
                                      data={
                                        item.speciality.name.length > 20
                                          ? `${item.speciality.name.substring(0, 20)}...`
                                          : item.speciality.name
                                      }
                                      itemId={item.speciality.id}
                                      updateData={handleUpdateSpecialityName}
                                    />
                                    <MoneyEditableCell
                                      data={item.rate_items.stavka1.payment}
                                      itemId={item.rate_items.stavka1.id}
                                      updateData={editItemNew}
                                    />
                                    {/* <CTableDataCell
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
                                    </CTableDataCell> */}
                                    
                                    <MoneyEditableCell
                                      data={item.rate_items.stavka2.payment}
                                      itemId={item.rate_items.stavka2.id}
                                      updateData={editItemNew}
                                    />
                                    <MoneyEditableCell
                                      data={item.rate_items.stavka3.payment}
                                      itemId={item.rate_items.stavka3.id}
                                      updateData={editItemNew}
                                    />
                                    <MoneyEditableCell
                                      data={item.rate_items.stavka4.payment}
                                      itemId={item.rate_items.stavka4.id}
                                      updateData={editItemNew}
                                    />
                                     <MoneyEditableCell
                                      data={item.rate_items.stavka5.payment}
                                      itemId={item.rate_items.stavka5.id}
                                      updateData={editItemNew}
                                    />
                                    <MoneyEditableCell
                                      data={item.rate_items.stavka6.payment}
                                      itemId={item.rate_items.stavka6.id}
                                      updateData={editItemNew}
                                    />
                                     <MoneyEditableCell
                                      data={item.rate_items.stavka7.payment}
                                      itemId={item.rate_items.stavka7.id}
                                      updateData={editItemNew}
                                    />
                                     <MoneyEditableCell
                                      data={item.rate_items.stavka8.payment}
                                      itemId={item.rate_items.stavka8.id}
                                      updateData={editItemNew}
                                    />

                                    {/* <CTableDataCell className="text-center">{item.shift}</CTableDataCell> */}
                                    <CTableDataCell
                                      
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
                    </CCard>
                  ))}
                </CCol>
              </CRow>
            </Suspense>
          </CContainer>
        </div>
        <AppFooter />
      </div>
    </div>
  ) : (
    <div className="dark-theme">
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer lg>
            {/* <Suspense fallback={<CSpinner color="primary" />}>
              <CForm onSubmit={handleCreateGroup}>
                <CFormInput
                  style={{ width: '250px' }}
                  type="text"
                  id="exampleFormControlInput1"
                  placeholder="Создать группу"
                  name="groupName"
                />
              </CForm>
            </Suspense> */}
          </CContainer>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default PayRate
