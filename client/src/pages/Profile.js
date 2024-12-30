import React, { Suspense, useEffect, useState, useRef, useContext } from 'react'
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
import { useUsersContext } from "../chat-app-new/context/usersContext";
import {Context} from "../index";

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

import comtegs from 'src/data/comtegs';
import companys from 'src/data/companys';
import cities from 'src/data/cities';
import dolgnostData from 'src/data/dolgnostData';
import sferaData from 'src/data/sfera';

import distribData from 'src/data/specDistribData';

import { uploadAvatar, uploadFile } from '../http/chatAPI';
import { getContacts } from '../http/chatAPI'
import { addManager, getManagerId, editManager } from 'src/http/managerAPI';


const Profile = () => {
  const {user} = useContext(Context)
  const navigate = useNavigate()
  const { userId, setUserId } = useUsersContext();
  const [managerProfile, setManagerProfile] = useState({});

  const [sortedCities, setSortedCities] = useState([])
  const [managerCount, setManagerCount] = useState([]);
  const [companysData, setCompanysData] = useState([]);

  const [companyName, setCompanyName] = useState('');

  const [projects, setProjects] = useState(''); 
  const [userbots, setUserbots] = useState([]);

  const [loading, setLoading]= useState(true);
  const [loading2, setLoading2]= useState(false);
  const [text, setText]= useState("");
  //const [spec, setSpec] = useState([]); 
  const [visibleSm, setVisibleSm] = useState(false)
  const [modalUser, setModalUser] = useState({})
  const [showProfile, setShowProfile] = useState(false)
  const [showSpec, setShowSpec] = useState(false)
  const [showClose, setShowClose] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [showSearch, setShowSearch] = useState(true)
  const [showClear, setShowClear] = useState(false)
  const [showMenuBlock18, setShowMenuBlock18] = useState(false)
  const [showBlock18, setShowBlock18] = useState(false)
  const [block18, setBlock18] = useState(false)
  const [block, setBlock] = useState(false)
  const [showMenuKrest, setShowMenuKrest] = useState(false)
  const [showKrest, setShowKrest] = useState(false)

  
  const [showSavePhone1, setShowSavePhone1] = useState(false)
  const [showSavePhone2, setShowSavePhone2] = useState(false)
  const [showSaveTg, setShowSaveTg] = useState(false)
  const [showSave3, setShowSave3] = useState(false)

  const [id, setId] = useState('');
  const [fio, setFio] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [phone2, setPhone2] = useState('');
  const [telegram, setTelegram] = useState('');
  const [reyting, setReyting] = useState('');
  const [rank, setRank] = useState('');
  const [company, setCompany] = useState('');
  const [dolgnost, setDolgnost] = useState('');
  const [email, setEmail] = useState('');
  const [dateReg, setDateReg] = useState('');
  const [avatar, setAvatar] = useState('');

  const [countPress, setCountPress] = useState(0);
  const [countPressTG, setCountPressTG] = useState(0);
  const [countPressCity, setCountPressCity] = useState(0);

  const [blockProfile, setBlockProfile] = useState(true)
  const [showBlacklist, setShowBlacklist] = useState(false)
  const [showMenu1, setShowMenu1] = useState(false)
  const [showMenu2, setShowMenu2] = useState(false)
  const [showClearCity, setShowClearCity] = useState(false)

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
  //			get profile
  //-----------------------------------------------------------------------------------------
  useEffect(()=> {

    console.log("cities: ", cities)
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
      setShowProfile(true)
      setLoading(false)
      
      const user = localStorage.getItem('user')
      console.log("user: ", JSON.parse(user))

      if (user) {
        setUserId(JSON.parse(user)?.id)
        setEmail(JSON.parse(user)?.email)
      }
      
    }
    fetchData()
  }, [])


  useEffect(()=> {
    const fetchData = async() => {
      const result = await getManagerId(userId)
      console.log("Manager: ", result)

      setManagerProfile(result)
      setCity(result ? result.city : '')
    }

    fetchData()
  }, [userId])

  useEffect(()=> {
    setManagerProfile({...managerProfile, city: city})
  }, [city])

  {/* Добавление файла */}
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setFilePreview(URL.createObjectURL(e.target.files[0]));
  }


  //сохранить профиль
  const saveProfile = async(id) => { 
      setShowClose(true)
      console.log(id)


      const saveData = {
        fio: managerProfile?.fio,
        chatId: managerProfile?.chatId,
        phone: managerProfile?.phone, 
        phone2: managerProfile?.phone2,
        city, 
        dolgnost: managerProfile?.dolgnost,
        company: managerProfile?.companyId,
        avatar, 
        email: email, 
      }  
      console.log("saveData: ", saveData)

      const result = await getManagerId(userId)
      console.log("Manager: ", result)

      if (!result) {
        const resAdd = await addManager(saveData)
      } else {
        const resUpdate = await editManager(saveData, result?.id)
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

  
  const handleTg = event => {
    const result = event.target.value.replace(/\D/g, '');
    setManagerProfile({...managerProfile, chatId: result})
  };

  const changeFio = (e) => {
    setManagerProfile({...managerProfile, fio: e.target.value})
  }

  const changeCompany = (e) => {
    console.log("company: ", e.target.value)
    setManagerProfile({...managerProfile, companyId: e.target.value})
  }

  const changeDolgnost = (e) => {
    setManagerProfile({...managerProfile, dolgnost: e.target.value})
  }

  const changePhone = (e) => {
    setManagerProfile({...managerProfile, phone: e.target.value})
  }

  const changePhone2 = (e) => {
    setManagerProfile({...managerProfile, phone2: e.target.value})
  }

  const changeCity = (e) => {
    //console.log(e.target.value)
    if (e) {
      setCity(e.target.value)  
    } else {
      setCity('')  
    }    
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
                              {showProfile ?
                              
                              // (loading ?                                
                              // <CSpinner/>                        
                              // :
                              <div style={{position: 'relative', height: '400px', display: 'flex', flexDirection: 'row'}}>
{/* 1 */}                               
                                <div style={{width: '250px'}} onMouseOver={()=>setShowUpload(true)} onMouseOut={()=>setShowUpload(false)}>
                                  {filePreview ? 
                                  <img src={filePreview} alt='' style={{borderRadius: '15px', objectFit: 'cover'}} width={250} height={250}/>
                                  :
                                  (
                                    avatar ? 
                                  <img src={avatar} width='250px' height='250px' alt='poster' style={{borderRadius: '7px', marginBottom: '5px'}}/>
                                  : 
                                  <svg className="rounded me-2" width="250" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" style={{float:'left', marginBottom: '3px'}}>
                                    <rect width="250px" height="250px" fill="#007aff" rx="40"></rect> 
                                  </svg>
                                  )
                                  }
                                  <div className="file-upload" style={{marginBottom: '8px'}}>
                                    {/* <img src={addAvatar} alt="upload" style={{display: showUpload ? 'block' : 'none', position: 'absolute', top: '100px', left: '100px', cursor: 'pointer', width: '50px', height: '50px'}}/>
                                    <input 
                                      type="file"
                                      id="formFile" 
                                      accept="image/*,image/jpeg" 
                                      name="avatar"
                                      onChange={(e) => onFileChange(e)}
                                      style={{position: 'absolute', top: '130px', left: '10px', opacity: '0', zIndex: '100', width: '230px'}}
                                    /> */}
                                  </div>

                                  <label className='title-label'>ID</label>
                                  <div className="text-field">
                                      <input 
                                        disabled={true} 
                                        className="text-field__input" 
                                        type="text" 
                                        name="dateReg" 
                                        id="dateReg" 
                                        value={'0000'+ userId} 
                                        style={{width: '250px'}}
                                      />
                                  </div>


                                  <label className='title-label'>Telegram ID</label>
                                  <div className="text-field">
                                    <input 
                                      className="text-field__input" 
                                      type="text" 
                                      pattern="[0-9]*"
                                      name="telegram" 
                                      id="telegram" 
                                      value={managerProfile?.chatId} 
                                      onChange={handleTg} 
                                      style={{width: '250px'}}
                                    />
                                  </div> 


                                  {/* ФИО */}
                                  <div style={{position: 'absolute', top: '5px', left: '286px', color: '#fff', fontSize: '33px', zIndex: '100', display: 'flex', justifyContent: 'space-between', width: '-webkit-fill-available'}}>   
                                    <div className="text-field">
                                      <input type="text" placeholder='Фамилия Имя Отчество' name="fio" id="fio" value={managerProfile?.fio} onChange={(e)=>changeFio(e)} style={{fontSize: '33px', position: 'absolute', top: '-17px', backgroundColor: 'transparent', border: '0', color: '#f3f3f3', width: '550px'}}></input>
                                    </div>
                                    <div style={{display: 'flex', position: 'absolute', right: '0'}}>
                                      <img src={Disketa} onClick={()=>saveProfile(id)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={Close} onClick={closeProfile} style={{display: showClose ? 'block' : 'block', cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>  
                                    </div>
                                  </div>

                                  {/* 2 */}
                                

                                </div>

{/* 2 */}
                                <div style={{marginLeft: '40px', marginTop: '85px', display: 'flex', flexDirection: 'column', width: '320px'}}>
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
                                                fontWeight: '700',
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
                                        onInputChange={(e)=>changeCity(e)}
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

                                  <label className='title-label'>Компания</label>
                                  <div className="text-field"> 
                                    <input className="text-field__input" type="text" name="company" id="company" value={managerProfile?.companyId} onChange={(e)=>changeCompany(e)}  />
                                  </div>

                                  <label className='title-label'>Должность</label>
                                  <div className="text-field"> 
                                    <input className="text-field__input" type="text" name="dolgnost" id="dolgnost" value={managerProfile?.dolgnost} onChange={(e)=>changeDolgnost(e)}  />
                                  </div>

                                  <div style={{position: 'relative'}}>
                                    <label className='title-label' style={{position: 'absolute', top: '-15px', left: '40%'}}>Проекты</label>
                                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '24px'}}>                                   
                                      {/* проекты за месяц */}
                                      <div style={{marginRight: '10px'}}>
                                        <label className='title-label'>За месяц</label>
                                        <div className="text-field">
                                            <input disabled className="text-field__input" type="text" name="reyting" id="reyting" value={reyting} onChange={(e) => setReyting(e.target.value)} style={{width: '100%', marginRight: '8px'}}/>
                                        </div>
                                      </div>
                                      {/* проекты всего */}
                                      <div> 
                                        <label className='title-label'>Всего</label>
                                        <div className="text-field">
                                            <input disabled className="text-field__input" type="text" name="rank" id="rank" value={rank} onChange={(e) => setRank(e.target.value)} style={{width: '100%', marginRight: '8px'}}/>
                                        </div>
                                      </div>
                                      
                                    </div>
                                  </div>
                                  
                                </div>

{/* 3 */}
                                <div style={{marginLeft: '40px', marginTop: '85px', display: 'flex', flexDirection: 'column', width: '320px'}}>
                                    <label className='title-label'>Телефон №1</label>
                                    <div className="text-field">                                   
                                      <InputMask
                                          className="text-field__input" 
                                          //style={{width: '225px'}}
                                          type="text" 
                                          name="phone" 
                                          id="phone"
                                          mask="+7 (999) 999-99-99"
                                          //disabled={!blockProfile}
                                          maskChar=""
                                          onChange={(e) => changePhone(e)} 
                                          value={managerProfile?.phone}
                                          placeholder=''
                                      >
                                      </InputMask>
                                      
                                    </div> 

                                  <label className='title-label'>Телефон №2</label>
                                  <div className="text-field">                                    
                                      <InputMask
                                          className="text-field__input" 
                                          //style={{width: '320px'}}
                                          type="text" 
                                          name="phone2" 
                                          id="phone2"
                                          mask="+7 (999) 999-99-99"
                                          //disabled={!blockProfile}
                                          maskChar=""
                                          onChange={(e) => changePhone2(e)} 
                                          value={managerProfile?.phone2}
                                          placeholder=''
                                      >
                                      </InputMask>
                                      
                                  </div> 

                                  <label className='title-label'>Почта</label>
                                  <div className="text-field">
                                    <input disabled className="text-field__input" type="text" name="email" id="email" value={email}/>
                                  </div> 

                                  <label className='title-label'>Пароль</label>
                                  <div className="text-field">
                                    <input disabled className="text-field__input" type="text" name="password" id="password"  />
                                  </div> 
                                </div>

{/* 4 */}
                                <div style={{marginLeft: '40px', marginTop: '85px', display: 'flex', flexDirection: 'column', width: '250px'}}>

                                  <label className='title-label'>Проекты</label>
                                  <div className="text-field" style={{marginBottom: '0px'}}>
                                    <ul className='spec-style' style={{width: '100%', height: '295px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left'}}>
                                    
                                    </ul>
                                  </div> 
                                </div>


                              </div>
                              //)
                              :''
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

export default Profile
