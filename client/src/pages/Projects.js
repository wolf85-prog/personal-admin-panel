import React, { Suspense, useState, useEffect, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import { Link, useLocation } from 'react-router-dom'
import { 
  CContainer, 
  CSpinner, 
  CCol,
  CRow,
  CButton, 
  CFormInput,
  CCard,
  CCardBody,
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CTableFoot,
  CTableHead,
  CTableHeaderCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CCardHeader,
  CCardTitle,
  CCardText,
  CCollapse,
  CFormCheck,
  CTooltip,
} from '@coreui/react'

import Icon from "./../chat-app-worker/components/Icon";
import InputMask from 'react-input-mask';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import DatePicker from "react-datepicker";
import Dropdown from 'react-bootstrap/Dropdown';

import { useUsersContext } from "../chat-app-new/context/usersContext";

import { useTableData } from 'src/components/table/useTableData'
import TableHeader from 'src/components/table/TableHeader'
import Filters from 'src/components/table/Filters'
// import Calendar from 'src/components/Calendar/Calendar_old'
import Calendar from "src/components/Calendar/Calendar";
import Calendar2 from "src/components/Calendar3/Calendar2";

import MyDropdown from 'src/components/Dropdown/Dropdown';
import MyDropdown4 from 'src/components/Dropdown4/Dropdown4';
import MyDropdown5 from 'src/components/Dropdown5/Dropdown5';
import MyDropdown52 from 'src/components/Dropdown52/Dropdown52';
import MyDropdown6 from 'src/components/Dropdown6/Dropdown6';


import DeleteIcon from "../assets/images/delete_icon.png"
import Close from "../assets/images/clear.svg"
import zamok from "../assets/images/замок.png"
import zamok2 from "../assets/images/замок2.png"
import addAvatar from "../assets/images/add_avatar.png"
import Krestik from './../assets/images/krestik.png';
import imgBlock18 from "./../assets/images/block18.png";
import Trubka from "./../assets/images/trubka.png";
import robot from "src/chat-app-worker/assets/images/robot.png";
import Tg from "./../assets/images/tg.png";
import Star from "./../assets/images/star.png";
import StarActive from "./../assets/images/star_activ.svg";
import Disketa2 from "./../assets/images/disketa.png";
import Disketa from "./../assets/images/copy.png";
import arrowDown from 'src/assets/images/arrowDown.svg'
import threeDots from 'src/assets/images/three-dots.svg'

import btnBlue from 'src/assets/images/button_pause.png'
import btnRed from 'src/assets/images/button_rec.png'
import btnGreen from 'src/assets/images/button_play.png'
import btnYellow from 'src/assets/images/button_stop.png'

import btnPause from 'src/assets/images/button_pause.png'
import btnRec from 'src/assets/images/button_rec.png'
import btnPlay from 'src/assets/images/button_play.png'
import btnStop from 'src/assets/images/button_stop.png'

import vhodCall from 'src/assets/sound/call_in.mp3';
import ishodCall from 'src/assets/sound/call_out.mp3';
import ishodRobotCall from 'src/assets/sound/ishod_robot.mp3';

import statusData from 'src/data/statusData';
import cities from 'src/data/cities';
import specifikaData from 'src/data/specifikaData';
import vids from 'src/data/vids';
import comtegs from 'src/data/comtegsWorker';
// import specOnlyData2 from 'src/data/specOnlyData2';

import { getSendCall, getSendCallRaut } from '../http/adminAPI';
import { addCanceled, getCanceled, getCanceledId } from '../http/workerAPI'
import { getPretendentProjectId, editPretendent, getCreatePredSmeta, getCreateFinSmeta, getCreatePoster, getCompanySendCall, getCompanySendCallRaut } from '../http/adminAPI'
import { getProjects, deleteProject, editProject, getProjectId } from '../http/projectAPI'
import { sendSpecialistOtkaz, getSpecialist } from '../http/specAPI'
import { getCompany } from '../http/companyAPI'
import { getPlatforms } from '../http/platformAPI'
import { addMainspec, deleteMainspec, editMainspec, getMainSpecProject, getMainSpecId, deleteMainspecProject } from '../http/mainspecAPI'

import startData from 'src/data/startData';
import {
  getSpecialitiesFilter,
} from 'src/services/api/speciality'
import { TextField } from '@mui/material'

const Projects = () => {
  //const navigate = useNavigate();

  const audioVhodCall = new Audio(vhodCall);
	const audioIshodCall = new Audio(ishodCall);
  const audioIshodRobotCall = new Audio(ishodRobotCall);

  const { columns, data, setData, columnFilters, setColumnFilters, handleActive } = useTableData()
  const { userId, companysAll, setCompanysAll, clientAll, workersAll, setWorkersAll, platformsAll, setPlatformsAll, setShowCallCard } = useUsersContext();
  const { clientIshod, setClientIshod, showCallCardClient, setShowCallCardClient} = useUsersContext();
  const { workerIshod, setWorkerIshod, showCallCardWorker, setShowCallCardWorker} = useUsersContext();
  const { robotIshod, setRobotIshod, showCallCardRobot, setShowCallCardRobot} = useUsersContext();

  const [showSidebar, setShowSidebar] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showCalendar2, setShowCalendar2] = useState(true)
  const [showProject, setShowProject] = useState(false)
  const [showHeader, setShowHeader] = useState(false)
  const [showSaveLocation, setShowSaveLocation] = useState(false)
  const [showSaveAddress, setShowSaveAddress] = useState(false)
  const [showSaveTreck, setShowSaveTreck] = useState(false)
  const [showSavePhone, setShowSavePhone] = useState(false)
  const [showSavePhone2, setShowSavePhone2] = useState(false)

  const [height, setHeight] = useState(435)

  const [projects, setProjects] = useState([]);

  const [id, setId] = useState('');
  const [crmID, setCrmID] = useState('');
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [startTime, setStartTime] = useState('00:00')
  const [endTime, setEndTime] = useState('')
  const [city, setCity] = useState('');
  const [statusProject, setStatusProject] = useState({name: '', color: ''});
  const [specifikaProject, setSpecifikaProject] = useState({name: '', color: ''});
  const [startProject, setStartProject] = useState({name: '', color: ''});
  const [vidProject, setVidProject] = useState([]);
  const [company, setCompany] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companysData, setCompanysData] = useState([]);

  const [merch, setMerch] = useState(false);
  const [taxi, setTaxi] = useState(false);

  const [managerName, setManagerName] = useState('');
  const [managerName2, setManagerName2] = useState('');

  const [clientsData, setClientsData] = useState([]);
  const [workersData, setWorkersData] = useState([]);
  const [specialistData, setSpecialistData] = useState([]);

  const [specialistName, setSpecialistName] = useState([]);

  const [locationProject, setLocationProject] = useState('');
  const [platformsData, setPlatformsData] = useState([]);

  const [phone, setPhone] = useState('');
  const [phone2, setPhone2] = useState('');

  const [teh1, setTeh1] = useState('');
  const [teh2, setTeh2] = useState('');
  const [teh3, setTeh3] = useState('');
  const [teh4, setTeh4] = useState('');
  const [teh5, setTeh5] = useState('');
  const [teh6, setTeh6] = useState('');
  const [teh7, setTeh7] = useState('');
  const [teh8, setTeh8] = useState('');
  const [tehText, setTehText] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [track, setTrack] = useState('');
  const [geoId, setGeoId] = useState('');
  const [comment, setComment] = useState('');
  
  const [comteg, setComteg] = useState([]);
  const [spec, setSpec] = useState([]);
  const [stavka, setStavka] = useState([]);
  const [statusPretendent, setStatusPretendent] = useState('');

  const [visibleDelete, setVisibleDelete] = useState(false)
  const [visibleA, setVisibleA] = useState(false)
  const [visibleB, setVisibleB] = useState(false)
  const [visibleC, setVisibleC] = useState(false)
  const [visibleTZ, setVisibleTZ] = useState(false)

  const [showMainTable, setShowMainTable] = useState(false)
  const [showPretendentTable, setShowPretendentTable] = useState(false)
  const [showPosterTable, setShowPosterTable] = useState(false)
  const [showDots, setShowDots] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showModalEmpty, setShowModalEmpty] = useState(false)

  const [playPredSmeta, setPlayPredSmeta] = useState(false)
  const [donePredSmeta, setDonePredSmeta] = useState(false)

  const [playFinSmeta, setPlayFinSmeta] = useState(false)
  const [doneFinSmeta, setDoneFinSmeta] = useState(false)

  const [playPoster, setPlayPoster] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [sortedCities, setSortedCities] = useState([])
  const [mainspec, setMainspec] = useState([])
  const [dateProject, setDateProject] = useState([])
  const [timeProject, setTimeProject] = useState([])
  const [pretendents, setPretendents] = useState([])

  const [countPressDate, setCountPressDate] = useState(0);

  const [isChecked, setIsChecked] = useState(false)
  const [isChecked2, setIsChecked2] = useState(false)
  const [isChecked3, setIsChecked3] = useState(false)

  const [hasFocus, setFocus] = useState(false);
  
  const customTooltipStyle = {
    '--cui-tooltip-bg': '#2e4053',
    '--cui-tootip-color': '#fff'
  }

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

    getPaginationRowModel: getPaginationRowModel(),

    enableRowSelection: true,
    getRowCanExpand: () => true,
  })

  const {
    specialitiesIsPending,
    specialitiesError,
    data: specialities,
  } = useQuery({
    queryKey: ['specialities'],
    queryFn: getSpecialitiesFilter,
    initialData: []
  })


  //------------------------------------------------------------------------------------------
  // get Companys
  //------------------------------------------------------------------------------------------	
    useEffect(() => {
      const fetchData = async () => {
  
        const user = localStorage.getItem('user')
  
        let company = await getCompany(user && JSON.parse(user)?.id);
        console.log("companys context: ", company)
  
      
        let arrCompanys = []
      
        company && company.map(async (user, i) => {
          const d = new Date(user.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
          const d2 = new Date(d)
          const month = String(d2.getMonth()+1).padStart(2, "0");
          const day = String(d2.getDate()).padStart(2, "0");
          const chas = d2.getHours();
          const min = String(d2.getMinutes()).padStart(2, "0");
          const newDate = `${day}.${month} ${chas}:${min}`;
      
          let str_comment = ''
          user.comment && JSON.parse(user.comment).map((item, index)=> {
          str_comment = str_comment + item.content + (index+1 !== JSON.parse(user.comment).length ? ', ' : '')
          })    
      
          const newUser = {
          id: user.id,
          userId: user.userId,
          title: user.title,
          city: user.city,
          office: user.office,
          sklad: user.sklad,
          comment: str_comment,
          inn: user.inn,
          bugalterFio: user.bugalterFio, 
          bugalterEmail: user.bugalterEmail,
          bugalterPhone: user.bugalterPhone,
          profile: user.profile,
          sfera: user.sfera,
          comteg: user.comteg,
          }
          arrCompanys.push(newUser)
      
          //если элемент массива последний
          if (i === company.length-1) {
            const sortedUser = [...arrCompanys].sort((a, b) => {       
              var idA = a.id, idB = b.id 
              return idB-idA  //сортировка по возрастанию 
            })
      
            setCompanysAll(sortedUser)
                
          }
      
        })
      }
  
      fetchData();
  
    },[])
  
  
  //------------------------------------------------------------------------------------------
  // get Platforms
  //------------------------------------------------------------------------------------------	
    useEffect(() => {
      const fetchData = async () => {
        const user = localStorage.getItem('user')
        
        let platforms = await getPlatforms(user && JSON.parse(user)?.id);
        console.log("platforms context: ", platforms)
      
        let arrCompanys = []
      
        platforms && platforms.map(async (user, i) => {
      
          const newUser = {
          id: user.id,
          title: user.title,
          city: user.city,
          address: user.address,
          track: user.track, //
          url: user.url,
          karta: user.karta,
          }
          arrCompanys.push(newUser)
      
          //если элемент массива последний
          if (i === platforms.length-1) {
            const sortedUser = [...arrCompanys].sort((a, b) => {       
              let titleA = a.title 
              let titleB = b.title
              // return titleB-titleA  //сортировка по возрастанию 
              if (titleA.toLowerCase() < titleB.toLowerCase()) {
                return -1;
              }
              if (titleA.toLowerCase() > titleB.toLowerCase()) {
                return 1;
              }
              return 0;
            })
            //console.log("sortedUser: ", sortedUser)
      
            setPlatformsAll(sortedUser)
                
          }
      
        })
  
      }
  
      fetchData();
  
    },[])
  


  useEffect(()=> {
    // сортировка городов
    const newCities = cities.map((item)=> { 
      const newArr = item.label
      return newArr
    })
    const one = [...newCities].slice(0, 4)
    const city = [...newCities].slice(5)
    const sorted = city.sort((a, b) => {       
      var cityA = a, cityB = b
      return (cityA < cityB) ? -1 : (cityA > cityB) ? 1 : 0;  //сортировка по возрастанию 
    })
    const newSorted = [...one, ...city]
    setSortedCities(newSorted)

    //1
    let arrCompanys = []
    companysAll.map((item, index)=> {
      arrCompanys.push(item.title)
    })
    const sortedComp = [...arrCompanys].sort((a, b) => {       
      var cityA = a, cityB = b
      return (cityA < cityB) ? -1 : (cityA > cityB) ? 1 : 0;  //сортировка по возрастанию 
    })

    setCompanysData(sortedComp)

    //2
    let arrManagers = []
    clientAll.map((item, index)=> {
      console.log("item client: ", item)
      if (item.userfamily) {
        arrManagers.push(item.userfamily)
      }  
    })
    const sortedManager = [...arrManagers].sort((a, b) => {       
      return (a < b) ? -1 : (a > b) ? 1 : 0;  //сортировка по возрастанию 
    })
    console.log("sortedManager: ", sortedManager)
    setClientsData(sortedManager)

    //3
    // let arrWorkers = []
    // console.log("workersAll: ", workersAll)
    // workersAll.map((item, index)=> {
    //   if (item.userfamily) {
    //     const obj = {
    //       id: item.id,
    //       label: item.userfamily,
    //       value: index,
    //     }
    //     arrWorkers.push(obj)
    //     //arrWorkers.push(item.userfamily)
    //   }  
    // })
    // const sortedWorker = [...arrWorkers].sort((a, b) => {       
    //   return (a.label < b.label) ? -1 : (a.label > b.label) ? 1 : 0;  //сортировка по возрастанию 
    // })
    // console.log("arrWorkers: ", sortedWorker)
    // setWorkersData(sortedWorker)

    //4
    let arrPlatfroms = []
    platformsAll.map((item, index)=> {
      arrPlatfroms.push(item.title)
    })
    const sortedPlat = [...arrPlatfroms].sort((a, b) => {       
      var cityA = a.toLowerCase(), cityB = b.toLowerCase()
      return (cityA < cityB) ? -1 : (cityA > cityB) ? 1 : 0;  //сортировка по возрастанию 
    })

    setPlatformsData(sortedPlat)

    //5
    const fetchData = async() => {
      const projs = await getProjects(userId)
      console.log("projs: ", projs)
      const sortProj = [...projs].sort((a, b) => {  
        if (a.dateStart < b.dateStart)
          return -1;
        if (a.dateStart > b.dateStart)
            return 1;
        return 0;
      })

      setProjects(sortProj)

      //0 все специалисты
      let all = await getSpecialist(userId)
      console.log("workersAll: ", all)
      const arrayWorkerAll = []
      all.map(async (user) => {
        const newWorker = {
          id: user.id,
          userfamily: user.fio, //user.userfamily != null ? user.userfamily : '',
          username: '',//user.username,
          phone: user.phone,
          dateborn: user.age,
          city: user.city, 
          companys: user.company,
          worklist:  user.specialization,
          chatId: user.chatId,
          createDate: user.createdAt,
          avatar: user.profile,
          promoId: user.promoId,
          blockW: user.blockW,
          block18: user.block18,
          krest: user.krest,
          deleted: user.deleted,
          comment: user.comment,
          comteg: user.comteg,
        }
    
          arrayWorkerAll.push(newWorker)
      })
          
      setWorkersAll(arrayWorkerAll)
      let arrWorkers = []
      let arrWorkers2 = []
      //console.log("workersAll: ", workersAll)
      arrayWorkerAll.map((item, index) => {
        if (item.userfamily) {
          arrWorkers2.push(item.userfamily)
        }
        setSpecialistData(arrWorkers2)

        const obj = {
          id: item.id,
          label: item.userfamily + ' ' + item.username,
          value: index,
        }
        arrWorkers.push(obj)
      })
      //console.log("arrWorkers: ", arrWorkers)
      setWorkersData(arrWorkers)
    }

    fetchData()
    
}, [])



  useEffect(()=> {
    console.log("height: ", height)
  }, [height])


// Открыть проект  
  const openProject = async(month, item, number, id, name, end, status, start, timeStart, specifika) => {
    console.log("item: ", month+1, item, number, specifika, end)

    setShowHeader(true)
    setShowProject(true)
    setShowCalendar(false)
    setShowCalendar2(false)
    

    const resProj = await getProjectId(id)
    console.log("resProj: ", resProj)

  
    let newArray = []
    let colorStatus = ''

    setId(id)
    setCrmID(resProj.crmID)
    setProjectName(name)
      
    var d = new Date(resProj.dateStart); // создаём объект даты
    var d2 = resProj.dateEnd ? new Date(resProj.dateEnd) : ''; // создаём объект даты
    setStartDate(d.setHours(d.getHours() - 3))
    setEndDate(d2 !== '' ? d2.setHours(d2.getHours() - 3) : '')

    setStartTime(timeStart) 
    setEndTime(resProj.dateEnd?.split('T')[1]?.slice(0, 5)) 

    setStatusProject({name: status, color: statusData.find((stat)=> stat.label === resProj.status)?.color})
    setStartProject({name: start, color: startData.find((stat)=> stat.label === resProj.start)?.color})
    setSpecifikaProject({name: specifika, color: specifikaData.find((stat)=> stat.label === resProj.specifika)?.color})

    const compTitle = companysAll.find(item=> item.id.toString() === resProj.companyId)
    console.log("companysAll: ", companysAll)
    setCompanyName(compTitle?.title ? compTitle?.title : '')

    const managerFio = clientAll.find(item=> item.id.toString() === resProj.managerId)
    setManagerName(managerFio?.userfamily)

    const comp = clientAll.find(item=> item.userfamily === managerFio?.userfamily)
    console.log("comp2: ", comp)
    if (comp) {
      setPhone(comp.phone)
    } else {
      setPhone('')
    }

    const managerFio2 = workersAll.find(item=> item.id.toString() === resProj.managerId2)
    setManagerName2(managerFio2?.userfamily)

    const comp2 = workersAll.find(item=> item.userfamily === managerFio2?.userfamily)
    console.log("comp2: ", comp)
    if (comp2) {
      setPhone2(comp2.phone)
    } else {
      setPhone2('')
    }

    //setLocationProject(resProj.geo)
    console.log("Платформы: ", platformsAll)
    const loc = platformsAll.find(item=> item.id === parseInt(resProj?.geo))
    console.log("platformsAll: ", platformsAll)
    console.log("geo: ", resProj?.geo)
    console.log("loc: ", loc)
    if (loc) {
      let text = `${loc.city}
${loc.track}   
${loc.url}`;
      setAddress(loc.address)
      setTrack(text)
      setLocationProject(loc.title)
      setLocation(text)
    } else {
      setLocationProject('')
      setAddress('')
      setTrack('')
    }

    setGeoId(resProj?.geo)

    setCity(resProj.city)
    setComment(resProj.comment) 

    setTehText(resProj.teh)
    setTeh1(resProj.teh1)
    setTeh2(resProj.teh2)
    setTeh3(resProj.teh3)
    setTeh4(resProj.teh4)
    setTeh5(resProj.teh5)
    setTeh6(resProj.teh6)
    setTeh7(resProj.teh7)
    setTeh8(resProj.teh8)


    //основной состав (специалисты)
    let resMain
    resMain = await getMainSpecProject(id)
    console.log("resMain: ", resMain)

    if (resMain.length > 0) {
      let arr = []
      let myColor = ''
      let myColor2 = ''

      resMain.map((item)=>{
        if (item.vidWork === 'Фальшстарт' || item.vidWork === 'Отмена') myColor = 'red'
        if (item.vidWork === 'Офис') myColor = 'purple'

        const obj = {
          name: item.vidWork,
          color: myColor
        }

        const obj1 = {
          name: item.specialization,
          color: ''
        }

        const obj2 = {
          name: item.stavka,
          color: ''
        }

        if (item.comteg === 'Опоздание' || item.comteg === 'Невыход') myColor2 = 'red'

        const obj3 = {
          name: item.comteg,
          color: myColor2
        }

        const newObj = {
          id: item.id,
          userId,
          date: item.date,
          specId: item.specId,
          vidWork: JSON.stringify(obj),
          specialization: JSON.stringify(obj1),
          comteg: JSON.stringify(obj3),
          comment: item.comment,
          stavka: JSON.stringify(obj2),   
          numder: item.number, 
          hr: item.hr,  
          count: item.count,  
          projectId: id,
          merch: item.merch,
          taxi: item.taxi,
        }

        arr.push(newObj)
      })

      //console.log(arr)
      setMainspec(arr)

    } else {
      //новый состав специалистов

      const startD = new Date(resProj.dateStart?.split('T')[0]).toLocaleString().split(',')[0]
      const startT = resProj.dateStart?.split('T')[1]?.slice(0, 5)
      //console.log("startD: ", startD, startT)

      //добавить строку в основной состав
		  const resAdd1 = await addMainspec({date: startD +'T'+ startT, projectId: id, number: 1, stavka: "№1", userId})
      const resAdd2 = await addMainspec({date: startD +'T'+ startT, projectId: id, number: 2, stavka: "№1", userId})
      const resAdd3 = await addMainspec({date: startD +'T'+ startT, projectId: id, number: 3, stavka: "№1", userId})
      const resAdd4 = await addMainspec({date: startD +'T'+ startT, projectId: id, number: 4, stavka: "№1", userId})    

      const data = {
        id: resAdd1.id,
        userId,
        date: startD+'T'+resProj.dateStart?.split('T')[1].slice(0,5),
        vidWork: null,
        specId: null,
        specialization: null,
        stavka: JSON.stringify({label: '№1', name: '№1', color: ''}),
        comment: null,
        comteg: null,
        taxi: null,
        merch: null,
        projectId: id,    
      }

      const data2 = {
        id: resAdd2.id,
        userId,
        date: startD+'T'+resProj.dateStart?.split('T')[1].slice(0,5),
        vidWork: null,
        specId: null,
        specialization: null,
        stavka: JSON.stringify({label: '№1', name: '№1', color: ''}),
        comment: null,
        comteg: null,
        taxi: null,
        merch: null,
        projectId: id,    
      }

      const data3 = {
        id: resAdd3.id,
        userId,
        date: startD+'T'+resProj.dateStart?.split('T')[1].slice(0,5),
        vidWork: null,
        specId: null,
        specialization: null,
        stavka: JSON.stringify({label: '№1', name: '№1', color: ''}),
        comment: null,
        comteg: null,
        taxi: null,
        merch: null,
        projectId: id,    
      }

      const data4 = {
        id: resAdd4.id,
        userId,
        date: startD+'T'+resProj.dateStart?.split('T')[1].slice(0,5),
        vidWork: null,
        specId: null,
        specialization: null,
        stavka: JSON.stringify({label: '№1', name: '№1', color: ''}),
        comment: null,
        comteg: null,
        taxi: null,
        merch: null,
        projectId: id,    
      }

      let arr = []
      setMainspec(
        //[...arr, {...data, id: parseInt(resProj.crmID)+1}, {...data, id: parseInt(resProj.crmID)+2}, {...data, id: parseInt(resProj.crmID)+3}, {...data, id: parseInt(resProj.crmID)+4}]
        [...arr, data, data2, data3, data4]
      );
    }

    
    setVisibleA(true)
    //setVisibleB(true)
    setShowMainTable(true)
    setShowPretendentTable(true)
    setShowPosterTable(true)


    setTimeout(()=> {
      setHeight(435)
    }, 200)
    
  }

  useEffect(()=>{
    console.log("Основной состав: ", mainspec)
  }, [mainspec])


  useEffect(()=>{
    console.log("Менеджер Старший: ", managerName2)
  }, [managerName2])

  

  //сохранить проект
  const saveProject = async(id) => {

    //Toast
    setShowModal(true)

    console.log("id: ", id)
    // console.log("start: ", startDate)
    // console.log("end: ", endDate)
    // console.log("managerId: ", clientAll.find(item=> item.userfamily === managerName)?.id)
    // console.log("managerId2: ", workersAll.find(item=> item.userfamily === managerName2)?.id)
    // console.log("companyId: ", companysAll.find(item=> item.title === companyName)?.id)
    // console.log("startProject: ", startProject)

    // console.log("workersAll: ", workersAll)

    //удаляем старые записи из Основного состава
    //const resAllDel = await deleteMainspecProject(id)
    //console.log("resAllDel: ", resAllDel)

    const month = String(new Date(startDate).getMonth()+1).padStart(2, "0");
    const day = String(new Date(startDate).getDate()).padStart(2, "0");

    const month2 = String(new Date(endDate).getMonth()+1).padStart(2, "0");
    const day2 = String(new Date(endDate).getDate()).padStart(2, "0");
  
    const saveData = {
      userId,
      name: projectName,
      status: statusProject.name,
      start: startProject.name,
      datestart: `${new Date(startDate).getFullYear()}-${month}-${day}T${startTime}:00.000Z`,
      dateend: endDate ? `${new Date(endDate).getFullYear()}-${month2}-${day2}T${endTime}:00.000Z` : '',
      teh: tehText, 
      teh1,
      teh2,
      teh3,
      teh4,
      teh5,
      teh6,
      teh7,
      teh8,
      geo: geoId, 
      managerId: clientAll.find(item=> item.userfamily === managerName)?.id ? clientAll.find(item=> item.userfamily === managerName)?.id : '', 
      managerId2: workersAll.find(item=> item.userfamily === managerName2)?.id ? workersAll.find(item=> item.userfamily === managerName2)?.id : '',
      companyId: companysAll.find(item=> item.title === companyName)?.id ? companysAll.find(item=> item.title === companyName)?.id : '', 
      comment, 
      specifika: specifikaProject.name, 
      city,
    }
    console.log(saveData)
  
    //сохранить изменения в базе
    const resSave = await editProject(saveData, id) 
    console.log("resSave: ", resSave)

    console.log("mainSpec save: ", mainspec)

    const resMain = await getMainSpecProject(id)
    console.log("mainSpec get: ", resMain)

    mainspec.map(async(item, index)=> {
      //setTimeout(async()=> {
        //console.log("id item: ", resMain[index]?.id)
        const resItem = resMain.find(item2 => item2.id === item.id)
        if (resItem) {
          const resEdit = await editMainspec(
            {
             // userId: item.userId,
              date: item.date,
              vidWork: item.vidWork ? JSON.parse(item.vidWork).name : '',
              specId: item.specId,
              specialization: item.specialization ? JSON.parse(item.specialization).name : '',
              stavka: item.stavka ? JSON.parse(item.stavka).name : '',
              comteg: item.comteg ? JSON.parse(item.comteg).name : '',
              comment: item.comment,
              projectId: item.projectId,
              number: index+1,
              hr: item.hr,
              merch: item.merch,
              taxi: item.taxi,
            },
            resItem.id
          )
          console.log("resEdit: ", resEdit)
        } else {
          await addMainspec(
            {
              userId,
              date: item.date,
              vidWork: item.vidWork ? JSON.parse(item.vidWork).name : '',
              specId: item.specId,
              specialization: item.specialization ? JSON.parse(item.specialization).name : '',
              stavka: item.stavka ? JSON.parse(item.stavka).name : '',
              comteg: item.comteg ? JSON.parse(item.comteg).name : '',
              comment: item.comment,
              projectId: item.projectId,
              number: index+1,
              hr: item.hr,
              // merch,
              // taxi,
            }
          )
        }
        
      //}, 500 * ++index)
    })


    //send otkaz
    // pretendents.map(async(item, index)=> {
    //   console.log("pretendent: ", item, index)
    //   setTimeout(async() => {
    //     if (item.status) {
    //       if (JSON.parse(item.status).name === 'Отказано') {

    //         //сохранение отказа в базе
    //         const newObj = {
    //           projectId: item.projectId,
    //           workerId: item.workerId.toString(),  
    //           receiverId: item.receiverId, 
    //           cancel: true
    //         }
    //         console.log("newObj: ", newObj)

    //         //отправка сообщения об отказе
    //         const retCanceled = await getCanceledId(newObj)
    //         console.log("retCanceled: ", retCanceled)
    //         if (!retCanceled) {
    //           await sendSpecialistOtkaz(item.workerId, {projectId: item.projectId})
    //         }

    //         const resAdd = await addCanceled(newObj)
    //         console.log("resAdd: ", resAdd)
    //       }

    //       await editPretendent(item.id, {status: JSON.parse(item.status).name})
    //     } 
    //   }, 1000 * ++index)
      
        
    // })

    //const resTable = await editMainspec({date: dateProject + 'T' + timeProject})
  
    setProjects((projects) => {	
      const month = String(new Date(startDate).getMonth()+1).padStart(2, "0");
      const day = String(new Date(startDate).getDate()).padStart(2, "0");
  
      let userIndex = projects.findIndex((item) => item.id === id);
      console.log(userIndex)
      const usersCopy = JSON.parse(JSON.stringify(projects));
  
      const userObject = usersCopy[userIndex];
      usersCopy[userIndex] = { ...userObject, 
        id: id,
        name: projectName, 
        status: statusProject.name,
        specifika: specifikaProject.name,
        dateStart: `${new Date(startDate).getFullYear()}-${month}-${day}T${startTime}:00.000Z`,
        dateEnd: endDate ? `${new Date(endDate).getFullYear()}-${month2}-${day2}T${endTime}:00.000Z` : '',
      };
  
      console.log("update user: ", usersCopy)
  
      return usersCopy;
    });


    setTimeout(()=> {     
      setShowModal(false)
      closeProfile()
    }, 2000)
  }

  const closeProfile = () => {
    setShowHeader(false)
    setShowProject(false)
    setShowCalendar2(true)
    setShowMainTable(false)
    setShowPretendentTable(false)
    setShowPosterTable(false)

    //очистить переменные
    setId('')
    setCrmID('')
    setProjectName('')  
    setStartDate('')
    setEndDate('')
    setStartTime('') 
    setEndTime('') 
    setStatusProject({name: '', color: ''})
    setStartProject({name: '', color: ''})
    setSpecifikaProject({name: '', color: ''})
    setCompanyName('')
    setManagerName('')
    setPhone('')
    setManagerName2('')
    setPhone2('')
    setLocationProject('')
    setAddress('')
    setGeoId('')
    setCity('')
    setComment('') 
    setTehText('')
    setTeh1('')
    setTeh2('')
    setTeh3('')
    setTeh4('')
    setTeh5('')
    setTeh6('')
    setTeh7('')
    setTeh8('')

    setMainspec([])
    setPretendents([])
  }


  // const onChangeManager = (e, index) => {
  //   //console.log(e.target.value, index)

  //   setManagerName(e.target.value)
  
  // }

  const onChangeManager = (e, index) => {
    if (index) {
      setManagerName(index) 
    } else {
      setManagerName('') 
      setPhone('')
    }
  }

  const onChangeManager2 = (e, index) => {
    if (index) {
      setManagerName2(index) 
    } else {
      setManagerName2('') 
      setPhone2('')
    }
  }

  const clickDelete = (id) => {
    console.log(id)

    setVisibleDelete(!visibleDelete)

  }

  //удаление специалиста
  const deleteProfile = async(id) => {
    console.log(id)
    setVisibleDelete(false)

    //удаление проекта из БД
    //await deleteProject(id)


    //перемещение в корзину
    const data = {
      deleted: true
    }
    await editProject(data, id)

    //addToast(deleteToast) //ваши данные сохранены

    setProjects([...projects].filter(item=>item.id !== id))

    closeProfile()
  }


  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <img 
      src={threeDots} 
      className='hidden-element' alt='' 
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      width={15} 
      style={{ cursor: 'pointer'}}
    >
        {children}
    </img>
	));

  CustomToggle.displayName = "Edit";
  

	const CustomMenu = React.forwardRef(
		({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
		  const [value, setValue] = useState('');
	  
		  return (
			<div
			  ref={ref}
			  style={{backgroundColor: '#20272b', left: '5px', borderRadius: '6px', padding: '0 0 0 0', fontSize: '14px', top: '-45px', minWidth:'50px'}}
			  className={className}
			  aria-labelledby={labeledBy}
			>
			  <ul className="list-unstyled" style={{marginBottom: '0', padding: '5px 10px'}}>
				{React.Children.toArray(children).filter(
				  (child) =>
					!value || child.props.children?.toLowerCase().startsWith(value),
				)}
			  </ul>
			</div>
		  );
		},
	);

  CustomMenu.displayName = "Edit";

  const changeAddSpec = async (eventkey) => {
		console.log("spec: ", eventkey)

    //Добавить
    if (eventkey.split(' ')[0] === '1' || eventkey==='1') {
      const resProj = await getProjectId(id)
      const startDate = new Date(resProj.dateStart.split('T')[0]).toLocaleString().split(',')[0]
      const startTime = resProj.dateStart.split('T')[1].slice(0,5)

        const arrayCopy = JSON.parse(JSON.stringify(mainspec));

        // если нужен элемент массива
        let max = arrayCopy.reduce((acc, curr) => acc.id > curr.id ? acc : curr);
 
        //readyArray.splice(2, 0, 60);
        arrayCopy.splice(parseInt(eventkey.split(' ')[2])+1, 0, {
          id: max.id,
          userId,
          date: startDate+'T'+startTime,
          specId: '', 
          vidWork: '', 
          specialization: '', 
          comteg: '',
          comment: '',
          stavka: JSON.stringify({label: '№1', name: '№1'}),
          taxi: false,
          merch: false,
          projectId: id,
          number: parseInt(eventkey.split(' ')[2])+1,
        })
        console.log("arrayCopy: ", arrayCopy)
        setMainspec(arrayCopy)

    } 
    //дублировать
    else if (eventkey.split(' ')[0] === '2' || eventkey==='2') {
      console.log("eventkey: ", parseInt(eventkey.split(' ')[2]))

      const checkedItem = mainspec.find((item)=>item.isChecked === true)

      if (checkedItem) {
        console.log("edit all checked")
        handleAllEdit(eventkey)
      } else {
        const dublSpec = mainspec.find((item, index)=> index === parseInt(eventkey.split(' ')[2]))
        console.log("dublSpec: ", dublSpec)
          
          const arrayCopy = JSON.parse(JSON.stringify(mainspec));  
          // если нужен элемент массива
          let max = arrayCopy.reduce((acc, curr) => acc.id > curr.id ? acc : curr);
          console.log("max: ", max)
          const newObj = {
            id: max.id + 1,
            userId,
            date: dublSpec.date,
            specId: dublSpec.specId,
            vidWork: dublSpec.vidWork, //JSON.stringify({name: resAdd.vidWork, color: ''}),
            specialization: dublSpec.specialization, //JSON.stringify({name: resAdd.specialization, color: ''}),
            stavka: dublSpec.stavka, //JSON.stringify({name: resAdd.stavka, color: ''}),
            taxi: dublSpec.taxi,
            merch: dublSpec.merch,
            comment: dublSpec.comment,
            comteg: dublSpec.comteg, //JSON.stringify({name: resAdd.comteg, color: ''}),
            hr: dublSpec.hr,
            projectId: dublSpec.projectId,
          }

          arrayCopy.splice(parseInt(eventkey.split(' ')[2])+1, 0, newObj)
          console.log("arrayCopy: ", arrayCopy)
          setMainspec(arrayCopy)  
      }
    } 
    
    //добавить разделитель
    else if (eventkey.split(' ')[0] === '3' || eventkey==='3') {
      //добавить строку в основной состав
		  //const resAdd = await addMainspec({userId, projectId: id, hr: true, number: parseInt(eventkey.split(' ')[2])+1})

      //if (resAdd) {

        const arrayCopy = JSON.parse(JSON.stringify(mainspec));  
        // если нужен элемент массива
        let max = arrayCopy.reduce((acc, curr) => acc.id > curr.id ? acc : curr);
        console.log("max: ", max)
        arrayCopy.splice(parseInt(eventkey.split(' ')[2])+1, 0, {
          id: max.id + 1,
          userId,
          projectId: id,
          hr: true,
        })
        console.log("arrayCopy: ", arrayCopy)
        setMainspec(arrayCopy)
      //}     
    } 
    //удалить
    else if (eventkey.split(' ')[0] === '4') {
      console.log("index: ", eventkey.split(' ')[1])
      const checkedItem = mainspec.find((item)=>item.isChecked === true)
      //console.log("checkedItem: ", checkedItem)

      if (checkedItem) {
        handleAllDelete()
      } else {
        setMainspec([...mainspec].filter(item=>item.id !== parseInt(eventkey.split(' ')[1])))
        deleteMainspec(eventkey.split(' ')[1])
      }
    }
	}

  useEffect(()=> {
    if (endDate !== '' && endDate !== null) {
      //setEndTime('00:00')
      console.log("endDate: ", endDate)
    }
    
  }, [endDate])


  const changeDateProject=(e, index)=> {
    console.log("change Date: ", index, e.target.value+'T'+'00:00')
    let arr = JSON.parse(JSON.stringify(mainspec))
    // console.log("arr: ", arr)
    arr[index].date = e.target.value+'T' + arr[index].date?.split('T')[1]
    setMainspec(arr)
  }

  const changeTimeProject=(e, index)=> {
    //console.log(e.target.value, index)
    let arr = JSON.parse(JSON.stringify(mainspec))
    arr[index].date = arr[index].date.split('T')[0] + 'T'+ e.target.value
    setMainspec(arr)
  }

  const changeCommentMain=(e, index)=> {
    console.log(e.target.value, index)
    let arr = []
    arr = [...mainspec]
    arr[index].comment = e.target.value
    setMainspec(arr)
  }


  const handleChange=(e)=> {
    const {name, checked} = e.target
    console.log("checked: ", name, checked)

    if (name ==='allselect') {
      const checkedvalue = mainspec.map((user)=>{ return {...user, isChecked: checked}})
      console.log(checkedvalue)
      setMainspec(checkedvalue)
    } else {
      console.log("mainspec: ", mainspec)
      
      const checkedvalue = mainspec.map((user)=>
      user.id === parseInt(name) ? {...user, isChecked: checked} : user)
      console.log("checkedvalue: ", checkedvalue)
      setMainspec(checkedvalue)
    }
  }

  const handleChangeMerch=(e)=> {
    const {name, checked} = e.target
    console.log("checked: ", name, checked)

    if (name ==='allselect') {
      const checkedvalue = mainspec.map((user)=>{ return {...user, merch: checked}})
      console.log(checkedvalue)
      setMainspec(checkedvalue)
    } else {
      console.log("mainspec: ", mainspec)
      
      const checkedvalue = mainspec.map((user)=>
      user.id === parseInt(name) ? {...user, merch: checked} : user)
      console.log("checkedvalue: ", checkedvalue)
      setMainspec(checkedvalue)
    }
  }

  const handleChangeTaxi=(e)=> {
    const {name, checked} = e.target
    console.log("checked: ", name, checked)

    if (name ==='allselect') {
      const checkedvalue = mainspec.map((user)=>{ return {...user, taxi: checked}})
      console.log(checkedvalue)
      setMainspec(checkedvalue)
    } else {
      console.log("mainspec: ", mainspec)
      
      const checkedvalue = mainspec.map((user)=>
      user.id === parseInt(name) ? {...user, taxi: checked} : user)
      console.log("checkedvalue: ", checkedvalue)
      setMainspec(checkedvalue)
    }
  }

  const handleAllEdit = async(eventkey)=> {
    const checkedinputvalue=[]
    for(let i=0; i<mainspec.length; i++) 
    {
      if (mainspec[i].isChecked === true) {
        const obj = {
          id: parseInt(mainspec[i].id),
          element: i
        }
        checkedinputvalue.push(obj)
      }
    }
    console.log("checkedinputvalue: ", checkedinputvalue)

    const arrayCopy = JSON.parse(JSON.stringify(mainspec));
    let arr = []

    checkedinputvalue.map(async(item, index)=> {
      //setTimeout(async()=> {
        const dublSpec = mainspec.find((el)=>el.id === parseInt(item.id))
        console.log("dublSpec: ", dublSpec)

        // если нужен элемент массива
        let max = arrayCopy.reduce((acc, curr) => acc.id > curr.id ? acc : curr);
        
        const newObj = {
              id: max.id + 1,
              userId,
              date: dublSpec.date,
              specId: dublSpec.specId,
              vidWork: dublSpec.vidWork, //JSON.stringify({name: dublSpec.vidWork, color: ''}),
              specialization: dublSpec.specialization, //JSON.stringify({name: dublSpec.specialization, color: ''}),
              stavka: dublSpec.stavka, //JSON.stringify({name: dublSpec.stavka, color: ''}),
              taxi: dublSpec.taxi,
              merch: dublSpec.merch,
              comment: dublSpec.comment,
              comteg: dublSpec.comteg, //JSON.stringify({name: dublSpec.comteg, color: ''}),
              projectId: dublSpec.projectId, 
              hr: dublSpec.hr,
        }
        console.log("newObj: ", newObj)
        arrayCopy.splice(item.element + checkedinputvalue.length, 0, newObj)
 
      //}, 2000)  
      
      console.log("newArr: ", arrayCopy)
      const checkedvalue = arrayCopy.map((user)=>{ return {...user, isChecked: false}})
      
      setMainspec(checkedvalue)
    })

    
  }

  const handleAllDelete =()=> {
    const checkedinputvalue=[]
    for(let i=0; i<mainspec.length; i++) 
    {
      if (mainspec[i].isChecked === true) {
        checkedinputvalue.push(parseInt(mainspec[i].id))
      }
    }

    const copyArray = JSON.parse(JSON.stringify(mainspec));
    
    checkedinputvalue.map(async(item)=> {
      await deleteMainspec(item)
    })

    const result = copyArray.filter(item => !checkedinputvalue.some(el => item.id === el));
    console.log("copyArray: ", result)

    setMainspec(result)
  }

  const onChangeCity = (e) => {
    //console.log(e.target.value)
    if (e) {
      setCity(e.target.value)  
    } else {
      setCity('')  
    }    
  }

  const onChangeCompany= (e) => {
    //console.log(e.target.value)
    if (e) {
      setCompanyName(e.target.value)  
    } else {
      setCompanyName('')  
    }    
  }

  const changeLocation = (e) => {
    setLocationProject(e.target.value)
    if (e.target.value === '') {
      setAddress('')
      setTrack('')
      setGeoId('')
    }
  }


  // const filterOptions = (options, state) => {
  //   let newOptions = [];
  //   options.forEach((element) => {
  //     if (
  //       element
  //         //.replace(",", "")
  //         .toLowerCase()
  //         .includes(state.inputValue.toLowerCase())
  //     )
  //       newOptions.push(element);
  //   });
  //   return newOptions;
  // };
  

  const clickSave = () => {

  }

  // const createPredSmeta = async(id) => {
	// 	// Button begins to shake
	// 	setPress(true);
	// 	console.log(press)
        
	// 	// Buttons stops to shake after 2 seconds
	// 	setTimeout(() => setPress(false), 200);

	// 	audioIshodCall.play();
	// 	await getSendCall(id)
	// }

  const pressPredSmeta = async() => {
    setPlayPredSmeta(!playPredSmeta)

    //api
    console.log("crmID: ", crmID)
    const resAddSmeta = await getCreatePredSmeta(crmID)
    console.log("resAddSmeta: ", resAddSmeta)

    setTimeout(()=> {
      if (resAddSmeta) {
        setDonePredSmeta(true)
      }
    }, 5000)
  }

  const pressFinSmeta = async() => {
    setPlayFinSmeta(!playFinSmeta)

    //api
    console.log("crmID: ", crmID)
    const resAddSmeta = await getCreateFinSmeta(crmID)
    console.log("resAddSmeta: ", resAddSmeta)

    setTimeout(()=> {
      if (resAddSmeta) {
        setDoneFinSmeta(true)
      }
    }, 5000)
  }

  const pressPoster = async() => {
    setPlayPoster(!playPoster)
    setShowLoader(true)

    //api
    const resAddPoster = await getCreatePoster(crmID)
    console.log("resAddPoster: ", resAddPoster)

    setTimeout(()=> {
      setShowLoader(false)
    }, 2000)
  }


  const sortDate = () => {
    setCountPressDate(countPressDate + 1)
    
    if (countPressDate + 1 >= 3) {
      setCountPressDate(0)
    }
    console.log("check sort", countPressDate + 1)

    if (countPressDate + 1 === 1) {
      const sortedWorker = [...pretendents].sort((a, b) => {       
        var tgA = a.data, tgB = b.data 
        return (tgA < tgB) ? -1 : (tgA > tgB) ? 1 : 0;  //сортировка по возрастанию 
      })
      setPretendents(sortedWorker)
    } else if (countPressDate + 1 === 2) {
      const sortedWorker = [...pretendents].sort((a, b) => {       
        var tgA = a.data, tgB = b.data 
        return (tgA > tgB) ? -1 : (tgA < tgB) ? 1 : 0;  //сортировка по возрастанию 
      })
      setPretendents(sortedWorker)
    } else {
      const sortedWorker = [...pretendents].sort((a, b) => {       
        var fioA = a.id, fioB = b.id 
        return fioB-fioA  //сортировка по убыванию 
      })

      setPretendents(sortedWorker)
    }
  }

  const changeDate = (date, e) => {
    console.log(e.target.value)
    setStartDate(date)
  }


  const clickToCall = async(id, callType) => {
		audioIshodCall.play();
		await getCompanySendCall(id, callType)
	}

	const clickToCallRaut = async(id) => {
		audioIshodRobotCall.play();
		await getCompanySendCallRaut(id)
	}


  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            marginTop: 4,
            padding: '9px!important',
            paddingRight: 0,
            height: 36,
            "& .MuiOutlinedInput-notchedOutline": {
              border: `none`,
            },
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                border: `2px solid #26489a`,
              },
            },
            '& .MuiAutocomplete-noOptions': {color: '#fff'}
          }
        }
      }
    }
  });

  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                    {/* <h2>Проекты</h2> */}
                    <CRow className="mt-2">
                      <CCol xs>
                        <CCard className="mb-4" style={{display: showHeader ? 'block' : 'none', position: 'sticky', top: '113px', zIndex:'100'}}>
                          <CCardBody style={{padding: '5px'}}>                                                  
                              <div style={{color: '#fff', zIndex: '100', display: 'flex', justifyContent: 'space-between', width: '-webkit-fill-available', }}>   
                                <div className="text-field" style={{marginBottom: '0'}}>
                                  <input disabled={true} className="text-field__input" type="text" name="projectId" id="projectId" value={crmID} style={{width: '120px', marginRight: '25px'}}/>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                  <CTooltip content="Удалить" placement="bottom" style={customTooltipStyle}>
                                    {/* <Icon id="delete" onClick={()=>clickDelete(id)} style={{cursor: 'pointer'}}/> */}
                                    <img src={DeleteIcon} onClick={() => setVisibleDelete(true)} style={{ cursor: 'pointer', width: '26px', height: '26px', marginLeft: '20px'}}/>  
                                  </CTooltip>
                                  {/* <img src={Trubka} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                  <img src={Tg}  style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/> */}
                                  <img src={zamok} onClick={()=>setShowModalEmpty(true)} style={{cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>
                                  <CTooltip content="Сохранить" placement="bottom" style={customTooltipStyle}>
                                    <img src={Disketa2} onClick={()=>saveProject(id)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                  </CTooltip>
                                  <CTooltip content="Закрыть" placement="bottom" style={customTooltipStyle}>
                                    <img src={Close} onClick={closeProfile} style={{ cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>  
                                  </CTooltip>
                                  
                                </div>                 
                              </div>
                          </CCardBody> 
                        </CCard>  

                        <CCard className="mb-4">
                          {/* <CCardHeader></CCardHeader> */}
                          <CCardBody style={{padding: '12px', height: showHeader ? `${height}px` : `${height+25}px`}}>
                            {!showProject ? <Filters setShowCalendar={setShowCalendar} setShowCalendar2={setShowCalendar2} columnFilters={columnFilters} setColumnFilters={setColumnFilters} /> : '' }
                            {
                              showCalendar ? 
                                // <Calendar openProject={openProject} showSidebar={showSidebar} setShowSidebar={setShowSidebar} setShowProject={setShowProject} setShowCalendar={setShowCalendar} setShowCalendar2={setShowCalendar2} setHeight={setHeight}/>
                                <h2 style={{marginTop: '25%', textAlign: 'center'}}>Раздел находится в разработке</h2>
                                :
                                (showCalendar2 ?
                                  <Calendar2 openProject={openProject} projects={projects} setProjects={setProjects} showSidebar={showSidebar} setShowSidebar={setShowSidebar} setShowProject={setShowProject} setShowCalendar={setShowCalendar} setShowCalendar2={setShowCalendar2} setHeight={setHeight}/>
                                  : 
                                  (showProject ? 
                                    <div style={{position: 'relative', height: '435px', display: 'flex', flexDirection: 'row'}}>

                                          {/* 1 */}                               
                                          <div style={{display: 'flex', flexDirection: 'column', width: '230px', textAlign: 'center', marginTop: '10px', marginRight: '40px'}}>
                                            
                                              <div style={{display: 'flex', justifyContent: 'space-between', width: '230px'}}>
                                                <div>
                                                  <label className='title-label'>Дата</label>
                                                  <div className="text-field">
                                                    {/*<input disabled={true} className="text-field__input" type="text" value='01.01.2024' name="dateReg" id="dateReg" style={{width: '120px'}}/>*/}
                                                    <DatePicker
                                                      className="uley-datepicker-control text-center text-field__input"
                                                      style={{ height: '40px', width: '120px'}}
                                                      selected={startDate}
                                                      onChange={(date, e) => changeDate(date, e)}
                                                      selectsStart
                                                      //startDate={startDate}
                                                      dateFormat="dd.MM.yyyy"
                                                    />
                                                  </div>
                                                </div>
                                                
                                                <div>
                                                  <label className='title-label'>Время</label>
                                                  <div className="text-field">
                                                    {/* <input disabled={false} className="text-field__input" type="text" value={startTime} onChange={(e)=>setStartTime(e.target.value)} name="dateReg2" id="dateReg2" style={{width: '90px',}}/> */}
                                                    <InputMask 
                                                      mask="99:99"
                                                      value={startTime}
                                                      onChange={(e)=>setStartTime(e.target.value)}>
                                                      {(inputProps) => <CFormInput 
                                                                        {...inputProps} 
                                                                        placeholder="" 
                                                                        disableUnderline
                                                                        aria-label="sm input example"
                                                                        className="text-field__input"
                                                                        style={{width: '90px'}} 
                                                                      />}
                                                    </InputMask>
                                                  </div>
                                                </div>
                                              </div>

                                              <div style={{display: 'flex', justifyContent: 'space-between', width: '230px'}}>
                                                <div>
                                                  <label className='title-label'>Дата</label>
                                                  <div className="text-field">
                                                    {/* <input disabled={true} className="text-field__input" type="text" value='01.01.2024' name="dateReg3" id="dateReg3" style={{width: '120px'}}/> */}
                                                    <DatePicker
                                                      className="uley-datepicker-control text-center text-field__input"
                                                      style={{ height: '40px', width: '120px'}}
                                                      selected={endDate}
                                                      onChange={(date) => setEndDate(date)}
                                                      selectsStart
                                                      //endDate={endDate}
                                                      dateFormat="dd.MM.yyyy"
                                                    />
                                                  </div>
                                                </div>
                                                <div>
                                                  <label className='title-label'>Время</label>
                                                  <div className="text-field">
                                                    {/* <input disabled={false} className="text-field__input" type="text" value={endTime} onChange={(e)=>setEndTime(e.target.value)} name="dateReg4" id="dateReg4" style={{width: '90px'}}/> */}
                                                    <InputMask 
                                                      mask="99:99"
                                                      value={endTime}
                                                      onChange={(e)=>setEndTime(e.target.value)}>
                                                      {(inputProps) => <CFormInput 
                                                                        {...inputProps} 
                                                                        placeholder="" 
                                                                        disableUnderline
                                                                        aria-label="sm input example"
                                                                        className="text-field__input"
                                                                        style={{width: '90px'}} 
                                                                      />}
                                                    </InputMask>
                                                  </div>
                                                </div>
                                              </div>

                                              <label className='title-label'>Статус</label>
                                              <div className="text-field">
                                                <MyDropdown4
                                                  style={{backgroundColor: '#131c21'}}
                                                  options={statusData}
                                                  selected={statusProject}
                                                  setSelected={setStatusProject}
                                                  // onChange={addCity}
                                                />
                                                {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '230px', marginRight: '40px'}}/> */}
                                              </div>

                                              
                                              <label className='title-label'>Старт</label>
                                              <div className="text-field">
                                                <MyDropdown4
                                                  style={{backgroundColor: '#131c21'}}
                                                  options={startData}
                                                  selected={startProject}
                                                  setSelected={setStartProject}
                                                  placeholder='Выбери старт'
                                                  // onChange={addCity}
                                                />
                                                {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '230px', marginRight: '40px'}}/> */}
                                              </div>

                                              <label className='title-label'>Специфика</label>
                                              <div className="text-field">
                                                <MyDropdown4
                                                  style={{backgroundColor: '#131c21'}}
                                                  options={specifikaData}
                                                  selected={specifikaProject}
                                                  setSelected={setSpecifikaProject}
                                                  placeholder='Выбери специфику'
                                                  // onChange={addCity}
                                                />
                                                {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '230px', marginRight: '40px'}}/> */}
                                              </div>
                                        </div>

{/* 2 */}   
                                        <div className='widthBlock3' style={{textAlign: 'center', marginTop: '10px', marginRight: '40px'}}>
                                          <label className='title-label'>Проект</label>
                                          <div className="text-field">
                                            <input disabled={false} className="text-field__input" type="text" name="projectName" id="projectName" value={projectName} onChange={(e)=>setProjectName(e.target.value)}/>
                                          </div>

                                          <label className='title-label'>Компания</label>
                                          <div className="text-field">
                                            {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '320px'}}/> */}
                                          <ThemeProvider theme={theme}>
                                            <Autocomplete
                                              sx={{
                                                  display: 'inline-block',
                                                  '& input': {zIndex: '25',
                                                    width: '100%',
                                                    border: 'none',
                                                    height: '40px',
                                                    padding: '5px 4px',
                                                    fontFamily: 'inherit',
                                                    fontSize: '14px',
                                                    fontWeight: '400',
                                                    lineHeight: '1.5',
                                                    textAlign: 'center',
                                                    color: '#ffffff',
                                                    backgroundColor: 'transparent',
                                                  },
                                              }}
                                              PaperComponent={({ children }) => (
                                                <Paper style={{ 
                                                  background: '#131c21', 
                                                  border: '1px solid #2d2e38',
                                                  color: '#fff'
                                                }}>{children}</Paper>
                                              )}
                                              className="text-field__input" 
                                              openOnFocus
                                              id="custom-input-company"
                                              options={companysData}
                                              style={{width: '100%', padding: '0'}}
                                              onInputChange={onChangeCompany}
                                              //isOptionEqualToValue={(option, value) => option === value}
                                              onChange={(event, newValue) => {
                                                  if (newValue && newValue.length) {                                       
                                                      const comp = companysAll.find(item=> item.title === newValue)
                                                      console.log("comp: ", comp)
                                                      if (comp) {
                                                        setCompanyName(comp.title)
                                                        setCompany(comp.id)
                                                        //setPhone()
                                                        // setInn(comp.inn) 
                                                        // setSklad(comp.sklad)
                                                        // setOffice(comp.office)
                                                      }
                                                  }  
                                              }}
                                              value={companyName}
                                              inputValue={companyName}
                                              renderInput={(params) => (
                                              <div ref={params.InputProps.ref} style={{position: 'relative'}}>
                                                  <TextField 
                                                      style={{width: '100%'}}
                                                      className="text-field__input widthBlock3" 
                                                      // style={{height: '20px'}}
                                                      type="text" {...params.inputProps} 
                                                      placeholder='' 
                                                  />
                                              </div>
                                              )}
                                            />
                                            </ThemeProvider>
                                          </div>

                                          <label className='title-label'>Город</label>
                                          <div className="text-field">
                                          <ThemeProvider theme={theme}>
                                            <Autocomplete
                                              sx={{
                                                  display: 'inline-block',
                                                  // width: '380px',
                                                  '& input': {zIndex: '25',
                                                      //width: '260px',
                                                      border: 'none',
                                                      height: '40px',
                                                      padding: '5px 4px',
                                                      fontFamily: 'inherit',
                                                      fontSize: '14px',
                                                      fontWeight: '400',
                                                      lineHeight: '1.5',
                                                      textAlign: 'center',
                                                      color: '#ffffff',
                                                      backgroundColor: 'transparent', 
                                                  }
                                              }}
                                              PaperComponent={({ children }) => (
                                                <Paper style={{background: '#131c21', color: '#fff', border: '1px solid #2d2e38'}}>
                                                  {children}
                                                </Paper>
                                              )}
                                              className="text-field__input" 
                                              openOnFocus
                                              id="custom-input-demo"
                                              options={sortedCities}
                                              style={{width: '100%', padding: '0'}}
                                              //isOptionEqualToValue={(option, value) => option.value === value.value}
                                              onInputChange={onChangeCity}
                                              onChange={(event, newValue) => {
                                                if (newValue && newValue.length) {                                                      
                                                  setCity(newValue)
                                                }  
                                              }}
                                              value={city} 
                                              inputValue={city}
                                              renderInput={(params) => (
                                              <div ref={params.InputProps.ref} style={{position: 'relative'}}>
                                                  <TextField 
                                                      style={{width: '100%'}}
                                                      // className="text-field__input" 
                                                      type="text" {...params.inputProps} 
                                                      placeholder=''
                                                      autoComplete='off'
                                                  />
                                              </div>
                                              )}
                                            />
                                          </ThemeProvider>
                                            
                                          </div>

                                          <label className='title-label'>Локация</label>
                                          <div className="text-field widthBlock3"  onMouseOver={()=>setShowSaveLocation(true)} onMouseOut={()=>setShowSaveLocation(false)}>
                                            {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '320px'}}/> */}
                                            <ThemeProvider theme={theme}>
                                              <Autocomplete
                                                sx={{
                                                    display: 'inline-block',
                                                    '& input': {zIndex: '25',
                                                      width: '100%',
                                                      border: 'none',
                                                      height: '40px',
                                                      padding: '5px 4px',
                                                      fontFamily: 'inherit',
                                                      fontSize: '14px',
                                                      fontWeight: '400',
                                                      lineHeight: '1.5',
                                                      textAlign: 'center',
                                                      color: '#ffffff',
                                                      backgroundColor: 'transparent',
                                                    }
                                                }}
                                                PaperComponent={({ children }) => (
                                                  <Paper style={{ 
                                                    background: '#131c21', 
                                                    color: '#fff',
                                                    border: '1px solid #2d2e38',
                                                  }}>
                                                    {children}
                                                  </Paper>
                                                )}
                                                className="text-field__input" 
                                                openOnFocus
                                                id="custom-input-demo"
                                                options={platformsData}
                                                noOptionsText={'Пусто'}
                                                style={{width: '100%', padding: '0'}}
                                                onInputChange={(e)=>changeLocation(e)}
                                                //onInputChange={(e)=>console.log(e.target.value)}
                                                //isOptionEqualToValue={(option, value) => option.value === value.value}
                                                onChange={(event, newValue) => {
                                                    if (newValue && newValue.length) {
                                                        setLocationProject(newValue)
                                                        
                                                        const loc = platformsAll.find(item=> item.title === newValue)
                                                        console.log("loc: ", loc)
                                                        if (loc) {
                                                          let text = `${loc.city}   
  ${loc.track}   
  ${loc.url}`;
                                                          setAddress(loc.address)
                                                          setTrack(text)
                                                          setGeoId(loc.id)
                                                          setLocation(text)
                                                        }
                                                    }  
                                                }}
                                                value={locationProject}
                                                inputValue={locationProject}
                                                renderInput={(params) => (
                                                <div ref={params.InputProps.ref} style={{position: 'relative'}}>
                                                    <TextField 
                                                        style={{width: '100%'}}
                                                        className="text-field__input" 
                                                        type="text" {...params.inputProps} 
                                                        placeholder=''
                                                    />
                                                </div>
                                                )}
                                              />
                                            </ThemeProvider>
                                            

                                            <img src={Disketa} onClick={()=>{navigator.clipboard.writeText(location)}} alt="" style={{visibility: showSaveLocation ? 'visible' : 'hidden', position: 'absolute', top: '13px', right: '15px', cursor: 'pointer', width: '15px', height: '15px'}}/>
                                          </div>

                                          <label className='title-label'>Адрес</label>
                                          <div className="text-field" onMouseOver={()=>setShowSaveAddress(true)} onMouseOut={()=>setShowSaveAddress(false)}>
                                            <input disabled={false} className="text-field__input" type="text" 
                                              name="address" 
                                              id="address" 
                                              value={address}
                                            />
                                            <img src={Disketa} onClick={()=>{navigator.clipboard.writeText(address)}} alt="" style={{visibility: showSaveAddress ? 'visible' : 'hidden', position: 'absolute', top: '13px', right: '15px', cursor: 'pointer', width: '15px', height: '15px'}}/>
                                          </div>

                                        </div>

