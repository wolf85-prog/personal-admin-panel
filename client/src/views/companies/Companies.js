import React, { Suspense, useEffect, useState, useRef } from 'react'
import * as dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { AppSidebar, AppFooter, AppHeader } from '../../components/index'
import InputMask from 'react-input-mask'
import Autocomplete from '@mui/material/Autocomplete'
import {
  CContainer,
  CSpinner,
  CCol,
  CRow,
  CButton,
  CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCard,
  CCardBody,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormSelect,
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
} from '@coreui/react'

import Close from '../../assets/images/clear.svg'
import zamok from '../../assets/images/замок.png'
import zamok2 from '../../assets/images/замок2.png'
import addAvatar from '../../assets/images/add_avatar.png'
import Krestik from '../../assets/images/krestik.png'
import imgBlock18 from '../../assets/images/block18.png'
import Trubka from '../../assets/images/trubka.png'

import Tg from '../../assets/images/tg.png'
import Star from '../../assets/images/star.png'
import StarActive from '../../assets/images/star_activ.svg'
import Disketa from '../../assets/images/disketa.png'
import arrowDown from 'src/assets/images/arrowDown.svg'

import MyDropdown from 'src/components/Dropdown/Dropdown'

import MyDropdown3 from 'src/components/Dropdown3/Dropdown3'

import comtegs from 'src/data/comtegs'

import sferaData from 'src/data/sfera'

import Icon from 'src/components/Icon'
import Filters from './table/Filters'

import { format, formatPhoneNumber, formatDate, formatDocumentStatus } from '../../utils/formater'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCompanies, getCompany, getCompanyComplects } from 'src/services/api/documents'

import './Companies.css'

