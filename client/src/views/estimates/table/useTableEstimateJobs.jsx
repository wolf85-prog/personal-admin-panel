/* eslint-disable react/react-in-jsx-scope */
import { Link, useLocation } from 'react-router-dom'
import dayjs from 'dayjs'
import { createColumnHelper } from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { format, formatDate } from 'src/utils/formater'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
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
import {
  getEstimates,
  getEstimate,
  getEstimateJobs,
  updateEstimateJob,
} from 'src/services/api/estimate'

import { getSpecialities } from 'src/services/api/speciality'
import {
  CDropdown,
  CTableDataCell,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from '@coreui/react'
import { DateCell2 } from 'src/components/table/DateCell2'
import { MoneyCell } from 'src/components/table/MoneyCell'
import { SpecialityCell } from 'src/components/table/SpecialityCell'

export const useTableEstimateJobs = () => {
  let { state } = useLocation()

  const {
    isPending: isPendingEstimate,
    error: estimateError,
    data: estimate,
  } = useQuery({
    queryKey: ['estimate'],
    queryFn: () => getEstimate(state.estimateId),
  })

  const {
    isPending: isPendingJobs,
    error: errorJobs,
    data: estimateJobs,
  } = useQuery({
    queryKey: ['estimateJobs'],
    queryFn: () => getEstimateJobs(state.estimateId),
  })

  const {
    isPending: isPendingSpeciality,
    error: errorSpeciality,
    data: specialityList,
  } = useQuery({
    queryKey: ['speciality_list'],
    queryFn: getSpecialities,
  })

  const updateJob = useMutation({
    mutationFn: updateEstimateJob,
  })

  // const [estimateJobs, setOfficeData] = useState(estimateJobs)
  const [jobsColumnFilters, setJobsColumnFilters] = useState()

  const columnHelper = createColumnHelper()
  const [statusEditing, setstatusEditing] = useState('')

  const jobsColumns = useMemo(
    () => [
      columnHelper.accessor('checkStatus', {
        id: 'checkStatus',
        header: '',
        size: 20,
        minSize: 20,

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
              {/* <CIcon
                style={{ '--ci-primary-color': value.getValue() === 'Yes' ? 'green' : 'red' }}
                icon={value.getValue() === 'Yes' ? cilCheckAlt : cilX}
                size="lg"
              /> */}
              {value.getValue() === 'Yes' ? (
                <CIcon style={{ '--ci-primary-color': 'green' }} icon={cilCheckAlt} size="lg" />
              ) : (
                ''
              )}
            </CTableDataCell>
          )
        },
      }),

      columnHelper.accessor('date', {
        id: 'date',
        header: 'Дата',
        size: 80,
        minSize: 80,
        maxSize: 80,
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
              {dayjs(value.getValue()).format('DD.MM.YYYY')}
            </CTableDataCell>
          )
        },
      }),
      columnHelper.accessor('fio', {
        id: 'fio',
        header: 'ФИО',
        size: 230,
        minSize: 230,
        maxSize: 230,
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
              {/* <Link to={'/estimates/estimate'} className="nav-link"> */}
              <p
                style={{
                  textAlign: 'left',
                  margin: 'auto 0 auto 20px',
                  // marginRight: '5px',
                }}
              >
                {value.getValue().length > 25
                  ? `${value.getValue().substring(0, 25)}...`
                  : value.getValue()}
              </p>
              {/* </Link> */}
            </CTableDataCell>
          )
        },
      }),

      columnHelper.accessor('speciality', {
        id: 'speciality',
        header: 'Специальность',
        size: 250,
        minSize: 250,
        cell: (props) => <SpecialityCell props={props} specialityList={specialityList} />,
        // cell: SpecialityCell,

        // cell: (value) => {
        //   return (
        //     <CTableDataCell
        //       style={{
        //         height: '30px',
        //         minHeight: '30px',
        //         maxHeight: '30px',
        //         padding: '0',
        //       }}
        //     >
        //       {value.getValue()}
        //     </CTableDataCell>
        //   )
        // },

        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      }),
      columnHelper.accessor('jobKind', {
        id: 'jobKind',
        header: 'Вид работ',
        size: 100,
        minSize: 100,

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

        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      }),
      columnHelper.accessor('start', {
        id: 'start',
        header: 'Старт',
        size: 100,
        minSize: 100,
        // maxSize: 120,
        cell: DateCell2,

        // cell: (value) => {
        //   return (
        //     <CTableDataCell
        //       style={{
        //         height: '30px',
        //         minHeight: '30px',
        //         maxHeight: '30px',
        //         padding: '0',
        //       }}
        //     >
        //       {dayjs(value.getValue()).format('HH:mm')}
        //     </CTableDataCell>
        //   )
        // },

        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      }),
      columnHelper.accessor('stop', {
        id: 'stop',
        header: 'Стоп',
        size: 100,
        minSize: 100,

        cell: DateCell2,
        // cell: (value) => {
        //   return (
        //     <CTableDataCell
        //       style={{
        //         height: '30px',
        //         minHeight: '30px',
        //         maxHeight: '30px',
        //         padding: '0',
        //       }}
        //     >
        //       {dayjs(value.getValue()).format('HH:mm')}
        //     </CTableDataCell>
        //   )
        // },

        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      }),
      columnHelper.accessor('hours', {
        id: 'hours',
        header: 'Часы',
        size: 100,
        minSize: 100,

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

        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      }),
      columnHelper.accessor('hourPayment', {
        id: 'hourPayment',
        header: 'Ставка',
        size: 100,
        minSize: 100,
        // cell: DateCell2,

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
              {format(value.getValue())}
            </CTableDataCell>
          )
        },

        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      }),
      columnHelper.accessor('payment', {
        id: 'payment',
        header: 'Смена',
        size: 100,
        minSize: 100,

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
              {format(value.getValue())}
            </CTableDataCell>
          )
        },

        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      }),
      columnHelper.accessor('overPayment', {
        id: 'overPayment',
        header: 'Переработка',
        size: 100,
        minSize: 100,

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
              {format(value.getValue())}
            </CTableDataCell>
          )
        },

        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      }),

      columnHelper.accessor('taxi', {
        id: 'taxi',
        header: 'Такси',
        size: 100,
        minSize: 100,
        cell: MoneyCell,

        // cell: (value) => {
        //   return (
        //     <CTableDataCell
        //       style={{
        //         height: '30px',
        //         minHeight: '30px',
        //         maxHeight: '30px',
        //         padding: '0',
        //       }}
        //     >
        //       {format(value.getValue())}
        //     </CTableDataCell>
        //   )
        // },

        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      }),
      columnHelper.accessor('gsm', {
        id: 'gsm',
        header: 'ГСМ',
        size: 100,
        minSize: 100,
        cell: MoneyCell,

        // cell: (value) => {
        //   return (
        //     <CTableDataCell
        //       style={{
        //         height: '30px',
        //         minHeight: '30px',
        //         maxHeight: '30px',
        //         padding: '0',
        //       }}
        //     >
        //       {format(value.getValue())}
        //     </CTableDataCell>
        //   )
        // },

        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      }),
      columnHelper.accessor('transport', {
        id: 'transport',
        header: 'Транспорт',
        size: 100,
        minSize: 100,
        cell: MoneyCell,

        // cell: (value) => {
        //   return (
        //     <CTableDataCell
        //       style={{
        //         height: '30px',
        //         minHeight: '30px',
        //         maxHeight: '30px',
        //         padding: '0',
        //       }}
        //     >
        //       {format(value.getValue())}
        //     </CTableDataCell>
        //   )
        // },

        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      }),
      columnHelper.accessor('worker', {
        id: 'worker',
        header: 'Специалист',
        size: 100,
        minSize: 100,

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
              {format(value.getValue())}
            </CTableDataCell>
          )
        },

        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      }),
      columnHelper.accessor('commision', {
        id: 'commision',
        header: 'Комиссия',
        size: 100,
        minSize: 100,

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
              {format(value.getValue())}
            </CTableDataCell>
          )
        },

        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      }),
      columnHelper.accessor('customer', {
        id: 'customer',
        header: 'Итого',
        size: 100,
        minSize: 100,

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
              {format(value.getValue())}
            </CTableDataCell>
          )
        },

        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      }),
      columnHelper.accessor('tags', {
        id: 'tags',
        header: 'КомТег',
        size: 100,
        minSize: 100,

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
              {value.getValue().substring(0, 15)}
            </CTableDataCell>
          )
        },

        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      }),
      columnHelper.accessor('comment', {
        id: 'comment',
        header: 'Комментарий',
        size: 100,
        minSize: 100,

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
              {value.getValue().substring(0, 15)}
            </CTableDataCell>
          )
        },

        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      }),
    ],
    [columnHelper],
  )

  return {
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
  }
}