{/* 3 */}   
                                        <div className='widthBlock3' style={{textAlign: 'center', marginTop: '10px', marginRight: '40px'}}>
                                          <label className='title-label'>Заказчик</label>
                                          <div className="text-field">
                                            {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '320px'}}/> */}
                                            <ThemeProvider theme={theme}>
                                                <Autocomplete
                                                sx={{
                                                    display: 'inline-block',
                                                    '& input': {zIndex: '25',
                                                        width: '100%',
                                                        border: 'none',
                                                        height: '40px',
                                                        padding: '5px 4px',
                                                        fontFamily: 'inherit',
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        lineHeight: '1.5',
                                                        textAlign: 'center',
                                                        color: '#ffffff',
                                                        backgroundColor: 'transparent', 
                                                    },
                                                    '& .MuiAutocomplete-noOptions': {color: '#fff'}
                                                }}
                                                className="text-field__input" 
                                                id="custom-input-manager"
                                                options={clientsData}
                                                noOptionsText={'Пусто'}
                                                style={{width: '100%', padding: '0'}}
                                                PaperComponent={({ children }) => (
                                                  <Paper style={{ background: '#131c21', border: '1px solid #2d2e38', color: '#fff'}}>{children}</Paper>
                                                )}
                                                // renderOption={(props, option) => {
                                                //   //const { title, color } = option;
                                                //   return (
                                                //     <span style={{ color: '#fff' }}>
                                                //       {option}
                                                //     </span>
                                                //   );
                                                // }}
                                                //isOptionEqualToValue={(option, value) => option.value === value.value}
                                                //filterOptions={filterOptions}
                                                onInputChange={onChangeManager}
                                                onChange={(event, newValue) => {
                                                  if (newValue && newValue.length) {   
                                                    console.log("clientAll: ", clientAll)                                                   
                                                    const comp = clientAll.find(item=> item.userfamily === newValue.toString())
                                                    console.log("comp client: ", comp, newValue)
                                                    if (comp) {
                                                      setPhone(comp.phone)
                                                      setManagerName(comp.userfamily)
                                                    }
                                                  } 
                                                }}
                                                value={managerName} 
                                                inputValue={managerName}
                                                renderInput={(params) => (
                                                  <div ref={params.InputProps.ref} style={{position: 'relative'}}>
                                                      <TextField 
                                                          style={{width: '100%'}}
                                                          className="text-field__input" 
                                                          type="text" {...params.inputProps} 
                                                          placeholder='ФИО'
                                                      />
                                                  </div>
                                                )}
                                              />
                                            </ThemeProvider>
                                            
                                          </div>

                                          <label className='title-label'>Старший</label>
                                          <div className="text-field">
                                          <ThemeProvider theme={theme}>
                                            <Autocomplete
                                              sx={{
                                                  display: 'inline-block',
                                                  '& input': {zIndex: '25',
                                                      width: '100%',
                                                      border: 'none',
                                                      height: '40px',
                                                      padding: '5px 4px',
                                                      fontFamily: 'inherit',
                                                      fontSize: '14px',
                                                      fontWeight: '400',
                                                      lineHeight: '1.5',
                                                      textAlign: 'center',
                                                      color: '#ffffff',
                                                      backgroundColor: 'transparent', 
                                                    },
                                              }}
                                              className="text-field__input" 
                                              fullWidth
                                              PaperComponent={({ children }) => (
                                                <Paper style={{ background: '#131c21', border: '1px solid #2d2e38', color: '#fff'}}>{children}</Paper>
                                              )}
                                              openOnFocus
                                              id="custom-input-manager2"
                                              options={specialistData}
                                              style={{width: '100%', padding: '0'}}
                                              noOptionsText={'Пусто'}
                                              getOptionLabel={(option) => option}
                                              // renderOption={(props, option) => {
                                              //   const { title } = option;
                                              //   return (
                                              //     <span {...props} style={{ backgroundColor: '#fff' }}>
                                              //       {option}
                                              //     </span>
                                              //   );
                                              // }}
                                              //isOptionEqualToValue={(option, value) => option.value === value.value}
                                              onInputChange={onChangeManager2} 
                                              // onInputChange={(event, newInputValue) => {
                                              //   setManagerName2(newInputValue);
                                              // }}
                                              onChange={(event, newValue) => {
                                                if (newValue && newValue.length) {  
                                                  console.log("workersAll 2: ", workersAll)                                                     
                                                  const comp = workersAll.find(item=> item.userfamily === newValue)
                                                  console.log("comp worker: ", comp, newValue)
                                                  if (comp) {
                                                    setPhone2(comp.phone)
                                                    setManagerName2(comp.userfamily)
                                                  }
                                                }  
                                              }}
                                              value={managerName2} 
                                              inputValue={managerName2}
                                              renderInput={(params) => (
                                              <div ref={params.InputProps.ref} style={{position: 'relative'}}>
                                                  <TextField 
                                                      style={{width: '100%'}}
                                                      //className="text-field__input" 
                                                      type="text" {...params.inputProps} 
                                                      placeholder='ФИО'
                                                  />
                                              </div>
                                              )}
                                            />
                                          </ThemeProvider>
                                          </div>

                                          <label className='title-label'>Техническое Задание</label>
                                          {/* <div className="text-field" style={{marginBottom: '0px'}}>
                                            <textarea 
                                              className="text-field__input widthBlock3"
                                              type="text" 
                                              name="comment" 
                                              id="comment"
                                              value={tehText}
                                              onChange={(e)=>setTehText(e.target.value)}
                                              style={{resize: 'none', height: '208px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left', marginBottom: '20px'}}
                                            />
                                          </div>  */}

                                          <div className="text-field">
                                            <input disabled={false} className="text-field__input" type="text" 
                                              name="address" 
                                              id="address" 
                                            />
                                          </div>

                                          <div style={{position:'relative'}}>
                                            <label className='title-label'>Как добраться</label>
                                            <div className="text-field" style={{marginBottom: '0px'}} >
                                              <textarea 
                                                className="text-field__input widthBlock3" 
                                                type="text" 
                                                name="treck" 
                                                id="treck"
                                                value={track}
                                                style={{resize: 'none',  height: '125px', whiteSpace: 'nowrap', borderRadius: '6px', textAlign: 'left'}}
                                                onMouseOver={()=>setShowSaveTreck(true)} onMouseOut={()=>setShowSaveTreck(false)}
                                              />
                                            </div> 
                                            <img src={Disketa} onClick={()=>{navigator.clipboard.writeText(track)}} alt="" style={{visibility: showSaveTreck ? 'visible' : 'hidden', position: 'absolute', top: '30px', right: '-25px', cursor: 'pointer', width: '15px', height: '15px'}}/>
                                          </div>

                                          {/* <label className='title-label' style={{marginTop: '44px', position: 'absolute', top: '387px', right: '200px'}}>Техническое Задание</label>

                                          <div  style={{display: 'flex', flexDirection: 'row', marginTop: '45px'}}>
                                            <div>
                                              <div style={{display: 'flex'}}>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={false} className="text-field__input" type="text" name="teh1" id="teh1" value={teh1} onChange={(e)=>setTeh1(e.target.value)} style={{textAlign: 'left', width: '160px', marginRight: '0px'}}/>
                                                </div>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={false} className="text-field__input" type="text" name="teh2" id="teh2" value={teh2} onChange={(e)=>setTeh2(e.target.value)} style={{textAlign: 'left', width: '160px', marginRight: '0px'}}/>
                                                </div>
                                              </div>
                                              <div style={{display: 'flex'}}>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={false} className="text-field__input" type="text" name="teh3" id="teh3" value={teh3} onChange={(e)=>setTeh3(e.target.value)} style={{textAlign: 'left', width: '160px', marginRight: '0px'}}/>
                                                </div>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={false} className="text-field__input" type="text" name="teh4" id="teh4" value={teh4} onChange={(e)=>setTeh4(e.target.value)} style={{textAlign: 'left', width: '160px', marginRight: '0px'}}/>
                                                </div>
                                              </div>
                                            </div>
                                          </div> */}
                                        </div>

