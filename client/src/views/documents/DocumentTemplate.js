import React, { useState } from 'react'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { format } from '../../utils'
import { Link } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'
// Core viewer
import { Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core'
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen'

import { zoomPlugin } from '@react-pdf-viewer/zoom'

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
  CTooltip,
  CPopover,
  CModalHeader,
  CModal,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus, cilCopy, cilVerticalAlignBottom, cilClearAll } from '@coreui/icons'
import './Document.css'
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

import Select from 'react-select'
import { ReactComponent as Search } from '../../assets/svg/search.svg'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import {
  getCompanies,
  getCompany,
  getTemplates,
  getTemplate,
  updateTemplateItem,
  updateTemplate,
  getTemplate2,
} from 'src/services/api'
import Contract from 'src/views/documents/templates/Contract'
import Invoice from './templates/Invoice'
import Application from './templates/Application'
import Act from './templates/Act'

const templateTypeList = [
  { value: 1, label: '№ 1' },
  { value: 2, label: '№ 2' },
  { value: 3, label: '№ 3' },
  { value: 4, label: '№ 4' },
  { value: 5, label: '№ 5' },
]

const DocumentTemplate = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const [tempTemplateCopy, setTempTemplateCopy] = useState({})

  const [templateType, setTemplateType] = useState('contract')
  const [templateNumber, setTemplateNumber] = useState(1)
  const [templateitems, setTemplateitems] = useState('')

  const queryClient = useQueryClient()

  const [visible, setVisible] = useState(false)

  const customTooltipStyle = {
    '--cui-tooltip-bg': '#000',
    '--cui-tootip-color': '#fff'
  }

  const changeTemplateType = (val) => {
    console.log(val)
    setTemplateType(val)
    setTemplateNumber(1)
  }

  const handleChangeTemplateNumber = (e) => {
    console.log(e.value)
    setTemplateNumber(e.value)
  }

  const handleCopyTemplate = () => {
    setTempTemplateCopy(template)
  }

  const handleClearTemplate = () => {
    console.log(template)
    if (template.number === 1) {
      toast('Нельза очистить шаблон №1', {
        // position: 'top-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
      return
    }
    let rundomId = uuidv4()
    const items = []

    if (templateType === 'invoice') {
      items.push({
        name: 'invoice_executor',
        value: '-',
      })
      items.push({ name: 'invoice_inn', value: '-' })
      items.push({ name: 'invoice_email', value: '-' })
      items.push({ name: 'invoice_phone', value: '-' })
      items.push({ name: 'invoice_ogrn', value: '-' })
      items.push({
        name: 'invoice_legal_address',
        value: '-',
      })
      items.push({ name: 'invoice_bank', value: '-' })
      items.push({
        name: 'invoice_bank_account',
        value: '-',
      })
      items.push({
        name: 'invoice_correspondent_account',
        value: '-',
      })
      items.push({
        name: 'invoice_bank_bic',
        value: '-',
      })
      items.push({
        name: 'invoice_signatory_position',
        value: '-',
      })
    }
    const formValues = {
      template_id: template.id,
      templateItems: items,
    }
    updateTemplate({ item_id: tempTemplateCopy.id, data: formValues })
    setTemplateitems(rundomId)
  }

  const handlePasteTemplate = () => {
    let rundomId = uuidv4()
    const items = []

    if (templateType === 'invoice') {
      items.push({
        name: 'invoice_executor',
        value: tempTemplateCopy.items.invoice_executor.text,
      })
      items.push({ name: 'invoice_inn', value: tempTemplateCopy.items.invoice_inn.text })
      items.push({ name: 'invoice_email', value: tempTemplateCopy.items.invoice_email.text })
      items.push({ name: 'invoice_phone', value: tempTemplateCopy.items.invoice_phone.text })
      items.push({ name: 'invoice_ogrn', value: tempTemplateCopy.items.invoice_ogrn.text })
      items.push({
        name: 'invoice_legal_address',
        value: tempTemplateCopy.items.invoice_legal_address.text,
      })
      items.push({ name: 'invoice_bank', value: tempTemplateCopy.items.invoice_bank.text })
      items.push({
        name: 'invoice_bank_account',
        value: tempTemplateCopy.items.invoice_bank_account.text,
      })
      items.push({
        name: 'invoice_correspondent_account',
        value: tempTemplateCopy.items.invoice_correspondent_account.text,
      })
      items.push({
        name: 'invoice_bank_bic',
        value: tempTemplateCopy.items.invoice_bank_bic.text,
      })
      items.push({
        name: 'invoice_signatory_position',
        value: tempTemplateCopy.items.invoice_signatory_position.text,
      })
    }
    const formValues = {
      template_id: template.id,
      templateItems: items,
    }
    updateTemplate({ item_id: tempTemplateCopy.id, data: formValues })
    setTemplateitems(rundomId)
  }

  const handleSaveTemplate = (e) => {
    e.preventDefault()
    // const formData = new FormData(e.currentTarget)
    let rundomId = uuidv4()
    const formData = new FormData(e.target)
    const items = []
    if (templateType === 'contract') {
      items.push({ name: 'contract_star_date', value: formData.get('contract_star_date') })
      items.push({ name: 'contract_end_date', value: formData.get('contract_end_date') })
      items.push({ name: 'contract_subject', value: formData.get('contract_subject') })
      items.push({ name: 'contract_title', value: formData.get('contract_title') })
      items.push({ name: 'contract_number', value: formData.get('contract_number') })
      items.push({ name: 'contract_total_amount', value: formData.get('contract_total_amount') })
    }
    if (templateType === 'invoice') {
      items.push({ name: 'invoice_executor', value: formData.get('invoice_executor') })
      items.push({ name: 'invoice_inn', value: formData.get('invoice_inn') })
      items.push({ name: 'invoice_email', value: formData.get('invoice_email') })
      items.push({ name: 'invoice_phone', value: formData.get('invoice_phone') })
      items.push({ name: 'invoice_ogrn', value: formData.get('invoice_ogrn') })
      items.push({ name: 'invoice_legal_address', value: formData.get('invoice_legal_address') })
      items.push({ name: 'invoice_bank', value: formData.get('invoice_bank') })
      items.push({ name: 'invoice_bank_account', value: formData.get('invoice_bank_account') })
      items.push({
        name: 'invoice_correspondent_account',
        value: formData.get('invoice_correspondent_account'),
      })
      items.push({ name: 'invoice_bank_bic', value: formData.get('invoice_bank_bic') })
      items.push({
        name: 'invoice_signatory_position',
        value: formData.get('invoice_signatory_position'),
      })
      items.push({ name: 'invoice_action_basis', value: formData.get('invoice_action_basis') })
    }
    if (templateType === 'application') {
      items.push({ name: 'app_title', value: formData.get('app_title') })
      items.push({ name: 'appСity', value: formData.get('appСity') })
    }

    const formValues = {
      template_id: template.id,
      templateItems: items,
    }
    updateTemplate({ item_id: template.id, data: formValues })

    // queryClient.invalidateQueries({ queryKey: ['template'] })

    setTemplateitems(rundomId)
    setVisible(false)
  }

  const {
    isPending,
    error,
    data: template,
  } = useQuery({
    queryKey: ['template', templateNumber, templateType, templateitems],
    queryFn: () => getTemplate2(templateType, templateNumber),
  })

  if (isPending) return <div style={{ color: 'hsla(0, 0%, 100%, .75)' }}>Загрузка...</div>

  if (error)
    return <div style={{ color: 'hsla(0, 0%, 100%, .75)' }}>Ошибка при загрузке ставок</div>
  // console.log(template)
  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-1">
            <CCardBody>
              <form onSubmit={(e) => handleSaveTemplate(e, template.id)}>
                <CRow>
                  <CCol>
                    <div style={{ display: 'flex', justifyContent: 'end', marginBottom: '40px' }}>
                      <CTooltip content="Очистить шаблон" placement="top">
                        <CIcon
                          style={{ cursor: 'pointer', marginLeft: '10px' }}
                          size="xl"
                          icon={cilClearAll}
                          onClick={handleClearTemplate}
                        />
                      </CTooltip>

                      <CIcon
                        style={{ cursor: 'pointer', marginLeft: '10px' }}
                        size="xl"
                        icon={cilVerticalAlignBottom}
                        onClick={handlePasteTemplate}
                      />
                      <CIcon
                        style={{ cursor: 'pointer', marginLeft: '10px' }}
                        size="xl"
                        icon={cilCopy}
                        onClick={handleCopyTemplate}
                      />

                      <img
                        alt=""
                        src={visible ? zamok2 : zamok}
                        // src={zamok}
                        onClick={() => setVisible(!visible)}
                        style={{
                          cursor: 'pointer',
                          width: '19px',
                          height: '24px',
                          marginLeft: '10px',
                        }}
                      />
                      {/* <img
                        alt=""
                        src={Disketa}
                        style={{
                          cursor: 'pointer',
                          width: '24px',
                          height: '24px',
                          marginLeft: '20px',
                        }}
                      /> */}
                      <input
                        type="image"
                        disabled={!visible}
                        alt=""
                        src={Disketa}
                        style={{
                          cursor: 'pointer',
                          width: '24px',
                          height: '24px',
                          marginLeft: '10px',
                        }}
                      />
                    </div>
                  </CCol>
                </CRow>
                <div
                  style={{
                    display: 'flex',
                    gap: '20px',
                    justifyContent: 'space-between',
                    marginBottom: '22px',
                  }}
                >
                  <div>
                    <div
                      onClick={() => changeTemplateType('contract')}
                      style={{
                        height: '40px',
                        width: '300px',
                        cursor: 'pointer',
                        boxShadow: templateType === 'contract' ? '0 0 0 1px #2684ff' : 'none',
                      }}
                      className="py-2  small uley-data-main"
                    >
                      Договор
                    </div>
                  </div>

                  <div>
                    <div
                      onClick={() => changeTemplateType('invoice')}
                      style={{
                        height: '40px',
                        width: '300px',
                        cursor: 'pointer',
                        boxShadow: templateType === 'invoice' ? '0 0 0 1px #2684ff' : 'none',
                      }}
                      className="py-2 small uley-data-main"
                    >
                      Счёт
                    </div>
                  </div>
                  <div>
                    <div
                      onClick={() => changeTemplateType('act')}
                      style={{
                        height: '40px',
                        width: '300px',
                        cursor: 'pointer',
                        boxShadow: templateType === 'act' ? '0 0 0 1px #2684ff' : 'none',
                      }}
                      className="py-2 small uley-data-main"
                    >
                      Акт
                    </div>
                  </div>
                  <div>
                    <div
                      onClick={() => changeTemplateType('application')}
                      style={{
                        height: '40px',
                        width: '300px',
                        cursor: 'pointer',
                        boxShadow: templateType === 'application' ? '0 0 0 1px #2684ff' : 'none',
                      }}
                      className="py-2  small uley-data-main"
                    >
                      Приложение
                    </div>
                  </div>
                </div>

                <div>
                  {templateType === 'contract' ? (
                    <Contract
                      template={template}
                      visible={visible}
                      handleChangeTemplateNumber={handleChangeTemplateNumber}
                    />
                  ) : (
                    ''
                  )}
                  {templateType === 'invoice' ? (
                    <Invoice
                      template={template}
                      visible={visible}
                      handleChangeTemplateNumber={handleChangeTemplateNumber}
                    />
                  ) : (
                    ''
                  )}
                  {templateType === 'application' ? (
                    <Application
                      template={template}
                      visible={visible}
                      handleChangeTemplateNumber={handleChangeTemplateNumber}
                    />
                  ) : (
                    ''
                  )}
                  {templateType === 'act' ? (
                    <Act
                      template={template}
                      visible={visible}
                      handleChangeTemplateNumber={handleChangeTemplateNumber}
                    />
                  ) : (
                    ''
                  )}
                </div>
              </form>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default DocumentTemplate
