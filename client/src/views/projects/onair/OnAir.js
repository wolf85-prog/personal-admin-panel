/* eslint-disable react/jsx-key */
import React from 'react'
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
import Projects from './Projects'


const OnAir = () => {
  const {
    columns,
    data,
    setData,
    columnFilters,
    setColumnFilters,
    setProjectFilter,
    projectFilter,
    handleChangeProject,
  } = useTableData()

  const table = useReactTable({
    defaultColumn: {
      size: 200, //starting column size
      minSize: 40, //enforced during column resizing
      maxSize: 500, //enforced during column resizing
    },
    data,
    columns,
    state: {
      columnFilters,
    },
    meta: {
      updateData: (rowIndex, columnId, value) =>
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex ? { ...prev[rowIndex], [columnId]: value } : row,
          ),
        ),
    },
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

  return (
    <div className="dark-theme">
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <CContainer lg>
            <CRow className="mt-2">
        <CCol xs>
          <CCard className="mb-4">
            {/* <CCardHeader>Сметы</CCardHeader> */}

            <CCardBody style={{ padding: '16px' }}>
              {/* <Filters columnFilters={columnFilters} setColumnFilters={setColumnFilters} /> */}
              <Projects
                styleClass={'mb-3 justify-content-between'}
                setProjectFilter={handleChangeProject}
                projectFilter={projectFilter}
              />
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
                      <CTableRow className="text-center">
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <CTableDataCell
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
              </CTable>
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

export default OnAir