{/* 4 */}   
                                        <div className='widthBlock4' style={{textAlign: 'center', marginTop: '10px', marginRight: '10px'}}>
                                          <label className='title-label'>Телефон</label>
                                          <div className="text-field" onMouseOver={()=>setShowSavePhone(true)} onMouseOut={()=>setShowSavePhone(false)}>
                                            {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '230px', marginRight: '10px'}}/> */}
                                            <InputMask
                                                className="text-field__input" 
                                                style={{marginRight: '10px'}}
                                                type="text" 
                                                name="phone" 
                                                id="phone"
                                                mask="+7 (999) 999-99-99"
                                                disabled={true}
                                                maskChar=""
                                                // onChange={(e) => setPhone(e.target.value)} 
                                                value={phone}
                                                placeholder=''
                                            >
                                            </InputMask>
                                            <img src={Disketa} onClick={()=>{navigator.clipboard.writeText(phone)}} alt="" style={{visibility: showSavePhone ? 'visible' : 'hidden', position: 'absolute', top: '13px', right: '15px', cursor: 'pointer', width: '15px', height: '15px'}}/>
                                          </div>

                                          <label className='title-label'>Телефон</label>
                                          <div className="text-field" onMouseOver={()=>setShowSavePhone2(true)} onMouseOut={()=>setShowSavePhone2(false)}>
                                            {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '230px', marginRight: '10px'}}/> */}
                                            <InputMask
                                                className="text-field__input" 
                                                style={{marginRight: '10px'}}
                                                type="text" 
                                                name="phone2" 
                                                id="phone2"
                                                mask="+7 (999) 999-99-99"
                                                disabled={true}
                                                maskChar=""
                                                // onChange={(e) => setPhone2(e.target.value)} 
                                                value={phone2}
                                                placeholder=''
                                            >
                                            </InputMask>
                                            <img src={Disketa} onClick={()=>{navigator.clipboard.writeText(phone2)}} alt="" style={{visibility: showSavePhone2 ? 'visible' : 'hidden', position: 'absolute', top: '13px', right: '15px', cursor: 'pointer', width: '15px', height: '15px'}}/>
                                          </div>

                                          


                                          {/* <label className='title-label' style={{marginLeft: '50px'}}>Комментарии</label>
                                          <div className="text-field" style={{marginBottom: '0px'}}>
                                                <textarea 
                                                  className="text-field__input widthBlock5" 
                                                  type="text" 
                                                  name="comment" 
                                                  id="comment"
                                                  style={{resize: 'none', height: '92px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left', marginRight: '40px'}}
                                                  value={comment}
                                                  onChange={(e)=>setComment(e.target.value)}
                                                />
                                            </div> */}

                                          <div style={{textAlign: 'left', display: 'flex', flexDirection: 'column', marginTop: '33px'}}>
                                            <label className='title-label' style={{marginTop: '10px'}}>Техническое задание №1</label>

                                            <label className='title-label' style={{marginTop: '20px'}}>Техническое задание №2</label>

                                            <label className='title-label' style={{marginTop: '20px'}}>Документы</label>

                                            <label className='title-label' style={{marginTop: '20px'}}>Перекличка</label>

                                            <label className='title-label' style={{marginTop: '20px'}}>Списки</label>
                                          </div>

                                          {/* <div style={{marginTop: '93px', marginLeft: '-40px'}}>
                                              <div style={{display: 'flex'}}>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={false} className="text-field__input" type="text" name="teh5" id="teh5" value={teh5} onChange={(e)=>setTeh5(e.target.value)} style={{textAlign: 'left', width: '160px', marginRight: '0px'}}/>
                                                </div>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={false} className="text-field__input" type="text" name="teh6" id="teh6" value={teh6} onChange={(e)=>setTeh6(e.target.value)} style={{textAlign: 'left', width: '160px', marginRight: '0px'}}/>
                                                </div>
                                              </div>
                                              <div style={{display: 'flex'}}>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={false} className="text-field__input" type="text" name="teh7" id="teh7" value={teh7} onChange={(e)=>setTeh7(e.target.value)} style={{textAlign: 'left', width: '160px', marginRight: '0px'}}/>
                                                </div>
                                                <div className="text-field" style={{marginBottom: '0px'}}>
                                                  <input disabled={false} className="text-field__input" type="text" name="teh8" id="teh8" value={teh8} onChange={(e)=>setTeh8(e.target.value)} style={{textAlign: 'left', width: '160px', marginRight: '0px'}}/>
                                                </div>
                                              </div>
                                          </div> */}
                                        </div>

                                        {/* 5 */}   
                                        <div style={{textAlign: 'center', marginTop: '10px'}}>
                                          <div className="text-field text-field__input" style={{textAlign: 'center', height: '40px', width: '40px', padding: '5px', marginTop: '24px'}}>
                                            <img src={Trubka}
                                              onClick={()=>{
                                                const client = clientAll.find(item=> item.userfamily === managerName)
                                                console.log("client: ", clientAll, client)
                                                setClientIshod({fio: client?.userfamily, city: client?.city, avatar: client?.avatar, comteg: client?.comteg, dolgnost: client?.dolgnost, companys: client?.companys, sfera: client?.sfera, comment: client?.comment})
                                                setShowCallCardClient(true)
                                                clickToCall(client.id, 'c')
                                              }} 
                                              style={{cursor: 'pointer', width: '24px', height: '24px'}}/>
                                          </div>

                                          <div className="text-field text-field__input" style={{textAlign: 'center', height: '40px', width: '40px', padding: '5px', marginTop: '44px'}}>
                                            <img src={Trubka} 
                                              onClick={()=>{
                                                const comp = workersAll.find(item2=> item2.userfamily === managerName2)
                                                console.log("worker id: ", comp)
                                                setWorkerIshod({fio: comp?.userfamily, city: comp?.city, avatar: comp?.avatar, worklist: comp?.worklist, dateborn: comp?.dateborn, comteg: comp?.comteg, comment: comp?.comment, skill: comp?.skill})
                                                setShowCallCardWorker(true)                                            
                                                clickToCall(comp?.id, 'w')
                                              }} style={{cursor: 'pointer', width: '24px', height: '24px'}}/>
                                          </div>

                                          <div className="text-field text-field__input" onClick={()=>setVisibleTZ(true)} style={{textAlign: 'center', height: '40px', width: '40px', marginBottom: '5px', fontSize: '20px', marginTop: '35px'}}>
                                            {
                                              playPredSmeta ? 
                                              (donePredSmeta ? <img src={btnYellow} alt='' width={25} style={{marginBottom: '7px'}}/> :   
                                                <img src={btnBlue} alt='' width={25} style={{marginBottom: '7px'}}/>
                                              )
                                              
                                              : <img src={btnRed} alt='' width={25} style={{marginBottom: '7px'}}/>
                                            }
                                          </div>

                                          <div className="text-field text-field__input" style={{textAlign: 'center', height: '40px', width: '40px', marginBottom: '5px', fontSize: '20px'}}>
                                          {
                                              playFinSmeta ? 
                                              (doneFinSmeta ? <img src={btnYellow} alt='' width={25} style={{marginBottom: '7px'}}/> :   
                                                <img src={btnBlue} alt='' width={25} style={{marginBottom: '7px'}}/>
                                              )
                                              
                                              : <img src={btnRed} alt='' width={25} style={{marginBottom: '7px'}}/>
                                            }                   
                                          </div>

                                          <div className="text-field text-field__input" style={{textAlign: 'center', height: '40px', width: '40px', marginBottom: '5px', fontSize: '20px', color: 'blue'}}>
                                            {
                                              playPoster ? 
                                              (showLoader ? <CSpinner style={{width: '20px', height: '20px'}}/> :
                                                <img src={btnYellow} alt='' width={25} style={{marginBottom: '7px'}}/>
                                              )
                                              : <img src={btnBlue} alt='' width={25} style={{marginBottom: '7px'}}/>
                                            }
                                          </div>

                                          <div className="text-field text-field__input" style={{textAlign: 'center', height: '40px', width: '40px', marginBottom: '5px', fontSize: '20px', color: 'blue'}}>
                                            {
                                              playPoster ? 
                                              (showLoader ? <CSpinner style={{width: '20px', height: '20px'}}/> :
                                                <img src={btnYellow} alt='' width={25} style={{marginBottom: '7px'}}/>
                                              )
                                              : <img src={btnBlue} alt='' width={25} style={{marginBottom: '7px'}}/>
                                            }
                                          </div>

                                          <div className="text-field text-field__input" style={{textAlign: 'center', height: '40px', width: '40px', marginBottom: '15px', fontSize: '20px', color: 'blue'}}>
                                            {
                                              playPoster ? 
                                              (showLoader ? <CSpinner style={{width: '20px', height: '20px'}}/> :
                                                <img src={btnYellow} alt='' width={25} style={{marginBottom: '7px'}}/>
                                              )
                                              : <img src={btnBlue} alt='' width={25} style={{marginBottom: '7px'}}/>
                                            }
                                          </div>
                                        </div>
                                        
                            {/* </CCollapse> */}
                                    </div>
                                  :'')
                                )
                              
                            }
                            {/* Сайдбар с комментариями */}
                            <div style={{
                                display: showSidebar ? 'block' : 'none',
                                position: 'absolute',
                                right: '0px',
                                top: '120px',
                                height: '580px',
                                background: '#10171a'
                              }}>

                              <div>
                                <img src={Close} onClick={()=>setShowSidebar(false)} style={{position: 'absolute', top: '15px', right: '15px'}}/>
                              </div>

                              <div style={{width: '20rem'}}>

                              </div>

                            </div>

                          </CCardBody>
                        </CCard>

                        
                        <CCard className="mb-4" style={{display: showMainTable ? 'block' : 'none'}}>
                          <CCardHeader onClick={() => setVisibleA(!visibleA)}>Сотрудники</CCardHeader>
                          <CCollapse visible={visibleA}>
                            <CCardBody style={{padding: '12px'}}>
                              <CTable align="middle" className="mb-0 border table-dark" hover responsive style={{fontSize: '16px',overflow: 'hidden', width: '1592px', borderRadius: '5px' }}>
                                <CTableHead className="text-center" color="light">
                                  <CTableRow>
                                    <CTableHeaderCell className="text-center" style={{width: '56px'}}>
                                      <CFormCheck
                                        name="allselect"
                                        checked={ !mainspec.some((user)=>user?.isChecked !== true) }
                                        onChange={handleChange}
                                        style={{backgroundColor: '#181924', border: '1px solid #121212'}}
                                      />
                                    </CTableHeaderCell> 
                                    <CTableHeaderCell className="text-center" style={{width: '180px'}}>Дата</CTableHeaderCell> 
                                    <CTableHeaderCell className="text-center" style={{minWidth: '170px'}}>Вид работ</CTableHeaderCell>  
                                    <CTableHeaderCell className="text-center" style={{minWidth: '50px'}}>ФИО</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center" style={{minWidth: '20px'}}></CTableHeaderCell> 
                                    <CTableHeaderCell className="text-center" style={{minWidth: '20px'}}></CTableHeaderCell>
                                    <CTableHeaderCell className="text-center" style={{minWidth: '250px'}}>Специальность</CTableHeaderCell>  
                                    <CTableHeaderCell className="text-center" style={{minWidth: '40px'}}>Ставка</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center" style={{minWidth: '250px'}}>Комтег</CTableHeaderCell>                         
                                    <CTableHeaderCell className="text-center" style={{minWidth: '170px'}}>Комментарий</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center" style={{minWidth: '50px'}}>Мерч</CTableHeaderCell>
                                    <CTableHeaderCell className="text-center" style={{minWidth: '50px'}}>Такси</CTableHeaderCell>
                                  </CTableRow>
                                </CTableHead>
                                <CTableBody> 
                                { mainspec.length > 0 ?
                                 mainspec.map((item, index)=> (
                                  <CTableRow className="parent-element" key={item.id} v-for="item in tableItems" style={{lineHeight: '14px'}}>
                                    <CTableDataCell className="text-center" style={{position: 'relative', height: '30px'}}>
                                      <div style={{position: 'absolute', left: '3px', top: '6px'}}>
                                        <Dropdown onSelect={changeAddSpec}>
                                          <Dropdown.Toggle 
                                            as={CustomToggle} 
                                            //id="dropdown-custom-components"
                                            key={item.id}
                                            id={`dropdown-button-drop-${item.id}`}
                                            drop={index === mainspec.length-1 ? 'up' : 'down'}
                                          >											
                                          </Dropdown.Toggle>
                                          <Dropdown.Menu as={CustomMenu}> 
                                          <Dropdown.Item eventKey={`1 ${item.id} ${index}`}>Добавить</Dropdown.Item>
                                          <Dropdown.Item eventKey={`2 ${item.id} ${index}`}>Дублировать</Dropdown.Item>
                                          <Dropdown.Item eventKey={`3 ${item.id} ${index}`}>Разделитель</Dropdown.Item>
                                          <Dropdown.Item eventKey={`4 ${item.id} ${index}`}>Удалить</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </div>                              

                                      <CFormCheck 
                                        name={item.id}
                                        checked={item?.isChecked || false}
                                        onChange={handleChange}
                                        style={{backgroundColor: '#181924', border: '1px solid #434343', margin: '0px 5px', position: 'absolute', left: '15px', top: '7px'}} 
                                      />
                                      
                                      {/* {item.hr ? '' : <span style={{position: 'absolute', left: '45px', top: '8px'}}>❌</span>} */}
                                      {item.hr ? '' : <span style={{position: 'absolute', left: '45px', top: '8px'}}>{item.count}</span>}
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                      {item.hr ?
                                      <></>
                                      :<div style={{display: 'flex'}}>
                                        <InputMask 
                                          mask="99.99.9999"
                                          value={item.date !== 'undefined' ? item.date?.split('T')[0] : ''}
                                          onChange={(e)=>changeDateProject(e, index)}>
                                          {(inputProps) => <CFormInput 
                                                            {...inputProps} 
                                                            placeholder="" 
                                                            disableUnderline
                                                            aria-label="sm input example"
                                                            style={{backgroundColor: 'transparent', height: '14px', textAlign: 'center', border: 'none', borderRadius: '5px', width: '109px'}} 
                                                          />}
                                        </InputMask>
                                        <InputMask 
                                          mask="99:99"
                                          value={item.date !== 'undefined' ? item.date?.split('T')[1] : ''}
                                          onChange={(e)=>changeTimeProject(e, index)}>
                                          {(inputProps) => <CFormInput 
                                                            {...inputProps} 
                                                            placeholder="" 
                                                            disableUnderline
                                                            aria-label="sm input example"
                                                            style={{backgroundColor: 'transparent', height: '14px', border: 'none', borderRadius: '5px', width: '50px', padding: '5px 0px'}} 
                                                          />}
                                        </InputMask>
                                      </div>
                                    } 
                                    </CTableDataCell>  
                                    <CTableDataCell className="text-center" style={{height: '26px'}}>
                                      {item.hr ?
                                      <></> 
                                      :
                                      <MyDropdown5
                                        options={vids}
                                        selected={mainspec}
                                        setSelected={setMainspec}
                                        index={index}
                                        element={'vidWork'}
                                        placeholder='—'
                                      />
                                      }
                                    </CTableDataCell>   
                                    <CTableDataCell className="text-center">
                                    {item.hr ?
                                      <></> 
                                      :<MyDropdown6
                                        options={workersData}
                                        selected={mainspec}
                                        setSelected={setMainspec}
                                        index={index}
                                        element={'specId'}
                                        placeholder=''
                                        style={{width: '370px'}}
                                      />
                                    }
                                    
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center" style={{padding: '0px 5px'}}>
                                    {item.hr ?
                                      <></>
                                      :<img onClick={()=>{
                                          if (item.specId) {
                                            const worker = workersAll.find(item2=> item2.id.toString() === item.specId.toString())
                                            //console.log("worker id: ", item.specId, workersAll)
                                            if (worker) {
                                              setWorkerIshod({fio: worker?.userfamily, city: worker?.city, avatar: worker?.avatar, worklist: worker?.worklist, dateborn: worker?.dateborn, comteg: worker?.comteg, comment: worker?.comment, skill: worker?.skill})
                                              setShowCallCardWorker(true)
                                              clickToCall(item.specId, 'w')
                                            }
                                          }
                                      }} src={Trubka} alt='' style={{cursor: 'pointer', width: '20px', height: '20px'}}/>
                                    }
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center" style={{padding: '0px 5px'}}>
                                    {item.hr ?
                                      <></>
                                      :<img onClick={()=>{
                                          if (item.specId) {
                                            const worker = workersAll.find(item2=> item2.id.toString() === item.specId.toString())
                                            console.log("worker id: ", worker, item.specId)
                                            if (worker) {
                                              setWorkerIshod({fio: worker?.userfamily, city: worker?.city, dateborn: worker?.dateborn,})
                                              setShowCallCardRobot(true)
                                              clickToCallRaut(item.specId)
                                            }
                                          }   
                                        }} src={robot} alt='' style={{cursor: 'pointer', width: '20px', height: '20px'}}/>
                                      }
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center widthSpace">
                                    {item.hr ?
                                      <></> 
                                      :<MyDropdown5
                                        options={specialities}
                                        selected={mainspec}
                                        setSelected={setMainspec}
                                        index={index}
                                        element={'specialization'}
                                      />
                                    }
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                    {item.hr ?
                                      <></> 
                                      :<MyDropdown5
                                        options={[{value: 1, label: "№1", name: '№1', color: ''}, {value: 2, label: "№2", name: '№2', color: ''}, {value: 3, label: "№3", name: '№3', color: ''}, {value: 4, label: "№4", name: '№4', color: ''}, {value: 5, label: "№5", name: '№5', color: ''}, {value: 6, label: "№6", name: '№6', color: ''}, {value: 7, label: "№7", value: '7', color: ''}, {value: 8, label: "№8", value: '8', color: ''}]}
                                        selected={mainspec}
                                        setSelected={setMainspec}
                                        index={index}
                                        element={'stavka'}
                                        style={{width: '130px'}}
                                      />
                                    }
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center">
                                    {item.hr ?
                                      <></> 
                                      :<MyDropdown5
                                        options={comtegs}
                                        selected={mainspec}
                                        setSelected={setMainspec}
                                        index={index}
                                        element={'comteg'}
                                        style={{width: '300px'}}
                                      />
                                    }
                                    </CTableDataCell>   
                                    <CTableDataCell className="text-center">
                                      {item.hr ?
                                      <></>
                                      :<input
                                        name='commentMain'
                                        value={item.comment}
                                        onChange={(e)=>changeCommentMain(e, index)}
                                        style={{backgroundColor: 'transparent', height: '15px', textAlign: 'center', border: 'none', width: '140px', padding: '5px 0px', color: '#f3f3f3', fontSize: '14px'}} 
                                      ></input>
                                      }
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center" style={{position: 'relative', height: '30px'}}>
                                      {item.hr ?
                                      <></>
                                      :<CFormCheck 
                                        name={item.id}
                                        checked={item?.merch || false}
                                        onChange={handleChangeMerch}
                                        style={{backgroundColor: '#181924', border: '1px solid #434343', margin: '0px 5px', position: 'absolute', left: '15px', top: '7px'}} 
                                      />
                                      }
                                    </CTableDataCell> 
                                    <CTableDataCell className="text-center" style={{position: 'relative', height: '30px'}}>
                                      {item.hr ?
                                      <></>
                                      :<CFormCheck 
                                        name={item.id}
                                        checked={item?.taxi || false}
                                        onChange={handleChangeTaxi}
                                        style={{backgroundColor: '#181924', border: '1px solid #434343', margin: '0px 5px', position: 'absolute', left: '15px', top: '7px'}} 
                                      />
                                    }
                                    </CTableDataCell>           
                                    </CTableRow>
                                  ))
                                  :""
                                }
                                </CTableBody>                   
                              </CTable>
                            </CCardBody>
                          </CCollapse>
                        </CCard>

                        <CCard
                    className="mb-4"
                    style={{ display: showPretendentTable ? 'block' : 'none' }}
                  >
                    <CCardHeader onClick={() => setVisibleB(!visibleB)}>Претенденты</CCardHeader>
                    <CCollapse visible={visibleB}>
                      <CCardBody style={{ padding: '12px' }}>
                        <CTable
                          align="middle"
                          className="mb-0 border"
                          hover
                          responsive
                          style={{
                            fontSize: '16px',
                            overflow: 'auto',
                            width: '1471px',
                            borderRadius: '5px',
                          }}
                        >
                          <CTableHead className="text-center" color="light">
                            <CTableRow>
                              <CTableHeaderCell className="text-center">
                                <split style={{ position: 'absolute', left: '47px', top: '63px' }}>
                                  {3}
                                </split>
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                onClick={sortDate}
                                className="text-center"
                                style={{ width: '160px' }}
                              >
                                Дата
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '50px' }}
                              >
                                Статус
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '50px' }}
                              >
                                ФИО
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '20px' }}
                              ></CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '250px' }}
                              >
                                Специальность
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '40px' }}
                              >
                                Проекты
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '250px' }}
                              >
                                Комтег
                              </CTableHeaderCell>
                              <CTableHeaderCell
                                className="text-center"
                                style={{ minWidth: '170px' }}
                              >
                                Комментарий
                              </CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            <CTableRow
                                    v-for="item in tableItems"
                                    style={{ lineHeight: '14px' }}
                                  >
                                    <CTableDataCell
                                      className="text-center"
                                      style={{ position: 'relative' }}
                                    >
                                      <div
                                        className="parent-element"
                                        style={{ position: 'absolute', left: '5px', top: '6px' }}
                                      >
                                        <Dropdown>
                                          <Dropdown.Toggle
                                            as={CustomToggle}
                                            id="dropdown-custom-components"
                                          ></Dropdown.Toggle>
                                          <Dropdown.Menu as={CustomMenu}>
                                            <Dropdown.Item>Добавить</Dropdown.Item>
                                            <Dropdown.Item>Дублировать</Dropdown.Item>
                                            <Dropdown.Item>Разделитель</Dropdown.Item>
                                            <Dropdown.Item>Удалить</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        25.04.2025 <span style={{paddingLeft: '10px'}}>10:00</span>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                      <CFormCheck 
                                        name={1}
                                        checked={isChecked}
                                        onChange={()=>setIsChecked(!isChecked)}
                                        style={{backgroundColor: '#181924', border: '1px solid #434343', margin: '0px 5px',}} 
                                      />
                                    </CTableDataCell>
                                    <CTableDataCell
                                      className="text-left"
                                      style={{ cursor: 'pointer', }}
                                    >
                                      Илья
                                    </CTableDataCell>
                                    <CTableDataCell
                                      className="text-center"
                                      style={{ padding: '0px 5px' }}
                                    >
                                      
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center widthSpace">
                                      <CTooltip
                                          content='Системный инженер'
                                          placement="bottom"
                                          style={customTooltipStyle}
                                        >
                                          <div>
                                          Системный инженер
                                          </div>
                                        </CTooltip>
                                      
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">5 | 10</CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        Нарушение субординации
                                    </CTableDataCell>
                                    <CTableDataCell className="text-left">
                                      <CTooltip
                                          content='❌ Живет у м. Беговая 