//Workers.js
const Companies = () => {
  const [docItems, setDocItems] = useState([])

  // const [companyItems, setCompanyItems] = useState(comapnies)

  const [showDopBlock, setshowDopBlock] = useState(false)
  const [showDocumentBlock, setShowDocumentBlock] = useState(false)
  const [isHovered, setIsHovered] = useState(null)

  const handleShowDopBlock = () => {
    setShowDocumentBlock(false)
    setshowDopBlock(!showDopBlock)
  }

  const handleShowDocumentBlock = () => {
    setshowDopBlock(false)
    setShowDocumentBlock(!showDocumentBlock)
  }

  const handleMouseOver = (e) => {
    switch (e.target.id) {
      case '1':
        setIsHovered(1)
        break
      case '2':
        setIsHovered(2)
        break
      case '3':
        setIsHovered(3)
        break
      case '4':
        setIsHovered(4)
        break
      case '5':
        setIsHovered(5)
        break
      default:
        break
    }
  }

  const [showCompanyProfile, setShowCompanyProfile] = useState(false)

  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('')
  const [showProfile, setShowProfile] = useState(false)
  const [showClose, setShowClose] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [showSearch, setShowSearch] = useState(true)
  const [showClear, setShowClear] = useState(false)
  const [block, setBlock] = useState(false)
  const [showMenuKrest, setShowMenuKrest] = useState(false)
  const [showKrest, setShowKrest] = useState(false)

  const [showSavePhone, setShowSavePhone] = useState(false)
  const [showSaveFio, setShowSaveFio] = useState(false)
  const [showSave3, setShowSave3] = useState(false)
  const [showSaveOffice, setShowSaveOffice] = useState(false)
  const [showSaveSklad, setShowSaveSklad] = useState(false)

  const [id, setId] = useState('')
  const [title, setTitle] = useState('Название компании')
  const [city, setCity] = useState('Москва')
  const [phone, setPhone] = useState('+7 (999) 999-99-99')
  const [managers, setManagers] = useState([])
  const [managersObj, setManagersObj] = useState([])
  const [managersData, setManagersData] = useState([])
  const [managerName, setManagerName] = useState('')
  const [office, setOffice] = useState('')
  const [sklad, setSklad] = useState('')

  const [bugalterFio, setBugalterFio] = useState('')
  const [bugalterEmail, setBugalterEmail] = useState('')
  const [bugalterPhone, setBugalterPhone] = useState('')

  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [comteg, setComteg] = useState(['Невыход'])
  const [sfera, setSfera] = useState(['Звуковое оборудование'])
  const [dogovorDate, setDogovorDate] = useState('')
  const [dogovorNumber, setDogovorNumber] = useState('')
  const [dateReg, setDateReg] = useState('')
  const [profile, setProfile] = useState('')
  const [projects, setProjects] = useState('')
  const [inn, setInn] = useState('')

  const [countPress, setCountPress] = useState(0)
  const [countPressTG, setCountPressTG] = useState(0)
  const [countPressCity, setCountPressCity] = useState(0)

  const [blockProfile, setBlockProfile] = useState(true)
  const [showBlacklist, setShowBlacklist] = useState(false)
  const [showMenu1, setShowMenu1] = useState(false)
  const [showMenu2, setShowMenu2] = useState(false)
  const [showManagers, setShowManagers] = useState(false)
  const [showClearCity, setShowClearCity] = useState(false)

  const [visibleDelete, setVisibleDelete] = useState(false)

  const [file, setFile] = useState(0)
  const [filePreview, setFilePreview] = useState()
  const [image, setImage] = useState('')

  const [toast, addToast] = useState(0)
  const toaster = useRef()

  const [enabled, setEnabled] = useState(false)
  const [companyProfile, setCompanyProfile] = useState({})

  const handleShowCompanyProfile = (item_id) => {
    getCompany(item_id).then((result) => {
      setCompanyProfile(result)
      setShowCompanyProfile(true)
      getCompanyComplects(item_id).then((result2) => {
        console.log(result2)
        setDocItems(result2)
      })
    })
  }

  const queryClient = useQueryClient()
  const {
    isPending,
    error,
    data: comapnies,
  } = useQuery({
    queryKey: ['comapnies'],
    queryFn: getCompanies,
  })

  // const { data: company, refetch } = useQuery({
  //   queryKey: ['company'],
  //   queryFn: ({ item_id }) => getCompany(item_id),
  //   enabled: false,
  // })

  // const { mutate: mutatePaument } = useMutation({
  //   mutationFn: updateRateItem,
  //   onSettled: async () => {
  //     return await queryClient.invalidateQueries({ queryKey: ['rates'] })
  //   },
  // })
  // const { mutate: mutateHours } = useMutation({
  //   mutationFn: updateRateHour,
  //   onSettled: async () => {
  //     return await queryClient.invalidateQueries({ queryKey: ['rates'] })
  //   },
  // })

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
    return <div className="dark-theme">
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

  return (
    <div className="dark-theme">
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer lg>
            <CRow>
              <CCol>
                <CCard className="mb-4 mt-3">
                  <p
                    style={{
                      position: 'absolute',
                      top: '-18px',
                      right: '15px',
                      fontSize: '14px',
                      color: '#f3f3f3',
                    }}
                  >
                    Всего: {comapnies.length}
                  </p>
                  <CCardBody>
                    {showCompanyProfile ? (
                      <div className="wrapper-display">
                        <div className="div1">
                          <div
                            onMouseOver={() => setShowUpload(true)}
                            onMouseOut={() => setShowUpload(false)}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              width: '250px',
                            }}
                          >
                            {filePreview ? (
                              <img
                                src={filePreview}
                                alt=""
                                style={{ borderRadius: '15px', objectFit: 'cover' }}
                                width={250}
                                height={250}
                              />
                            ) : profile ? (
                              <img
                                src={profile}
                                width="250px"
                                height="250px"
                                alt="poster"
                                style={{ borderRadius: '7px', marginBottom: '5px' }}
                              />
                            ) : (
                              <svg
                                className="rounded me-2"
                                width="250"
                                height="250"
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="xMidYMid slice"
                                focusable="false"
                                role="img"
                                style={{ float: 'left', margin: '0' }}
                              >
                                <rect width="250px" height="250px" fill="#007aff" rx="40"></rect>
                              </svg>
                            )}
                            <div className="file-upload" style={{ marginBottom: '8px' }}>
                              <img
                                src={addAvatar}
                                alt="upload"
                                style={{
                                  display: showUpload ? 'block' : 'none',
                                  position: 'absolute',
                                  top: '100px',
                                  left: '100px',
                                  cursor: 'pointer',
                                  width: '50px',
                                  height: '50px',
                                }}
                              />
                              <input
                                type="file"
                                id="formFile"
                                accept="image/*,image/jpeg"
                                name="avatar"
                                // onChange={(e) => onFileChange(e)}
                                style={{
                                  position: 'absolute',
                                  top: '130px',
                                  left: '10px',
                                  opacity: '0',
                                  zIndex: '100',
                                  width: '230px',
                                }}
                              />
                            </div>

                            <div className="menu-reyting" style={{ marginBottom: '20px' }}>
                              <div
                                style={{
                                  width: '250px',
                                  display: 'flex',
                                  justifyContent: 'center',
                                }}
                              >
                                {showBlacklist ? (
                                  <span
                                    onClick={() => setShowMenu2(true)}
                                    style={{
                                      cursor: 'pointer',
                                      color: 'red',
                                      fontSize: '24px',
                                      fontWeight: '700',
                                      marginBottom: '3px',
                                    }}
                                  >
                                    Blacklist
                                  </span>
                                ) : (
                                  <div
                                    className="star-block"
                                    style={{ cursor: 'pointer', marginBottom: '8px' }}
                                    onClick={() => setShowMenu1(true)}
                                  >
                                    <img className="star-icon" src={StarActive} alt="" />
                                    <img className="star-icon" src={StarActive} alt="" />
                                    <img className="star-icon" src={StarActive} alt="" />
                                    <img className="star-icon" src={Star} alt="" />
                                    <img className="star-icon" src={Star} alt="" />
                                  </div>
                                )}
                              </div>
                              <div
                                className="menu-content"
                                onClick={() => setShowMenu1(false)}
                                style={{ display: showMenu1 ? 'block' : 'none' }}
                              >
                                <span>Изменить рейтинг</span>
                                <span
                                  /*onClick={onChangeBlacklist}*/ onClick={() =>
                                    setShowMenu1(false)
                                  }
                                  style={{ cursor: 'pointer' }}
                                >
                                  Blacklist
                                </span>
                              </div>
                              <div
                                className="menu-content"
                                style={{ display: showMenu2 ? 'block' : 'none' }}
                              >
                                <span>Изменить рейтинг</span>
                                <span
                                  /*onClick={onChangeReyting}*/ onClick={() => setShowMenu1(false)}
                                  style={{ cursor: 'pointer' }}
                                >
                                  Рейтинг
                                </span>
                              </div>
                            </div>
                          </div>

                          <img
                            src={Krestik}
                            width={25}
                            alt=""
                            style={{
                              position: 'absolute',
                              top: '215px',
                              left: '215px',
                              opacity: block ? '1' : '0',
                            }}
                          />
                          <div className="menu-content-krest">
                            <span /*onClick={onChangeKrest}*/ style={{ cursor: 'pointer' }}>
                              {block ? 'Убрать' : 'Добавить'}
                            </span>
                          </div>
                        </div>
                        <div className="div2">
                          <div
                            style={{
                              color: '#fff',
                              fontSize: '33px',
                              zIndex: '100',
                              display: 'flex',
                              justifyContent: 'space-between',
                              width: '-webkit-fill-available',
                              height: '50px',
                            }}
                          >
                            <div>
                              <input
                                type="text"
                                name="title"
                                id="title"
                                value={companyProfile.name}
                                onChange={(e) => setTitle(e.target.value)}
                                style={{
                                  backgroundColor: 'transparent',
                                  border: '0',
                                  color: '#f3f3f3',
                                  width: '600px',
                                }}
                              ></input>
                            </div>
                            <div style={{ display: 'flex' }}>
                              <Icon id="delete" /*onClick={() => clickDelete(id)}*/ />
                              <img
                                alt=""
                                src={Trubka}
                                onClick={() => setShowProfile(false)}
                                style={{
                                  cursor: 'pointer',
                                  width: '24px',
                                  height: '24px',
                                  marginLeft: '20px',
                                }}
                              />
                              <img
                                alt=""
                                src={Tg}
                                onClick={() => setShowProfile(false)}
                                style={{
                                  cursor: 'pointer',
                                  width: '24px',
                                  height: '24px',
                                  marginLeft: '20px',
                                }}
                              />
                              <img
                                alt=""
                                src={blockProfile ? zamok : zamok2}
                                // onClick={blockedProfile}
                                style={{
                                  cursor: 'pointer',
                                  width: '19px',
                                  height: '24px',
                                  marginLeft: '20px',
                                }}
                              />
                              <img
                                alt=""
                                src={Disketa}
                                // onClick={() => saveProfile(id)}
                                style={{
                                  cursor: 'pointer',
                                  width: '24px',
                                  height: '24px',
                                  marginLeft: '20px',
                                }}
                              />
                              <img
                                alt=""
                                src={Close}
                                onClick={() => setShowCompanyProfile(false)}
                                style={{
                                  display: showClose ? 'block' : 'block',
                                  cursor: 'pointer',
                                  width: '19px',
                                  height: '24px',
                                  marginLeft: '20px',
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="div3">
                          <div style={{ marginTop: '22px' }}>
                            <div className="text-medium-emphasis small">Город</div>
                            <div style={{ height: '40px' }} className="py-2 uley-data-main">
                              {companyProfile.city}
                            </div>
                          </div>
                          <div style={{ marginTop: '22px' }}>
                            <div className="text-medium-emphasis small">Офис</div>
                            <div style={{ height: '40px' }} className="py-2 uley-data-main">
                              {companyProfile.office_address}
                            </div>
                          </div>
                          <div style={{ marginTop: '22px' }}>
                            <div className="text-medium-emphasis small">Склад</div>
                            <div style={{ height: '40px' }} className="py-2 uley-data-main">
                              {companyProfile.warehouse_address}
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }} className="div4">
                          <div style={{ width: '300px' }}>
                            <div style={{ marginTop: '40px', position: 'relative' }}>
                              <div
                                className="uley-line"
                                style={{ left: '15px', top: '-25px', width: '65px' }}
                              ></div>
                              <div
                                className="uley-line"
                                style={{ left: '150px', top: '-25px', width: '90px' }}
                              ></div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {/* проекты за месяц */}
                                <div style={{ margin: 0 }}>
                                  <input
                                    className="text-field__input"
                                    type="text"
                                    name="reyting"
                                    id="reyting"
                                    value="12"
                                    style={{ width: '40px' }}
                                  />
                                </div>
                                {/* проекты всего */}
                                <div style={{ margin: 0 }}>
                                  <input
                                    className="text-field__input"
                                    type="text"
                                    name="rank"
                                    id="rank"
                                    value="120"
                                    style={{ width: '40px' }}
                                  />
                                </div>

                                {/* косяки за месяц */}
                                <div style={{ margin: 0 }}>
                                  <input
                                    className="text-field__input"
                                    type="text"
                                    name="reyting"
                                    id="reyting"
                                    value="100 000"
                                    style={{ width: '70px' }}
                                  />
                                </div>
                                {/* косяки всего */}
                                <div style={{ margin: 0 }}>
                                  <input
                                    className="text-field__input"
                                    type="text"
                                    name="rank"
                                    id="rank"
                                    value="1 000 000.00"
                                    style={{ width: '100px' }}
                                  />
                                </div>
                              </div>
                            </div>

                            <div>
                              <div style={{ marginTop: '22px' }}>
                                <div className="text-medium-emphasis small">Сфера деятельности</div>
                                <div
                                  style={{
                                    // marginBottom: showManagers ? '129px' : '20px',
                                    position: 'relative',
                                  }}
                                >
                                  <MyDropdown3
                                    tags={[...sfera].filter((item) => item !== 'Blacklist')}
                                    setTags={setSfera}
                                    options={sferaData}
                                    style={{ minHeight: '40px !important' }}
                                  />
                                </div>
                                {/* <div className="text-medium-emphasis small">Сфера деятельности</div>
                      <div style={{ height: '120px' }} className="py-2 uley-data-main">
                        <ul>
                          <li style={{ textAlign: 'left' }}>Звук</li>
                          <li style={{ textAlign: 'left' }}>Свет</li>
                          <li style={{ textAlign: 'left' }}>Видео</li>
                        </ul>
                      </div> */}
                              </div>
                              <div style={{ marginTop: '22px' }}>
                                <div className="text-medium-emphasis small">Комтеги</div>
                                <div style={{ position: 'relative' }}>
                                  <MyDropdown3
                                    tags={comteg}
                                    setTags={setComteg}
                                    options={comtegs}
                                    style={{ minHeight: '40px !important' }}
                                  />
                                </div>
                                {/* <div className="text-medium-emphasis small">Склад</div>
                  <div style={{ height: '40px' }} className="py-2 uley-data-main">
                    г.Москва, ул. Большая, д.2, стр.3
                  </div> */}
                              </div>
                            </div>
                          </div>
                          <div style={{ width: '300px', marginLeft: '30px' }}>
                            <div style={{ marginTop: '22px' }}>
                              <div className="text-medium-emphasis small">Бухгалтерия</div>
                              <div style={{ height: '40px' }} className="py-2 uley-data-main">
                                {companyProfile.accounting_fio}
                              </div>
                            </div>
                            <div style={{ marginTop: '22px' }}>
                              <div className="text-medium-emphasis small">Телефон</div>
                              <div style={{ height: '40px' }} className="py-2 uley-data-main">
                                {formatPhoneNumber(companyProfile.accounting_phone)}
                              </div>
                            </div>
                            <div style={{ marginTop: '22px' }}>
                              <div className="text-medium-emphasis small">Почта</div>
                              <div style={{ height: '40px' }} className="py-2 uley-data-main">
                                {companyProfile.accounting_email}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="div6">
                          <div style={{ display: 'flex', gap: '40px' }}>
                            <div>
                              <div
                                onClick={handleShowDopBlock}
                                style={{ height: '40px', width: '250px', cursor: 'pointer' }}
                                className="py-2 uley-data-main"
                              >
                                Реквизиты
                              </div>
                            </div>
                            <div>
                              <div
                                onClick={handleShowDopBlock}
                                style={{ height: '40px', width: '300px', cursor: 'pointer' }}
                                className="py-2 uley-data-main"
                              >
                                Договоры
                              </div>
                            </div>
                            <div>
                              <div
                                onClick={handleShowDocumentBlock}
                                style={{ height: '40px', width: '300px', cursor: 'pointer' }}
                                className="py-2 uley-data-main"
                              >
                                Документы
                              </div>
                            </div>
                            <div>
                              <div
                                onClick={handleShowDopBlock}
                                style={{ height: '40px', width: '300px', cursor: 'pointer' }}
                                className="py-2 uley-data-main"
                              >
                                Проекты
                              </div>
                            </div>
                          </div>
                        </div>

                        {showDopBlock ? (
                          <>
                            <div className="div7">
                              <div>
                                <div style={{ marginTop: '18px' }}>
                                  <div className="text-medium-emphasis small">Контрагент</div>
                                  <div style={{ height: '40px' }} className="py-2 uley-data-main">
                                    {companyProfile.details[0].name}
                                  </div>
                                </div>
                                <div style={{ marginTop: '22px' }}>
                                  <div className="text-medium-emphasis small">ИНН</div>
                                  <div style={{ height: '40px' }} className="py-2 uley-data-main">
                                    {companyProfile.details[0].inn}
                                  </div>
                                </div>

                                <div style={{ marginTop: '22px' }}>
                                  <div className="text-medium-emphasis small ">Расчетный счет</div>
                                  <div style={{ height: '40px' }} className="py-2 uley-data-main">
                                    {companyProfile.details[0].bank_account}
                                  </div>
                                </div>

                                <div style={{ marginTop: '22px' }}>
                                  <div className="text-medium-emphasis small ">
                                    Корреспондентский счет
                                  </div>
                                  <div style={{ height: '40px' }} className="py-2 uley-data-main">
                                    {companyProfile.details[0].correspondent_account}
                                  </div>
                                </div>

                                <div style={{ marginTop: '22px' }}>
                                  <div className="text-medium-emphasis small ">БИК</div>
                                  <div style={{ height: '40px' }} className="py-2 uley-data-main">
                                    {companyProfile.details[0].bic}
                                  </div>
                                </div>

                                <div style={{ marginTop: '22px' }}>
                                  <div className="text-medium-emphasis small ">ОГРН</div>
                                  <div style={{ height: '40px' }} className="py-2 uley-data-main">
                                    {companyProfile.details[0].ogrn}
                                  </div>
                                </div>

                                <div style={{ marginTop: '22px' }}>
                                  <div className="text-medium-emphasis small ">Банк</div>
                                  <div style={{ height: '40px' }} className="py-2 uley-data-main">
                                    {companyProfile.details[0].bank_name}
                                  </div>
                                </div>

                                <div style={{ marginTop: '22px' }}>
                                  <div className="text-medium-emphasis small ">Телефон</div>
                                  <div style={{ height: '40px' }} className="py-2 uley-data-main">
                                    {formatPhoneNumber(companyProfile.details[0].phone)}
                                  </div>
                                </div>

                                <div style={{ marginTop: '22px' }}>
                                  <div className="text-medium-emphasis small ">Почта</div>
                                  <div style={{ height: '40px' }} className="py-2 uley-data-main">
                                    {companyProfile.details[0].email}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div style={{ marginTop: '18px' }} className="div8">
                              <div className="text-medium-emphasis small ">Юридический адрес</div>
                              <div
                                style={{ height: '40px', textAlign: 'left', paddingLeft: '5px' }}
                                className="py-2 uley-data-main"
                              >
                                {companyProfile.legal_address}
                              </div>
                            </div>
                            <div style={{ fontSize: '1rem' }} className="div9">
                              {companyProfile.details[0].contracts.map((contract) => {
                                return (
                                  <div
                                    key={contract.id}
                                    style={{ display: 'flex', fontSize: '1rem', gap: '5px' }}
                                    className="text-medium-emphasis small"
                                  >
                                    <div
                                      style={{
                                        display: 'flex',
                                        fontSize: '1rem',
                                        gap: '5px',
                                        justifyContent: 'space-between',
                                        width: '300px',
                                      }}
                                    >
                                      <div className="py-1 ">
                                        <div className="text-medium-emphasis small text-center">
                                          Начало
                                        </div>
                                        <div
                                          style={{ height: '40px', width: '110px' }}
                                          className="p-2 uley-data-main"
                                        >
                                          {/* 10.01.2024 */}
                                          {dayjs(contract.start_date).format('DD.MM.YYYY')}
                                        </div>
                                      </div>
                                      <div className="py-1">
                                        <div className="text-medium-emphasis small text-center">
                                          Окончание
                                        </div>
                                        <div
                                          style={{ height: '40px', width: '110px' }}
                                          className="p-2 uley-data-main"
                                        >
                                          {dayjs(contract.end_date).format('DD.MM.YYYY')}
                                        </div>
                                      </div>
                                      <div className="py-1">
                                        <div className="text-medium-emphasis small text-center">
                                          Статус
                                        </div>
                                        <div
                                          style={{ height: '40px', width: '40px' }}
                                          className="py-2 uley-data-main"
                                        >
                                          {formatDocumentStatus(contract.status)}
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        display: 'flex',
                                        fontSize: '1rem',
                                        gap: '5px',
                                        justifyContent: 'space-between',
                                        width: '300px',
                                        marginLeft: '36px',
                                      }}
                                    >
                                      <div className="py-1">
                                        <div className="text-medium-emphasis small text-center">
                                          Номер
                                        </div>
                                        <div
                                          style={{ height: '40px', width: '80px' }}
                                          className="p-2 uley-data-main"
                                        >
                                          {contract.number}
                                        </div>
                                      </div>

                                      <div className="py-1">
                                        <div className="text-medium-emphasis small text-center">
                                          Подпись
                                        </div>
                                        <div
                                          style={{ height: '40px', width: '110px' }}
                                          className="p-2 uley-data-main"
                                        >
                                          {contract.signature_date ?? '-'}
                                        </div>
                                      </div>
                                      <div className="py-1">
                                        <div className="text-medium-emphasis small text-center">
                                          Формат
                                        </div>
                                        <div
                                          style={{ height: '40px', width: '60px' }}
                                          className="p-2 uley-data-main"
                                        >
                                          {contract.signature_type ?? '-'}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                            <div className="div10">
                              <div
                                style={{
                                  height: '680px',
                                  textAlign: 'left',
                                  paddingLeft: '5px',
                                  marginTop: '36px',
                                }}
                                className="py-2 uley-data-main"
                              >
                                {/* <p style={{ margin: 0 }}>22.02.2024 | Проект №1</p>
                        <p style={{ margin: 0 }}>22.02.2024 | Проект №1</p>
                        <p style={{ margin: 0 }}>22.02.2024 | Проект №1</p>
                        <p style={{ margin: 0 }}>22.02.2024 | Проект №1</p>
                        <p style={{ margin: 0 }}>22.02.2024 | Проект №1</p>
                        <p style={{ margin: 0 }}>22.02.2024 | Проект №1</p>
                        <p style={{ margin: 0 }}>22.02.2024 | Проект №1</p>
                        <p style={{ margin: 0 }}>22.02.2024 | Проект №1</p> */}
                              </div>
                            </div>
                          </>
                        ) : (
                          ''
                        )}
                        {showDocumentBlock ? (
                          <>
                            <div style={{ marginTop: '10px' }} className="div11">
                              {/* <Filters /> */}
                              <CTable
                                style={{
                                  position: 'relative',
                                  borderRadius: '5px',
                                  overflow: 'hidden',
                                  width: '1270px',
                                }}
                                align="middle"
                                className="mb-0 border"
                                hover
                                responsive
                                // responsive={false}
                              >
                                <CTableHead
                                  style={{ verticalAlign: 'middle' }}
                                  className="text-center"
                                  color="light"
                                >
                                  <CTableRow>
                                    <CTableHeaderCell
                                      style={{
                                        height: '30px',
                                        minHeight: '30px',
                                        maxHeight: '30px',
                                        width: '30px',
                                        padding: 0,
                                      }}
                                    >
                                      №
                                    </CTableHeaderCell>

                                    <CTableHeaderCell
                                      className="text-center"
                                      style={{
                                        width: '80px',
                                        top: 0,
                                        height: '30px',
                                        minHeight: '30px',
                                        maxHeight: '30px',
                                        padding: 0,
                                      }}
                                    >
                                      Дата
                                    </CTableHeaderCell>
                                    <CTableHeaderCell
                                      className="text-center"
                                      style={{
                                        width: '100px',
                                        top: 0,
                                        height: '30px',
                                        minHeight: '30px',
                                        maxHeight: '30px',
                                        padding: 0,
                                      }}
                                    >
                                      Проект
                                    </CTableHeaderCell>
                                    <CTableHeaderCell
                                      className="text-center"
                                      style={{
                                        width: '80px',
                                        minWidth: '80px',
                                        padding: 0,
                                      }}
                                    >
                                      Счет
                                    </CTableHeaderCell>
                                    <CTableHeaderCell
                                      className="text-center"
                                      style={{
                                        width: '80px',
                                        minWidth: '80px',
                                        height: '30px',
                                        minHeight: '30px',
                                        maxHeight: '30px',
                                        padding: 0,
                                      }}
                                    >
                                      Акт
                                    </CTableHeaderCell>
                                    <CTableHeaderCell
                                      className="text-center"
                                      style={{
                                        width: '150px',
                                        minWidth: '150px',
                                        height: '30px',
                                        minHeight: '30px',
                                        maxHeight: '30px',
                                        padding: 0,
                                      }}
                                    >
                                      Приложение
                                    </CTableHeaderCell>
                                    <CTableHeaderCell
                                      className="text-center"
                                      style={{
                                        width: '200px',
                                        minWidth: '200px',
                                        height: '30px',
                                        minHeight: '30px',
                                        maxHeight: '30px',
                                        padding: 0,
                                      }}
                                    >
                                      Договор
                                    </CTableHeaderCell>
                                    <CTableHeaderCell
                                      className="text-center"
                                      style={{
                                        width: '110px',
                                        minWidth: '80px',
                                        height: '30px',
                                        minHeight: '30px',
                                        maxHeight: '30px',
                                        padding: 0,
                                      }}
                                    >
                                      Формат
                                    </CTableHeaderCell>
                                    <CTableHeaderCell
                                      className="text-center"
                                      style={{
                                        width: '110px',
                                        minWidth: '80px',
                                        height: '30px',
                                        minHeight: '30px',
                                        maxHeight: '30px',
                                        padding: 0,
                                      }}
                                    >
                                      Контрагент
                                    </CTableHeaderCell>

                                    {/* <CTableHeaderCell
                            className="text-center"
                            style={{
                              width: '110px',
                              top: 0,
                              height: '30px',
                              minHeight: '30px',
                              maxHeight: '30px',
                              padding: 0,
                            }}
                          >
                            Статус
                          </CTableHeaderCell> */}
                                  </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                  {docItems.map((document, index) => (
                                    <CTableRow v-for="item in tableItems" key={document.id}>
                                      <CTableDataCell
                                        style={{
                                          height: '30px',
                                          minHeight: '30px',
                                          maxHeight: '30px',
                                          padding: 0,
                                        }}
                                        className="text-center"
                                      >
                                        {index + 1}
                                      </CTableDataCell>

                                      <CTableDataCell
                                        className="text-center"
                                        style={{
                                          height: '30px',
                                          minHeight: '30px',
                                          maxHeight: '30px',
                                          padding: 0,
                                        }}
                                      >
                                        <Link
                                          to={'/document/complect'}
                                          state={{ complectId: document.id }}
                                          className="nav-link"
                                        >
                                          {dayjs(document.start_date).format('DD.MM.YYYY')}
                                        </Link>
                                      </CTableDataCell>
                                      <CTableDataCell
                                        className="text-center"
                                        style={{
                                          height: '30px',
                                          minHeight: '30px',
                                          maxHeight: '30px',
                                          padding: 0,
                                        }}
                                      >
                                        {/* {document.project} */}-
                                      </CTableDataCell>
                                      <CTableDataCell
                                        style={{
                                          height: '30px',
                                          minHeight: '30px',
                                          maxHeight: '30px',
                                          padding: 0,
                                        }}
                                        className="text-center"
                                      >
                                        {document.invoice ?? '-'}
                                      </CTableDataCell>
                                      <CTableDataCell
                                        style={{
                                          height: '30px',
                                          minHeight: '30px',
                                          maxHeight: '30px',
                                          padding: 0,
                                        }}
                                        className="text-center"
                                      >
                                        {document.act ?? '-'}
                                      </CTableDataCell>
                                      <CTableDataCell
                                        style={{
                                          height: '30px',
                                          minHeight: '30px',
                                          maxHeight: '30px',
                                          padding: 0,
                                        }}
                                        className="text-center"
                                      >
                                        {document.application ?? '-'}
                                      </CTableDataCell>
                                      <CTableDataCell
                                        style={{
                                          height: '30px',
                                          minHeight: '30px',
                                          maxHeight: '30px',
                                          padding: 0,
                                        }}
                                        className="text-center"
                                      >
                                        {document.contract}
                                      </CTableDataCell>
                                      <CTableDataCell
                                        style={{
                                          height: '30px',
                                          minHeight: '30px',
                                          maxHeight: '30px',
                                          padding: 0,
                                        }}
                                        className="text-center"
                                      >
                                        {document.documentSignatureType}
                                      </CTableDataCell>
                                      <CTableDataCell
                                        style={{
                                          height: '30px',
                                          minHeight: '30px',
                                          maxHeight: '30px',
                                          padding: 0,
                                        }}
                                        className="text-center"
                                      >
                                        {document.counterparties}
                                      </CTableDataCell>
                                      {/* <CTableDataCell
                              style={{
                                height: '30px',
                                minHeight: '30px',
                                maxHeight: '30px',
                                padding: 0,
                              }}
                              className="text-center"
                            >
                              {item.status.icon}
                            </CTableDataCell> */}
                                    </CTableRow>
                                  ))}
                                </CTableBody>
                              </CTable>
                              {/* <Footer styleClass={'justify-content-between'} /> */}
                            </div>
                          </>
                        ) : (
                          ''
                        )}
                      </div>
                    ) : (
                      <div style={{ marginTop: '10px' }} className="div11">
                        <Filters />
                        <CTable
                          style={{
                            position: 'relative',
                            borderRadius: '5px',
                            overflow: 'hidden',
                            width: '1270px',
                          }}
                          align="middle"
                          className="mb-0 border"
                          hover
                          responsive
                          // responsive={false}
                        >
                          <CTableHead
                            style={{ verticalAlign: 'middle' }}
                            className="text-center"
                            color="light"
                          >
                            <CTableRow>
                              <CTableHeaderCell
                                style={{
                                  height: '30px',
                                  minHeight: '30px',
                                  maxHeight: '30px',
                                  width: '30px',
                                  padding: 0,
                                }}
                              >
                                №
                              </CTableHeaderCell>

                              <CTableHeaderCell
                                style={{
                                  width: '200px',
                                  top: 0,
                                  height: '30px',
                                  minHeight: '30px',
                                  maxHeight: '30px',
                                  padding: 0,
                                }}
                              >
                                Компания
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{
                                  width: '80px',
                                  top: 0,
                                  height: '30px',
                                  minHeight: '30px',
                                  maxHeight: '30px',
                                  padding: 0,
                                }}
                              >
                                Город
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{
                                  width: '80px',
                                  minWidth: '80px',
                                  padding: 0,
                                }}
                              >
                                ID
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{
                                  width: '80px',
                                  minWidth: '80px',
                                  padding: 0,
                                }}
                              >
                                Сфера
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{
                                  width: '80px',
                                  minWidth: '80px',
                                  padding: 0,
                                }}
                              >
                                Проекты
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{
                                  width: '80px',
                                  minWidth: '80px',
                                  padding: 0,
                                }}
                              >
                                ИНН
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{
                                  width: '140px',
                                  minWidth: '140px',
                                  padding: 0,
                                }}
                              >
                                Бухгалтерия
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{
                                  width: '90px',
                                  minWidth: '90px',
                                  padding: 0,
                                }}
                              >
                                Почта
                              </CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            {comapnies.map((company, index) => (
                              <CTableRow v-for="item in tableItems" key={company.id}>
                                <CTableDataCell
                                  style={{
                                    height: '30px',
                                    minHeight: '30px',
                                    maxHeight: '30px',
                                    padding: 0,
                                  }}
                                  className="text-center"
                                >
                                  {index + 1}
                                </CTableDataCell>

                                <CTableDataCell
                                  onClick={() => {
                                    handleShowCompanyProfile(company.id)
                                  }}
                                  style={{
                                    height: '30px',
                                    minHeight: '30px',
                                    maxHeight: '30px',
                                    padding: 0,
                                    cursor: 'pointer',
                                  }}
                                >
                                  {/* <Link to={'/business/document/1'} className="nav-link"> */}
                                  {/* </Link> */}
                                  {company.name}
                                </CTableDataCell>
                                <CTableDataCell
                                  className="text-center"
                                  style={{
                                    height: '30px',
                                    minHeight: '30px',
                                    maxHeight: '30px',
                                    padding: 0,
                                  }}
                                >
                                  {company.city}
                                </CTableDataCell>
                                <CTableDataCell
                                  style={{
                                    height: '30px',
                                    minHeight: '30px',
                                    maxHeight: '30px',
                                    padding: 0,
                                  }}
                                  className="text-center"
                                >
                                  {company.company_id}
                                </CTableDataCell>
                                <CTableDataCell
                                  style={{
                                    height: '30px',
                                    minHeight: '30px',
                                    maxHeight: '30px',
                                    padding: 0,
                                  }}
                                  className="text-center"
                                >
                                  {company.company_id}
                                </CTableDataCell>
                                <CTableDataCell
                                  style={{
                                    height: '30px',
                                    minHeight: '30px',
                                    maxHeight: '30px',
                                    padding: 0,
                                  }}
                                  className="text-center"
                                >
                                  {company.company_id}
                                </CTableDataCell>
                                <CTableDataCell
                                  style={{
                                    height: '30px',
                                    minHeight: '30px',
                                    maxHeight: '30px',
                                    padding: 0,
                                  }}
                                  className="text-center"
                                >
                                  {company.details[0].inn}
                                </CTableDataCell>
                                <CTableDataCell
                                  style={{
                                    height: '30px',
                                    minHeight: '30px',
                                    maxHeight: '30px',
                                    padding: 0,
                                  }}
                                  className="text-center"
                                >
                                  {formatPhoneNumber(company.accounting_phone)}
                                </CTableDataCell>
                                <CTableDataCell
                                  style={{
                                    height: '30px',
                                    minHeight: '30px',
                                    maxHeight: '30px',
                                    padding: 0,
                                  }}
                                  className="text-center"
                                >
                                  {company.accounting_email}
                                </CTableDataCell>
                              </CTableRow>
                            ))}
                          </CTableBody>
                        </CTable>
                        {/* <Footer styleClass={'justify-content-between'} /> */}
                      </div>
                    )}
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CContainer>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Companies
