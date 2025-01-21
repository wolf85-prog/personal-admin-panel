/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import { CFormCheck } from '@coreui/react'
import { useMemo, useState } from 'react'
import { format, formatDate } from 'src/utils/formater'
import * as dayjs from 'dayjs'

export const useTableData = () => {
  const [columnFilters, setColumnFilters] = useState()
  const columnHelper = createColumnHelper()
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'selection',
        size: 30,
        header: ({ table }) => (
          <CFormCheck
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <CFormCheck checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />
        ),
        // footer: ({ table }) =>
        //   table.getFilteredRowModel().rows.reduce((acc, val) => {
        //     acc += 1
        //     return acc
        //   }, 0),
      }),
      columnHelper.accessor('date', {
        id: 'date',
        header: 'Дата',
        size: 95,
        cell: (value) => dayjs(value.getValue()).format('DD.MM.YYYY'),
      }),
      columnHelper.accessor('project', {
        id: 'project',
        header: 'Проект',
        size: 300,
        minSize: 150,
        cell: (value) => {
          return (
            <Link
              to={'/estimate'}
              state={{ estimateId: value.row.original.id }}
              className="nav-link"
            >
              {value.getValue()}
            </Link>
          )
        },
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      }),
      columnHelper.accessor('company', {
        id: 'company',
        header: 'Компания',
        size: 300,
        minSize: 150,
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      }),

      columnHelper.accessor('manager', {
        id: 'manager',
        header: 'Менеджер',
        size: 300,
        minSize: 150,
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      }),

      columnHelper.accessor('hours', {
        id: 'hours',
        header: 'Часы',
        size: 57,
        // footer: ({ table }) =>
        //   table.getFilteredRowModel().rows.reduce((acc, val) => {
        //     acc += Number(val.getValue('hours'))
        //     return acc
        //   }, 0),
      }),
      columnHelper.accessor('payment', {
        id: 'payment',
        header: 'Цена',
        size: 100,
        cell: (value) => format(value.getValue()),
        // footer: ({ table }) =>
        //   format(
        //     table.getFilteredRowModel().rows.reduce((acc, val) => {
        //       acc += Number(val.getValue('payment'))
        //       return acc
        //     }, 0),
        //   ),
      }),
      columnHelper.accessor('status', {
        id: 'status',
        header: 'Статус',
        size: 50,
        // cell: StatusCell,
        cell: (value) => {
          const { icon } = value.getValue() || {}

          return icon
        },
      }),
    ],
    [],
  )

  return { columns, columnFilters, setColumnFilters }
}
