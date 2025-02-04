import React, { Suspense, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import InputMask from 'react-input-mask';
import Autocomplete from '@mui/material/Autocomplete';
import { 
  CContainer, 
  CSpinner, 
  CCol,
  CRow,
  CButton, 
  CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCard,
  CCardBody,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormSelect,
  CToast, 
  CToastBody,
  CToastClose,
  CToaster,

} from '@coreui/react'
//import Icon from "../chat-app-worker/components/Icon";
import { useUsersContext } from "../chat-app-new/context/usersContext";

import Close from "../assets/images/clear.svg"
import zamok from "../assets/images/замок.png"
import zamok2 from "../assets/images/замок2.png"
import addAvatar from "../assets/images/add_avatar.png"
import Krestik from './../assets/images/krestik.png';
import imgBlock18 from "./../assets/images/block18.png";
import Trubka from "./../assets/images/trubka.png";
import Tg from "./../assets/images/tg.png";
import Star from "./../assets/images/star.png";
import StarActive from "./../assets/images/star_activ.svg";
import Disketa from "./../assets/images/disketa.png";
import arrowDown from 'src/assets/images/arrowDown.svg'

import MyDropdown from 'src/components/Dropdown/Dropdown';
import MyDropdown2 from 'src/components/Dropdown2/Dropdown2';
import DropdownClient from 'src/components/DropdownClient/DropdownClient';

import comtegs from 'src/data/comtegs';
import companys from 'src/data/companys';
import cities from 'src/data/cities';
import dolgnostData from 'src/data/dolgnostData';
import sferaData from 'src/data/sfera';
import companyData from 'src/data/companyData';

import { getCompany, getCompanyCount, editCompany, addCompany, deleteCompany, uploadAvatar, getCompanyProfId, addCompanyProf, editCompanyProf } from '../http/companyAPI'
import { getManager, editManager, getManagerId } from 'src/http/managerAPI';
import { CollectionsOutlined } from '@mui/icons-material';

//Workers.js
const ProfileCompany = () => {
  const navigate = useNavigate()
  const { userId, companys, setCompanys, companysAll, companysCount, setCompanysCount, managersAll, setManagersAll, role } = useUsersContext();
  const [sortedCities, setSortedCities] = useState([])
  const [companyCount, setCompanyCount] = useState([]); 

  const [loading, setLoading]= useState(true);
  const [text, setText]= useState("");
  const [showProfile, setShowProfile] = useState(false)
  const [showClose, setShowClose] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [showSearch, setShowSearch] = useState(true)
  const [showClear, setShowClear] = useState(false)
  const [block, setBlock] = useState(false)
  const [showMenuKrest, setShowMenuKrest] = useState(false)
  const [showKrest, setShowKrest] = useState(false)

  
  const [showSavePhone, setShowSavePhone] = useState(false)
  const [showSaveFio, setShowSaveFio] = useState(false)
  const [showSave3, setShowSave3] = useState(false)
  const [showSaveOffice, setShowSaveOffice] = useState(false)
  const [showSaveSklad, setShowSaveSklad] = useState(false)

  const [id, setId] = useState('');
  const [title, setTitle] = useState('Название компании');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('+7 (999) 999-99-99');
  const [managers, setManagers] = useState([]);
  const [managersObj, setManagersObj] = useState([]);
  const [managersData, setManagersData] = useState([])
  const [managerName, setManagerName] = useState('')
  const [office, setOffice] = useState('');
  const [sklad, setSklad] = useState('');

  const [bugalterFio, setBugalterFio] = useState('')
  const [bugalterEmail, setBugalterEmail] = useState('')
  const [bugalterPhone, setBugalterPhone] = useState('')

  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [comteg, setComteg] = useState('');
  const [sfera, setSfera] = useState('');
  const [dogovorDate, setDogovorDate] = useState('');
  const [dogovorNumber, setDogovorNumber] = useState('');
  const [dateReg, setDateReg] = useState('');
  const [profile, setProfile] = useState('');
  const [projects, setProjects] = useState('');
  const [inn, setInn] = useState('');

  const [countPress, setCountPress] = useState(0);
  const [countPressTG, setCountPressTG] = useState(0);
  const [countPressCity, setCountPressCity] = useState(0);

  const [blockProfile, setBlockProfile] = useState(true)
  const [showBlacklist, setShowBlacklist] = useState(false)
  const [showMenu1, setShowMenu1] = useState(false)
  const [showMenu2, setShowMenu2] = useState(false)
  const [showManagers, setShowManagers] = useState(false)
  const [showClearCity, setShowClearCity] = useState(false)
  const [showRekviz, setShowRekviz] = useState(false)

  const [visibleDelete, setVisibleDelete] = useState(false)

  const [file, setFile] = useState(0);
  const [filePreview, setFilePreview] = useState();
  const [image, setImage]= useState("");

  const host = process.env.REACT_APP_HOST

  const [toast, addToast] = useState(0)
  const toaster = useRef()

  const exampleToast = (
    <CToast autohide={true} visible={true} color="success" className="text-white align-items-center">
      <div className="d-flex">
        <CToastBody>Данные успешно сохранены!</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )

  const deleteToast = (
    <CToast autohide={true} visible={true} color="success" className="text-white align-items-center">
      <div className="d-flex">
        <CToastBody>Данные успешно удалены!</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )



  //-----------------------------------------------------------------------------------------
  //			get managers
  //-----------------------------------------------------------------------------------------
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

    const fetchData = async() => {
 
      const result = await getCompanyProfId(userId)
      console.log("Company: ", result, userId)


      setId(result?.id)
      setTitle(result?.title)
      setCity(result ? (result.city ? result.city : '') : '')

      setOffice(result?.office ? result.office : '')
      setSklad(result?.sklad ? result.sklad : '')
      setManagers(result?.managers ? result.managers.split(', ') : [])
      setManagersObj(result?.managersObj ? result.managersObj.split(', ') : [])
      setBugalterFio(result?.bugalterFio ? result.bugalterFio : '')
      setBugalterEmail(result?.bugalterEmail ? result.bugalterEmail : '')
      setBugalterPhone(result?.bugalterPhone ? result.bugalterPhone : '')
      setProfile(result?.profile)
      setSfera(result?.sfera ? result.sfera : '')
      setComteg(result?.comteg ? result.comteg : '')
      setComment(result?.comment)
      setShowBlacklist(result?.sfera ? result.sfera.includes('Blacklist') : false)

      setLoading(false)
    }
    fetchData()
  }, [])


