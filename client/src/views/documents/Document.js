import React, { useState, useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from 'src/components/index'
import { format, formatPhoneNumber, formatDate, formatDocumentStatus } from '../../utils/formater'
import { Link, useLocation } from 'react-router-dom'
import * as dayjs from 'dayjs'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// Core viewer
import { Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core'
// import { fullScreenPlugin } from '@react-pdf-viewer/full-screen'
// import { scrollModePlugin } from '@react-pdf-viewer/scroll-mode'
import { thumbnailPlugin } from '@react-pdf-viewer/thumbnail'

// import { zoomPlugin } from '@react-pdf-viewer/zoom'
import { DisplayThumbnailExample } from 'src/components/DisplayThumbnailExample'
// import { PageThumbnailPlugin } from 'src/components/PageThumbnailPlugin'

// Import styles
import '@react-pdf-viewer/zoom/lib/styles/index.css'

// Import styles
import '@react-pdf-viewer/full-screen/lib/styles/index.css'

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
  CContainer,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cibTwitter,
  cilUser,
  cilUserFemale,
  cilChevronLeft,
  cilChevronRight,
  cilArrowCircleLeft,
  cilArrowLeft,
  cilArrowRight,
  cilCheckAlt,
  cilX,
} from '@coreui/icons'
import './Document.css'
import { getComplect, hiddenDocument } from 'src/services/api/documents'

import { ReactComponent as Search } from 'src/assets/svg/search.svg'
import { ReactComponent as ArrowD } from 'src/assets/svg/arrow-down.svg'
import { ReactComponent as ArrowU } from 'src/assets/svg/arrow-up.svg'
import { ReactComponent as Trash } from 'src/assets/svg/trash.svg'
import { ReactComponent as Pencil } from 'src/assets/svg/pencil-square.svg'

const Document = () => {
  const [visible, setVisible] = useState(false)
  const [editing, setEditing] = useState(false)
  const [showModalEmpty, setShowModalEmpty] = useState(false)
  const queryClient = useQueryClient()
  
  



  const { state } = useLocation()

  const {
    isPending: isPendingComplect,
    error: complectError,
    data: complect,
  } = useQuery({
    queryKey: ['complect'],
    queryFn: () => getComplect(state.complectId),
  })

  const { mutate: mutateComplect } = useMutation({
      mutationFn: hiddenDocument,   
      onSettled: async () => {
        return await queryClient.invalidateQueries(['complect'])
        
      },
    })

  const handleHiddenDocument = (item) => {
    
    mutateComplect(item)
  }

  const [showPdfBlock, setShowPdfBlock] = useState(true)
  const handleSetShowPdfBlock = () => {
    setShowPdfBlock(!showPdfBlock)
  }

  if (isPendingComplect)
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

  if (complectError)
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

  

  return (
    <div className="dark-theme">
      <CModal
        alignment="center"
        visible={showModalEmpty}
        onClose={() => setShowModalEmpty(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalBody
          style={{ height: '100px', textAlign: 'center', fontSize: '18px', paddingTop: '15px' }}
        >
           Функция не доступна по данному тарифу
        </CModalBody>
      </CModal>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer lg>
            <CRow>
              <CCol xs>
                <CCard className="mb-1">
                  <CCardBody>
                    <div className="wrapper-display-document">
                      <div className="div1-document">
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div
                            style={{ height: '40px', width: '40px', cursor: 'pointer' }}
                            className="py-2  small uley-data-main"
                          >
                            <Link to={'/partner'} className="nav-link">
                              <CIcon icon={cilArrowLeft} />
                            </Link>
                          </div>
                          <div
                            style={{ height: '40px', width: '250px', marginBottom: '40px' }}
                            className="py-2  small uley-data-main"
                          >
                            {dayjs(complect.contract.start_date).format('DD.MM.YYYY')}
                          </div>
                        </div>

                        <div>
                          <div
                            style={{ height: '40px', marginBottom: '22px' }}
                            className="py-2  small uley-data-main"
                          >
                            Счёт
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '22px' }}>
                          <div className="">
                            <div className="text-medium-emphasis small">Дата</div>
                            <div
                              style={{ height: '40px', width: '140px' }}
                              // className="py-2 uley-data-main editing-style"
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              {complect.invoice.date}
                            </div>
                          </div>
                          <div className="">
                            <div className="text-medium-emphasis small">Номер</div>
                            <div
                              style={{ height: '40px', width: '140px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              {complect.invoice.number}
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '22px' }}>
                          <div className="">
                            <div className="text-medium-emphasis small">Период</div>
                            <div
                              style={{ height: '40px', width: '140px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              {dayjs(complect.contract.start_date).format('DD.MM')}-
                              {dayjs(complect.contract.end_date).format('DD.MM.YYYY')}
                            </div>
                          </div>
                          <div className="">
                            <div className="text-medium-emphasis small">Основание</div>
                            <div
                              style={{ height: '40px', width: '140px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              {complect.contract.number}
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '22px' }}>
                          <div className="">
                            <div className="text-medium-emphasis small">Формат </div>
                            <div
                              style={{ height: '40px', width: '140px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              {complect.contract.signature_type} |{' '}
                              {complect.contract.signature_date}
                            </div>
                          </div>
                          <div className="">
                            <div className="text-medium-emphasis small">Сумма</div>
                            <div
                              style={{ height: '40px', width: '140px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              {format(complect.invoice.service_price)}
                            </div>
                          </div>
                        </div>

                        <div style={{ marginBottom: '22px' }}>
                          <div className="text-medium-emphasis small">Услуга</div>

                          <CPopover
                            content={complect.invoice.service_name}
                            placement="top"
                            trigger={['hover', 'focus']}
                            style={{ width: '250px', lineHeight: '1.2' }}
                          >
                            <div
                              style={{ maxHeight: '120px', minHeight: '114px', padding: '5px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              {complect.invoice.service_name}
                            </div>
                          </CPopover>
                        </div>
                        <div style={{ marginBottom: '40px' }}>
                          <div className="text-medium-emphasis small">Контрагент</div>
                          <div
                            style={{ height: '40px' }}
                            className="py-2 uley-data-main"
                            onClick={() => setShowModalEmpty(true)}
                          >
                            {complect.contract.company.name}
                          </div>
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '10px',

                            flexWrap: 'wrap',
                          }}
                        >
                          {/* <EnterFullScreen>
                      {(props) => (
                        <div
                          style={{
                            height: '40px',
                            width: '40px',
                            cursor: 'pointer',
                            padding: '5px',
                          }}
                          onClick={props.onClick}
                          className="uley-data-main"
                        >
                          <Search style={{ cursor: 'pointer' }} />
                        </div>
                      )}
                    </EnterFullScreen> */}

                          <div className="">
                            <div
                              style={{
                                height: '40px',
                                width: '40px',
                                cursor: 'pointer',
                                padding: '5px',
                              }}
                              className="uley-data-main"
                            >
                              <ArrowD />
                            </div>
                          </div>
                          <div
                            style={{
                              height: '40px',
                              width: '40px',
                              cursor: 'pointer',
                              padding: '5px',
                            }}
                            className="uley-data-main"
                            onClick={() => setEditing(!editing)}
                          >
                            <Pencil />
                          </div>

                          <div
                            style={{
                              height: '40px',
                              width: '40px',
                              cursor: 'pointer',
                              padding: '5px',
                            }}
                            className="uley-data-main"
                          >
                            <ArrowU />
                          </div>

                          <div
                            style={{
                              height: '40px',
                              width: '40px',
                              cursor: 'pointer',
                              padding: '5px',
                            }}
                            className="uley-data-main"
                            onClick={() =>
                              handleHiddenDocument({
                                invoice_id: complect.invoice.id,
                                act_id: null,
                                application_id: null,
                                contract_id: null,
                              })
                            }
                          >
                            <Trash />
                          </div>
                        </div>
                      </div>
                      <div className="div2-document">
                        <div>
                          <div
                            style={{ height: '40px', marginBottom: '40px' }}
                            className="py-2  small uley-data-main"
                          >
                            Проект №1
                          </div>
                        </div>
                        <div>
                          <div
                            style={{ height: '40px', marginBottom: '22px' }}
                            className="py-2  mt-3 small uley-data-main"
                          >
                            Акт
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '22px' }}>
                          <div className="">
                            <div className="text-medium-emphasis small">Дата</div>
                            <div
                              style={{ height: '40px', width: '140px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              {complect.act.date}
                            </div>
                          </div>
                          <div className="">
                            <div className="text-medium-emphasis small">Номер</div>
                            <div
                              style={{ height: '40px', width: '140px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              {complect.act.number}
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '22px' }}>
                          <div className="">
                            <div className="text-medium-emphasis small">Период</div>
                            <div
                              style={{ height: '40px', width: '140px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              {dayjs(complect.contract.start_date).format('DD.MM')}-
                              {dayjs(complect.contract.end_date).format('DD.MM.YYYY')}
                            </div>
                          </div>
                          <div className="">
                            <div className="text-medium-emphasis small">Основание</div>
                            <div
                              style={{ height: '40px', width: '140px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              {complect.contract.number}
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '22px' }}>
                          <div className="">
                            <div className="text-medium-emphasis small">Формат </div>
                            <div
                              style={{ height: '40px', width: '140px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              {complect.contract.signature_type} |{' '}
                              {complect.contract.signature_date}
                            </div>
                          </div>
                          <div className="">
                            <div className="text-medium-emphasis small">Сумма</div>
                            <div
                              style={{ height: '40px', width: '140px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              {format(complect.invoice.service_price)}
                            </div>
                          </div>
                        </div>

                        <div style={{ marginBottom: '22px' }}>
                          <div className="text-medium-emphasis small">Услуга</div>

                          <CPopover
                            content={complect.invoice.service_name}
                            placement="top"
                            trigger={['hover', 'focus']}
                            style={{ width: '250px', lineHeight: '1.2' }}
                          >
                            <div
                              style={{ maxHeight: '120px', minHeight: '114px', padding: '5px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              {complect.invoice.service_name}
                            </div>
                          </CPopover>
                        </div>
                        <div style={{ marginBottom: '40px' }}>
                          <div className="text-medium-emphasis small">Контрагент</div>
                          <div style={{ height: '40px' }} className="py-2 uley-data-main">
                            {complect.contract.company.name}
                          </div>
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '10px',

                            flexWrap: 'wrap',
                          }}
                        >
                          {/* <EnterFullScreen>
                      {(props) => (
                        <div
                          style={{
                            height: '40px',
                            width: '40px',
                            cursor: 'pointer',
                            padding: '5px',
                          }}
                          onClick={props.onClick}
                          className="uley-data-main"
                        >
                          <Search style={{ cursor: 'pointer' }} />
                        </div>
                      )}
                    </EnterFullScreen> */}

                          <div className="">
                            <div
                              style={{
                                height: '40px',
                                width: '40px',
                                cursor: 'pointer',
                                padding: '5px',
                              }}
                              className="uley-data-main"
                            >
                              <ArrowD />
                            </div>
                          </div>
                          <div
                            style={{
                              height: '40px',
                              width: '40px',
                              cursor: 'pointer',
                              padding: '5px',
                            }}
                            className="uley-data-main"
                            onClick={() => setEditing(!editing)}
                          >
                            <Pencil />
                          </div>

                          <div
                            style={{
                              height: '40px',
                              width: '40px',
                              cursor: 'pointer',
                              padding: '5px',
                            }}
                            className="uley-data-main"
                          >
                            <ArrowU />
                          </div>

                          <div
                            style={{
                              height: '40px',
                              width: '40px',
                              cursor: 'pointer',
                              padding: '5px',
                            }}
                            className="uley-data-main"
                            onClick={() =>
                              handleHiddenDocument({
                                act_id: complect.act.id,
                                invoice_id: null,
                                application_id: null,
                                contract_id: null,
                              })
                            }
                          >
                            <Trash />
                          </div>
                        </div>
                      </div>
                      <div className="div3-document">
                        <div>
                          <div
                            style={{ height: '40px', marginBottom: '40px' }}
                            className="py-2  small uley-data-main"
                          >
                            {complect.contract.company.name}
                          </div>
                        </div>
                        <div>
                          <div
                            style={{ height: '40px', marginBottom: '22px' }}
                            className="py-2  mt-3 small uley-data-main"
                          >
                            Приложение
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '22px' }}>
                          <div className="">
                            <div className="text-medium-emphasis small">Дата</div>
                            <div
                              style={{ height: '40px', width: '140px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              {complect.application.date}
                            </div>
                          </div>
                          <div className="">
                            <div className="text-medium-emphasis small">Номер</div>
                            <div
                              style={{ height: '40px', width: '140px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              {complect.application.number}
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '22px' }}>
                          <div className="">
                            <div className="text-medium-emphasis small">Период</div>
                            <div
                              style={{ height: '40px', width: '140px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              {dayjs(complect.contract.start_date).format('DD.MM')}-
                              {dayjs(complect.contract.end_date).format('DD.MM.YYYY')}
                            </div>
                          </div>
                          <div className="">
                            <div className="text-medium-emphasis small">Основание</div>
                            <div
                              style={{ height: '40px', width: '140px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              {complect.contract.number}
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '22px' }}>
                          <div className="">
                            <div className="text-medium-emphasis small">Формат </div>
                            <div
                              style={{ height: '40px', width: '140px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              {complect.contract.signature_type} |{' '}
                              {complect.contract.signature_date}
                            </div>
                          </div>
                          <div className="">
                            <div className="text-medium-emphasis small">Сумма</div>
                            <div
                              style={{ height: '40px', width: '140px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              {format(complect.invoice.service_price)}
                            </div>
                          </div>
                        </div>

                        <div style={{ marginBottom: '22px' }}>
                          <div className="text-medium-emphasis small">Услуга</div>

                          <CPopover
                            content={complect.invoice.service_name}
                            placement="top"
                            trigger={['hover', 'focus']}
                            style={{ width: '250px', lineHeight: '1.2' }}
                          >
                            <div
                              style={{ maxHeight: '120px', minHeight: '114px', padding: '5px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              {complect.invoice.service_name}
                            </div>
                          </CPopover>
                        </div>
                        <div style={{ marginBottom: '40px' }}>
                          <div className="text-medium-emphasis small">Контрагент</div>
                          <div style={{ height: '40px' }} className="py-2 uley-data-main">
                            {complect.contract.company.name}
                          </div>
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '10px',

                            flexWrap: 'wrap',
                          }}
                        >
                          {/* <EnterFullScreen>
                      {(props) => (
                        <div
                          style={{
                            height: '40px',
                            width: '40px',
                            cursor: 'pointer',
                            padding: '5px',
                          }}
                          onClick={props.onClick}
                          className="uley-data-main"
                        >
                          <Search style={{ cursor: 'pointer' }} />
                        </div>
                      )}
                    </EnterFullScreen> */}

                          <div className="">
                            <div
                              style={{
                                height: '40px',
                                width: '40px',
                                cursor: 'pointer',
                                padding: '5px',
                              }}
                              className="uley-data-main"
                            >
                              <ArrowD />
                            </div>
                          </div>
                          <div
                            style={{
                              height: '40px',
                              width: '40px',
                              cursor: 'pointer',
                              padding: '5px',
                            }}
                            className="uley-data-main"
                            onClick={() => setEditing(!editing)}
                          >
                            <Pencil />
                          </div>

                          <div
                            style={{
                              height: '40px',
                              width: '40px',
                              cursor: 'pointer',
                              padding: '5px',
                            }}
                            className="uley-data-main"
                          >
                            <ArrowU />
                          </div>

                          <div
                            style={{
                              height: '40px',
                              width: '40px',
                              cursor: 'pointer',
                              padding: '5px',
                            }}
                            className="uley-data-main"
                            onClick={() =>
                              handleHiddenDocument({
                                application_id: complect.application.id,
                                invoice_id: null,
                                act_id: null,
                                contract_id: null,
                              })
                            }
                          >
                            <Trash />
                          </div>
                        </div>
                      </div>
                      <div className="div4-document">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div
                            style={{ height: '40px', width: '250px', marginBottom: '40px' }}
                            className="py-2  small uley-data-main"
                          >
                            -
                          </div>
                          <div
                            style={{ height: '40px', width: '40px', cursor: 'pointer' }}
                            className="py-2  small uley-data-main"
                          >
                            <CIcon icon={cilArrowRight} />
                          </div>
                        </div>
                        <div>
                          <div
                            style={{ height: '40px', marginBottom: '22px' }}
                            className="py-2  small uley-data-main"
                          >
                            Договор
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '22px' }}>
                          <div className="">
                            <div className="text-medium-emphasis small">Дата начала</div>
                            <div
                              style={{ height: '40px', width: '140px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              {dayjs(complect.contract.start_date).format('DD.MM.YYYY')}
                            </div>
                          </div>
                          <div className="">
                            <div className="text-medium-emphasis small">Дата окончания</div>
                            <div
                              style={{ height: '40px', width: '140px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              {dayjs(complect.contract.end_date).format('DD.MM.YYYY')}
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '22px' }}>
                          <div className="">
                            <div className="text-medium-emphasis small">Дата подписи</div>
                            <div
                              style={{ height: '40px', width: '140px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              -
                            </div>
                          </div>
                          <div className="">
                            <div className="text-medium-emphasis small">Номер</div>
                            <div
                              style={{ height: '40px', width: '140px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              {complect.contract.number}
                            </div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '20px', marginBottom: '22px' }}>
                          <div className="">
                            <div className="text-medium-emphasis small">Формат</div>
                            <div
                              style={{ height: '40px', width: '140px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              {complect.contract.signature_type} |{' '}
                              {complect.contract.signature_date}
                            </div>
                          </div>
                          <div className="">
                            <div className="text-medium-emphasis small">Статус</div>
                            <div
                              style={{ height: '40px', width: '140px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              -
                            </div>
                          </div>
                        </div>

                        <div style={{ marginBottom: '22px' }}>
                          <div className="text-medium-emphasis small">Услуга</div>

                          <CPopover
                            content={complect.invoice.service_name}
                            placement="top"
                            trigger={['hover', 'focus']}
                            style={{ width: '250px', lineHeight: '1.2' }}
                          >
                            <div
                              style={{ maxHeight: '120px', minHeight: '114px', padding: '5px' }}
                              className={`py-2 uley-data-main${editing ? '' : ' editing-style'}`}
                              onClick={() => setShowModalEmpty(true)}
                            >
                              {complect.invoice.service_name}
                            </div>
                          </CPopover>
                        </div>
                        <div style={{ marginBottom: '40px' }}>
                          <div className="text-medium-emphasis small">Контрагент</div>
                          <div style={{ height: '40px' }} className="py-2 uley-data-main">
                            {complect.contract.company.name}
                          </div>
                        </div>

                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '10px',

                            flexWrap: 'wrap',
                          }}
                        >
                          {/* <EnterFullScreen>
                      {(props) => (
                        <div
                          style={{
                            height: '40px',
                            width: '40px',
                            cursor: 'pointer',
                            padding: '5px',
                          }}
                          onClick={props.onClick}
                          className="uley-data-main"
                        >
                          <Search style={{ cursor: 'pointer' }} />
                        </div>
                      )}
                    </EnterFullScreen> */}

                          <div className="">
                            <div
                              style={{
                                height: '40px',
                                width: '40px',
                                cursor: 'pointer',
                                padding: '5px',
                              }}
                              className="uley-data-main"
                            >
                              <ArrowD />
                            </div>
                          </div>
                          <div
                            style={{
                              height: '40px',
                              width: '40px',
                              cursor: 'pointer',
                              padding: '5px',
                            }}
                            className="uley-data-main"
                            onClick={() => setEditing(!editing)}
                          >
                            <Pencil />
                          </div>

                          <div
                            style={{
                              height: '40px',
                              width: '40px',
                              cursor: 'pointer',
                              padding: '5px',
                            }}
                            className="uley-data-main"
                          >
                            <ArrowU />
                          </div>

                          <div
                            style={{
                              height: '40px',
                              width: '40px',
                              cursor: 'pointer',
                              padding: '5px',
                            }}
                            className="uley-data-main"
                            onClick={() =>
                              handleHiddenDocument({
                                contract_id: complect.contract.id,
                                invoice_id: null,
                                act_id: null,
                                application_id: null,
                              })
                            }
                          >
                            <Trash />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CCardBody>
                </CCard>

                <div style={{ display: 'flex', gap: '20px', marginBottom: '5px' }}>
                  <CCard
                    id="1"
                    style={{
                      width: '315px',
                      height: '410px',
                      visibility: complect.invoice.visibility,
                    }}
                  >
                    <CCardBody style={{ cursor: 'pointer' }} onClick={() => setVisible('invoice')}>
                      <DisplayThumbnailExample
                        pageIndex={0}
                        fileUrl={`https://storage.yandexcloud.net/uley/${complect.invoice.document_url}`}
                      />
                    </CCardBody>
                    {visible === 'invoice' && (
                      <CModal
                        size="lg"
                        alignment="center"
                        visible={visible}
                        onClose={() => setVisible(false)}
                        aria-labelledby="VerticallyCenteredScrollableExample"
                      >
                        <Viewer
                          defaultScale={SpecialZoomLevel.PageWidth}
                          // defaultScale={0.9}
                          theme={{
                            theme: 'dark',
                          }}
                          fileUrl={`https://storage.yandexcloud.net/uley/${complect.invoice.document_url}`}
                          // plugins={[fullScreenPluginInstance]}
                        />
                      </CModal>
                    )}
                  </CCard>
                  <CCard
                    id="2"
                    style={{ width: '315px', height: '404px', visibility: complect.act.visibility }}
                  >
                    <CCardBody style={{ cursor: 'pointer' }} onClick={() => setVisible('act')}>
                      <DisplayThumbnailExample
                        pageIndex={0}
                        fileUrl={`https://storage.yandexcloud.net/uley/${complect.act.document_url}`}
                      />
                    </CCardBody>
                    {visible === 'act' && (
                      <CModal
                        size="lg"
                        alignment="center"
                        visible={visible}
                        onClose={() => setVisible(false)}
                        aria-labelledby="VerticallyCenteredScrollableExample"
                      >
                        <Viewer
                          defaultScale={SpecialZoomLevel.PageWidth}
                          // defaultScale={0.9}
                          theme={{
                            theme: 'dark',
                          }}
                          fileUrl={`https://storage.yandexcloud.net/uley/${complect.act.document_url}`}
                          // plugins={[fullScreenPluginInstance]}
                        />
                      </CModal>
                    )}
                  </CCard>

                  <CCard
                    id="3"
                    style={{
                      width: '315px',
                      height: '410px',
                      visibility: complect.application.visibility,
                    }}
                  >
                    <CCardBody
                      style={{ cursor: 'pointer' }}
                      onClick={() => setVisible('application')}
                    >
                      <DisplayThumbnailExample
                        pageIndex={0}
                        fileUrl={`https://storage.yandexcloud.net/uley/${complect.application.document_url}`}
                      />
                    </CCardBody>
                    {visible === 'application' && (
                      <CModal
                        size="lg"
                        alignment="center"
                        visible={visible}
                        onClose={() => setVisible(false)}
                        aria-labelledby="VerticallyCenteredScrollableExample"
                      >
                        <Viewer
                          defaultScale={SpecialZoomLevel.PageWidth}
                          // defaultScale={0.9}
                          theme={{
                            theme: 'dark',
                          }}
                          fileUrl={`https://storage.yandexcloud.net/uley/${complect.application.document_url}`}
                          // plugins={[fullScreenPluginInstance]}
                        />
                      </CModal>
                    )}
                  </CCard>
                  <CCard
                    id="4"
                    style={{
                      width: '315px',
                      height: '410px',
                      visibility: complect.contract.visibility,
                    }}
                  >
                    <CCardBody
                      style={{ cursor: 'pointer', overflow: 'auto' }}
                      onClick={() => setVisible('contract')}
                    >
                      <DisplayThumbnailExample
                        pageIndex={0}
                        fileUrl={`https://storage.yandexcloud.net/uley/${complect.contract.document_url}`}
                      />
                    </CCardBody>
                    {visible === 'contract' && (
                      <CModal
                        size="lg"
                        alignment="center"
                        visible={visible}
                        onClose={() => setVisible(false)}
                        aria-labelledby="VerticallyCenteredScrollableExample"
                      >
                        <Viewer
                          defaultScale={SpecialZoomLevel.PageWidth}
                          initialPage={1}
                          // defaultScale={0.9}
                          theme={{
                            theme: 'dark',
                          }}
                          fileUrl={`https://storage.yandexcloud.net/uley/${complect.contract.document_url}`}
                          // plugins={[defaultLayoutPluginInstance]}
                        />
                      </CModal>
                    )}
                  </CCard>
                </div>
              </CCol>
            </CRow>
          </CContainer>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Document
