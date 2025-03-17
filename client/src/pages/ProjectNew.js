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

import Icon from "../chat-app-worker/components/Icon";
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
import Disketa from "./../assets/images/disketa.png";
import arrowDown from 'src/assets/images/arrowDown.svg'
import threeDots from 'src/assets/images/three-dots.svg'

import btnBlue from 'src/assets/images/button_blue.png'
import btnRed from 'src/assets/images/button_red.png'
import btnGreen from 'src/assets/images/button_green.jpg'
import btnYellow from 'src/assets/images/button_yellow.jpg'

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
import { sendSpecialistOtkaz } from '../http/specAPI'
import { addMainspec, deleteMainspec, editMainspec, getMainSpecProject, getMainSpecId, deleteMainspecProject } from '../http/mainspecAPI'
import startData from 'src/data/startData';
import {
  getSpecialitiesFilter,
} from 'src/services/api/speciality'

const ProjectNew = () => {
  //const navigate = useNavigate();

  const audioVhodCall = new Audio(vhodCall);
	const audioIshodCall = new Audio(ishodCall);
  const audioIshodRobotCall = new Audio(ishodRobotCall);

  const { columns, data, setData, columnFilters, setColumnFilters, handleActive } = useTableData()
  const { userId, companysAll, clientAll, workersAll, platformsAll, setShowCallCard } = useUsersContext();
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
    let arrWorkers = []
    console.log("workersAll: ", workersAll)
    workersAll.map((item, index)=> {
      if (item.userfamily) {
        const obj = {
          id: item.id,
          label: item.userfamily,
          value: index,
        }
        arrWorkers.push(obj)
        //arrWorkers.push(item.userfamily)
      }  
    })
    const sortedWorker = [...arrWorkers].sort((a, b) => {       
      return (a.label < b.label) ? -1 : (a.label > b.label) ? 1 : 0;  //сортировка по возрастанию 
    })
    console.log("arrWorkers: ", sortedWorker)
    setWorkersData(sortedWorker)

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
    }

    fetchData()
    
}, [workersAll, clientAll, platformsAll])



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
    setVisibleB(true)
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

  //сохранить проект
  const saveProject = async(id) => {

    //Toast
    setShowModal(true)

    console.log("id: ", id)
    console.log("start: ", startDate)
    console.log("end: ", endDate)
    console.log("managerId: ", clientAll.find(item=> item.fio === managerName)?.id)
    console.log("managerId2: ", workersAll.find(item=> item.fio === managerName)?.id)
    console.log("companyId: ", companysAll.find(item=> item.title === companyName)?.id)
    console.log("startProject: ", startProject)

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
      managerId: clientAll.find(item=> item.userfamily === managerName)?.id, 
      managerId2: workersAll.find(item=> item.userfamily === managerName2)?.id,
      companyId: companysAll.find(item=> item.title === companyName)?.id, 
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


  const onChangeManager = (e, index) => {
    //console.log(e.target.value, index)

    setManagerName(e.target.value)

    // setManagersObj((managersObj) => {                                           
    //   const usersCopy = JSON.parse(JSON.stringify(managersObj));			
    //   const userObject = JSON.parse(usersCopy[index]);
    //   usersCopy[index] = JSON.stringify({ ...userObject, fio: e.target.value});		
    //   //console.log(usersCopy) 
    //   return usersCopy;
    // });   
  }

  const onChangeManager2 = (e, index) => {
    if (e) {
      setManagerName2(e.target.value) 
    } else {
      setManagerName2('') 
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
                        <CCard className="mb-4">
                          <CCardHeader style={{display: showHeader ? 'block' : 'none'}}>                                                  
                            <div style={{color: '#fff', zIndex: '100', display: 'flex', justifyContent: 'space-between', width: '-webkit-fill-available'}}>   
                              <div className="text-field" style={{marginBottom: '0'}}>
                                <input disabled={true} className="text-field__input" type="text" name="projectId" id="projectId" value={crmID} style={{width: '120px', marginRight: '25px'}}/>
                              </div>
                              <div style={{display: 'flex', alignItems: 'center'}}>
                                <CTooltip content="Удалить проекты" placement="bottom">
                                  {/* <Icon id="delete" onClick={()=>clickDelete(id)} style={{cursor: 'pointer'}}/> */}
                                  <img src={DeleteIcon} onClick={() => setVisibleDelete(true)} style={{ cursor: 'pointer', width: '26px', height: '26px', marginLeft: '20px'}}/>  
                                </CTooltip>
                                {/* <img src={Trubka} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                <img src={Tg}  style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/> */}
                                <img src={zamok} onClick={()=>setShowModalEmpty(true)} style={{cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>
                                <CTooltip content="Сохранить проект" placement="bottom">
                                  <img src={Disketa} onClick={()=>saveProject(id)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                </CTooltip>
                                <CTooltip content="Закрыть окно" placement="bottom">
                                  <img src={Close} onClick={closeProfile} style={{ cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>  
                                </CTooltip>
                                
                              </div>                 
                            </div>
                          </CCardHeader>                    

                          <CCardBody style={{padding: '12px', height: `${height}px`}}>
                          <div style={{position: 'relative', height: '435px', display: 'flex', flexDirection: 'row'}}>
                            {/* 1 */}                               
                            <div style={{display: 'flex', flexDirection: 'column', width: '230px', textAlign: 'center', marginTop: '8px', marginRight: '40px'}}>
                              
                                <label className='title-label'></label>
                                <div style={{display: 'flex', justifyContent: 'space-between', paddingTop: '25px', width: '230px'}}>
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

                                <div style={{display: 'flex', justifyContent: 'space-between', paddingTop: '25px', width: '230px'}}>
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


                                <label className='title-label'>Специфика</label>
                                <div className="text-field">
                                  <MyDropdown4
                                    style={{backgroundColor: '#131c21'}}
                                    options={specifikaData}
                                    selected={specifikaProject}
                                    setSelected={setSpecifikaProject}
                                    placeholder='Выбери специфику'
                                  />
                                </div>

                                <label className='title-label'>Вид работ</label>
                                <div className="text-field">
                                  <MyDropdown4
                                    style={{backgroundColor: '#131c21'}}
                                    options={vids}
                                    selected={vidProject}
                                    setSelected={setVidProject}
                                    placeholder='Выбери вид работ'
                                  />
                                </div>
                            </div>

                            {/* 2 */}   
                            <div className='widthBlock3' style={{textAlign: 'center', marginTop: '10px', marginRight: '40px'}}>
                            <label className='title-label'>Проект</label>
                            <div className="text-field">
                              <input disabled={false} className="text-field__input" type="text" name="projectName" id="projectName" value={projectName} onChange={(e)=>setProjectName(e.target.value)}/>
                            </div>

                            <label className='title-label'>Город</label>
                            <div className="text-field">
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
                                    <input 
                                        className="text-field__input" 
                                        type="text" {...params.inputProps} 
                                        placeholder=''
                                        autoComplete='off'
                                    />
                                </div>
                                )}
                              />
                            </div>

                            <label className='title-label'>Локация</label>
                            <div className="text-field widthBlock3"  onMouseOver={()=>setShowSaveLocation(true)} onMouseOut={()=>setShowSaveLocation(false)}>
                              {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '320px'}}/> */}
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
                                className="text-field__input" 
                                openOnFocus
                                id="custom-input-demo"
                                options={platformsData}
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
                                    <input 
                                        className="text-field__input" 
                                        type="text" {...params.inputProps} 
                                        placeholder=''
                                    />
                                </div>
                                )}
                              />

                              <img src={Disketa} onClick={()=>{navigator.clipboard.writeText(location)}} alt="" style={{visibility: showSaveLocation ? 'visible' : 'hidden', position: 'absolute', top: '8px', left: '290px', cursor: 'pointer', width: '25px', height: '25px'}}/>
                            </div>

                            <label className='title-label'>Адрес</label>
                            <div className="text-field" onMouseOver={()=>setShowSaveAddress(true)} onMouseOut={()=>setShowSaveAddress(false)}>
                              <input disabled={false} className="text-field__input" type="text" 
                                name="address" 
                                id="address" 
                                value={address}
                              />
                              <img src={Disketa} onClick={()=>{navigator.clipboard.writeText(address)}} alt="" style={{visibility: showSaveAddress ? 'visible' : 'hidden', position: 'absolute', top: '8px', left: '290px', cursor: 'pointer', width: '25px', height: '25px'}}/>
                            </div>

                            </div>

                            {/* 3 */}   
                            <div className='widthBlock2' style={{textAlign: 'center', marginTop: '10px', marginRight: '40px'}}>

                              <div style={{display: 'flex'}}>
                                <div>
                                  <label className='title-label'>Старший</label>
                                  <div className="text-field">
                                    {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '320px'}}/> */}
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
                                      className="text-field__input" 
                                      openOnFocus
                                      id="custom-input-manager2"
                                      options={workersData}
                                      style={{width: '100%', padding: '0'}}
                                      //isOptionEqualToValue={(option, value) => option.value === value.value}
                                      //onInputChange={onChangeManager2} 
                                      onInputChange={(event, newInputValue) => {
                                        setManagerName2(newInputValue);
                                      }}
                                      onChange={(event, newValue) => {
                                        if (newValue) {  
                                          console.log("workersAll 2: ", workersAll)                                                     
                                          const comp = workersAll.find(item=> item.userfamily === newValue.label)
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
                                          <input 
                                              className="text-field__input" 
                                              type="text" {...params.inputProps} 
                                              placeholder='ФИО'
                                          />
                                      </div>
                                      )}
                                    />
                                  </div>
                                </div>

                                <div className='widthBlock4' style={{textAlign: 'center', marginLeft: '10px'}}>
                                  <label className='title-label'>Телефон</label>
                                  <div className="text-field">
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
                                  </div>
                                </div>
                              </div>
                              

                            <label className='title-label'>Техническое Задание</label>
                            <div className="text-field" style={{marginBottom: '0px'}}>
                              <textarea 
                                className="text-field__input widthBlock3"
                                type="text" 
                                name="comment" 
                                id="comment"
                                value={tehText}
                                onChange={(e)=>setTehText(e.target.value)}
                                style={{width: '100%', resize: 'none', height: '208px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left', marginBottom: '20px'}}
                              />
                            </div> 

                            </div>

                            {/* 4 */}   
                            

                          </div>

                                    


                          </CCardBody>
                        </CCard>


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
                </Suspense>
            </CContainer>

            

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default ProjectNew
