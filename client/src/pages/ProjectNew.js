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
import MyDropdownCategory from 'src/components/DropdownCategory/Dropdown';

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
import specData from "../data/specData"
import {
  getSpecialitiesFilter,
} from 'src/services/api/speciality'

const ProjectNew = () => {
  //const navigate = useNavigate();

  const audioVhodCall = new Audio(vhodCall);
	const audioIshodCall = new Audio(ishodCall);
  const audioIshodRobotCall = new Audio(ishodRobotCall);

  //const { columns, data, setData, columnFilters, setColumnFilters, handleActive } = useTableData()
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
  const [project, setProject] = useState('');

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

  const [vidSpec, setVidSpec] = useState([]);
  const [formatSpec, setFormatSpec] = useState([]);

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
  const [sortedProjects, setSortedProjects] = useState([])
  const [mainspec, setMainspec] = useState([])
  const [dateProject, setDateProject] = useState([])
  const [timeProject, setTimeProject] = useState([])
  const [pretendents, setPretendents] = useState([])

  const [countPressDate, setCountPressDate] = useState(0);
  

  //категории
  const [categories, setCategories] = useState([]);
  //специальности
  const [models, setModels] = useState([]);
  
  //работник
  const [worker, setWorker] = useState({id: '', cat: '', spec: '', count: 1, icon: ''})
  const [worker2, setWorker2] = useState({id: '', cat: '', spec: '', count: 1, icon: ''})

  //работники
  const [workers, setWorkers] = useState([])

  //select
  const [selectedElement, setSelectedElement] = useState("")
  const [selectedElement2, setSelectedElement2] = useState("")
  

  // при первой загрузке приложения выполнится код ниже
  useEffect(() => {
    const fetch = async() => {

        // устанавливаем категории
        if (specData.length > 0 && specData) {
            setCategories(specData);
            //console.log("specData: ", specData)
        }
    }

    fetch()

  }, []);

  useEffect(() => {
    console.log("!!!!", selectedElement)
    if (selectedElement !== '') {
      onCategoriesSelectChange(selectedElement)
    }
    
  }, [selectedElement])

  useEffect(() => {
    if (models.length !== 0) {
      //onSpecSelectChange()
    }
    
    console.log("!!!! models", selectedElement)
  }, [models])

  //---------------------------------------------------------------------------------------

    // 1. при выборе нового значения в категории
    const onCategoriesSelectChange = (name) => {

      // получаем из массива категорий объект категории по соответствующему идентификатору
      const category = categories.find(item => item.name === name);
      console.log(category)

      const catSelect = category.icon; 
      const iconCatSelect = category.icon;

      setWorker({...worker, cat: catSelect, icon: catSelect})

      const models = category.models
      console.log("models: ", models)

      // меняем модели во втором списке
      setModels(models);
  }

  // 2. выбор специальности
  const onSpecSelectChange = (name) => {

      setSelectedElement2(name);

      //const modelId = e.target.options[e.target.selectedIndex].value;
      const model = models.find(item => item.name === name);

      setWorker({...worker, spec: model.name})
  }



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
      setProjects(projs)
      // const sortProj = [...projs].sort((a, b) => {  
      //   if (a.dateStart < b.dateStart)
      //     return -1;
      //   if (a.dateStart > b.dateStart)
      //       return 1;
      //   return 0;
      // })

      const newProjs = projs.map((item)=> { 
        const newArr = item.name
        return newArr
      })
 
      const sorted = newProjs.sort((a, b) => {       
        var cityA = a, cityB = b
        return (cityA < cityB) ? -1 : (cityA > cityB) ? 1 : 0;  //сортировка по возрастанию 
      })

      setSortedProjects(sorted)
    }

    fetchData()
    
}, [workersAll, clientAll, platformsAll])


  useEffect(()=> {
    console.log("height: ", height)
  }, [height])


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


  useEffect(()=> {
    if (endDate !== '' && endDate !== null) {
      //setEndTime('00:00')
      console.log("endDate: ", endDate)
      console.log("endTime: ", endTime)
    }
    
  }, [endDate, endTime])


  const changeDateProject=(e, index)=> {
    console.log("change Date: ", index, e.target.value+'T'+'00:00')
    let arr = JSON.parse(JSON.stringify(mainspec))
    // console.log("arr: ", arr)
    arr[index].date = e.target.value+'T' + arr[index].date?.split('T')[1]
    setMainspec(arr)
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
  

  const clickSave = () => {

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

                          <CCardBody style={{padding: '12px'}}>
                            <div style={{position: 'relative', height: '320px', display: 'flex', flexDirection: 'row'}}>
                              {/* 1 */}                               
                              <div style={{display: 'flex', flexDirection: 'column', width: '230px', textAlign: 'center', marginRight: '40px'}}>
                                
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
                              <div className='widthBlock3' style={{textAlign: 'center', marginTop: '2px', marginRight: '40px'}}>
                              <label className='title-label'>Проект</label>
                              <div className="text-field">
                                {/* <input disabled={false} className="text-field__input" type="text" name="projectName" id="projectName" value={projectName} onChange={(e)=>setProjectName(e.target.value)}/> */}
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
                                  options={sortedProjects}
                                  style={{width: '100%', padding: '0'}}
                                  //isOptionEqualToValue={(option, value) => option.value === value.value}
                                  //getOptionLabel={(proj) => proj.name }
                                  //onInputChange={setProject}
                                  //isOptionEqualToValue={(option, value) => option.name === value.name }
                                  onChange={(event, newValue) => {
                                    if (newValue) { 
                                      console.log(newValue)
                                      setProject(newValue)                                                     
                                      //console.log("projects: ", projects)                                                     
                                      const comp = projects.find(item=> item.name === newValue)
                                      if (comp) {
                                        setCity(comp.city)
                                        setStartDate(comp.dateStart)
                                        setStartTime(comp.dateStart?.split('T')[1]?.slice(0, 5)) 
                                        setEndTime(comp.dateEnd ? comp.dateEnd?.split('T')[1]?.slice(0, 5) : '') 
                                        setEndDate(comp.dateEnd)
                                        setSpecifikaProject({name: comp.specifika, color: specifikaData.find((stat)=> stat.label === comp.specifika)?.color})
                                        const managerFio = clientAll.find(item=> item.id.toString() === comp.managerId)
                                        setManagerName2(managerFio?.userfamily)

                                        const man = workersAll.find(item=> item.userfamily === managerFio?.userfamily)
                                        if (man) {
                                          setPhone(man.phone)
                                        } else {
                                          setPhone('')
                                        }

                                      } else {
                                        setCity('')
                                        setStartDate('00:00')
                                        setStartTime('') 
                                        setEndTime('') 
                                        setEndDate('')
                                        setSpecifikaProject('')
                                      }
                                    }  
                                  }}
                                  value={project} 
                                  inputValue={project}
                                  renderInput={(params) => (
                                  <div ref={params.InputProps.ref} style={{position: 'relative'}}>
                                      <input 
                                          className="text-field__input" 
                                          type="text" {...params.inputProps} 
                                          placeholder=''
                                          //autoComplete='off'
                                      />
                                  </div>
                                  )}
                                />
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
                              <div className='widthBlock6' style={{textAlign: 'center', marginTop: '2px'}}>

                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                  <div style={{width: '100%'}}>
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
                                              setPhone(comp.phone)
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

                                  <div style={{width: '100%', textAlign: 'center', marginLeft: '10px'}}>
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
                            </div>
                          </CCardBody>
                        </CCard>

                        <CCard className="mb-4">
                          <CCardBody style={{padding: '12px'}}>
                            <div style={{position: 'relative', height: '152px', display: 'flex', flexDirection: 'row'}}>
                              {/* 1 */}                               
                              <div style={{display: 'flex', flexDirection: 'column', width: '230px', textAlign: 'center', marginRight: '40px'}}>

                                  <label className='title-label'>Формат</label>
                                  <div className="text-field" style={{width: '230px'}}>
                                    <MyDropdown4
                                      style={{backgroundColor: '#131c21'}}
                                      options={specifikaData}
                                      selected={formatSpec}
                                      setSelected={setFormatSpec}
                                      placeholder='Выбери формат'
                                    />
                                  </div>

                                  <label className='title-label'>Вид работ</label>
                                  <div className="text-field" style={{width: '230px'}}>
                                    <MyDropdown4
                                      style={{backgroundColor: '#131c21'}}
                                      options={vids}
                                      selected={vidSpec}
                                      setSelected={setVidSpec}
                                      placeholder='Выбери вид работ'
                                    />
                                  </div>
                              </div>

                              {/* 2 */}   
                              <div className='widthBlock3' style={{textAlign: 'center', marginTop: '2px', marginRight: '40px'}}>

                                <label className='title-label'>Категория</label>
                                <div className="text-field" style={{width: '320px'}}>
                                  {/* <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" style={{width: '320px'}} placeholder='Выбрать категорию'/> */}
                                  <MyDropdownCategory
                                      style={{backgroundColor: '#131c21', width: '320px'}}
                                      options={categories}
                                      selected={selectedElement}
                                      setSelected={setSelectedElement}
                                      placeholder='Выбрать категорию'
                                    />
                                </div>

                                <label className='title-label'>Специальность</label>
                                <div className="text-field widthBlock3">
                                  <MyDropdownCategory
                                      style={{backgroundColor: '#131c21', width: '320px'}}
                                      options={models}
                                      selected={selectedElement2}
                                      setSelected={setSelectedElement2}
                                      placeholder='Выбрать категорию'
                                    />
                                </div>

                              </div>

                              {/* 3 */}   
                              <div className='widthBlock6' style={{textAlign: 'center', marginTop: '2px'}}>
                                {/* 1 */}
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                  <div style={{width: '100%'}}>
                                    <label className='title-label'>Консоль</label>
                                    <div className="text-field">
                                      <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg"/>
                                      
                                    </div>
                                  </div>

                                  <div style={{width: '100%', textAlign: 'center', marginLeft: '10px'}}>
                                    <label className='title-label'>РА</label>
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
                                          //value={phone}
                                          placeholder=''
                                      >
                                      </InputMask>
                                    </div>
                                  </div>

                                  <div style={{width: '100%', textAlign: 'center', marginLeft: '10px'}}>
                                    <label className='title-label'>???</label>
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
                                          //value={phone}
                                          placeholder=''
                                      >
                                      </InputMask>
                                    </div>
                                  </div>

                                  <div style={{width: '100%', textAlign: 'center', marginLeft: '10px'}}>
                                    <label className='title-label'>Кол-во каналов</label>
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
                                          //value={phone}
                                          placeholder=''
                                      >
                                      </InputMask>
                                    </div>
                                  </div>
                                </div> 

                                {/* 2 */}
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                  <div style={{width: '100%'}}>
                                    <label className='title-label'>Количество</label>
                                    <div className="text-field">
                                      <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" />

                                    </div>
                                  </div>

                                  <div style={{width: '100%', textAlign: 'center', marginLeft: '10px'}}>
                                    <label className='title-label'>Смена</label>
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
                                          //value={phone}
                                          placeholder=''
                                      >
                                      </InputMask>
                                    </div>
                                  </div>

                                  <div style={{width: '100%', textAlign: 'center', marginLeft: '10px'}}>
                                    <label className='title-label'>Ставка</label>
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
                                          //value={phone}
                                          placeholder=''
                                      >
                                      </InputMask>
                                    </div>
                                  </div>

                                  <div style={{width: '100%', textAlign: 'center', marginLeft: '10px'}}>
                                    <CButton  className='uley_edit_manager' style={{width: '100%', height: '40px', marginLeft: '1px', borderColor: 'green', marginTop: '22px'}}>
                                      <span style={{fontSize: '16px', color: 'green', position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)'}}>
                                        Добавить
                                      </span>
                                    </CButton> 
                                  </div>
                                </div> 

                              </div>
                            </div>

                          </CCardBody>
                        </CCard>

                        <CCard className="mb-4">
                          <CCardBody style={{padding: '12px'}}>
                            <div style={{position: 'relative', height: '160px', display: 'flex', flexDirection: 'row'}}>
                              
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

                  
                </Suspense>
            </CContainer>

            

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default ProjectNew
