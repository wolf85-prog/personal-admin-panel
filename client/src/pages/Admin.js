import React, { Suspense, useState, useEffect, useRef } from 'react'
import { CContainer, CSpinner } from '@coreui/react'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CNav,
  CNavItem,
  CNavLink,
  CFormInput,
  CButton,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCollapse,
  CToast,
  CToastBody,
  CToastClose,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPeople, cilX,
} from '@coreui/icons'

import {
  CWidgetStatsA,
} from '@coreui/react'

import avatar2 from 'src/assets/images/avatars/blank-avatar.png'
import arrowDown from 'src/assets/images/arrowDown.svg'

import { useUsersContext } from "./../chat-app-new/context/usersContext";

import WidgetsDropdown from '../views/widgets/WidgetsDropdown'
import WidgetsDropdown2 from '../views/widgets/WidgetsDropdown2'
import WidgetsDropdown3 from '../views/widgets/WidgetsDropdown3'
import WidgetsDropdown4 from '../views/widgets/WidgetsDropdown4'
import WidgetsDropdown5 from '../views/widgets/WidgetsDropdown5'
import WidgetsDropdown6 from '../views/widgets/WidgetsDropdown6'

import InputMask from 'react-input-mask';

import Chart from './../components/Chart'
import ChartBar from './../components/Chart2'

const Admin = () => {

  const grafik = useRef(null);

  const { users: clients } = useUsersContext();
  const { managers: zakazchiki } = useUsersContext();
  const { projects: projs } = useUsersContext();
  const { companys: comps } = useUsersContext();
  const { userWorkers: specusers } = useUsersContext();
  const { workersAll, workers, setWorkers, managers, setManagers } = useUsersContext();

  const [contacts, setContacts] = useState([]);
  const [contacts2, setContacts2] = useState([]);
  const [projects, setProjects] = useState([]);
  const [newClients, setNewClients] = useState([]);
  const [oldClients, setOldClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [loading4, setLoading4] = useState(true);
  
  const [sortWorkers, setSortWorkers] = useState([]);
  const [newWorkers, setNewWorkers] = useState([]);
  const [activWorkers, setActivWorkers] = useState([]);
  const [delWorkers, setDelWorkers] = useState([]);

  const [sortDelWorkers, setSortDelWorkers] = useState([]);

  const [sortWorkers2, setSortWorkers2] = useState([]);
  const [newWorkers2, setNewWorkers2] = useState([]);
  const [activWorkers2, setActivWorkers2]= useState([]);
  const [delWorkers2, setDelWorkers2]= useState([]);

  const [catCount, setCatCount] = useState([])

  const [dayWorkers, setDayWorkers]= useState([]);
  const [weekWorkers, setWeekWorkers]= useState([]);
  const [monthWorkers, setMonthWorkers]= useState([]);
  const [yearWorkers, setYearWorkers]= useState([]);
  const [periodWorkers, setPeriodWorkers]= useState([]);

  const [showRenthub, setShowRenthub]= useState(false);
  const [showRenthub2, setShowRenthub2]= useState(false);
  const [showWorkhub, setShowWorkhub]= useState(true);
  const [showDeleted, setShowDeleted]= useState(false);

  const [activeKey, setActiveKey] = useState(2)

  const [showWidget, setShowWidget] = useState(false)
  const [showWidget2, setShowWidget2] = useState(true)
  const [showWidget3, setShowWidget3] = useState(false)
  const [showWidget4, setShowWidget4] = useState(false)
  const [showWidget5, setShowWidget5] = useState(false)
  const [showWidget6, setShowWidget6] = useState(false)

  const [showCharts, setShowCharts]= useState(false);
  const [showCharts2, setShowCharts2]= useState(false);
  const [showCharts3, setShowCharts3]= useState(false);
  const [showCharts4, setShowCharts4]= useState(false);
  const [showCharts5, setShowCharts5]= useState(false);

  const [showCountAll, setShowCountAll] = useState(false);
  const [showNick, setShowNick]= useState(false);

  const [tabhub, setTabhub]= useState('');

  const [periodDate1, setPeriodDate1] = useState("")
  const [periodDate2, setPeriodDate2] = useState("")

  const [startWeek, setStartWeek] = useState("")
  const [timerId, setTimerId] = useState()
  const [widthGrafik, setWdthGrafik] = useState(0);
  const [text, setText]= useState("");
  const [textDelete, setTextDelete]= useState("");
  const [showTable, setShowTable] = useState([])

  const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID
  const host = process.env.REACT_APP_API_URL
  
  
  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader tabs={tabhub}/>
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
              <Suspense fallback={<CSpinner color="primary" />}>

              
              </Suspense>
            </CContainer>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Admin
