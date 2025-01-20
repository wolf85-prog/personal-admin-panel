/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import { CFormCheck, CTableDataCell } from '@coreui/react'
import { useMemo, useState } from 'react'
import { format } from '../../../utils'
import * as dayjs from 'dayjs'
import estimates from '../data'
import MenuIcon2, { MenuIcon } from 'src/components/table/MenuIcon2'

export const useTableData = () => {
  const [data, setData] = useState(estimates)
  const [columnFilters, setColumnFilters] = useState()
  const [active, setActive] = useState(false)
  const columnHelper = createColumnHelper()

  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false)

  function handleActive() {
    setActive(!active)
  }

  function calculateIndent(paymentStr) {
    let paymentIndentation = 0
    if (paymentStr.length === 10) {
      paymentIndentation = -24
    } else if (paymentStr.length === 9) {
      paymentIndentation = -32
    } else if (paymentStr.length === 8) {
      paymentIndentation = -41
    }
    return paymentIndentation
  }

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'numbering',
        header: '№',
        size: 20,
        minSize: 10,
        maxSize: 30,

        cell: ({ row }) => {
          return (
            <CTableDataCell
              style={{
                height: '30px',
                minHeight: '30px',
                maxHeight: '30px',
                padding: '0',
              }}
            >
              {row.index + 1}
            </CTableDataCell>
          )
        },
      }),

      columnHelper.accessor('company', {
        id: 'company',
        header: 'Компания ',
        size: 150,
        minSize: 150,
        maxSize: 150,
        cell: (value) => {
          return (
            <CTableDataCell
              style={{
                height: '30px',
                minHeight: '30px',
                maxHeight: '30px',
                padding: '0',
                textAlign: 'left',
              }}
            >
              {value.getValue()}
            </CTableDataCell>
          )
        },
      }),

      columnHelper.accessor('estimate', {
        id: 'estimate',
        // header: 'Счёт',
        header: (value) => {
          return (
            <>
              <div
                style={{ color: showAdditionalInfo ? '#2684ff' : '' }}
                onMouseEnter={() => setShowAdditionalInfo(true)}
                onMouseLeave={() => setShowAdditionalInfo(false)}
              >
                Счёт
              </div>
              {showAdditionalInfo ? (
                <div
                  style={{
                    position: 'absolute',
                    zIndex: 1000,
                    padding: '0.5rem',
                    top: 0,
                    left: -150,
                    backgroundColor: '#41484c',
                    boxShadow: 'inset 0 0 0 1px #2684ff',
                    borderRadius: '5px',
                    backgroundColor: '#2b3338',
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '180px',
                  }}
                >
                  <div className="table-light">Смета</div>
                  <div className="table-light">Комиссия</div>
                </div>
              ) : (
                ''
              )}
            </>
          )
        },

        size: 80,
        minSize: 80,
        cell: (value) => {
          const { payment, status } = value.getValue() || {}
          const { original } = value.table.getRow(value.row.id) || {}
          const invoicePay = original.invoicePayment
          const commisionDop = original.commision
          const indentcommis = calculateIndent(format(commisionDop))
          const indentinvoice = calculateIndent(format(invoicePay))

          let txtColor = ''

          if (status === 'notpaid') {
            txtColor = '#f9c914'
          }
          if (status === 'paid') {
            txtColor = '#FFFFFF'
          }
          return (
            <>
              <CTableDataCell
                style={{
                  height: '30px',
                  minHeight: '30px',
                  maxHeight: '30px',
                  padding: '0',
                  position: 'relative',
                }}
              >
                <div style={{ color: txtColor }}>{format(payment)}</div>
                {showAdditionalInfo ? (
                  <div
                    style={{
                      position: 'absolute',
                      zIndex: 1000,
                      // padding: '1px',
                      top: 2,
                      left: -145,
                      backgroundColor: '#161723',
                      // boxShadow: 'inset 0 0 0 1px #2684ff',
                      // borderRadius: '5px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      // width: '170px',
                    }}
                  >
                    {/* <CTableDataCell className="text-center">{format(invoicePay)}</CTableDataCell>
                    <CTableDataCell className="text-center">{format(commisionDop)}</CTableDataCell> */}
                    <div style={{ padding: '0 2px 0 2px' }}>{format(invoicePay)}</div>
                    <div style={{ padding: '0 2px 0 2px' }}>{format(commisionDop)}</div>
                  </div>
                ) : (
                  ''
                )}
              </CTableDataCell>
            </>
          )
        },
      }),

      columnHelper.accessor('payStatus', {
        id: 'payStatus',
        header: 'Оплата',
        size: 80,
        minSize: 80,
        cell: (cell) => {
          const { value, color, icon } = cell.getValue() || {}

          return (
            <CTableDataCell
              style={{
                height: '30px',
                minHeight: '30px',
                maxHeight: '30px',
                padding: '0',
              }}
            >
              <p
                style={{
                  // color: color,
                  margin: 'auto',
                  textAlign: 'center',
                  // fontWeight: 'bold',
                }}
              >
                {icon}
              </p>
            </CTableDataCell>
          )
        },
      }),
      columnHelper.accessor('contractStatus', {
        id: 'contractStatus',
        header: 'Договор',
        size: 80,
        minSize: 80,
        cell: (cell) => {
          const { value, color, icon } = cell.getValue() || {}

          return (
            <CTableDataCell
              style={{
                height: '30px',
                minHeight: '30px',
                maxHeight: '30px',
                padding: '0',
              }}
            >
              <p
                style={{
                  // color: color,
                  margin: 'auto',
                  textAlign: 'center',
                  // fontWeight: 'bold',
                }}
              >
                {icon}
              </p>
            </CTableDataCell>
          )
        },
      }),

      columnHelper.accessor('documents', {
        id: 'documents',
        header: 'Документы',
        size: 80,
        minSize: 80,
        cell: (value) => {
          return (
            <CTableDataCell
              style={{
                height: '30px',
                minHeight: '30px',
                maxHeight: '30px',
                padding: '0',
              }}
            >
              {value.getValue()}
            </CTableDataCell>
          )
        },
      }),
      columnHelper.accessor('documentSignature', {
        id: 'documentSignature ',
        header: 'Дата',
        size: 120,
        minSize: 120,
        cell: (value) => {
          return (
            <CTableDataCell
              style={{
                height: '30px',
                minHeight: '30px',
                maxHeight: '30px',
                padding: '0',
              }}
            >
              {value.getValue()}
            </CTableDataCell>
          )
        },
      }),
      columnHelper.accessor('comment', {
        id: 'comment',
        header: 'Комментарий',
        size: 150,
        minSize: 150,
        cell: (value) => {
          return (
            <CTableDataCell
              style={{
                height: '30px',
                minHeight: '30px',
                maxHeight: '30px',
                padding: '0',
              }}
            >
              {value.getValue()}
            </CTableDataCell>
          )
        },
      }),
    ],
    [active, columnHelper],
  )

  return { columns, data, setData, columnFilters, setColumnFilters, handleActive }
}