❌ 10.04.2025 | Memories — Опоздание на проект = 15 мин.
🔵 Рейтинг: 5

❌ 09.04.2025 | Прорыв — Опоздание = 2,5 ч. Проспал, забыл документы, возвращался за ними домой.
🔵 Рейтинг: 5

❌ 13.03 — 14.03.2025 | Niletto 
🔵 Рейтинг: 5

❌ 08.03 — 09.03.2025 | Ласточка
🔵 Рейтинг: 5

❌ 09.01.2025 | Дом Офицеров — Вышел на связь | НЕ вышел из дома | На первый звонок ответил, далее не отвечал

❌ 19.12.2023 | ВДНХ — Не вышел на смену | Не выходит на связь, отклоняет вызовы

❌ 12.12.2023 | ВДНХ — опоздание на 5 минут

❌ 11.12.2023 | ВДНХ — Опоздание на 10 минут

❌ 08.12.2023 | ВДНХ — Опоздал на 20 минут

❌ 22.09 | Beta East — Заменили Волкодавовым

❌ 10.09 | Манеж — Старший. Опоздал [на место встречи?]

❌ 20.08 | Арена — Опоздал на место встречи на 15 минут.

❌14.08 | База АСТ — Невыход. Заболел, самостоятельно нашел себе замену Москаевым.

