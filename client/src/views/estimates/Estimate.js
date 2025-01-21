import React, { useState } from 'react'
// import { format } from '../../utils'
import { AppContent, AppSidebar, AppFooter, AppHeader } from 'src/components/index'
import { format } from 'src/utils/formater'
import { Link, useLocation } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  CCol,
  CProgress,
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCollapse,
  CTableFoot,
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
import MenuIcon2, { MenuIcon } from 'src/components/table/MenuIcon2'
import { getEstimates, getEstimate, getEstimateJobs } from 'src/services/api/estimate'
import { useTableEstimateJobs } from './table/useTableEstimateJobs'
import dayjs from 'dayjs'
import TableHeader from './table/TableHeader'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

const Estimate = () => {
  const queryClient = useQueryClient()
  const {
    jobsColumns,
    estimateJobs,
    estimate,
    jobsColumnFilters,
    setJobsColumnFilters,
    isPendingEstimate,
    isPendingJobs,
    errorJobs,
    estimateError,
    updateJob,
  } = useTableEstimateJobs()

  const jobsTable = useReactTable({
    defaultColumn: {
      size: 200, //starting column size
      minSize: 40, //enforced during column resizing
      maxSize: 500, //enforced during column resizing
    },
    data: estimateJobs,
    columns: jobsColumns,
    state: {
      jobsColumnFilters,
    },
    // initialState: {
    //   columnPinning: {
    //     left: ['date'],
    //     // right: ['actions-column'],
    //   },
    // },
    // meta: {
    //   updateData: (rowIndex, columnId, value) =>
    //     setOfficeData((prev) =>
    //       prev.map((row, index) =>
    //         index === rowIndex ? { ...prev[rowIndex], [columnId]: value } : row,
    //       ),
    //     ),
    // },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setJobsColumnFilters,
    // filterFns: {
    //   fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
    // },

    // getPaginationRowModel: getPaginationRowModel(),

    enableRowSelection: true,
    getRowCanExpand: () => true,
    meta: {
      updateData: (job) => {
        updateJob.mutate(job, {
          onSettled() {
            queryClient.invalidateQueries('estimateJobs', 'estimate')
          },
        })
      },
    },
  })

  const [isHovered, setIsHovered] = useState(null)
  if (isPendingEstimate) return <div style={{ color: 'hsla(0, 0%, 100%, .75)' }}>Загрузка...</div>
  if (isPendingJobs) return <div style={{ color: 'hsla(0, 0%, 100%, .75)' }}>Загрузка...</div>

  if (estimateError)
    return <div style={{ color: 'hsla(0, 0%, 100%, .75)' }}>Ошибка при загрузке смет</div>
  if (errorJobs)
    return <div style={{ color: 'hsla(0, 0%, 100%, .75)' }}>Ошибка при загрузке смет</div>

  return (
    <div className="dark-theme">
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer lg><>      
      <CRow>
        <CCol xs>
          <CCard className="mb-1">
            <CCardBody>
              <CRow>
                <CCol>
                  <CRow className="mb-3">
                    <CCol sm={3}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Link to={'/estimate_all'} className="nav-link">
                          <div
                            style={{ height: '40px', width: '40px', cursor: 'pointer' }}
                            className="py-2  small uley-data-main"
                          >
                            <CIcon icon={cilArrowLeft} />
                          </div>
                        </Link>
                        <div
                          style={{ height: '40px', width: '250px' }}
                          className="py-2  small uley-data-main"
                        >
                          {dayjs(estimate.project.projectDate).format('DD.MM.YYYY')}
                        </div>
                      </div>
                    </CCol>

                    <CCol sm={3}>
                      <div>
                        <div style={{ height: '40px' }} className="py-2  small uley-data-main">
                          {estimate.project.projectName}
                        </div>
                      </div>
                    </CCol>
                    <CCol sm={3}>
                      <div>
                        <div style={{ height: '40px' }} className="py-2  small uley-data-main">
                          {estimate.project.company}
                        </div>
                      </div>
                    </CCol>

                    <CCol sm={3}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div
                          style={{ height: '40px', width: '250px' }}
                          className="py-2  small uley-data-main"
                        >
                          {estimate.project.manager}
                        </div>
                        <div
                          style={{ height: '40px', width: '40px', cursor: 'pointer' }}
                          className="py-2  small uley-data-main"
                        >
                          <CIcon icon={cilArrowRight} />
                        </div>
                      </div>
                    </CCol>
                  </CRow>

                  <CRow className="mb-3">
                    <CCol sm={3}>
                      <div className="py-1">
                        <div className="text-medium-emphasis small text-center">Специфика</div>
                        <div style={{ height: '40px' }} className="py-2 uley-data-main">
                          {estimate.project.specificity}
                        </div>
                      </div>
                    </CCol>
                    <CCol sm={3}>
                      <div className="py-1">
                        <div className="text-medium-emphasis small text-center">Статус</div>
                        <div style={{ height: '40px' }} className="py-2 small uley-data-main">
                          {estimate.project.status}
                        </div>
                      </div>
                    </CCol>
                    <CCol sm={3}>
                      <div className="py-1">
                        <div className="text-medium-emphasis small text-center">
                          Предварительная смета
                        </div>
                        <div style={{ height: '40px' }} className=" py-2 uley-data-main">
                          {estimate.status}
                        </div>
                      </div>
                    </CCol>
                    <CCol sm={3}>
                      <div className="py-1">
                        <div className="text-medium-emphasis small text-center">
                          Финальная смета
                        </div>
                        <div style={{ height: '40px' }} className="py-2 bg-warning uley-data-main">
                          Смета готова к отправке
                        </div>
                      </div>
                    </CCol>
                  </CRow>

                  <CRow className="mb-3">
                    <CCol sm={3}>
                      <CRow>
                        <CCol>
                          <div className="py-1">
                            <div className="text-medium-emphasis small text-center">Цена</div>
                            <div style={{ height: '40px' }} className="py-2  uley-data-main">
                              {format(estimate.price)}
                            </div>
                          </div>
                        </CCol>

                        <CCol>
                          <div className="py-1">
                            <div className="text-medium-emphasis small text-center">Часы</div>
                            <div style={{ height: '40px' }} className="py-2  uley-data-main">
                              {estimate.hours}
                            </div>
                          </div>
                        </CCol>
                      </CRow>
                    </CCol>

                    <CCol lg={3}>
                      <CRow>
                        <CCol>
                          <div className="py-1">
                            <div className="text-medium-emphasis small text-center">Комиссия</div>
                            <div style={{ height: '40px' }} className="py-2  uley-data-main">
                              {format(estimate.commission_price)}
                            </div>
                          </div>
                        </CCol>
                        <CCol>
                          <div className="py-1">
                            <div className="text-medium-emphasis small text-center">Итого</div>
                            <div style={{ height: '40px' }} className="py-2  uley-data-main">
                              {format(estimate.total_price)}
                            </div>
                          </div>
                        </CCol>
                      </CRow>
                    </CCol>

                    <CCol lg={3}>
                      <CRow>
                        <CCol>
                          <div className="py-1">
                            <div className="text-medium-emphasis small text-center">
                              Такси / ГСМ
                            </div>
                            <div style={{ height: '40px' }} className="py-2 uley-data-main">
                              {format(estimate.taxi_price)}
                            </div>
                          </div>
                        </CCol>

                        <CCol>
                          <div className="py-1">
                            <div className="text-medium-emphasis small text-center">
                              Общ. транспорт
                            </div>
                            <div style={{ height: '40px' }} className="py-2  uley-data-main">
                              {format(estimate.transport_price)}
                            </div>
                          </div>
                        </CCol>
                      </CRow>
                    </CCol>
                    <CCol lg={3}>
                      <CRow>
                        <CCol>
                          <div className="py-1">
                            <div className="text-medium-emphasis small text-center">Опоздание</div>
                            <div style={{ height: '40px' }} className="py-2 uley-data-main">
                              5
                            </div>
                          </div>
                        </CCol>
                        <CCol>
                          <div className="py-1">
                            <div className="text-medium-emphasis small text-center">Невыход</div>
                            <div style={{ height: '40px' }} className="py-2  uley-data-main">
                              5
                            </div>
                          </div>
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>

                  <CRow className="mb-2">
                    <CCol sm={6}>
                      <div className="py-1">
                        <div className="text-medium-emphasis small text-center">Комтеги</div>
                        <div
                          style={{
                            height: '90px',
                            textAlign: 'center',
                            padding: '5px',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                          className="uley-data-main"
                        >
                          <ul style={{ listStyleType: 'none' }}>
                            {estimate.tags.map((item, index) => (
                              <li key={index} className="uley-li">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="py-1">
                        <div className="text-medium-emphasis small text-center">Комментарий</div>
                        <div
                          style={{ height: '90px', textAlign: 'left', padding: '5px' }}
                          className=" uley-data-main"
                        >
                          {estimate.comments}
                        </div>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow className="mt-2">
        <CCol xs>
          <CCard className="mb-1">
            <CCardBody>
              <CTable
                style={{ overflow: 'hidden', borderRadius: '5px' }}
                align="middle"
                className="mb-0 border"
                hover
                responsive
                small
              >
                <CTable
                  style={{
                    overflow: 'hidden',
                    width: '1262px',
                    marginTop: '10px',
                    borderRadius: '5px',
                  }}
                  align="middle"
                  className="mb-0 border"
                  hover
                  responsive
                >
                  <CTableHead className="text-center" color="light">
                    {jobsTable.getHeaderGroups().map((headerGroup) => {
                      return (
                        <CTableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => {
                            return <TableHeader key={header.id} header={header} />
                          })}
                        </CTableRow>
                      )
                    })}
                  </CTableHead>
                  <CTableBody>
                    {jobsTable.getRowModel().rows.map((row) => {
                      return (
                        <CTableRow
                          key={row.index}
                          // onMouseEnter={officeHandleActive}
                          // onMouseLeave={officeHandleActive}
                          className="text-center"
                        >
                          {row.getVisibleCells().map((cell) => {
                            return (
                              // <CTableDataCell
                              //   style={{
                              //     height: '30px',
                              //     minHeight: '30px',
                              //     maxHeight: '30px',
                              //     padding: '0',
                              //     //   padding: '0.4rem 0.4rem',
                              //   }}
                              // >
                              flexRender(cell.column.columnDef.cell, cell.getContext())
                              // </CTableDataCell>
                            )
                          })}
                        </CTableRow>
                      )
                    })}
                  </CTableBody>
                  <CTableFoot>
                    {jobsTable.getFooterGroups().map((footerGroup) => {
                      return (
                        <CTableRow key={footerGroup.index}>
                          {footerGroup.headers.map((footer) => {
                            return (
                              <CTableHeaderCell key={footer.index} className="text-center">
                                {footer.isPlaceholder
                                  ? null
                                  : flexRender(footer.column.columnDef.footer, footer.getContext())}
                              </CTableHeaderCell>
                            )
                          })}
                        </CTableRow>
                      )
                    })}
                  </CTableFoot>
                </CTable>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </></CContainer>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Estimate