//------ загрузить аватар-------------
  useEffect(() => {
    const getImage = async () => {
        if (file) {
          setShowUpload(true)
          //console.log("file:", file)
          const data = new FormData();
          data.append("name", file.name);
          data.append("avatar", file);
          
          let response = await uploadAvatar(data) //distribFile(data) // uploadFile(data)

          setImage(response.data.path.split('.team')[1]);
          //сообщение с ссылкой на файл
          console.log("Путь к файлу: ", host + response.data.path.split('.team')[1])
          setProfile(host + response.data.path.split('.team')[1])
          //setShowUpload(false)
        }
    }
    getImage();
  }, [file])

  {/* Добавление файла */}
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setFilePreview(URL.createObjectURL(e.target.files[0]));
  }


  //сохранить профиль
  const saveProfile = async(id) => { 
      setShowClose(true)
      console.log("managersObj: ", managersObj)
  
  
      let managersArr = []
      let strManagers = ''
      managers.map((item, index)=> {
        const obj = {
          name: item,
        }
        strManagers = strManagers + item + (index+1 !== managers.length ? ', ' : '')
        managersArr.push(obj)
      })

      let managersObjArr = []
      let strManagersObj = ''
      managersObj.map(async(item, index)=> {
        const obj = {
          name: JSON.parse(item).id,
        }
        strManagersObj = strManagersObj + JSON.parse(item).fio + (index+1 !== managersObj.length ? ', ' : '')
        managersObjArr.push(obj)

        const saveData = {
          companyId: JSON.parse(item).companyId,
          title, 
          city,
          office,
          sklad,
          comment,
          sfera,
          comteg,
          profile,
        }

        console.log("saveCompany: ", saveData)

        //сохранить изменения в базе
        await editCompany(saveData, JSON.parse(item).id)
      })
      console.log(managersObjArr)

  
      const saveData = { 
        userId,  
        title, 
        city,
        office,
        sklad,
        comment,
        //projects: JSON.stringify(projectsArr),
        managers: JSON.stringify(managersObjArr),
        dogovorDate, 
        dogovorNumber, 
        bugalterFio, 
        bugalterEmail,
        bugalterPhone,  
        inn, //инн компании
        profile,
        sfera,
        comteg,
      }
      console.log("saveData: ", saveData)
  
      setCompanys((companys) => {	
  
        let userIndex = companys.findIndex((comp) => comp.id === id);
        const usersCopy = JSON.parse(JSON.stringify(companys));
  
        const userObject = usersCopy[userIndex];
        usersCopy[userIndex] = { ...userObject, 
          title, 
          city,
          office,
          sklad,
          comment,
          projects,
          managers: strManagersObj,
          dogovorDate, 
          dogovorNumber, 
          bugalterFio, 
          bugalterEmail,
          bugalterPhone,  
          inn, //инн компании
          profile,
          sfera,
          comteg,
        };
  
        console.log("update user: ", usersCopy[userIndex])
  
        return usersCopy;
      });


      const result = await getCompanyProfId(userId)
      console.log("Company: ", result)

      const saveData2 = { 
        companyId: result?.id
      }
      
      if (!result) {
        const resAdd = await addCompanyProf(saveData)

        //добавить Id компании в профиль
        const result2 = await getManagerId(userId)
        const resAdd2 = await editManager(saveData2, result2?.id)
        
      } else {
        //сохранить изменения в базе
        const resUpdate = await editCompanyProf(saveData, result?.id)

        //добавить Id компании в профиль
        const result2 = await getManagerId(userId)
        const resAdd2 = await editManager(saveData2, result2?.id)
      }
  
      addToast(exampleToast) //ваши данные сохранены

      setTimeout(()=> {
        closeProfile()
      }, 2000)
  }
  
  const blockedProfile = () => { 
      setBlockProfile(!blockProfile)
  }

  const closeProfile = () => { 
    // setShowProfile(false)
    // setShowClose(false)
    // setShowSearch(true)

    // setShowClear(true)
    // setFilePreview('')

    navigate("/dashboard")
  }

  const onChangeKrest = () => {
    setShowKrest(!showKrest)
    setShowMenuKrest(false)
    setBlock(!block)
  } 


  const onChangeManager = (e, index) => {
    console.log(e.target.value, index)

    setManagersObj((managersObj) => {                                           
      const usersCopy = JSON.parse(JSON.stringify(managersObj));			
      const userObject = JSON.parse(usersCopy[index]);
      usersCopy[index] = JSON.stringify({ ...userObject, fio: e.target.value});		
      //console.log(usersCopy) 
      return usersCopy;
    });   
  }

  useEffect(()=> {
    //console.log("managersObj: ", managersObj)
  }, [managersObj])

  //добавить менеджера
  const addManager = () => {
    
    //console.log("managersObj: ", managersObj)
    const obj = {id: '', chatId: '', fio: '', companyId: ''}
    setManagersObj([ // with a new array
      ...managersObj, // that contains all the old items
      JSON.stringify(obj) // and one new item at the end
    ])
    // console.log([ // with a new array
    //   ...managersObj, // that contains all the old items
    //   JSON.stringify(obj) // and one new item at the end
    // ])
  }

  //удалить менеджера
  const deleteManager = (item) => {
    setManagersObj(
      managersObj.filter(a =>
        a.id !== item.id
      )
    );
  }

  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

          <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                  {/* <h2>Менеджеры</h2> */}
                  <CToaster ref={toaster} push={toast} placement="top-end" /> 

                    <CRow>
                      <CCol style={{textAlign: 'center'}}>
                        <CCard className="mb-4"> 
                            <CCardBody>
                              {loading ? 
                                      
                              <CSpinner/> :

                              <div style={{position: 'relative', height: showManagers ? 'auto' : (showRekviz ? 'auto' : '402px'), display: 'flex', flexDirection: 'row'}}>
{/* 1 */}                               
                                <div style={{width: '250px'}} onMouseOver={()=>setShowUpload(true)} onMouseOut={()=>setShowUpload(false)}>
                                  {filePreview ? 
                                  <img src={filePreview} alt='' style={{borderRadius: '15px', objectFit: 'cover'}} width={250} height={250}/>
                                  :
                                  (
                                    profile ? 
                                  <img src={profile} width='250px' height='250px' alt='poster' style={{borderRadius: '7px', marginBottom: '5px'}}/>
                                  : 
                                  <svg className="rounded me-2" width="250" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" style={{float:'left', marginBottom: '3px'}}>
                                    <rect width="250px" height="250px" fill="#007aff" rx="40"></rect> 
                                  </svg>
                                  )
                                  }
                                  <div className="file-upload" style={{marginBottom: '8px'}}>
                                    <img src={addAvatar} alt="upload" style={{display: showUpload ? 'block' : 'none', position: 'absolute', top: '100px', left: '100px', cursor: 'pointer', width: '50px', height: '50px'}}/>
                                    <input 
                                      type="file"
                                      id="formFile" 
                                      accept="image/*,image/jpeg" 
                                      name="avatar"
                                      onChange={(e) => onFileChange(e)}
                                      style={{position: 'absolute', top: '130px', left: '10px', opacity: '0', zIndex: '100', width: '230px'}}
                                    />
                                  </div>

                                  <label className='title-label'>ID</label>
                                  <div className="text-field" >
                                    <input disabled={true} className="text-field__input" type="text" name="companyId" id="companyId" value={id} style={{width: '250px', marginRight: '25px'}}/>
                                  </div>

                                  <label className='title-label'>Реквизиты</label>
                                  <CButton onClick={()=> {
                                        if (role === '1') {
                                          setShowManagers(false)
                                          setShowRekviz(!showRekviz)
                                        }
                                      }} className='uley_add_user' style={{width: '250px', height: '40px', marginLeft: '1px'}}>
                                    <span style={{fontSize: '18px', color: '#fff', position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)'}}>
                                      Реквизиты
                                    </span>
                                  </CButton>

                                  {showRekviz ? (
                                                            <>
                                                              <div className="div7">
                                                                  <div style={{ marginTop: '20px' }}>
                                                                    <div className="text-medium-emphasis small">Контрагент</div>
                                                                    <div style={{ height: '40px' }} className="py-2 uley-data-main">
                                                                      
                                                                    </div>
                                                                  </div>
                                                                  <div style={{ marginTop: '22px' }}>
                                                                    <div className="text-medium-emphasis small">ИНН</div>
                                                                    <div style={{ height: '40px' }} className="py-2 uley-data-main">
                                                                      
                                                                    </div>
                                                                  </div>
                                  
                                                                  <div style={{ marginTop: '22px' }}>
                                                                    <div className="text-medium-emphasis small ">Расчетный счет</div>
                                                                    <div style={{ height: '40px' }} className="py-2 uley-data-main">
                                                                      
                                                                    </div>
                                                                  </div>
                                                              </div>
                                                            </>
                                                          ) : (
                                                            ''
                                  )}

                                  <img src={Krestik} width={25} alt='' style={{position: 'absolute', top: '215px', left: '215px', opacity: block ? '1' : '0' }}/>
                                  <div className="menu-content-krest">
                                    <span onClick={onChangeKrest} style={{cursor: 'pointer'}}>{block ? 'Убрать' : 'Добавить'}</span>
                                  </div>

                                  {/* ФИО */}
                                  <div style={{position: 'absolute', top: '5px', left: '286px', color: '#fff', zIndex: '100', display: 'flex', justifyContent: 'space-between', width: '-webkit-fill-available'}}>   
                                    <div className="text-field">
                                      <input type="text" name="title" id="title" value={title} onChange={(e)=>setTitle(e.target.value)} style={{fontSize: '33px', position: 'absolute', top: '-15px', backgroundColor: 'transparent', border: '0', color: '#f3f3f3', width: '600px'}}></input>
                                    </div>
                                    <div style={{display: 'flex'}}>
                                      {/* <Icon id="delete" onClick={()=>clickDelete(id)} /> */}
                                      {/* <img src={Trubka} onClick={()=>setShowProfile(false)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={Tg} onClick={()=>setShowProfile(false)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/> */}
                                      <img src={blockProfile ? zamok : zamok2} onClick={blockedProfile} style={{cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={Disketa} onClick={()=>saveProfile(id)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={Close} onClick={closeProfile} style={{display: showClose ? 'block' : 'block', cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>  
                                    </div>
                                  </div>
                                </div>

{/* 2 */}
                                <div style={{marginLeft: '40px', marginTop: '85px', display: 'flex', flexDirection: 'column', width: '320px'}}>
                                  {/* Город */}
                                  <label className='title-label'>Город</label>
                                  <div className="text-field" onMouseOver={()=>setShowClearCity(true)} onMouseOut={()=>setShowClearCity(false)} style={{position: 'relative'}}>                                     
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
                                              isOptionEqualToValue={(option, value) => option.value === value.value}
                                              onInputChange={(e)=>setCity(e.target.value)}
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
                                                  />
                                              </div>
                                              )}
                                      />
                                      <img src={Close} onClick={() => setCity('')} width={15} alt='' style={{position: 'absolute', top: '13px', right: '15px', visibility: showClearCity ? 'visible' : 'hidden', cursor: 'pointer'}}></img>
                                  </div>

                                  {/*  */}
                                  <label className='title-label'>Офис</label>
                                  <div className="text-field" onMouseOver={()=>setShowSaveOffice(true)} onMouseOut={()=>setShowSaveOffice(false)}>
                                    <img 
                                      src={Disketa} 
                                      onClick={()=>{navigator.clipboard.writeText(office)}} 
                                      alt="" 
                                      style={{visibility: showSaveOffice ? 'visible' : 'hidden', position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', width: '20px', height: '20px'}}
                                    />
                                    <input className="text-field__input" type="text" name="office" id="office" value={office} onChange={(e) => setOffice(e.target.value)}/>
                                  </div> 

                                  {/*  */}
                                  <label className='title-label'>Склад</label>
                                  <div className="text-field">
                                    <input className="text-field__input" type="text" name="sklad" id="sklad" value={sklad} onChange={(e) => setSklad(e.target.value)}/>
                                  </div> 

                                  {/* Менеджеры */}
                                  <label className='title-label'>Менеджеры</label>
                                  <CButton onClick={()=> {
                                        if (role === '1') {
                                          setShowRekviz(false)
                                          setShowManagers(!showManagers)
                                        }
                                      }}  className='uley_add_user' style={{width: '320px', height: '42px', marginLeft: '0'}}>
                                    <span style={{fontSize: '18px', color: '#fff', position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)'}}>
                                      Менеджеры
                                    </span>
                                  </CButton>

                                  <div style={{display: showManagers ? 'block' : 'none'}}>
                                    {managersObj.map((item, index) => (
                                    <div className="text-field" key={index} style={{position: 'relative'}}>
                                      <div className="text-field">
                                        <input className="text-field__input" type="text" name="email" id="email" value={JSON.parse(item).dolgnost} style={{width: '280px', marginTop: '45px'}}/>
                                      </div> 
                                      <img src={Close} onClick={()=> deleteManager(item)} width={15} alt='' style={{position: 'absolute', top: '13px', right: '15px',  cursor: 'pointer'}}></img>
                                    </div>)
                                    )}
                                  </div>

                                  {showRekviz ? (
                                                            <>
                                                              <div className="div7">
                                                                <div>
                                  
                                                                  <div style={{ marginTop: '20px' }}>
                                                                    <div className="text-medium-emphasis small ">
                                                                      Корреспондентский счет
                                                                    </div>
                                                                    <div style={{ height: '40px' }} className="py-2 uley-data-main">
                                                                      
                                                                    </div>
                                                                  </div>
                                  
                                                                  <div style={{ marginTop: '22px' }}>
                                                                    <div className="text-medium-emphasis small ">БИК</div>
                                                                    <div style={{ height: '40px' }} className="py-2 uley-data-main">
                                                                      
                                                                    </div>
                                                                  </div>
                                  
                                                                  <div style={{ marginTop: '22px' }}>
                                                                    <div className="text-medium-emphasis small ">ОГРН</div>
                                                                    <div style={{ height: '40px' }} className="py-2 uley-data-main">
                                                                      
                                                                    </div>
                                                                  </div> 
                                                                </div> 
                                                              </div>                              
                                                            </>
                                                          ) : (
                                                            ''
                                  )}

                                </div>

{/* 3 */}
                                <div style={{marginLeft: '40px', marginTop: '85px', display: 'flex', flexDirection: 'column', width: '320px'}}>
                                  {/* phone */}
                                  <label className='title-label'>Телефон</label>
                                  <div className="text-field" >
                                      {/* <input className="text-field__input" type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={{width: '250px'}}/> */}
                                      <InputMask
                                          className="text-field__input" 
                                          style={{width: '320px'}}
                                          type="text" 
                                          name="phone" 
                                          id="phone"
                                          mask="+7 (999) 999-99-99"
                                          disabled={!blockProfile}
                                          maskChar=""
                                          onChange={(e) => setBugalterPhone(e.target.value)} 
                                          value={bugalterPhone}
                                          placeholder=''
                                      >
                                      </InputMask>    
                                  </div> 

                                  {/* email */}
                                  <label className='title-label'>Почта</label>
                                  <div className="text-field">
                                    <input className="text-field__input" type="text" name="email" id="email" value={bugalterEmail} onChange={(e) => setBugalterEmail(e.target.value)} style={{width: '320px'}}/>
                                  </div> 

                                  {/*  */}
                                  <label className='title-label'>Сфера деятельности</label>
                                  <div className="text-field" style={{marginBottom: showManagers ? '45px' : '20px'}}> 
                                    <input className="text-field__input" type="text" name="sfera" id="sfera" value={sfera} onChange={(e) => setSfera(e.target.value)} style={{width: '320px'}}/>
                                  </div>

                                  {/* + добавить менеджера */}
                                  <div style={{textAlign: 'left', display: showManagers ? 'block' : 'none'}}>
                                    <CButton onClick={()=>addManager()} className='uley_add_user' style={{marginBottom: '20px', marginLeft: '0'}}>
                                      <span style={{position: 'absolute', top: '-12px', left: '6px', fontSize: '36px', color: '#2d2e38'}}>
                                      +</span>
                                    </CButton>
                                  </div>   

                                  <div style={{position: 'relative'}}>
                                    <label className='title-label' style={{position: 'absolute', top: '-15px', left: '40%'}}>Проекты</label>
                                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0px'}}>                                   
                                      {/* проекты за месяц */}
                                      <div style={{marginRight: '10px'}}>
                                        <label className='title-label'>За месяц</label>
                                        <div className="text-field">
                                            <input disabled className="text-field__input" type="text" name="reyting" id="reyting" value={'0'} style={{width: '100%', marginRight: '8px'}}/>
                                        </div>
                                      </div>
                                      {/* проекты всего */}
                                      <div> 
                                        <label className='title-label'>Всего</label>
                                        <div className="text-field">
                                            <input disabled className="text-field__input" type="text" name="rank" id="rank" value={'0'} style={{width: '100%', marginRight: '8px'}}/>
                                        </div>
                                      </div>
                                      
                                    </div>
                                  </div>


                                  {showRekviz ? (
                                                            <>
                                                              <div className="div7">
                                                                <div>

                                                                  <div>
                                                                    <div className="text-medium-emphasis small ">Банк</div>
                                                                    <div style={{ height: '40px' }} className="py-2 uley-data-main">
                                                                      
                                                                    </div>
                                                                  </div>
                                  
                                                                  <div style={{ marginTop: '22px' }}>
                                                                    <div className="text-medium-emphasis small ">Телефон</div>
                                                                    <div style={{ height: '40px' }} className="py-2 uley-data-main">
                                                                      
                                                                    </div>
                                                                  </div>
                                  
                                                                  <div style={{ marginTop: '22px' }}>
                                                                    <div className="text-medium-emphasis small ">Почта</div>
                                                                    <div style={{ height: '40px' }} className="py-2 uley-data-main">
                                                                      
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              
                                                            </>
                                                          ) : (
                                                            ''
                                  )}


                                </div>

{/* 4 */}
                                <div style={{marginLeft: '40px', marginTop: '85px', display: 'flex', flexDirection: 'column', width: '250px'}}>
                                  
                                  <label className='title-label'>Проекты</label>
                                  <div className="text-field" style={{marginBottom: '0px'}}>
                                    <ul className='spec-style' style={{width: '100%', height: showManagers ? '380px' : '292px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left'}}>
                                    
                                    </ul>
                                  </div> 

                                  {showRekviz ? (
                                                            <>
                                                              <div className="div7">

                                                                <div style={{ marginTop: '5px' }} className="div8">
                                                                  <div className="text-medium-emphasis small ">Юридический адрес</div>
                                                                  <div
                                                                    style={{ height: '40px', textAlign: 'left', paddingLeft: '5px' }}
                                                                    className="py-2 uley-data-main"
                                                                  >

                                                                  </div>
                                                                </div>
                                                              </div>

                                                            </>
                                                          ) : (
                                                            ''
                                                          )}
                                  
                                </div>


                              </div>
                              }
                            </CCardBody>
                          </CCard>
                        </CCol>
                    </CRow>
                  
                </Suspense>
            </CContainer>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default ProfileCompany
