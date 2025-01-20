import React, { useEffect, useState, useCallback } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from 'src/components/index'
import { format, formatPhoneNumber, formatDate, formatDocumentStatus } from '../../utils/formater'
import { Link, useNavigate } from 'react-router-dom'
// Core viewer
import { Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core'
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen'

import { zoomPlugin } from '@react-pdf-viewer/zoom'

// Import styles
import '@react-pdf-viewer/zoom/lib/styles/index.css'

// Import styles
import '@react-pdf-viewer/full-screen/lib/styles/index.css'
import './DocumentsGenerator.css'
// Plugins
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

import {
  CCol,
  CRow,
  CCard,
  CCardBody,
  CPopover,
  CModalHeader,
  CModal,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormCheck,
  CFormInput,
  CContainer,
} from '@coreui/react'
// import DatePicker from 'react-datepicker'
// import 'src/assets/css/react-datepicker.css'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import './Document.css'
import Select from 'react-select'
import InputMask from 'react-input-mask'
import { ReactComponent as Search } from '../../assets/svg/search.svg'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getCompanies,
  getCompany,
  getCompaniesFilter,
  getRequesitsFilter,
  createComplects,
} from 'src/services/api/documents'

import { v4 as uuidv4 } from 'uuid'

const DocumentsGenerator = () => {
  const navigate = useNavigate()
  const [periodDate1, setPeriodDate1] = useState('')
  const [periodDate2, setPeriodDate2] = useState('')

  const [servicePriceVisible, setServicePriceVisible] = useState(false)
  const [contarctAmountVisible, setContarctAmountVisible] = useState(false)

  const [additionalPrice, setAdditionalPrice] = useState(0)
  const [additionalPriceVisible, setAdditionalPriceVisible] = useState(false)

  const [invoiceChecked, setinvoiceChecked] = useState(false)
  const [actChecked, setActChecked] = useState(false)
  const [contractChecked, setContractChecked] = useState(false)
  const [applicationChecked, setApplicationChecked] = useState(false)
  const [complectChecked, setComplectChecked] = useState(false)

  const [contarctAmount, setContarctAmount] = useState(0)

  const [contractAmountEquality, setContractAmountEquality] = useState(false)

  const [serviceList, setserviceList] = useState([])

  const [requisitFilter, setRequisitFilter] = useState([])
  const [contractsFilter, setContractsFilter] = useState([])

  const [serviceNames, setserviceNames] = useState([
    {
      value: 'Погрузочно-разгрузочные работы',
      label: 'Погрузочно-разгрузочные работы',
      color: '#65828f',
    },
    { value: 'Монтажные работы', label: 'Монтажные работы', color: '#65828f' },
    { value: 'Профилактические работы', label: 'Профилактические работы', color: '#65828f' },
    { value: 'Услуги звукорежиссера', label: 'Услуги звукорежиссера', color: '#65828f' },

    { value: 'Услуги системного инженера', label: 'Услуги системного инженера', color: '' },
    { value: 'Услуги РЧ-менеджера', label: 'Услуги РЧ-менеджера', color: '' },
    { value: 'Услуги беклайнера', label: 'Услуги беклайнера', color: '' },
    { value: 'Услуги техника по звуку', label: 'Услуги техника по звуку', color: '' },
    { value: 'Услуги художника по свету', label: 'Услуги художника по свету', color: '' },
    {
      value: 'Услуги оператора световой пушки',
      label: 'Услуги оператора световой пушки',
      color: '',
    },
    { value: 'Услуги гафера', label: 'Услуги гафера', color: '' },
    { value: 'Услуги техника по свету', label: 'Услуги техника по свету', color: '' },

    { value: 'Услуги инженера VMix', label: 'Услуги инженера VMix', color: '#65828f' },
    { value: 'Услуги инженера Resolume', label: 'Услуги инженера Resolume', color: '#65828f' },
    {
      value: 'Услуги оператора Zoom-конференции',
      label: 'Услуги оператора Zoom-конференции',
      color: '#65828f',
    },
    { value: 'Услуги оператора', label: 'Услуги оператора', color: '#65828f' },
    {
      value: 'Услуги оператора-постановщика',
      label: 'Услуги оператора-постановщика',
      color: '#65828f',
    },
    { value: 'Услуги режиссера эфиров', label: 'Услуги режиссера эфиров', color: '#65828f' },
    { value: 'Услуги техника монтажа', label: 'Услуги техника монтажа', color: '#65828f' },
    { value: 'Услуги IT-специалиста', label: 'Услуги IT-специалиста', color: '#65828f' },

    { value: 'Услуги фотографа', label: 'Услуги фотографа', color: '' },
    { value: 'Услуги модели', label: 'Услуги модели', color: '' },
    { value: 'Услуги актера', label: 'Услуги актера', color: '' },
    { value: 'Услуги промоутера', label: 'Услуги промоутера', color: '' },
    { value: 'Услуги визажиста', label: 'Услуги визажиста', color: '' },
    { value: 'Услуги гримера', label: 'Услуги гримера', color: '' },
    { value: 'Услуги костюмера', label: 'Услуги костюмера', color: '' },
  ])

  const [additionalNames, setAdditionalNames] = useState([
    { value: 'Доп. расход №1', label: 'Доп. расход №1' },
    { value: 'Доп. расход №2', label: 'Доп. расход №2' },
    {
      value: 'Дополнительные расходы [комплект расходных материалов для обслуживания]',
      label: 'Дополнительные расходы [комплект расходных материалов для обслуживания]',
    },
  ])

  const handleSetContractAmount = (e) => {
    setAdditionalPrice(Number(e.target.value))
  }

  const handleGenerate = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const newServices = serviceList.map((service) => ({
      ...service,
      service_price: format(Number(service.service_price)),
    }))

    const formValues = {
      companyId: formData.get('companyId'),
      requisitId: formData.get('requisitId'),
      contractDate: formData.get('contractDate'),
      contractNumber: formData.get('contractNumber'),
      invoiceDate: formData.get('invoiceDate'),
      invoiceNumber: formData.get('invoiceNumber'),
      invoiceServiceName: formData.get('invoiceServiceName'),
      appDate: formData.get('appDate'),
      appNumber: formData.get('appNumber'),
      actDate: formData.get('actDate'),
      actNumber: formData.get('actNumber'),
      contractId: formData.get('contractId'),
      period: formData.get('period'),
      period2: `${periodDate1} — ${periodDate2}`,
      invoice: invoiceChecked,
      act: actChecked,
      application: applicationChecked,
      contract: contractChecked,
      complect: complectChecked,
      contarctAmount: contarctAmount,
      contractTemplateNumber: formData.get('contractTemplateNumber'),
      invoiceTemplateNumber: formData.get('invoiceTemplateNumber'),
      appTemplateNumber: formData.get('appTemplateNumber'),
      actTemplateNumber: formData.get('actTemplateNumber'),
      eventName: formData.get('eventName'),
      eventPeriod: formData.get('eventPeriod'),
      eventPlace: formData.get('eventPlace'),
      additionalName: formData.get('additionalName'),
      additionalPrice: additionalPrice,
      services: newServices,
    }
    createComplects(formValues)
    navigate('/business/partner')
  }

  const handleAddServiceItem = () => {
    const serviceItem = {
      id: uuidv4(),
      service_name: '',
      service_price: 0,
      service_count: 1,
      service_period: '',
      service_price_sum: 0,
    }
    setserviceList((serviceList) => [...serviceList, serviceItem])
  }

  const handleDeleteService = (id) => {
    setserviceList(serviceList.filter((item) => item.id !== id))
  }

  const handleUpdateService = (fieldName, id, value, isEnter) => {
    // 1. Find the todo with the provided id
    //  e.key === 'Enter' && e.preventDefault()

    const newServices = serviceList.map((service) => {
      if (service.id === id) {
        if (fieldName === 'service_name') {
          return { ...service, service_name: value }
        }
        if (fieldName === 'service_price') {
          const serviceSum = parseInt(value) * service.service_count

          return {
            ...service,
            service_price: Number(value),
            service_price_sum: serviceSum,
          }
        }
        if (fieldName === 'service_count') {
          const serviceSum = service.service_price * parseInt(value)
          return { ...service, service_count: Number(value), service_price_sum: serviceSum }
        }
        if (fieldName === 'service_period') {
          return { ...service, service_period: value }
        }
      }

      return service
    })

    setserviceList(newServices)
    if (isEnter === true) {
      setServicePriceVisible('')
    }
    let allServiceSum2 = serviceList.reduce((acc, val) => {
      acc += Number(val.service_price_sum)
      return acc
    }, 0)
    setContractAmountEquality(contarctAmount !== allServiceSum2 + additionalPrice)
    console.log(allServiceSum2 + additionalPrice, contractAmountEquality)
  }

  const handleChangeCompanyFilter = (selectedOption) => {
    setRequisitFilter(
      requesitList
        .filter((company) => company.company_id === selectedOption.value)
        .map((comp) => ({ value: comp.id, label: comp.name })),
    )
  }
  const handleChangeRequisitsFilter = (selectedOption) => {
    const company = requesitList.filter((company) => company.id === selectedOption.value)

    setContractsFilter(company[0].contracts.map((comp) => ({ value: comp.id, label: comp.number })))
  }

  const {
    isPending,
    error,
    data: compList,
  } = useQuery({
    queryKey: ['comapnies_gen'],
    queryFn: getCompaniesFilter,
  })

  const { data: requesitList } = useQuery({
    queryKey: ['requesits_gen'],
    queryFn: getRequesitsFilter,
  })

  // const filteredCompanyList = selectCompanies(compList)
  // function selectCompanies(compList) {
  //   return compList.map((comp) => ({ value: comp.id, label: comp.name }))
  // }

  return (
    <div className="dark-theme">
           <AppSidebar />
           <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
             <AppHeader />
             <div className="body flex-grow-1 px-3">
               <CContainer lg>
               <CRow>
        <CCol xs>
          <CCard className="mb-1">
            <CCardBody>
              <form onSubmit={handleGenerate}>
                <div
                  style={{
                    display: 'flex',
                    gap: '20px',
                    justifyContent: 'space-between',
                    marginBottom: '22px',
                  }}
                >
                  {/* <div
                  style={{ height: '40px', width: '300px' }}
                  className="py-2  small uley-data-main"
                >
                  Компания
                </div> */}
                  <div className="">
                    <div className="text-medium-emphasis small">Компания</div>
                    <Select
                      onKeyDown={(e) => {
                        e.key === 'Enter' && e.preventDefault()
                      }}
                      name="companyId"
                      options={compList}
                      onChange={handleChangeCompanyFilter}
                      // defaultValue={specialistList[0]}
                      // defaultValue={{ label: 'Выбрать', value: 0 }}
                      placeholder={'Выбрать...'}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,

                          backgroundColor: 'transparent',
                          border: '1px solid hsla(0, 0%, 100%, 0.09)',
                          borderRadius: '0.375rem',
                          width: '300px',
                          height: '40px',
                        }),
                        menu: (baseStyles, state) => ({
                          ...baseStyles,

                          backgroundColor: '#1f282c',
                          margin: 'auto',
                          width: '300px',
                        }),
                        menuList: (baseStyles, state) => ({
                          ...baseStyles,

                          backgroundColor: '#1f282c',
                          textAlign: 'center',
                          width: '300px',
                          maxHeight: '150px',
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
                  </div>

                  <div>
                    <div className="text-medium-emphasis small">Контрагент</div>
                    <Select
                      onKeyDown={(e) => {
                        e.key === 'Enter' && e.preventDefault()
                      }}
                      name="requisitId"
                      options={requisitFilter}
                      onChange={handleChangeRequisitsFilter}
                      // onChange={handleChangeFilterType}
                      // defaultValue={specialistList[0]}
                      // defaultValue={{ label: 'Выбрать', value: 0 }}

                      noOptionsMessage={() => 'Нет Контрагентов'}
                      placeholder={'Выбрать...'}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,

                          backgroundColor: 'transparent',
                          border: '1px solid hsla(0, 0%, 100%, 0.09)',
                          borderRadius: '0.375rem',
                          width: '300px',
                          height: '40px',
                        }),
                        menu: (baseStyles, state) => ({
                          ...baseStyles,

                          backgroundColor: '#1f282c',
                          margin: 'auto',
                          width: '300px',
                        }),
                        menuList: (baseStyles, state) => ({
                          ...baseStyles,

                          backgroundColor: '#1f282c',
                          textAlign: 'center',
                          width: '300px',
                          maxHeight: '150px',
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
                  </div>
                  <div>
                    <div className="text-medium-emphasis small">Договор</div>
                    <Select
                      onKeyDown={(e) => {
                        e.key === 'Enter' && e.preventDefault()
                      }}
                      options={contractsFilter}
                      // onChange={handleChangeFilterType}
                      // defaultValue={specialistList[0]}
                      // defaultValue={{ label: 'Выбрать', value: 0 }}
                      name="contractId"
                      noOptionsMessage={() => 'Нет Договоров'}
                      placeholder={'Выбрать...'}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,

                          backgroundColor: 'transparent',
                          border: '1px solid hsla(0, 0%, 100%, 0.09)',
                          borderRadius: '0.375rem',
                          width: '300px',
                          height: '40px',
                        }),
                        menu: (baseStyles, state) => ({
                          ...baseStyles,

                          backgroundColor: '#1f282c',
                          margin: 'auto',
                          width: '300px',
                        }),
                        menuList: (baseStyles, state) => ({
                          ...baseStyles,

                          backgroundColor: '#1f282c',
                          textAlign: 'center',
                          width: '300px',
                          maxHeight: '150px',
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
                  </div>
                  <div>
                    <div className="text-medium-emphasis small text-center">Период</div>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '24px',
                        height: '40px',
                        width: '300px',
                      }}
                    >
                      {/* <DatePicker
                        name="period"
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update) => {
                          setDateRange(update)
                        }}
                        isClearable={true}
                      />  */}
                      <InputMask
                        mask="99.99.9999"
                        value={periodDate1}
                        onChange={(e) => setPeriodDate1(e.target.value)}
                      >
                        {(inputProps) => (
                          <CFormInput
                            {...inputProps}
                            onKeyDown={(e) => {
                              e.key === 'Enter' && e.preventDefault()
                            }}
                            placeholder="01.01.2024"
                            disableUnderline
                            aria-label="sm input example"
                            style={{
                              backgroundColor: 'transparent',
                              cursor: 'default',
                              textAlign: 'center',
                              // width: '115px',
                            }}
                          />
                        )}
                      </InputMask>

                      <InputMask
                        mask="99.99.9999"
                        value={periodDate2}
                        onChange={(e) => setPeriodDate2(e.target.value)}
                      >
                        {(inputProps) => (
                          <CFormInput
                            {...inputProps}
                            onKeyDown={(e) => {
                              e.key === 'Enter' && e.preventDefault()
                            }}
                            placeholder="31.12.2024"
                            disableUnderline
                            aria-label="sm input example"
                            style={{
                              backgroundColor: 'transparent',
                              cursor: 'default',
                              textAlign: 'center',
                              // width: '115px',
                            }}
                          />
                        )}
                      </InputMask>
                    </div>
                  </div>
                </div>
                <CRow>
                  <CCol lg={6}>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '22px' }}>
                      <div style={{ display: 'flex', gap: '20px' }}>
                        <div className="">
                          <div className="text-medium-emphasis small">Счёт</div>
                          {/* <input
                            onKeyDown={(e) => {
                              e.key === 'Enter' && e.preventDefault()
                            }}
                            style={{ height: '40px', width: '140px' }}
                            className="py-2 uley-data-main"
                            name="invoiceDate"
                            placeholder="08.08.2024"
                            type="text"
                          /> */}
                          <InputMask
                            id="invoiceDate"
                            mask="99.99.9999"
                            // onBlur={(e) =>
                            //   handleUpdateService('service_period', service.id, e.target.value)
                            // }

                            // value={periodDate2}
                            // onChange={(e) => setPeriodDate2(e.target.value)}
                          >
                            {(inputProps) => (
                              <input
                                {...inputProps}
                                onKeyDown={(e) => {
                                  e.key === 'Enter' && e.preventDefault()
                                }}
                                placeholder="00.00.0000"
                                className="py-2 uley-data-main"
                                style={{
                                  backgroundColor: 'transparent',
                                  cursor: 'default',
                                  width: '140px',
                                }}
                              />
                            )}
                          </InputMask>
                        </div>
                        <div className="">
                          <div className="text-medium-emphasis small">Номер</div>
                          <input
                            onKeyDown={(e) => {
                              e.key === 'Enter' && e.preventDefault()
                            }}
                            style={{ height: '40px', width: '140px' }}
                            className="py-2 uley-data-main"
                            name="invoiceNumber"
                            placeholder="24/1"
                            type="text"
                          />
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '20px' }}>
                        <div className="">
                          <div className="text-medium-emphasis small">Приложение</div>
                          {/* <input
                            onKeyDown={(e) => {
                              e.key === 'Enter' && e.preventDefault()
                            }}
                            style={{ height: '40px', width: '140px' }}
                            className="py-2 uley-data-main"
                            name="appDate"
                            placeholder="08.08.2024"
                            type="text"
                          /> */}
                          <InputMask
                            id="appDate"
                            mask="99.99.9999"
                            // onBlur={(e) =>
                            //   handleUpdateService('service_period', service.id, e.target.value)
                            // }

                            // value={periodDate2}
                            // onChange={(e) => setPeriodDate2(e.target.value)}
                          >
                            {(inputProps) => (
                              <input
                                {...inputProps}
                                onKeyDown={(e) => {
                                  e.key === 'Enter' && e.preventDefault()
                                }}
                                placeholder="00.00.0000"
                                className="py-2 uley-data-main"
                                style={{
                                  backgroundColor: 'transparent',
                                  cursor: 'default',
                                  width: '140px',
                                }}
                              />
                            )}
                          </InputMask>
                        </div>
                        <div className="">
                          <div className="text-medium-emphasis small">Номер</div>
                          <input
                            onKeyDown={(e) => {
                              e.key === 'Enter' && e.preventDefault()
                            }}
                            style={{ height: '40px', width: '140px' }}
                            className="py-2 uley-data-main"
                            name="appNumber"
                            placeholder="25/1"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '22px' }}>
                      {/* <div style={{ display: 'flex', gap: '20px' }}>
                        <div className="">
                          <div className="text-medium-emphasis small">Акт</div>
                          <div
                            style={{ height: '40px', width: '140px' }}
                            className="py-2 uley-data-main"
                          >
                            08.08.2024
                          </div>
                        </div>
                        <div className="">
                          <div className="text-medium-emphasis small">Номер</div>
                          <div
                            style={{ height: '40px', width: '140px' }}
                            className="py-2 uley-data-main"
                          >
                            24/122
                          </div>
                        </div>
                      </div> */}
                      <div style={{ display: 'flex', gap: '20px' }}>
                        <div className="">
                          <div className="text-medium-emphasis small">Акт</div>
                          {/* <input
                            onKeyDown={(e) => {
                              e.key === 'Enter' && e.preventDefault()
                            }}
                            style={{ height: '40px', width: '140px' }}
                            className="py-2 uley-data-main"
                            name="invoiceDate"
                            placeholder="08.08.2024"
                            type="text"
                          /> */}
                          <InputMask
                            id="actDate"
                            mask="99.99.9999"
                            // onBlur={(e) =>
                            //   handleUpdateService('service_period', service.id, e.target.value)
                            // }

                            // value={periodDate2}
                            // onChange={(e) => setPeriodDate2(e.target.value)}
                          >
                            {(inputProps) => (
                              <input
                                {...inputProps}
                                onKeyDown={(e) => {
                                  e.key === 'Enter' && e.preventDefault()
                                }}
                                placeholder="00.00.0000"
                                className="py-2 uley-data-main"
                                style={{
                                  backgroundColor: 'transparent',
                                  cursor: 'default',
                                  width: '140px',
                                }}
                              />
                            )}
                          </InputMask>
                        </div>
                        <div className="">
                          <div className="text-medium-emphasis small">Номер</div>
                          <input
                            onKeyDown={(e) => {
                              e.key === 'Enter' && e.preventDefault()
                            }}
                            style={{ height: '40px', width: '140px' }}
                            className="py-2 uley-data-main"
                            name="actNumber"
                            placeholder="24/1"
                            type="text"
                          />
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '20px' }}>
                        <div className="">
                          <div className="text-medium-emphasis small">Договор</div>

                          <InputMask
                            id="service_period"
                            mask="99.99.9999"
                            // onBlur={(e) =>
                            //   handleUpdateService('service_period', service.id, e.target.value)
                            // }

                            // value={periodDate2}
                            // onChange={(e) => setPeriodDate2(e.target.value)}
                          >
                            {(inputProps) => (
                              <input
                                {...inputProps}
                                onKeyDown={(e) => {
                                  e.key === 'Enter' && e.preventDefault()
                                }}
                                placeholder="00.00.0000"
                                className="py-2 uley-data-main"
                                style={{
                                  backgroundColor: 'transparent',
                                  cursor: 'default',
                                  width: '140px',
                                }}
                              />
                            )}
                          </InputMask>
                        </div>
                        <div className="">
                          <div className="text-medium-emphasis small">Номер</div>
                          <input
                            onKeyDown={(e) => {
                              e.key === 'Enter' && e.preventDefault()
                            }}
                            style={{ height: '40px', width: '140px' }}
                            className="py-2 uley-data-main"
                            name="contractNumber"
                            placeholder="24/1"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '22px' }}>
                      <div
                        style={{
                          display: 'flex',
                          width: '300px',
                          gap: '5px',
                          justifyContent: 'space-between',
                          marginTop: '18px',
                        }}
                      >
                        <div style={{ display: 'flex' }}>
                          <div
                            className="text-medium-emphasis small"
                            style={{ lineHeight: '1', width: '20px', margin: 'auto' }}
                          >
                            С
                          </div>
                          <Select
                            onKeyDown={(e) => {
                              e.key === 'Enter' && e.preventDefault()
                            }}
                            options={[
                              { label: '1', value: 1 },
                              { label: '2', value: 2 },
                              // { label: '3', value: 3 },
                              // { label: '4', value: 4 },
                            ]}
                            // onChange={handleChangeTemplateType}
                            defaultValue={{ label: '1', value: 1 }}
                            // defaultValue={{ label: 'Выбрать', value: 0 }}
                            name="invoiceTemplateNumber"
                            noOptionsMessage={() => 'Нет шаблонов'}
                            // placeholder={'Выбрать...'}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,

                                backgroundColor: 'transparent',
                                border: '1px solid hsla(0, 0%, 100%, 0.09)',
                                borderRadius: '0.375rem',
                                width: '40px',
                                height: '40px',
                              }),
                              menu: (baseStyles, state) => ({
                                ...baseStyles,

                                backgroundColor: '#1f282c',
                                margin: 'auto',
                                width: '40px',
                              }),
                              menuList: (baseStyles, state) => ({
                                ...baseStyles,

                                backgroundColor: '#1f282c',
                                textAlign: 'center',
                                width: '40px',
                                maxHeight: '160px',
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
                          {/* <div
                            style={{ height: '40px', width: '40px' }}
                            className="py-2 uley-data-main"
                          >
                            1
                          </div> */}
                        </div>
                        <div style={{ display: 'flex' }}>
                          <div
                            className="text-medium-emphasis small"
                            style={{ lineHeight: '1', width: '20px', margin: 'auto' }}
                          >
                            А
                          </div>
                          <Select
                            onKeyDown={(e) => {
                              e.key === 'Enter' && e.preventDefault()
                            }}
                            options={[
                              { label: '1', value: 1 },
                              { label: '2', value: 2 },
                              // { label: '3', value: 3 },
                              // { label: '4', value: 4 },
                            ]}
                            // onChange={handleChangeTemplateType}
                            defaultValue={{ label: '1', value: 1 }}
                            // defaultValue={{ label: 'Выбрать', value: 0 }}
                            name="actTemplateNumber"
                            noOptionsMessage={() => 'Нет шаблонов'}
                            // placeholder={'Выбрать...'}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,

                                backgroundColor: 'transparent',
                                border: '1px solid hsla(0, 0%, 100%, 0.09)',
                                borderRadius: '0.375rem',
                                width: '40px',
                                height: '40px',
                              }),
                              menu: (baseStyles, state) => ({
                                ...baseStyles,

                                backgroundColor: '#1f282c',
                                margin: 'auto',
                                width: '40px',
                              }),
                              menuList: (baseStyles, state) => ({
                                ...baseStyles,

                                backgroundColor: '#1f282c',
                                textAlign: 'center',
                                width: '40px',
                                maxHeight: '160px',
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
                        </div>
                        <div style={{ display: 'flex', padding: 0 }}>
                          <div
                            className="text-medium-emphasis small"
                            style={{ lineHeight: '1', width: '20px', margin: 'auto' }}
                          >
                            П
                          </div>
                          <Select
                            onKeyDown={(e) => {
                              e.key === 'Enter' && e.preventDefault()
                            }}
                            options={[
                              { label: '1', value: 1 },
                              { label: '2', value: 2 },
                              // { label: '3', value: 3 },
                              // { label: '4', value: 4 },
                            ]}
                            // onChange={handleChangeTemplateType}
                            defaultValue={{ label: '1', value: 1 }}
                            // defaultValue={{ label: 'Выбрать', value: 0 }}
                            name="appTemplateNumber"
                            noOptionsMessage={() => 'Нет шаблонов'}
                            // placeholder={'Выбрать...'}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,

                                backgroundColor: 'transparent',
                                border: '1px solid hsla(0, 0%, 100%, 0.09)',
                                borderRadius: '0.375rem',
                                width: '40px',
                                height: '40px',
                              }),
                              menu: (baseStyles, state) => ({
                                ...baseStyles,

                                backgroundColor: '#1f282c',
                                margin: 'auto',
                                width: '40px',
                              }),
                              menuList: (baseStyles, state) => ({
                                ...baseStyles,

                                backgroundColor: '#1f282c',
                                textAlign: 'center',
                                width: '40px',
                                maxHeight: '160px',
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
                        </div>
                        <div style={{ display: 'flex' }}>
                          <div
                            className="text-medium-emphasis small"
                            style={{ lineHeight: '1', width: '20px', margin: 'auto' }}
                          >
                            Д
                          </div>
                          <Select
                            onKeyDown={(e) => {
                              e.key === 'Enter' && e.preventDefault()
                            }}
                            options={[
                              { label: '1', value: 1 },
                              { label: '2', value: 2 },
                              { label: '3', value: 3 },
                              { label: '4', value: 4 },
                              { label: '5', value: 5 },
                            ]}
                            // onChange={handleChangeTemplateType}
                            defaultValue={{ label: '1', value: 1 }}
                            // defaultValue={{ label: 'Выбрать', value: 0 }}
                            name="contractTemplateNumber"
                            noOptionsMessage={() => 'Нет шаблонов'}
                            // placeholder={'Выбрать...'}
                            styles={{
                              control: (baseStyles, state) => ({
                                ...baseStyles,

                                backgroundColor: 'transparent',
                                border: '1px solid hsla(0, 0%, 100%, 0.09)',
                                borderRadius: '0.375rem',
                                width: '40px',
                                height: '40px',
                              }),
                              menu: (baseStyles, state) => ({
                                ...baseStyles,

                                backgroundColor: '#1f282c',
                                margin: 'auto',
                                width: '40px',
                              }),
                              menuList: (baseStyles, state) => ({
                                ...baseStyles,

                                backgroundColor: '#1f282c',
                                textAlign: 'center',
                                width: '40px',
                                maxHeight: '160px',
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
                          {/* <div
                            style={{ height: '40px', width: '40px' }}
                            className="py-2 uley-data-main"
                          >
                            1
                          </div> */}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '20px' }}>
                        <div className="">
                          <div className="text-medium-emphasis small">Сумма</div>
                          {contarctAmountVisible ? (
                            <input
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault()

                                  setContarctAmount(Number(e.target.value))
                                  setContarctAmountVisible(false)
                                }
                              }}
                              onChange={(e) => setContarctAmount(Number(e.target.value))}
                              onBlur={(e) => {
                                setContarctAmount(Number(e.target.value))
                                setContarctAmountVisible(false)
                              }}
                              autoFocus
                              style={{ height: '40px', width: '300px' }}
                              className="uley-data-main no-spin"
                              value={contarctAmount}
                              type="number"
                            />
                          ) : (
                            <div
                              onClick={() => setContarctAmountVisible(true)}
                              style={{ height: '40px', width: '300px', color: '#757575' }}
                              className="py-2 uley-data-main"
                            >
                              {format(contarctAmount)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div style={{ marginBottom: '22px' }}>
                      <div className="text-medium-emphasis small">Услуга</div>

                      <CPopover
                        content="Услуги IT-специалиста по адаптации и модификации программного обеспечения для ЭВМ  в период  с 01.09 по 30.09.2024 года."
                        placement="top"
                        trigger={['hover', 'focus']}
                        style={{ width: '350px', lineHeight: '1.2' }}
                      >
                        <textarea
                          onKeyDown={(e) => {
                            e.key === 'Enter' && e.preventDefault()
                          }}
                          style={{
                            maxHeight: '120px',
                            height: '120px',
                            padding: '5px',
                            width: '620px',
                          }}
                          className="py-2 uley-data-main"
                          name="invoiceServiceName"
                          placeholder="Введите наименование услуги"
                          // value={' 08.08.2024'}
                          type="text"
                        />
                        {/* <div
                          style={{ maxHeight: '120px', height: '120px', padding: '5px' }}
                          className="py-2 uley-data-main text-start"
                        >
                          Услуги IT-специалиста по адаптации и модификации программного обеспечения
                          для ЭВМ в период с 01.09 по 30.09.2024 года.
                        </div> */}
                      </CPopover>
                    </div>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '22px' }}>
                      <div className="">
                        <div className="text-medium-emphasis small">Название мероприятия</div>
                        {/* <div
                          name="event_name"
                          style={{ height: '40px', width: '300px' }}
                          className="py-2 uley-data-main"
                        >
                          Мероприятие №1
                        </div> */}
                        <input
                          onKeyDown={(e) => {
                            e.key === 'Enter' && e.preventDefault()
                          }}
                          style={{ height: '40px', width: '300px' }}
                          className="py-2 uley-data-main"
                          name="eventName"
                          placeholder="Мероприятие №1"
                          // value={contarctAmount}
                          type="text"
                        />
                      </div>
                      <div className="">
                        <div className="text-medium-emphasis small">Сроки оказания услуг</div>
                        {/* <div
                          style={{ height: '40px', width: '300px' }}
                          className="py-2 uley-data-main"
                        >
                          01.08-31.08.2024
                        </div> */}
                        <InputMask
                          id="eventPeriod"
                          mask="99.99 — 99.99.9999"
                          // onBlur={(e) =>
                          //   handleUpdateService('service_period', service.id, e.target.value)
                          // }

                          // value={periodDate2}
                          // onChange={(e) => setPeriodDate2(e.target.value)}
                        >
                          {(inputProps) => (
                            <CFormInput
                              {...inputProps}
                              onKeyDown={(e) => {
                                e.key === 'Enter' && e.preventDefault()
                              }}
                              placeholder="01.08-31.08.2024"
                              disableUnderline
                              aria-label="sm input example"
                              name="eventPeriod"
                              style={{
                                backgroundColor: 'transparent',
                                cursor: 'default',
                                width: '300px',
                                height: '40px',
                                textAlign: 'center',
                              }}
                            />
                          )}
                        </InputMask>
                      </div>
                    </div>
                  </CCol>
                  <CCol lg={6}>
                    {serviceList.map((service, index) => (
                      <div key={service.id} style={{ marginBottom: '22px' }}>
                        <div style={{ position: 'relative' }}>
                          <CRow>
                            <CCol lg={5}>
                              <div className="">
                                <div
                                  onClick={() => handleDeleteService(service.id)}
                                  style={{ position: 'absolute', cursor: 'pointer', color: 'red' }}
                                >
                                  -
                                </div>
                                <div className="text-medium-emphasis small">Услуга</div>
                                {/* <div
                                style={{ height: '40px' }}
                                className="p-2 uley-data-main  text-start"
                              >
                                {service.service_name}
                              </div> */}
                                <Select
                                  onKeyDown={(e) => {
                                    e.key === 'Enter' && e.preventDefault()
                                  }}
                                  options={serviceNames}
                                  onChange={(e) =>
                                    handleUpdateService('service_name', service.id, e.value)
                                  }
                                  // defaultValue={specialistList[0]}
                                  // defaultValue={{ label: 'Выбрать', value: 0 }}
                                  name="serviceName"
                                  noOptionsMessage={() => 'Нет услуг'}
                                  placeholder={'Выбрать...'}
                                  styles={{
                                    control: (baseStyles, state) => ({
                                      ...baseStyles,

                                      backgroundColor: 'transparent',
                                      border: '1px solid hsla(0, 0%, 100%, 0.09)',
                                      borderRadius: '0.375rem',

                                      height: '40px',
                                    }),
                                    menu: (baseStyles, state) => ({
                                      ...baseStyles,

                                      backgroundColor: '#1f282c',
                                      margin: 'auto',
                                    }),
                                    menuList: (baseStyles, state) => ({
                                      ...baseStyles,

                                      backgroundColor: '#1f282c',
                                      textAlign: 'center',
                                      width: '300px',

                                      maxHeight: '150px',
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
                                      color: state.data.color,
                                      backgroundColor: state.isFocused ? '#34434a' : '',
                                    }),
                                    indicatorsContainer: (baseStyles, state) => ({
                                      ...baseStyles,
                                      display: 'none',
                                    }),
                                  }}
                                />
                              </div>
                            </CCol>
                            <CCol style={{ paddingLeft: '3px' }} lg={1}>
                              <div
                                style={{ height: '40px', width: '40px' }}
                                className="text-center"
                              >
                                <div className="text-medium-emphasis small">Ед.</div>

                                <input
                                  onKeyDown={(e) => {
                                    e.key === 'Enter' && e.preventDefault()
                                    handleUpdateService('service_count', service.id, e.target.value)
                                  }}
                                  onChange={(e) =>
                                    handleUpdateService('service_count', service.id, e.target.value)
                                  }
                                  style={{
                                    height: '40px',
                                    width: '40px',
                                    padding: '0px !important',
                                  }}
                                  className="p-2 uley-data-main no-spin"
                                  defaultValue={1}
                                  min="0"
                                  type="number"
                                />
                              </div>
                            </CCol>
                            <CCol lg={3}>
                              <div className="">
                                <div className="text-medium-emphasis small">Период</div>
                                <InputMask
                                  id="service_period"
                                  mask="99.99 - 99.99"
                                  onBlur={(e) =>
                                    handleUpdateService(
                                      'service_period',
                                      service.id,
                                      e.target.value,
                                    )
                                  }

                                  // value={periodDate2}
                                  // onChange={(e) => setPeriodDate2(e.target.value)}
                                >
                                  {(inputProps) => (
                                    <CFormInput
                                      onKeyDown={(e) => {
                                        e.key === 'Enter' && e.preventDefault()
                                      }}
                                      {...inputProps}
                                      placeholder="01.08-31.08"
                                      disableUnderline
                                      aria-label="sm input example"
                                      style={{
                                        backgroundColor: 'transparent',
                                        cursor: 'default',
                                        textAlign: 'center',
                                        // width: '115px',
                                      }}
                                    />
                                  )}
                                </InputMask>
                                {/* <div style={{ height: '40px' }} className="py-2 uley-data-main">
                                01.08-31.08.2024
                              </div> */}
                              </div>
                            </CCol>

                            <CCol lg={3}>
                              <div className="">
                                <div className="text-medium-emphasis small">Цена</div>
                                {servicePriceVisible === service.id ? (
                                  <input
                                    onKeyDown={(e) => {
                                      // e.key === 'Enter' && e.preventDefault()
                                      if (e.key === 'Enter') {
                                        e.preventDefault()
                                        handleUpdateService(
                                          'service_price',
                                          service.id,
                                          e.target.value,
                                          true,
                                        )
                                      }
                                    }}
                                    onChange={(e) =>
                                      handleUpdateService(
                                        'service_price',
                                        service.id,
                                        e.target.value,
                                        false,
                                      )
                                    }
                                    onBlur={(e) =>
                                      handleUpdateService(
                                        'service_price',
                                        service.id,
                                        e.target.value,
                                        true,
                                      )
                                    }
                                    autoFocus
                                    placeholder="0.00"
                                    style={{ height: '40px', width: '137px' }}
                                    className="uley-data-main no-spin"
                                    value={service.service_price}
                                    type="number"
                                  />
                                ) : (
                                  <div
                                    onClick={() => setServicePriceVisible(service.id)}
                                    style={{ height: '40px', width: '137px' }}
                                    className="py-2 uley-data-main"
                                  >
                                    {format(service.service_price)}
                                  </div>
                                )}
                              </div>
                            </CCol>
                          </CRow>
                        </div>
                      </div>
                    ))}
                    <div style={{ marginBottom: '22px', display: 'flex', justifyContent: 'end' }}>
                      <div
                        onClick={handleAddServiceItem}
                        style={{ height: '40px', width: '40px', cursor: 'pointer' }}
                        className="py-2 uley-data-main"
                      >
                        <CIcon icon={cilPlus} className="text-success" size="xl" />
                      </div>
                    </div>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <div className="">
                      <div className="text-medium-emphasis small">Место проведения</div>
                      {/* <div style={{ height: '40px' }} className="py-2 uley-data-main">
                        369330, Карачаево-Черкесская респ., Адыге-Хабльский р-н, аул Адыге-Хабль,
                        ул. Кирпичная 9
                      </div>  */}
                      <input
                        onKeyDown={(e) => {
                          e.key === 'Enter' && e.preventDefault()
                        }}
                        style={{ height: '40px', width: '100%' }}
                        className="py-2 uley-data-main"
                        name="eventPlace"
                        placeholder="101000, г. Москва, ул. Ленина д.1"
                        type="text"
                      />
                    </div>
                  </CCol>
                  <CCol>
                    <div>
                      <CRow>
                        <CCol lg={9}>
                          <div className="">
                            <div className="text-medium-emphasis small">Дополнительные расходы</div>
                            {/* <div
                              style={{ height: '40px' }}
                              className="p-2 uley-data-main text-start"
                            >
                              Расходные материалы
                            </div> */}
                            <Select
                              onKeyDown={(e) => {
                                e.key === 'Enter' && e.preventDefault()
                              }}
                              options={additionalNames}
                              // defaultValue={specialistList[0]}
                              // defaultValue={{ label: 'Выбрать', value: 0 }}
                              name="additionalName"
                              // isMulti={true}
                              noOptionsMessage={() => 'Нет услуг'}
                              placeholder={'Выбрать...'}
                              styles={{
                                control: (baseStyles, state) => ({
                                  ...baseStyles,

                                  backgroundColor: 'transparent',
                                  border: '1px solid hsla(0, 0%, 100%, 0.09)',
                                  borderRadius: '0.375rem',

                                  height: '40px',
                                }),
                                menu: (baseStyles, state) => ({
                                  ...baseStyles,

                                  backgroundColor: '#1f282c',
                                  margin: 'auto',
                                }),
                                menuList: (baseStyles, state) => ({
                                  ...baseStyles,

                                  backgroundColor: '#1f282c',
                                  textAlign: 'center',

                                  maxHeight: '150px',
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
                          </div>
                        </CCol>

                        <CCol lg={3}>
                          <div className="">
                            <div className="text-medium-emphasis small">Цена</div>

                            {additionalPriceVisible ? (
                              <input
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault()

                                    setAdditionalPrice(Number(e.target.value))
                                    setAdditionalPriceVisible(false)
                                  }
                                }}
                                name="additionalPrice"
                                onChange={(e) => setAdditionalPrice(Number(e.target.value))}
                                onBlur={(e) => {
                                  setAdditionalPrice(Number(e.target.value))
                                  setAdditionalPriceVisible(false)
                                }}
                                // onChange={handleSetContractAmount}
                                autoFocus
                                style={{ height: '40px', width: '137px' }}
                                className="uley-data-main no-spin"
                                value={additionalPrice}
                                type="number"
                              />
                            ) : (
                              <div
                                onClick={() => setAdditionalPriceVisible(true)}
                                style={{ height: '40px', width: '137px' }}
                                className="py-2 uley-data-main"
                              >
                                {format(additionalPrice)}
                              </div>
                            )}
                          </div>
                        </CCol>
                      </CRow>
                    </div>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <div
                      style={{
                        display: 'flex',
                        gap: '20px',
                        marginTop: '40px',
                        justifyContent: 'space-between',
                      }}
                    >
                      {/* <CFormCheck
                        button={{ color: 'secondary', variant: 'outline' }}
                        id="btn-check-1"
                        label="Счёт"
                        name="invoice"
                      /> */}
                      <div
                        style={{
                          height: '40px',
                          width: '140px',
                          cursor: 'pointer',
                          boxShadow: invoiceChecked ? '0 0 0 1px #2684ff' : '',
                        }}
                        className="py-2 uley-data-main"
                        onClick={() => setinvoiceChecked(!invoiceChecked)}
                      >
                        Счёт
                      </div>
                      <div
                        style={{
                          height: '40px',
                          width: '140px',
                          cursor: 'pointer',
                          boxShadow: actChecked ? '0 0 0 1px #2684ff' : '',
                        }}
                        className="py-2 uley-data-main"
                        onClick={() => setActChecked(!actChecked)}
                      >
                        Акт
                      </div>

                      <div
                        style={{
                          height: '40px',
                          width: '140px',
                          cursor: 'pointer',
                          boxShadow: applicationChecked ? '0 0 0 1px #2684ff' : '',
                        }}
                        className="py-2 uley-data-main"
                        onClick={() => setApplicationChecked(!applicationChecked)}
                      >
                        Приложение
                      </div>
                      <div
                        style={{
                          height: '40px',
                          width: '140px',
                          cursor: 'pointer',
                          boxShadow: contractChecked ? '0 0 0 1px #2684ff' : '',
                        }}
                        className="py-2 uley-data-main"
                        onClick={() => setContractChecked(!contractChecked)}
                      >
                        Договор
                      </div>
                    </div>
                  </CCol>
                  <CCol>
                    <div
                      style={{
                        display: 'flex',
                        gap: '10px',
                        marginTop: '40px',
                        justifyContent: 'space-between',
                      }}
                    >
                      {/* <div
                        style={{ height: '40px', width: '140px', cursor: 'pointer' }}
                        className="py-2 uley-data-main"
                      >
                        Комплект
                      </div> */}
                      <div
                        style={{
                          height: '40px',
                          width: '140px',
                          cursor: 'pointer',
                          boxShadow: complectChecked ? '0 0 0 1px #2684ff' : '',
                        }}
                        className="py-2 uley-data-main"
                        onClick={() => {
                          setComplectChecked(!complectChecked)
                          setContractChecked(!contractChecked)
                          setApplicationChecked(!applicationChecked)
                          setActChecked(!actChecked)
                          setinvoiceChecked(!invoiceChecked)
                        }}
                      >
                        Комплект
                      </div>

                      <div
                        style={{
                          height: '40px',
                          width: '140px',
                          color: contractAmountEquality ? 'red' : '',
                        }}
                        className="py-2 uley-data-main"
                      >
                        {format(contarctAmount)}
                      </div>

                      <div
                        style={{ height: '40px', width: '140px' }}
                        className="py-2 uley-data-main"
                      >
                        {format(
                          serviceList.reduce((acc, val) => {
                            acc += Number(val.service_price_sum)

                            return acc
                          }, 0) + additionalPrice,
                        )}
                      </div>

                      <button
                        style={{ height: '40px', width: '140px', cursor: 'pointer' }}
                        className="py-2 uley-data-main"
                      >
                        Создать
                      </button>
                    </div>
                  </CCol>
                </CRow>
              </form>
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

export default DocumentsGenerator
