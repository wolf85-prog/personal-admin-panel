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
import arrowUp from 'src/assets/images/ArrowUp.png'

import { useUsersContext } from "./../chat-app-new/context/usersContext";

import WidgetsBrand from '../views/widgets/WidgetsBrand'
import WidgetsDropdown from '../views/widgets/WidgetsDropdown'
import WidgetsDropdown2 from '../views/widgets/WidgetsDropdown2'
import WidgetsDropdown3 from '../views/widgets/WidgetsDropdown3'
import WidgetsDropdown4 from '../views/widgets/WidgetsDropdown4'
import WidgetsDropdown5 from '../views/widgets/WidgetsDropdown5'
import WidgetsDropdown6 from '../views/widgets/WidgetsDropdown6'

import InputMask from 'react-input-mask';

import Chart from './../components/Chart'
import ChartBar from './../components/Chart2'
import AppMobileWarning from 'src/components/AppMobileWarning'

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
  
  useEffect(()=>{
    setWdthGrafik(grafik.current ? grafik.current.clientWidth - 100 : 0)
  },[])

  return (
    <div className='dark-theme'>
      {/* Мобильная версия */}
      <div className="app__mobile-content">
        <AppMobileWarning />
      </div>
      {/* ПК */}
      <div className="app-content">
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
          <AppHeader tabs={tabhub}/>
          <div className="body flex-grow-1 px-3">

              <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>

                <>
                  <img src={arrowUp} alt='' style={{position: 'absolute', top: '100px', right: '70px', zIndex: '100', width: '100px', transform: 'rotate(45deg)'}}/>
                  
                  <WidgetsDropdown2/>

                  {/* График Год */}
                  <CWidgetStatsA
                    ref={grafik}
                    className="mb-4 box"
                    color="gray"
                    value={<></>}
                    title={new Date().getFullYear()}
                    //action={}
                    chart={
                      <Chart 
                        range={800}
                        data={[
                          { name: 'Январь', value: 0 },
                          { name: 'Февраль', value: 100 },
                          { name: 'Март', value: 0 },
                          { name: 'Апрель', value: 50 },
                          { name: 'Май', value: 10 },
                          { name: 'Июнь', value: 0 },
                          { name: 'Июль', value: 0 },
                          { name: 'Август', value: 200 },
                          { name: 'Сентябрь', value: 300 },
                          { name: 'Октябрь', value: 0 },
                          { name: 'Ноябрь', value: 150 },
                          { name: 'Декабрь', value: 0 },
                        ]}
                        //data2={[]} 
                        data2={
                          []
                        }
                        width={widthGrafik} height={350} 
                      />             
                    }
                  />

                  <CCard style={{height: '150px', marginBottom: '25px'}}>

  {/*---------------------------------------- Renthub ------------------------------------  */} 
                    <CCardBody>
                            <CRow>
                                <CCol md={6} style={{textAlign: 'left'}}>
                                  <CButton color="dark" style={{marginRight: '20px', width: '100px'}}>Сутки</CButton>
                                  <CButton color="dark" style={{marginRight: '20px', width: '100px'}}>Неделя</CButton>
                                  <CButton color="dark" style={{marginRight: '20px', width: '100px'}}>Месяц</CButton>
                                  <CButton color="dark" style={{marginRight: '20px', width: '100px'}}>Год</CButton>
                                </CCol>
                                <CCol md={6} style={{textAlign: 'center', display: 'flex'}}>
                                  <InputMask 
                                    mask="99.99.9999"
                                    value={periodDate1}
                                    //onChange={changeDate1}
                                  >
                                    {(inputProps) => <CFormInput 
                                                      {...inputProps} 
                                                      placeholder="01.01.2025" 
                                                      disableUnderline
                                                      aria-label="sm input example"
                                                      style={{marginLeft: '10px'}}    
                                                    />}
                                  </InputMask>

                                  <InputMask 
                                    mask="99.99.9999"
                                    value={periodDate2}
                                    //onChange={changeDate2}
                                  >
                                    {(inputProps) => <CFormInput 
                                                      {...inputProps} 
                                                      placeholder="31.12.2025" 
                                                      disableUnderline
                                                      aria-label="sm input example"
                                                      style={{marginLeft: '10px'}} 
                                                    />}
                                  </InputMask>                             
                                              
                                  <CButton color="dark" style={{marginLeft: '10px'}}>Применить</CButton>
                                </CCol>      
                              </CRow>
                              
                              <br/>


                              <CRow>
                                <CCol xs={12} md={6} xl={6}>
                                  <CRow>
                                    <CCol sm={6}>
                                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                                        <div className="text-medium-emphasis small">Новые клиенты</div>
                                        <div className="fs-5 fw-semibold">{newClients.length}</div>
                                      </div>
                                    </CCol>
                                    <CCol sm={6}>
                                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                                        <div className="text-medium-emphasis small">Постоянные клиенты</div>
                                        <div className="fs-5 fw-semibold">{oldClients.length-1}</div>
                                      </div>
                                    </CCol>
                                  </CRow>
                                </CCol>

                                <CCol xs={12} md={6} xl={6}>
                                  <CRow>
                                    <CCol sm={6}>
                                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                                        <div className="text-medium-emphasis small">Просмотры</div>
                                        <div className="fs-5 fw-semibold">-</div>
                                      </div>
                                    </CCol>
                                    <CCol sm={6}>
                                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                                        <div className="text-medium-emphasis small">Другое</div>
                                        <div className="fs-5 fw-semibold">-</div>
                                      </div>
                                    </CCol>
                                  </CRow>

                                  <div className="mb-5"></div>

                                </CCol>
                              </CRow>

                    </CCardBody>
                  </CCard>
                </>
                </Suspense>
              </CContainer>
          </div>
          <AppFooter />
        </div>
      </div>
      
    </div>
  )
}

export default Admin