❌ 07.07 | ТВЭЛ — Опоздал на проект на 4 часа??? минут

❌ 04.07 | ТВЭЛ — Опоздание 10 мин

❌ 24.04 | ВТБ Арена — Опоздал на 5 минут 

❌ 09.09.2024 | Панно —  приехал на площадку вовремя, стало плохо, заказчик его отпустил по состоянию здоровья.

❌ 17.09.2024 | Панно —  Забыл поставить начало сразу, поставил только в 20 минут |  Заболел живот, отпросился у заказчика, нам не сообщил и ушел | Окончание 15:00

❌ 19.09.2024 | Панно —  Заказчица сказала, кто устал может не выходить и он не вышел, не согласовывая это с нами

❌ 16.08.2024 | Панно —  Опоздание = 19 мин. 

❌ 04.09.2024 | Панно —  Опоздание = 3 мин. Ставка 600 х 8

❌ 03.09.2024 | Панно —   Ставка 600 х 8

❌ 31.08.2024 | Панно —  Опоздание = 7 мин. 

❌ 29.08.2024 | Панно —  Опоздание = 10 мин. 

❌ 12.12.2023 | ВДНХ —  Опоздал на 5 минут

❌ 11.12.2023 | ВДНХ —  Опоздание на 10 минут

❌ 08.12.2023 | ВДНХ —  Опоздал на 20 минут

