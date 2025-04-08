import React, { Suspense, useEffect, useState, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import InputMask from 'react-input-mask';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
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
  CTooltip,
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


import { uploadAvatar, uploadFile } from '../http/chatAPI';
import { getContacts } from '../http/chatAPI'
import { addManager, getManagerId, editManager } from 'src/http/managerAPI';
import { getCompanyProfId } from '../http/companyAPI'


const Profile = () => {
  //const {user} = useContext(Context)
  const navigate = useNavigate()
  const { userId, sortedCities, email, setEmail, managerProfile, setManagerProfile, setRole } = useUsersContext();
  // const [managerProfile, setManagerProfile] = useState({});

  
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


  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [fio, setFio] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [phone2, setPhone2] = useState('');
  const [telegram, setTelegram] = useState('');
  const [reyting, setReyting] = useState('');
  const [rank, setRank] = useState('');
  const [company, setCompany] = useState('');
  const [dolgnost, setDolgnost] = useState('');
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

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModalSave, setShowModalSave] = useState(false);

  const [file, setFile] = useState(0);
  const [filePreview, setFilePreview] = useState();
  const [image, setImage]= useState("");

  const customTooltipStyle = {
    '--cui-tooltip-bg': '#000',
    '--cui-tootip-color': '#fff'
  }

  const host = process.env.REACT_APP_API_URL

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
	
		const fetchData = async() => {
		  //setShowProfile(true)

      const user = localStorage.getItem('user')
		  
		  if (user) {
        setRole(JSON.parse(user)?.role)
        setEmail(JSON.parse(user)?.email)
      }

      const result = await getManagerId(userId)
      console.log("Manager: ", result)
      setManagerProfile(result)

      const result2 = await getCompanyProfId(userId)
      console.log("Company: ", result2)
      setTitle(result2?.title)

		  setLoading(false)  
		}
		fetchData()
	}, [])

  useEffect(()=> {
    //setManagerProfile({...managerProfile, city: city})
    setCity(managerProfile?.city)
    setAvatar(managerProfile?.avatar)
    setFio(managerProfile?.fio)
  }, [managerProfile])

  useEffect(() => {
      const getImage = async () => {
          if (file) {
            //setShowUpload(true)
            console.log("file:", file)
            const data = new FormData();
            data.append("name", file.name);
            data.append("photo", file);
            console.log("data: ", data)

            let response = await uploadFile(data) //distribFile(data) // uploadFile(data)
            console.log("response: ", response.data.path)
  
            setImage(host + response.data.path);
            //сообщение с ссылкой на файл
            console.log("Путь к файлу: ", host + response.data.path)
            setAvatar(host + response.data.path)
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
      setShowModalSave(true)

      setShowClose(true)
      console.log("managerProfile: ", managerProfile)


      const saveData = {
        fio: managerProfile?.fio,
        chatId: managerProfile?.chatId,
        phone: managerProfile?.phone, 
        phone2: managerProfile?.phone2,
        city: managerProfile?.city, 
        dolgnost: managerProfile?.dolgnost,
        companyId: managerProfile?.companyId,
        avatar: avatar, 
        email: email,
        userId, 
      }  
      console.log("saveData: ", saveData)

      const result = await getManagerId(userId)
      console.log("Manager: ", result)

      if (!result) {
        const resAdd = await addManager(saveData)
      } else {
        const resUpdate = await editManager(saveData, result?.id)
      }

      //addToast(exampleToast) //ваши данные сохранены

      setTimeout(()=> {
        setShowModalSave(false)
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
    //setManagerProfile({...managerProfile, companyId: e.target.value})
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
      setManagerProfile({...managerProfile, city: e.target.value})  
    } else {
      setCity('')  
      setManagerProfile({...managerProfile, city: ''})  
    }    
  }

  const clickCompany = ()=> {
    console.log(title)
    setShowModal(true)
    setTimeout(()=> {
        setShowModal(false)
    }, 3000)
  }

  const clickProjects = ()=> {
   // console.log(title)
    setShowModal2(true)
    setTimeout(()=> {
        setShowModal2(false)
    }, 3000)
  }

  const clickRazrab = ()=> {
    //console.log(title)
    setShowModal3(true)
    setTimeout(()=> {
        setShowModal3(false)
    }, 3000)
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
                                                             
                              <CSpinner/>                        
                              :
                              <div style={{position: 'relative', height: '402px', display: 'flex', flexDirection: 'row'}}>
                                  {/* ФИО */}
                                  <div style={{position: 'absolute', top: '5px', left: '286px', color: '#fff', fontSize: '33px', zIndex: '100', display: 'flex', justifyContent: 'space-between'}}>   
                                    <div className="text-field">
                                      <input type="text" placeholder='Фамилия Имя Отчество' name="fio" id="fio" value={fio} onChange={(e)=>changeFio(e)} style={{fontSize: '33px', position: 'absolute', top: '-17px', backgroundColor: 'transparent', border: '0', color: '#f3f3f3', width: '650px'}}></input>
                                    </div> 
                                  </div>
                                   {/* Кнопки */}
                                  <div style={{display: 'flex', position: 'absolute', right: '0'}}>
                                    <CTooltip content="Сохранить профиль" placement="bottom" style={customTooltipStyle}>
                                      <img src={Disketa} onClick={()=>saveProfile(id)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                    </CTooltip>
                                    <CTooltip content="Закрыть профиль" placement="bottom" style={customTooltipStyle}>
                                      <img src={Close} onClick={closeProfile} style={{display: showClose ? 'block' : 'block', cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>  
                                    </CTooltip>
                                  </div>


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
                                    <img src={addAvatar} alt="upload" style={{display: showUpload ? 'block' : 'none', position: 'absolute', top: '100px', left: '100px', cursor: 'pointer', width: '50px', height: '50px'}}/>
                                    <input 
                                      type="file"
                                      id="formFile" 
                                      accept="image/*,image/jpeg" 
                                      name="photo"
                                      onChange={(e) => onFileChange(e)}
                                      style={{position: 'absolute', top: '130px', left: '10px', opacity: '0', zIndex: '100', width: '230px'}}
                                    />
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
                                                fontWeight: '400',
                                                lineHeight: '1.5',
                                                textAlign: 'center',
                                                color: '#ffffff',
                                                backgroundColor: 'transparent', 
                                            }
                                        }}
                                        PaperComponent={({ children }) => (
                                          <Paper style={{ background: '#131c21', border: '1px solid #2d2e38', color: '#fff'}}>{children}</Paper>
                                        )}
                                        className="text-field__input" 
                                        openOnFocus
                                        id="custom-input-demo"
                                        options={sortedCities}
                                        style={{width: '100%', padding: '0'}}
                                        isOptionEqualToValue={(option, value) => option.value === value.value}
                                        onInputChange={(e)=>changeCity(e)}
                                        onChange={(event, newValue) => {
                                          if (newValue && newValue.length) {                                                      
                                            //setCity(newValue)
                                            setCity(newValue)  
                                            setManagerProfile({...managerProfile, city: newValue}) 
                                          }  
                                        }}
                                        value={managerProfile?.city ? managerProfile?.city : ''} 
                                        inputValue={managerProfile?.city ? managerProfile?.city : ''}
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
                                    <div onClick={clickCompany} className="text-field__input" style={{paddingTop: '8px'}}> 
                                      {title}
                                    </div>
                                  </div>

                                  <label className='title-label'>Должность</label>
                                  <div className="text-field"> 
                                    <input className="text-field__input" type="text" name="dolgnost" id="dolgnost" value={managerProfile?.dolgnost} onChange={(e)=>changeDolgnost(e)}  />
                                  </div>

                                  <div style={{position: 'relative'}}>
                                    <label className='title-label' style={{position: 'absolute', top: '-15px', left: '40%'}}>Проекты</label>
                                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '24px'}}>                                   
                                      {/* проекты за месяц */}
                                      <div style={{marginRight: '10px', width: '100%'}}>
                                        <label className='title-label'>За месяц</label>
                                        <div className="text-field">
                                            <div onClick={clickProjects}  className="text-field__input" type="text" name="reyting" id="reyting" value={reyting} style={{width: '100%', marginRight: '8px'}}/>
                                        </div>
                                      </div>
                                      {/* проекты всего */}
                                      <div style={{width: '100%'}}> 
                                        <label className='title-label'>Всего</label>
                                        <div className="text-field">
                                            <div onClick={clickProjects}  className="text-field__input" type="text" name="rank" id="rank" value={rank} style={{width: '100%', marginRight: '8px'}}/>
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
                                    <div onClick={clickRazrab}  className="text-field__input" type="text" name="email" id="email" value={email}/>
                                  </div> 

                                  <label className='title-label'>Пароль</label>
                                  <div className="text-field">
                                    <div onClick={clickRazrab} className="text-field__input" type="text" name="password" id="password"  />
                                  </div> 
                                </div>

{/* 4 */}
                                <div style={{marginLeft: '40px', marginTop: '85px', display: 'flex', flexDirection: 'column', width: '250px'}}>

                                  <label className='title-label'>Проекты</label>
                                  <div onClick={clickProjects} className="text-field" style={{marginBottom: '0px'}}>
                                    <ul className='spec-style' style={{width: '100%', height: '291px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left'}}>
                                    
                                    </ul>
                                  </div> 
                                </div>


                              </div>
                              }
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
                      <CModalBody style={{height: '100px', textAlign: 'center', fontSize: '14px', paddingTop: '35px'}}>
                        Название компании редактируется в разделе Компания в правом верхнем меню
                      </CModalBody>
                    </CModal>


                    <CModal
                      alignment="center"
                      visible={showModal2}
                      onClose={() => setShowModal2(false)}
                      aria-labelledby="VerticallyCenteredExample"
                    >
                      <CModalBody style={{height: '100px', textAlign: 'center', fontSize: '18px', paddingTop: '35px'}}>
                        Заполняется системой автоматически
                      </CModalBody>
                    </CModal>

                    <CModal
                      alignment="center"
                      visible={showModal3}
                      onClose={() => setShowModal3(false)}
                      aria-labelledby="VerticallyCenteredExample"
                    >
                      <CModalBody style={{height: '100px', textAlign: 'center', fontSize: '18px', paddingTop: '35px'}}>
                        Функция находится в разработке
                      </CModalBody>
                    </CModal>

                    <CModal
                      alignment="center"
                      visible={showModalSave}
                      onClose={() => setShowModalSave(false)}
                      aria-labelledby="VerticallyCenteredExample"
                    >
                      <CModalBody style={{height: '100px', textAlign: 'center', fontSize: '18px', paddingTop: '35px'}}>
                        Данные успешно сохранены
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

export default Profile
