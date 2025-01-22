/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom'
import { createColumnHelper } from '@tanstack/react-table'
import { CFormCheck, CModal,CModalBody } from '@coreui/react'
import { useMemo, useState, useEffect } from 'react'
import { format, formatPhoneNumber, formatDate, formatDocumentStatus } from 'src/utils/formater'
import { ReactComponent as RobotSvg } from './robot.svg'
import { ReactComponent as CheckSvgGreen } from './check-mark.svg'
import { ReactComponent as CheckSvgRed } from './check-mark-red.svg'
import { ReactComponent as PhoneSvg } from './telephone.svg'
import onairStatuses from '../data'

export const useTableData = () => {
  const [data, setData] = useState(onairStatuses.filter((pItem) => pItem.project_id === 1))
  const [projectFilter, setProjectFilter] = useState(1)
  const [columnFilters, setColumnFilters] = useState()
  const [showModalEmpty, setShowModalEmpty] = useState(false)
  const columnHelper = createColumnHelper()

  const handleChangeProject = (projectId) => {
    setProjectFilter(projectId)
    const newData = onairStatuses.filter((pItem) => pItem.project_id === projectId)
    setData(newData)
  }

  const [showIcon, setshowIcon] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setshowIcon(!showIcon)
    }, 3000)
  }, [showIcon, columnHelper])

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'numbering',
        header: '№',
        size: 10,
        minSize: 10,
        maxSize: 10,
        cell: ({ row }) => {
          return row.index + 1
        },
      }),
      // columnHelper.accessor('statuses', {
      //   id: 'statuses',
      //   header: 'Статус',
      //   size: 80,
      //   minSize: 80,
      //   maxSize: 80,
      //   // cell: (cell) => {
      //   //   const { value, icon } = cell.getValue() || {}
      //   //   return value
      //   // },
      // }),

      columnHelper.accessor('specialist', {
        id: 'specialist',
        header: 'Специалист',
        size: 220,
        minSize: 220,
        maxSize: 220,
        cell: (value) => {
          return (
            <p
              style={{
                textAlign: 'left',
                margin: 'auto 0 auto 10px',
                // marginRight: '5px',
              }}
            >
              {value.getValue().length > 25
                ? `${value.getValue().substring(0, 25)}...`
                : value.getValue()}
            </p>
          )
        },
      }),
      columnHelper.accessor('start24', {
        id: 'start24',
        header: '24',
        size: 80,
        minSize: 80,
        maxSize: 80,
        cell: (cell) => {
          let { value, icon, status } = cell.getValue() || {}
          if (status === 'done') {
            icon = <CheckSvgGreen />
          } else if (status === 'none') {
            icon = '❌'
          } else if (status === 'late') {
            icon = <CheckSvgRed />
          }
          return showIcon ? value : icon
        },
      }),
      columnHelper.accessor('start120', {
        id: 'start120',
        header: '120',
        size: 80,
        minSize: 80,
        maxSize: 80,
        cell: (cell) => {
          let { value, icon, status } = cell.getValue() || {}
          if (status === 'done') {
            icon = <CheckSvgGreen />
          } else if (status === 'none') {
            icon = '❌'
          } else if (status === 'late') {
            icon = <CheckSvgRed />
          }
          return showIcon ? value : icon
        },
      }),
      columnHelper.accessor('drive', {
        id: 'drive',
        header: 'В пути',
        size: 80,
        minSize: 80,
        maxSize: 80,
        cell: (cell) => {
          let { value, icon, status } = cell.getValue() || {}
          if (status === 'done') {
            icon = <CheckSvgGreen />
          } else if (status === 'none') {
            icon = '❌'
          } else if (status === 'late') {
            icon = <CheckSvgRed />
          }
          return showIcon ? value : icon
        },
      }),
      columnHelper.accessor('spot', {
        id: 'spot',
        header: 'На месте',
        size: 80,
        minSize: 80,
        maxSize: 80,
        cell: (cell) => {
          let { value, icon, status } = cell.getValue() || {}
          if (status === 'done') {
            icon = <CheckSvgGreen />
          } else if (status === 'none') {
            icon = '❌'
          } else if (status === 'late') {
            icon = <CheckSvgRed />
          }
          return showIcon ? value : icon
        },
      }),
      columnHelper.accessor('start', {
        id: 'start',
        header: 'Старт',
        size: 80,
        minSize: 80,
        maxSize: 80,
        cell: (cell) => {
          let { value, icon, status } = cell.getValue() || {}
          if (status === 'done') {
            icon = <CheckSvgGreen />
          } else if (status === 'none') {
            icon = '❌'
          } else if (status === 'late') {
            icon = <CheckSvgRed />
          }
          return showIcon ? value : icon
        },
      }),
      columnHelper.accessor('finish', {
        id: 'finish',
        header: 'Стоп',
        size: 80,
        minSize: 80,
        maxSize: 80,
        cell: (cell) => {
          let { value, icon, status } = cell.getValue() || {}
          if (status === 'done') {
            icon = <CheckSvgGreen />
          } else if (status === 'none') {
            icon = '❌'
          } else if (status === 'late') {
            icon = <CheckSvgRed />
          }
          return showIcon ? value : icon
        },
      }),
      columnHelper.display({
        id: 'actions',
        // header: 'Действия',
        size: 50,
        minSize: 50,
        maxSize: 50,
        cell: ({ row }) => {
          return (
            <>
              <CModal
                alignment="center"
                visible={showModalEmpty}
                onClose={() => setShowModalEmpty(false)}
                aria-labelledby="VerticallyCenteredExample"
              >
                <CModalBody
                  style={{
                    height: '100px',
                    textAlign: 'center',
                    fontSize: '18px',
                    paddingTop: '15px',
                  }}
                >
                   Функция не доступна по данному тарифу
                </CModalBody>
              </CModal>
              <div style={{display: 'inline-block'}} onClick={()=> setShowModalEmpty(true)}><PhoneSvg style={{ cursor: 'pointer', marginRight: '5px' }} /></div>
              <div style={{display: 'inline-block'}} onClick={()=> setShowModalEmpty(true)}><RobotSvg style={{ cursor: 'pointer' }} /></div>
            </>
          )
        },
      }),
      columnHelper.accessor('comment', {
        id: 'comment',
        header: 'Комментарий',
        size: 250,
        minSize: 250,
        maxSize: 250,
      }),
    ],
    [showIcon, columnHelper],
  )

  return {
    columns,
    data,
    setData,
    columnFilters,
    setColumnFilters,
    setProjectFilter,
    projectFilter,
    handleChangeProject,
  }
}
