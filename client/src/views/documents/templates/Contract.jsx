import React from 'react'

// Import styles
import '@react-pdf-viewer/zoom/lib/styles/index.css'

// Import styles
import '@react-pdf-viewer/full-screen/lib/styles/index.css'

// Plugins
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

import { CCol, CRow } from '@coreui/react'

import Select from 'react-select'

const templateTypeList = [
  { value: 1, label: '№ 1' },
  { value: 2, label: '№ 2' },
  { value: 3, label: '№ 3' },
  { value: 4, label: '№ 4' },
  { value: 5, label: '№ 5' },
]

function Documnet({ template, visible, handleChangeTemplateNumber }) {
  return (
    <>
      {' '}
      <CRow>
        <CCol lg={12}>
          <div
            style={{
              display: 'flex',
              // justifyContent: 'space-between',
              gap: '23px',
              marginBottom: '22px',
            }}
          >
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{}} className="">
                <div className="text-medium-emphasis small text-center">Дата</div>
                {visible ? (
                  <input
                    disabled
                    name="contract_star_date"
                    style={{ height: '40px', width: '140px' }}
                    className="py-2 uley-data-main"
                    placeholder="-"
                  />
                ) : (
                  <div style={{ height: '40px', width: '140px' }} className="py-2 uley-data-main">
                    {/* {template.items.contract_star_date.text} */}-
                  </div>
                )}
              </div>
              <div className="">
                <div className="text-medium-emphasis small text-center">Номер</div>
                {visible ? (
                  <input
                    name="contract_number"
                    style={{ height: '40px', width: '140px' }}
                    className="py-2 uley-data-main"
                    placeholder="-"
                  />
                ) : (
                  <div style={{ height: '40px', width: '140px' }} className="py-2 uley-data-main">
                    {/* {template.items.contract_number.text} */}-
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '20px' }}>
              <div className="">
                <div className="text-medium-emphasis small text-center">Начало</div>
                {visible ? (
                  <input
                    disabled
                    name="contract_star_date"
                    style={{ height: '40px', width: '140px' }}
                    className="py-2 uley-data-main"
                    placeholder="-"
                  />
                ) : (
                  <div style={{ height: '40px', width: '140px' }} className="py-2 uley-data-main">
                    {/* {template.items.contract_star_date.text} */}-
                  </div>
                )}
                {/* <div
                            style={{ height: '40px', width: '140px' }}
                            className="py-2 uley-data-main"
                          >
                            {template.items.contract_star_date.text}
                          </div> */}
              </div>
              <div className="">
                <div className="text-medium-emphasis small text-center">Окончание</div>
                {visible ? (
                  <input
                    disabled
                    name="contract_end_date"
                    style={{ height: '40px', width: '140px' }}
                    className="py-2 uley-data-main"
                    placeholder="-"
                  />
                ) : (
                  <div style={{ height: '40px', width: '140px' }} className="py-2 uley-data-main">
                    {/* {template.items.contract_end_date.text} */}-
                  </div>
                )}
                {/* <div
                            style={{ height: '40px', width: '140px' }}
                            className="py-2 uley-data-main"
                          >
                            {template.items.contract_end_date.text}
                          </div> */}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div className="">
                <div className="text-medium-emphasis small text-center">Сумма</div>
                {visible ? (
                  <input
                    disabled
                    name="contract_total_amount"
                    style={{ height: '40px', width: '300px' }}
                    className="uley-data-main"
                    placeholder="-"
                  />
                ) : (
                  <div style={{ height: '40px', width: '300px' }} className="py-2 uley-data-main">
                    {/* {template.items.contract_total_amount.text} */}-
                  </div>
                )}
                {/* <div
                            style={{ height: '40px', width: '300px' }}
                            className="py-2 uley-data-main"
                          >
                            {template.items.contract_total_amount.text}
                          </div> */}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '40px' }}>
              <div style={{ display: 'flex', gap: '40px', marginTop: '18px' }}>
                <div style={{ height: '40px', width: '40px' }} className="py-2 uley-data-main">
                  -
                </div>
                <div style={{ height: '40px', width: '40px' }} className="py-2 uley-data-main">
                  -
                </div>
              </div>
              <div className="">
                <div className="text-medium-emphasis small text-center">Шаблон</div>
                <Select
                  options={templateTypeList}
                  onChange={handleChangeTemplateNumber}
                  defaultValue={templateTypeList[0]}
                  // defaultValue={{ label: 'Выбрать', value: 0 }}
                  name="contractId"
                  noOptionsMessage={() => 'Нет шаблонов'}
                  // placeholder={'Выбрать...'}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,

                      backgroundColor: 'transparent',
                      border: '1px solid hsla(0, 0%, 100%, 0.09)',
                      borderRadius: '0.375rem',
                      width: '140px',
                      height: '40px',
                    }),
                    menu: (baseStyles, state) => ({
                      ...baseStyles,

                      backgroundColor: '#1f282c',
                      margin: 'auto',
                      width: '140px',
                    }),
                    menuList: (baseStyles, state) => ({
                      ...baseStyles,

                      backgroundColor: '#1f282c',
                      textAlign: 'center',
                      width: '140px',
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
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <div>
            <div className="text-medium-emphasis small text-center">Шапка</div>
            {visible ? (
              <textarea
                name="contract_title"
                style={{ height: '150px', width: '100%' }}
                className="py-2 uley-data-main text-start"
                placeholder={template.items.contract_title.text}
              />
            ) : (
              <div
                style={{ height: '150px', width: '100%' }}
                className="py-2 uley-data-main text-start"
              >
                {template.items.contract_title.text}
              </div>
            )}
            {/* <div style={{ height: '150px' }} className="py-2 uley-data-main text-start">
                        {template.items.contract_title.text}
                      </div> */}
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <div style={{ marginTop: '18px' }}>
            <div className="text-medium-emphasis small text-center">1. Предмет договора</div>
            {visible ? (
              <textarea
                name="contract_subject"
                style={{ height: '150px', width: '100%' }}
                className="py-2 uley-data-main text-start"
                placeholder={template.items.contract_subject.text}
              />
            ) : (
              <div
                style={{ height: '150px', width: '100%' }}
                className="py-2 uley-data-main text-start"
              >
                {/* {startDate.value ? startDate : template.items.contract_star_date.text} */}
                {template.items.contract_subject.text}
              </div>
            )}
            {/* <div style={{ height: '150px' }} className="py-2 uley-data-main text-start">
                        {template.items.contract_subject.text}
                      </div> */}
          </div>
        </CCol>
      </CRow>
    </>
  )
}

export default Documnet
