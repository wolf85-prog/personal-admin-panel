import { forwardRef } from 'react'
import React from 'react'
import dayjs from 'dayjs'
// import { Box, Center, Icon } from '@chakra-ui/react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import {
  CDropdown,
  CTableDataCell,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from '@coreui/react'

// const DateCustomInput = forwardRef(({ value, onClick, clearDate }, ref) => (
//   <Center ref={ref} onClick={onClick} cursor="pointer">
//     {value ? (
//       <>
//         {value}
//         <Box
//           pos="absolute"
//           right={3}
//           fontSize="md"
//           color="red.300"
//           onClick={(e) => {
//             e.stopPropagation()
//             clearDate()
//           }}
//         >
//           &times;
//         </Box>
//       </>
//     ) : (
//       <Icon as={CalendarIcon} fontSize="xl" />
//     )}
//   </Center>
// ))

const DateCell = ({ getValue, row, column, table }) => {
  //   const date = dayjs(getValue()).format('HH:mm')
  const date = getValue()
  console.log(date)

  //   const { updateData } = table.options.meta
  return (
    <CTableDataCell
      style={{
        height: '30px',
        minHeight: '30px',
        maxHeight: '30px',
        padding: '0',
      }}
    >
      <DatePicker
        showTimeSelect
        // wrapperClassName="date-wrapper"
        // dateFormat="HH:mm"
        selected={date}
        // onChange={(date) => updateData(row.index, column.id, date)}
        //   customInput={<DateCustomInput clearDate={() => updateData(row.index, column.id, null)} />}
      />
    </CTableDataCell>
  )
}
export default DateCell