❌ 20.08.2023 | Арена —  Опоздал на место встречи на 15 минут

❌ 29.08.2024 | Панно —  Опоздание = 10 мин. 

❌ 31.08.2024 | Панно —  Опоздание = 7 мин.'
                                          placement="bottom"
                                          style={customTooltipStyle}
                                        >
                                          <div>
                                          ❌ Живет у м. Беговая ❌ 10.04...
                                          </div>
                                        </CTooltip>
                                      
                                    </CTableDataCell>
                            </CTableRow>
                            <CTableRow
                                    v-for="item in tableItems"
                                    style={{ lineHeight: '14px' }}
                                  >
                                    <CTableDataCell
                                      className="text-center"
                                      style={{ position: 'relative' }}
                                    >
                                      <div
                                        className="parent-element"
                                        style={{ position: 'absolute', left: '5px', top: '6px' }}
                                      >
                                        <Dropdown>
                                          <Dropdown.Toggle
                                            as={CustomToggle}
                                            id="dropdown-custom-components"
                                          ></Dropdown.Toggle>
                                          <Dropdown.Menu as={CustomMenu}>
                                            <Dropdown.Item>Добавить</Dropdown.Item>
                                            <Dropdown.Item>Дублировать</Dropdown.Item>
                                            <Dropdown.Item>Разделитель</Dropdown.Item>
                                            <Dropdown.Item>Удалить</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        25.04.2025 <span style={{paddingLeft: '10px'}}>10:05</span>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                      <CFormCheck 
                                        name={2}
                                        checked={isChecked2}
                                        onChange={()=>setIsChecked2(!isChecked2)}
                                        style={{backgroundColor: '#181924', border: '1px solid #434343', margin: '0px 5px',}} 
                                      />
                                    </CTableDataCell>
                                    <CTableDataCell
                                      className="text-left"
                                      style={{ cursor: 'pointer', }}
                                    >
                                      Егор
                                    </CTableDataCell>
                                    <CTableDataCell
                                      className="text-center"
                                      style={{ padding: '0px 5px' }}
                                    >
                                      
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center widthSpace">
                                      <CTooltip
                                          content='Звукорежессер'
                                          placement="bottom"
                                          style={customTooltipStyle}
                                        >
                                          <div>
                                            Звукорежессер
                                          </div>
                                        </CTooltip>
                                      
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">3 | 3</CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        Опоздание
                                    </CTableDataCell>
                                    <CTableDataCell className="text-left">
                                      <CTooltip
                                          content='🔵 Живет в р-оне  Зябликово

