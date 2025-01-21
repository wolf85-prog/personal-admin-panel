/* eslint-disable react/jsx-key */
import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AppContent, AppSidebar, AppFooter, AppHeader } from 'src/components/index'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableFoot,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CContainer,
} from '@coreui/react'

import { useTableData } from './table/useTableData'
import TableHeader from './table/TableHeader'
import Filters from 'src/components/table/Filters'
import FiltersButtom from 'src/views/estimates/table/FiltersButtom'
import { getEstimates } from 'src/services/api/estimate'

const EstimateList = () => {
  const queryClient = useQueryClient()
  const {
    isPending,
    error,
    data: estimates,
  } = useQuery({
    queryKey: ['estimates'],
    queryFn: getEstimates,
  })
  // const { mutate: mutatePaument } = useMutation({
  //   mutationFn: updateRateItem,
  //   onSettled: async () => {
  //     return await queryClient.invalidateQueries({ queryKey: ['estimates'] })
  //   },
  // })

  const { columns, columnFilters, setColumnFilters } = useTableData()

  const table = useReactTable({
    defaultColumn: {
      size: 200, //starting column size
      minSize: 40, //enforced during column resizing
      maxSize: 500, //enforced during column resizing
    },
    data: estimates,
    columns,
    state: {
      columnFilters,
    },
    // meta: {
    //   updateData: (rowIndex, columnId, value) =>
    //     setData((prev) =>
    //       prev.map((row, index) =>
    //         index === rowIndex ? { ...prev[rowIndex], [columnId]: value } : row,
    //       ),
    //     ),
    // },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    // filterFns: {
    //   fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
    // },

    getPaginationRowModel: getPaginationRowModel(),

    enableRowSelection: true,
    getRowCanExpand: () => true,
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
              <div style={{ color: 'hsla(0, 0%, 100%, .75)' }}>Ошибка при загрузке смет</div>
            </CContainer>
          </div>
          <AppFooter />
        </div>
      </div>
    )

  return (
    <div className="dark-theme">
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <CContainer lg>
            {' '}
            <CRow className="mt-2">
              <CCol xs>
                <CCard className="mb-4">
                  {/* <CCardHeader>Сметы</CCardHeader> */}

                  <CCardBody style={{ padding: '16px' }}>
                    <Filters columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
                    <CTable
                      style={{ overflow: 'hidden', borderRadius: '5px' }}
                      align="middle"
                      className="mb-0 border"
                      hover
                      responsive
                    >
                      <CTableHead className="text-center" color="light">
                        {table.getHeaderGroups().map((headerGroup) => {
                          return (
                            <CTableRow key={headerGroup.id}>
                              {headerGroup.headers.map((header) => {
                                return (
                                  <TableHeader
                                    key={header.id}
                                    header={header}
                                    //
                                  />
                                )
                              })}
                            </CTableRow>
                          )
                        })}
                      </CTableHead>
                      <CTableBody>
                        {table.getRowModel().rows.map((row) => {
                          return (
                            <CTableRow key={row.id} className="text-center">
                              {row.getVisibleCells().map((cell) => {
                                return (
                                  <CTableDataCell
                                    key={cell.id}
                                    style={{
                                      height: '30px',
                                      minHeight: '30px',
                                      maxHeight: '30px',
                                      padding: '0',
                                      //   padding: '0.4rem 0.4rem',
                                    }}
                                  >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                  </CTableDataCell>
                                )
                              })}
                            </CTableRow>
                          )
                        })}
                      </CTableBody>
                      {/* <CTableFoot>
                  {table.getFooterGroups().map((footerGroup) => {
                    return (
                      <CTableRow>
                        {footerGroup.headers.map((footer) => {
                          return (
                            <CTableHeaderCell className="text-center">
                              {footer.isPlaceholder
                                ? null
                                : flexRender(footer.column.columnDef.footer, footer.getContext())}
                            </CTableHeaderCell>
                          )
                        })}
                      </CTableRow>
                    )
                  })}
                </CTableFoot> */}
                    </CTable>
                    <FiltersButtom
                      styleClass={'mt-2 justify-content-between'}
                      columnFilters={columnFilters}
                      setColumnFilters={setColumnFilters}
                      estimates={estimates}
                    />
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

export default EstimateList