❌ 22.04.2025 | Презентация
🔵 Рейтинг: 5

❌ 19.04.2025 | Restart
🔵 Рейтинг: 5

❌ 11.04.2025 | Мосфильм
🔵 Рейтинг: 5

❌ 10.04 — 13.04.2025 | Memories — 10.04 опоздание на место встречи = 5 мин 
🔵 Рейтинг: 5

❌ 09.04 — 12.04.2025 | Прорыв 
🔵 Рейтинг: 5

❌ 21.03.2025 | Кристалл 
🔵 Рейтинг: 5

❌ 19.03 — 20.03.2025 | Vintage
🔵 Рейтинг: 5

❌ 13.03 — 14.03.2025 | Niletto 
🔵 Рейтинг: 5

❌ 08.03 — 09.03.2025 | Ласточка
🔵 Рейтинг: 5

❌ 28.02.2025 | Мосфильм
🔵 Рейтинг: 5

❌ Телефон №2: 8 (910) 869-37-07

🔵 Ранее помогал грузить звуковое оборудование, аккуратен к выполнению задач'
                                          placement="bottom"
                                          style={customTooltipStyle}
                                        >
                                          <div>
                                          🔵 Живет в р-оне  Зябликово...
                                          </div>
                                        </CTooltip>
                                      
                                    </CTableDataCell>
                            </CTableRow>
                            <CTableRow
                                    v-for="item in tableItems"
                                    style={{ lineHeight: '14px' }}
                                  >
                                    <CTableDataCell
                                      className="text-center"
                                      style={{ position: 'relative' }}
                                    >
                                      <div
                                        className="parent-element"
                                        style={{ position: 'absolute', left: '5px', top: '6px' }}
                                      >
                                        <Dropdown>
                                          <Dropdown.Toggle
                                            as={CustomToggle}
                                            id="dropdown-custom-components"
                                          ></Dropdown.Toggle>
                                          <Dropdown.Menu as={CustomMenu}>
                                            <Dropdown.Item>Добавить</Dropdown.Item>
                                            <Dropdown.Item>Дублировать</Dropdown.Item>
                                            <Dropdown.Item>Разделитель</Dropdown.Item>
                                            <Dropdown.Item>Удалить</Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        25.04.2025 <span style={{paddingLeft: '10px'}}>11:08</span>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                      <CFormCheck 
                                        name={3}
                                        checked={isChecked3}
                                        onChange={()=>setIsChecked3(!isChecked3)}
                                        style={{backgroundColor: '#181924', border: '1px solid #434343', margin: '0px 5px',}} 
                                      />
                                    </CTableDataCell>
                                    <CTableDataCell
                                      className="text-left"
                                      style={{ cursor: 'pointer', }}
                                    >
                                      Алексей
                                    </CTableDataCell>
                                    <CTableDataCell
                                      className="text-center"
                                      style={{ padding: '0px 5px' }}
                                    >
                                      
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center widthSpace">
                                      <CTooltip
                                          content='Backline'
                                          placement="bottom"
                                          style={customTooltipStyle}
                                        >
                                          <div>
                                            Backline
                                          </div>
                                        </CTooltip>
                                      
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">4 | 12</CTableDataCell>
                                    <CTableDataCell className="text-center">
                                        Невыход
                                    </CTableDataCell>
                                    <CTableDataCell className="text-left">
                                      <CTooltip
                                          content='❌12.04.2025 | Прорыв — Отметился во всех перекличках, при запуске нажал «на связи» и пропал, на сообщения и звонки не отвечал.

❌27.03.2025 | Сатирикон — Опоздание = 15 мин.

❌25.03.2025 — Возмущается в чате «Офис»: - В ответ тишина, зато когда вам надо, вы пишите и звоните каждые 2 минуты, и не дай Бог не ответишь...

❌ 22.03.2025 | Кристалл 
🔵 Рейтинг: 5

❌ 14.03.2025 | Niletto — Согласился выйти на проект, потом сказал что не сможет т.к. заболел  и вышел из чата. Искал себе замену, но не нашел.'
                                          placement="bottom"
                                          style={customTooltipStyle}
                                        >
                                          <div>
                                          ❌12.04.2025 | Прорыв — Отмет...
                                          </div>
                                        </CTooltip>
                                      
                                    </CTableDataCell>
                            </CTableRow>
                          </CTableBody>
                        </CTable>
                      </CCardBody>
                    </CCollapse>
                  </CCard>

                        {/* <CCard className="mb-4" style={{display: showPosterTable ? 'block' : 'none'}}>
                          <CCardHeader onClick={() => setVisibleC(!visibleC)}>Постеры</CCardHeader>
                          <CCollapse visible={visibleC}>
                            <CCardBody style={{padding: '12px'}}>
                              <table className='frame2'>
                                <><tr>
                                    <td className='day2'>
                                        <p className='date-day'></p>
                                    </td>
                                    <td className='day2'>
                                        <p className='date-day'></p>
                                    </td>
                                    <td className='day2'>
                                        <p className='date-day'></p>
                                    </td>
                                    <td className='day2'>
                                        <p className='date-day'></p>
                                    </td>
                                    <td className='day2'>
                                        <p className='date-day'></p>
                                    </td>
                                    <td className='day2'>
                                        <p className='date-day'></p>
                                    </td>
                                    <td className='day2'>
                                        <p className='date-day'></p>
                                    </td>
                                </tr>
                                <tr style={{height: '20px'}}></tr>
                                </>
                              </table>
                            </CCardBody>
                          </CCollapse>
                        </CCard> */}

                      </CCol>
                    </CRow>

                    <CModal
                      alignment="center"
                      visible={showModal}
                      onClose={() => setShowModal(false)}
                      aria-labelledby="VerticallyCenteredExample"
                    >
                      <CModalBody style={{height: '100px', textAlign: 'center', fontSize: '18px', paddingTop: '35px'}}>
                        Данные успешно сохранены
                      </CModalBody>
                    </CModal>

                    <CModal
                      alignment="center"
                      visible={showModalEmpty}
                      onClose={() => setShowModalEmpty(false)}
                      aria-labelledby="VerticallyCenteredExample"
                    >
                      <CModalBody style={{ textAlign: 'center', fontSize: '18px', paddingTop: '15px'}}>
                      Функция доступна в расширенной версии. Подробности – в техподдержке.
                      </CModalBody>
                    </CModal>

                    <CModal
                      backdrop="static"
                      visible={visibleDelete}
                      onClose={() => setVisibleDelete(false)}
                      aria-labelledby="StaticBackdropExampleLabel"
                    >
                      <CModalHeader>
                        <CModalTitle id="StaticBackdropExampleLabel">Предупреждение</CModalTitle>
                      </CModalHeader>
                      <CModalBody>
                        Проект будет удален из базы!
                      </CModalBody>
                      <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
                          Отмена
                        </CButton>
                        <CButton color="primary" onClick={()=>deleteProfile(id)}>Удалить</CButton>
                      </CModalFooter>
                    </CModal>


                    <CModal
                      alignment="center"
                      size="lg"
                      visible={visibleTZ}
                      onClose={() => setVisibleTZ(false)}
                      aria-labelledby="VerticallyCenteredExample"
                    >
                      <CModalHeader>
                        <CModalTitle id="VerticallyCenteredExample">Редактировать техническое задание</CModalTitle>
                      </CModalHeader>

                      <CModalBody>
                        <label className='title-label'>Техническое Задание</label>
                        <div className="text-field" style={{marginBottom: '0px'}}>
                          <textarea 
                            className="text-field__input widthBlock3"
                            type="text" 
                            name="comment" 
                            id="comment"
                            value={tehText}
                            onChange={(e)=>setTehText(e.target.value)}
                            style={{resize: 'none', height: '208px', width: '100%', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left', marginBottom: '20px'}}
                          />
                        </div> 

                      </CModalBody>
                      
                      <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisibleTZ(false)}>
                          Отмена
                        </CButton>
                        <CButton color="primary" onClick={() => setVisibleTZ(false)}>Сохранить</CButton>
                      </CModalFooter>
                    </CModal>
                </Suspense>
            </CContainer>

            

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default Projects
