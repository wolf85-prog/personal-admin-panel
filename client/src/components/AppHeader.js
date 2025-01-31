import React, {useState, useRef} from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CBadge,
  CButton,
  CFormInput,
  CProgress,
  CToastBody,
  CToastClose,
  CTooltip,
  CCardBody,
  CModalHeader,
  CModalTitle,
  CModal,
  CModalBody,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Icon from "./../../src/chat-app-new/components/Icon";
import { cilBell, cilEnvelopeOpen, cilList, cilMenu, cilPhone } from '@coreui/icons'

import { useUsersContext } from "./../chat-app-new/context/usersContext";
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import logo from './../assets/brand/logo_04_light.png'
import Star from "./../assets/images/star.png";
import StarActive from "./../assets/images/star_activ.svg";
import Krestik from './../assets/images/krestik.png';
import block18 from "./../assets/images/block18.png";
import Trubka from "./../assets/images/trubka.gif";
import Photo1 from "./../assets/images/photo_1.jpg";
import Help from "./../assets/images/help.png";
import Help2 from "./../assets/images/help2.png";
import Next from "./../assets/images/next.png";
import Next2 from "./../assets/images/next2.png";
import Vopros from "./../assets/images/vopros.png";
import Vopros2 from "./../assets/images/vopros2.png";
import Error from "./../assets/images/error.png";
import Error2 from "./../assets/images/error2.png";
import Delete from "./../assets/images/cart.png";
import Delete2 from "./../assets/images/cart2.png";
import ULEY from "./../assets/images/home_chat.jpeg";
import robot from "src/chat-app-worker/assets/images/robot.png";


import './DropdownHeader.css'

import MyModalSmall from './MyModalSmall/MyModalSmall'
import Close from "./../assets/images/close.svg"

const AppHeader = (props) => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const { workerCall, showCallCard, setShowCallCard, workerCallNo, showCallCardNo, setShowCallCardNo, callIndex, callIndex2, 
    soundVolume, setSoundVolume, soundMute, setSoundMute} = useUsersContext();

  const { clientCall, showCallCard2, setShowCallCard2, callIndex3, callIndex4} = useUsersContext();

  const { workerIshod, setWorkerIshod, showCallCardWorker, setShowCallCardWorker} = useUsersContext();
  const { clientIshod, setClientIshod, showCallCardClient, setShowCallCardClient} = useUsersContext();
  const { robotIshod, setRobotIshod, showCallCardRobot, setShowCallCardRobot} = useUsersContext();

  const [soundCount, setSoundCount] = useState(100)
  const [showBar, setShowBar] = useState(false)
  const [showBarHelp, setShowBarHelp] = useState(false)
  const [toast, addToast] = useState(0)
  const [showToast, setShowToast] = useState(false)
  const [shake, setShake] = useState(false)
  const [shake2, setShake2] = useState(false)
  const toaster = useRef()

  const [visibleModal, setVisibleModal] = useState(false);
  const [showModalEmpty, setShowModalEmpty] = useState(false)


  const clickPhone = () => {
    //addToast(exampleToast) //ваша рассылка удалена
    setShowToast(!showToast)
    //setShowCallCard(!showCallCard)
  }

  const plusSound = () => {
    // Button begins to shake
    setShake2(true);
        
    // Buttons stops to shake after 2 seconds
    setTimeout(() => setShake2(false), 100);

    if (soundVolume === 0.90) {
      setSoundVolume(1.0)
    } else if (soundVolume === 0.80) {
      setSoundVolume(0.9)
    } else if (soundVolume === 0.70) {
      setSoundVolume(0.8)
    } else if (soundVolume === 0.60) {
      setSoundVolume(0.7)
    } else if (soundVolume === 0.50) {
      setSoundVolume(0.6)
    } else if (soundVolume === 0.40) {
      setSoundVolume(0.5)
    } else if (soundVolume === 0.30) {
      setSoundVolume(0.4)
    } else if (soundVolume === 0.20) {
      setSoundVolume(0.3)
    } else if (soundVolume === 0.10) {
      setSoundVolume(0.2)
    } 
  }

  const minusSound = () => {
    // Button begins to shake
    setShake(true);
        
    // Buttons stops to shake after 2 seconds
    setTimeout(() => setShake(false), 100);

    if (soundVolume === 1.0) {
      setSoundVolume(0.90)
    } else if (soundVolume === 0.90) {
      setSoundVolume(0.80)
    } else if (soundVolume === 0.80) {
      setSoundVolume(0.70)
    } else if (soundVolume === 0.70) {
      setSoundVolume(0.60)
    } else if (soundVolume === 0.60) {
      setSoundVolume(0.50)
    } else if (soundVolume === 0.50) {
      setSoundVolume(0.40)
    } else if (soundVolume === 0.40) {
      setSoundVolume(0.30)
    } else if (soundVolume === 0.30) {
      setSoundVolume(0.20)
    } else if (soundVolume === 0.20) {
      setSoundVolume(0.10)
    } 
  }

  const handleLinkClick = (url) => {
    // Open the link in a new tab with desired features (optional)
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const clickMute = () => {
    setSoundMute(!soundMute)
  }

  const clickBell = () => {
    //audio120()
  }

  const clickClose = () => {
    setVisibleModal(false)
    setShowBar(false)
  }

  return (
    <>
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
          {/* <h5>U.L.E.Y TEAM</h5> */}
        </CHeaderBrand>

        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <a href='https://t.me/ULEY_Projects_Bot'><CButton color="dark" style={{backgroundColor: 'transparent', marginLeft: '250px'}}>Найти специалистов</CButton></a>
          </CNavItem>
          <CNavItem>
            <a href='https://t.me/ULEY_Projects_Bot' style={{marginLeft: '15px'}}><CButton color="dark" style={{backgroundColor: 'transparent', marginLeft: '200px'}}>Найти оборудование</CButton></a>
          </CNavItem>

          {/* <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Пункт управления
            </CNavLink>
          </CNavItem>

          <CNavItem>
            <CNavLink href="/project">Проекты</CNavLink>
          </CNavItem> */}
        </CHeaderNav>

        <CHeaderNav style={{marginTop: 'auto', display: 'flex', alignItems: 'center'}}>
          {/* + */}
          <CNavItem>
            <CButton onClick={plusSound} color="dark" style={{marginRight: '10px', textAlign:'center', padding: '0', background: shake2 ? '#262829' : '#595d5f', fontSize: '14px', width: '23px', height: '23px', marginTop: '-7px'}}>
              +
            </CButton>
          </CNavItem>
          
          <CNavItem>
            <CFormInput 
              id="autoSizingInput" 
              style={{width: '25px', textAlign:'center', marginRight: '10px', fontSize: '12px', marginRight: '10px', height: '25px', paddingLeft: '0px', paddingRight: '0px', marginTop: '-2px'}}
              value={soundVolume*100}
            />
          </CNavItem> 
          
          {/* - */}
          <CNavItem> 
            <CButton onClick={minusSound} color="dark" style={{marginRight: '10px', textAlign:'center', padding: '0', background: shake ? '#262829' : '#595d5f', fontSize: '14px', width: '23px', height: '23px', marginTop: '-7px'}}>
              -
            </CButton>
          </CNavItem>
          
          {/* Mute */}
          <CNavItem>
            <CButton onClick={clickMute} className={soundMute ? 'button-m' : ''} color="dark" style={{marginRight: '20px', background: 'red', fontSize: '7px', width: '23px', height: '23px', paddingRight: '0px', paddingLeft: '0px', marginTop: '-7px'}}>
              Mute
            </CButton>
          </CNavItem>

          {/* Инструкция*/}
          <CNavItem>
            <CTooltip
              content="Инструкция"
              placement="bottom"
            >
              <CNavLink style={{position: 'relative', cursor: 'pointer'}}>
                <img onClick={()=>setShowModalEmpty(true)} src={Vopros} onMouseOver={e => (e.currentTarget.src = Vopros2)} onMouseOut={e => (e.currentTarget.src = Vopros)}  style={{width: '18px', paddingBottom: '5px'}}/>               
              </CNavLink>
            </CTooltip>
          </CNavItem>

          {/* Команды*/}
          <CNavItem>
            <CTooltip
              content="Команды / Триггеры"
              placement="bottom"
            >
              <CNavLink onClick={()=>setShowBarHelp(!showBarHelp)} style={{position: 'relative',  cursor: 'pointer'}}>
                <img src={Help} onMouseOver={e => (e.currentTarget.src = Help2)} onMouseOut={e => (e.currentTarget.src = Help)}  style={{width: '18px', paddingBottom: '5px'}}/>
                <div
                  style={{
                    backgroundColor: '#2a2f32', 
                    width: '780px', 
                    height: '575px', 
                    position: 'absolute', 
                    top: '50px', 
                    right: '10px',
                    display: showBarHelp ? 'flex' : 'none',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    borderRadius: '15px',
                    border: '1px solid #4b4b4b',
                    padding: '15px',
                  }}>
                    <p style={{fontSize: '13px', paddingRight: '15px'}}><b>Команды:</b><br/>
                      <br/>
                      /help <span style={{color: '#6e6e6e'}}>&mdash; список комманд;</span><br/>
                      /next <span style={{color: '#6e6e6e'}}>&mdash; 10 ближайших запусков;</span><br/>
                      /status <span style={{color: '#6e6e6e'}}>&mdash; вызов кнопок статуса;</span><br/>
                      /info <span style={{color: '#6e6e6e'}}>&mdash; панель информации;</span><br/>
                      <br/>
                      /go <span style={{color: '#6e6e6e'}}>&mdash; перекличка;</span><br/>
                      /phone <span style={{color: '#6e6e6e'}}>&mdash; контакты на площадке;</span><br/>
                      /place <span style={{color: '#6e6e6e'}}>&mdash; адрес площадки;</span><br/>
                      /office <span style={{color: '#6e6e6e'}}>&mdash; адрес офиса &laquo;U.L.E.Y&raquo;;</span><br/>
                      <br/>
                      /hallo <span style={{color: '#6e6e6e'}}>&mdash; приветствие-запрос;</span><br/>
                      /alert <span style={{color: '#6e6e6e'}}>&mdash; вызов на связь всех участников проекта;</span><br/>
                      /update <span style={{color: '#6e6e6e'}}>&mdash; смена основного состава;</span><br/>
                      /mango <span style={{color: '#6e6e6e'}}>&mdash; смена распределения звонков;</span><br/>
                      <br/>
                      /ping <span style={{color: '#6e6e6e'}}>&mdash; тест сервера; [отклик &mdash; Pong]</span><br/>
                      /telegram <span style={{color: '#6e6e6e'}}>&mdash; напоминание отключить блокировку;</span><br/>
                      /boost <span style={{color: '#6e6e6e'}}>&mdash; ускоритель обработки данных нового проекта;</span><br/>
                      /stop <span style={{color: '#6e6e6e'}}>&mdash; остановить смену;</span><br/>
                      <br/>
                      /inn <span style={{color: '#6e6e6e'}}>&mdash; запрос данных о самозанятости специалиста;</span><br/>
                      /id <span style={{color: '#6e6e6e'}}>&mdash; номер ID проекта;</span><br/>
                      /deleted <span style={{color: '#6e6e6e'}}>&mdash; удаленные проекты за 24 часа;</span><br/>
                      /error <span style={{color: '#6e6e6e'}}>&mdash; ошибки в проектах;</span><br/>
                      <br/>
                      /1 /2 /3 /4 /5 <span style={{color: '#6e6e6e'}}>&mdash; перенос запроса статуса окончания работ;</span><br/>
                    </p>
                    <p style={{fontSize: '13px'}}><b>Триггеры:</b><br/>
                      <br/>
                      Правила <span style={{color: '#6e6e6e'}}>&mdash; правила работы на проектах;</span><br/>
                      Такси <span style={{color: '#6e6e6e'}}>&mdash; инструкция по использованию;</span><br/>
                      Геолокация <span style={{color: '#6e6e6e'}}>&mdash; инструкция как подключить;</span><br/>
                      Контакты <span style={{color: '#6e6e6e'}}>&mdash; номер телефона &laquo;U.L.E.Y&raquo;;</span><br/>
                      <br/>
                      Оплата <span style={{color: '#6e6e6e'}}>&mdash; чат-бот &laquo;Office&raquo;;</span><br/>
                      Дресс-код <span style={{color: '#6e6e6e'}}>&mdash; форма одежды;</span><br/>
                      Мерч <span style={{color: '#6e6e6e'}}>&mdash; описание и условия получения;</span><br/>
                      Фотоотчет <span style={{color: '#6e6e6e'}}>&mdash; инструкция по отчету;</span><br/>
                      <br/>
                      Активатор <span style={{color: '#6e6e6e'}}>&mdash; инструкция по активации кнопок;</span><br/>
                      Соня <span style={{color: '#6e6e6e'}}>&mdash; предупреждение о времени выхода на связь;</span><br/>
                      Ночь <span style={{color: '#6e6e6e'}}>&mdash; логистика в ночное время;</span><br/>
                      Сказка на ночь <span style={{color: '#6e6e6e'}}>&mdash; подготовка к ночному проекту;</span><br/>
                      <br/>
                      Оплата <span style={{color: '#6e6e6e'}}>&mdash; чат-бот &laquo;Office&raquo;;</span><br/>
                      Штраф <span style={{color: '#6e6e6e'}}>&mdash; информация о штрафах;</span><br/>
                      Самозанятость <span style={{color: '#6e6e6e'}}>&mdash; НЕ готово;</span><br/>
                      Ставка <span style={{color: '#6e6e6e'}}>&mdash; НЕ готово;</span>
                    </p>
                </div>
              </CNavLink>
            </CTooltip>
          </CNavItem>
          
          {/* Обновление данных */}


          {/* Mango */}
          <CNavItem>
            <CTooltip
              content="Mango"
              placement="bottom"
            >
              <CNavLink style={{position: 'relative', transform: 'rotate(90deg)', marginBottom: '3px'}}>
                <CIcon onClick={()=>setShowModalEmpty(true)} icon={cilPhone} size="lg"/>
              </CNavLink>
            </CTooltip>

            {/* Входящий сотрудник */}
            <div style={{
              display: showCallCard ? 'block' : 'none', 
              position: 'absolute', top: '65px', right: '0', 
              width: '900px', height: '330px', 
              backgroundColor: '#2a2f32', 
              borderRadius: '15px', 
              border: '1px solid #4b4b4b',
              padding: '8px',
              zIndex: callIndex}
            }>
                <div className="d-flex" style={{justifyContent: 'space-between'}}>
                  <CToastBody>
                    <div style={{display: 'flex'}}>
                      {workerCall.avatar ? 
                      <img src={workerCall.avatar} alt='' style={{borderRadius: '15px', objectFit: 'cover'}} width={314} height={314}/>
                      : <img src={ULEY} alt='' style={{borderRadius: '15px', objectFit: 'cover'}} width={314} height={314}/>
                      }
                      <CToastClose onClick={()=>setShowCallCard(false)} white style={{position: 'absolute'}}/>
                      <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px'}}>
                        <span style={{color: '#fff', fontSize: '33px', position: 'absolute', top: '0px'}}>{workerCall.fio ? workerCall.fio?.split(' ')[0] : ''}</span>
                        <span style={{color: '#fff', fontSize: '33px', position: 'absolute', top: '37px'}}>{workerCall.fio ? workerCall.fio?.split(' ')[1] : ''} {workerCall.fio ? workerCall.fio?.split(' ')[2]: ''}</span>
                        <div className="star-block" style={{marginTop: '85px'}}>
                          <img className='star-icon' src={StarActive} width={25} alt='' /> 
                          <img className='star-icon' src={StarActive} width={25} alt='' />
                          <img className='star-icon' src={StarActive} width={25} alt='' />
                          <img className='star-icon' src={Star} width={25} alt='' />
                          <img className='star-icon' src={Star} width={25} alt='' />
                        </div>
                        <span style={{fontSize: '20px', color: '#858585', fontWeight: '700', marginTop: '10px'}}>{workerCall.year_of_birth}</span>
                        <span style={{fontSize: '20px', color: '#858585', fontWeight: '700'}}>{workerCall.sity}</span>
                        
                        <div style={{overflow: 'auto', height: '70px'}}>
                          <ul style={{listStyle: 'disc', paddingLeft: '20px'}}>
                            {workerCall.specialities ? workerCall.specialities.split(',').map((item, index)=> 
                              (<li key={index} style={{fontSize: '16px', color: '#858585'}}>
                                {item}
                              </li>)
                            ) : null}    
                          </ul>
                        </div>

                        <ul style={{listStyle: 'disc', paddingLeft: '20px'}}>
                          <li style={{fontSize: '16px', color: '#858585', paddingTop: '5px'}}>
                            Проекты: {workerCall.projects}
                          </li>
                        </ul>
                        
                        <ul style={{listStyle: 'disc', paddingLeft: '20px', paddingTop: '5px', position: 'absolute', bottom: '5px'}}>
                          <li style={{fontSize: '16px', color: 'red', width:'500px'}}>
                            <div style={{whiteSpace: 'nowrap', overflow: 'hidden'}}>
                              {workerCall.comtags ? workerCall.comtags.split(',').map((item, index)=> 
                                (<span key={index}>
                                  {item} {index === workerCall.comtags.split(',').length-1 ? '' : '| '}
                                </span>)
                              ) : null}
                            </div>
                            
                          </li>
                        </ul>
                      </div>
                    </div>
                      
                    {
                      workerCall.specialities ? 
                      (workerCall.specialities.split(',').find(item => item === 'Blacklist') ? 
                      <img src={Krestik} width={30} alt='' style={{position: 'absolute', top: '280px', right: '590px'}}/>
                      : "")
                      : ""
                    }
                    {
                      workerCall.specialities ? 
                      (workerCall.specialities.split(',').find(item => item === '+18') ? 
                      <img src={block18} width={50} alt='' style={{position: 'absolute', top: '10px', right: '580px'}}/>
                      : "")
                      : ""
                    }

                  </CToastBody>
                  {/* <CToastClose onClick={()=>setShowCallCard(false)} white style={{marginTop: '0px', marginRight: '0px'}}/> */}
                  <img 
                    src={Trubka} 
                    onClick={()=>setShowCallCard(false)} 
                    width={70} alt='' 
                    style={{position: 'absolute', top: '20px', right: '20px'}}
                  />
                </div>
            </div> 

            {/* Входящий клиент */}
            <div style={{
              display: showCallCard ? 'block' : 'none', 
              position: 'absolute', top: '65px', right: '0', 
              width: '900px', height: '330px', 
              backgroundColor: '#2a2f32', 
              borderRadius: '15px', 
              border: '1px solid #4b4b4b',
              padding: '8px',
              zIndex: callIndex}
            }>
                <div className="d-flex" style={{justifyContent: 'space-between'}}>
                  <CToastBody>
                    <div style={{display: 'flex'}}>
                      {clientCall.avatar ? 
                      <img src={workerCall.avatar} alt='' style={{borderRadius: '15px', objectFit: 'cover'}} width={314} height={314}/>
                      : <img src={ULEY} alt='' style={{borderRadius: '15px', objectFit: 'cover'}} width={314} height={314}/>
                      }
                      <CToastClose onClick={()=>setShowCallCard(false)} white style={{position: 'absolute'}}/>
                      <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px'}}>
                        <span style={{color: '#fff', fontSize: '33px', position: 'absolute', top: '0px'}}>{workerCall.fio ? workerCall.fio?.split(' ')[0] : ''}</span>
                        <span style={{color: '#fff', fontSize: '33px', position: 'absolute', top: '37px'}}>{workerCall.fio ? workerCall.fio?.split(' ')[1] : ''} {workerCall.fio ? workerCall.fio?.split(' ')[2]: ''}</span>
                        <div className="star-block" style={{marginTop: '85px'}}>
                          <img className='star-icon' src={StarActive} width={25} alt='' /> 
                          <img className='star-icon' src={StarActive} width={25} alt='' />
                          <img className='star-icon' src={StarActive} width={25} alt='' />
                          <img className='star-icon' src={Star} width={25} alt='' />
                          <img className='star-icon' src={Star} width={25} alt='' />
                        </div>
                        <span style={{fontSize: '20px', color: '#858585', fontWeight: '700', marginTop: '10px'}}>{workerCall.year_of_birth}</span>
                        <span style={{fontSize: '20px', color: '#858585', fontWeight: '700'}}>{workerCall.sity}</span>
                        
                        <ul style={{listStyle: 'disc', paddingLeft: '20px'}}>
                          <li style={{fontSize: '16px', color: '#858585', paddingTop: '5px'}}>
                            Проекты: {workerCall.projects}
                          </li>
                        </ul>
                        <div style={{overflow: 'auto', height: '70px'}}>
                          <ul style={{listStyle: 'disc', paddingLeft: '20px'}}>
                            {workerCall.specialities ? workerCall.specialities.split(',').map((item, index)=> 
                              (<li key={index} style={{fontSize: '16px', color: '#858585'}}>
                                {item}
                              </li>)
                            ) : null}    
                          </ul>
                        </div>
                        <ul style={{listStyle: 'disc', paddingLeft: '20px', paddingTop: '5px', position: 'absolute', bottom: '5px'}}>
                          <li style={{fontSize: '16px', color: 'red', width:'500px'}}>
                            <div style={{whiteSpace: 'nowrap', overflow: 'hidden'}}>
                              {workerCall.comtags ? workerCall.comtags.split(',').map((item, index)=> 
                                (<span key={index}>
                                  {item} {index === workerCall.comtags.split(',').length-1 ? '' : '| '}
                                </span>)
                              ) : null}
                            </div>
                            
                          </li>
                        </ul>
                      </div>
                    </div>
                      
                    {
                      workerCall.specialities ? 
                      (workerCall.specialities.split(',').find(item => item === 'Blacklist') ? 
                      <img src={Krestik} width={30} alt='' style={{position: 'absolute', top: '280px', right: '590px'}}/>
                      : "")
                      : ""
                    }
                    {
                      workerCall.specialities ? 
                      (workerCall.specialities.split(',').find(item => item === '+18') ? 
                      <img src={block18} width={50} alt='' style={{position: 'absolute', top: '10px', right: '580px'}}/>
                      : "")
                      : ""
                    }

                  </CToastBody>
                  {/* <CToastClose onClick={()=>setShowCallCard(false)} white style={{marginTop: '0px', marginRight: '0px'}}/> */}
                  <img 
                    src={Trubka} 
                    onClick={()=>setShowCallCard(false)} 
                    width={70} alt='' 
                    style={{position: 'absolute', top: '20px', right: '20px'}}
                  />
                </div>
            </div>

            {/* Входящий неизвестный */}
            <div style={{
              display: showCallCardNo ? 'block' : 'none', 
              position: 'absolute', top: '65px', right: '0', 
              width: '900px', height: '330px', 
              backgroundColor: '#2a2f32', 
              borderRadius: '15px', 
              border: '1px solid #4b4b4b',
              padding: '8px',
              zIndex: callIndex2}
            }>
                <div className="d-flex" style={{justifyContent: 'space-between'}}>
                  <CToastBody>
                    <div style={{display: 'flex'}}>
                      
                      <img src={Photo1} alt='' style={{borderRadius: '15px'}} width={314} height={314}/>

                      <CToastClose onClick={()=>setShowCallCardNo(false)} white style={{position: 'absolute'}}/>

                      <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px'}}>
                        <span style={{color: '#fff', fontSize: '40px', position: 'absolute', top: '100px'}}>Номер не зарегистрирован</span>

                        <span style={{fontSize: '26px', color: '#858585', fontWeight: '700', marginTop: '150px'}}>{workerCallNo}</span>
                        
                      </div>
                    </div>

                  </CToastBody>
                  {/* <CToastClose onClick={()=>setShowCallCard(false)} white style={{marginTop: '0px', marginRight: '0px'}}/> */}
                  <img 
                    src={Trubka} 
                    onClick={()=>setShowCallCardNo(false)} 
                    width={70} alt='' 
                    style={{position: 'absolute', top: '20px', right: '20px'}}
                  />
                </div>
            </div>

            {/* Исходящий сотрудник */}
            <div style={{
              display: showCallCardWorker ? 'block' : 'none', 
              position: 'absolute', top: '65px', right: '0', 
              width: '900px', height: '330px', 
              backgroundColor: '#2a2f32', 
              borderRadius: '15px', 
              border: '1px solid #4b4b4b',
              padding: '8px',
              zIndex: callIndex}
            }>
                <div className="d-flex" style={{justifyContent: 'space-between'}}>
                  <CToastBody>
                    <div style={{display: 'flex'}}>
                      {workerIshod.avatar ? 
                      <img src={workerIshod.avatar} alt='' style={{borderRadius: '15px', objectFit: 'cover'}} width={314} height={314}/>
                      : <img src={ULEY} alt='' style={{borderRadius: '15px', objectFit: 'cover'}} width={314} height={314}/>
                      }
                      <CToastClose onClick={()=>setShowCallCardWorker(false)} white style={{position: 'absolute'}}/>
                      <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px'}}>
                        <span style={{color: '#fff', fontSize: '33px', position: 'absolute', top: '0px'}}>{workerIshod.fio ? workerIshod.fio?.split(' ')[0] : ''}</span>
                        <span style={{color: '#fff', fontSize: '33px', position: 'absolute', top: '37px'}}>{workerIshod.fio ? workerIshod.fio?.split(' ')[1] : ''} {workerIshod.fio ? workerIshod.fio?.split(' ')[2]: ''}</span>
                        <div className="star-block" style={{marginTop: '85px'}}>
                          <img className='star-icon' src={StarActive} width={25} alt='' /> 
                          <img className='star-icon' src={StarActive} width={25} alt='' />
                          <img className='star-icon' src={StarActive} width={25} alt='' />
                          <img className='star-icon' src={Star} width={25} alt='' />
                          <img className='star-icon' src={Star} width={25} alt='' />
                        </div> 
                        <span style={{fontSize: '20px', color: '#858585', fontWeight: '700'}}>{workerIshod?.city}</span>
                        
                        <ul style={{listStyle: 'disc', paddingLeft: '20px'}}>
                          <li style={{fontSize: '16px', color: '#858585', paddingTop: '5px'}}>
                            Проекты: {workerIshod.projects}
                          </li>
                        </ul>
                        <span style={{fontSize: '20px', color: '#858585', fontWeight: '700'}}>{workerIshod?.worklist}</span>

                        <span style={{fontSize: '20px', color: '#858585', fontWeight: '700'}}>Возраст: {parseInt(new Date().getFullYear()) - parseInt(workerIshod?.dateborn?.split('-')[0])}</span>

                        <span style={{fontSize: '20px', color: '#858585', fontWeight: '700'}}>Навык: {workerIshod?.skill}</span>

                        <span style={{fontSize: '20px', color: '#858585', fontWeight: '700'}}>{workerIshod?.comment && JSON.parse(workerIshod?.comment)[0].content}</span>

                        <ul style={{listStyle: 'disc', paddingLeft: '20px', paddingTop: '5px', position: 'absolute', bottom: '5px'}}>
                          <li style={{fontSize: '16px', color: 'red', width:'500px'}}>
                            <div style={{whiteSpace: 'nowrap', overflow: 'hidden'}}>
                              {workerIshod.comteg ? 
                                workerIshod.comteg
                               : ''}
                            </div>
                            
                          </li>
                        </ul>
                      </div>
                    </div>

                  </CToastBody>
                  {/* <CToastClose onClick={()=>setShowCallCard(false)} white style={{marginTop: '0px', marginRight: '0px'}}/> */}
                  <img 
                    src={Trubka} 
                    onClick={()=>setShowCallCard(false)} 
                    width={70} alt='' 
                    style={{position: 'absolute', top: '20px', right: '20px'}}
                  />
                </div>
            </div> 

            {/* Исходящий клиент */}
            <div style={{
              display: showCallCardClient ? 'block' : 'none', 
              position: 'absolute', top: '65px', right: '0', 
              width: '900px', height: '330px', 
              backgroundColor: '#2a2f32', 
              borderRadius: '15px', 
              border: '1px solid #4b4b4b',
              padding: '8px',
              zIndex: callIndex}
            }>
                <div className="d-flex" style={{justifyContent: 'space-between'}}>
                  <CToastBody>
                    <div style={{display: 'flex'}}>
                      {clientIshod.avatar ? 
                      <img src={clientIshod.avatar} alt='' style={{borderRadius: '15px', objectFit: 'cover'}} width={314} height={314}/>
                      : <img src={ULEY} alt='' style={{borderRadius: '15px', objectFit: 'cover'}} width={314} height={314}/>
                      }
                      <CToastClose onClick={()=>setShowCallCardClient(false)} white style={{position: 'absolute'}}/>
                      <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px'}}>
                        <span style={{color: '#fff', fontSize: '33px', position: 'absolute', top: '0px'}}>{clientIshod.fio ? clientIshod.fio?.split(' ')[0] : ''}</span>
                        <span style={{color: '#fff', fontSize: '33px', position: 'absolute', top: '37px'}}>{clientIshod.fio ? clientIshod.fio?.split(' ')[1] : ''} {workerIshod.fio ? workerIshod.fio?.split(' ')[2]: ''}</span>
                        <span style={{fontSize: '20px', color: '#858585', fontWeight: '700', marginTop: '85px'}}>{clientIshod.city}</span>
                        <span style={{fontSize: '20px', color: '#858585', fontWeight: '700'}}>{clientIshod.companys}</span> 
                        <span style={{fontSize: '20px', color: '#858585', fontWeight: '700'}}>{clientIshod.dolgnost}</span> 
                        
                        <ul style={{listStyle: 'disc', paddingLeft: '20px'}}>
                          <li style={{fontSize: '16px', color: '#858585', paddingTop: '5px'}}>
                            Проекты: {clientIshod.projects}
                          </li>
                        </ul>
                        <span style={{fontSize: '20px', color: '#858585', fontWeight: '700'}}>{clientIshod.sfera}</span> 
                        <ul style={{listStyle: 'disc', paddingLeft: '20px', paddingTop: '5px', position: 'absolute', bottom: '5px'}}>
                          <li style={{fontSize: '16px', color: 'red', width:'500px'}}>
                            <div style={{whiteSpace: 'nowrap', overflow: 'hidden'}}>
                              {clientIshod.comteg ? 
                                clientIshod.comteg
                               : ''}
                            </div>
                            
                          </li>
                        </ul>
                      </div>
                    </div>

                  </CToastBody>
                  {/* <CToastClose onClick={()=>setShowCallCard(false)} white style={{marginTop: '0px', marginRight: '0px'}}/> */}
                  <img 
                    src={Trubka} 
                    onClick={()=>setShowCallCard(false)} 
                    width={70} alt='' 
                    style={{position: 'absolute', top: '20px', right: '20px'}}
                  />
                </div>
            </div> 


            {/* Исходящий робот */}
            <div style={{
              display: showCallCardRobot ? 'block' : 'none', 
              position: 'absolute', top: '65px', right: '0', 
              width: '900px', height: '330px', 
              backgroundColor: '#2a2f32', 
              borderRadius: '15px', 
              border: '1px solid #4b4b4b',
              padding: '8px',
              zIndex: callIndex}
            }>
                <div className="d-flex" style={{justifyContent: 'space-between'}}>
                  <CToastBody>
                    <div style={{display: 'flex'}}>
                      {workerIshod.avatar ? 
                      <img src={workerIshod.avatar} alt='' style={{borderRadius: '15px', objectFit: 'cover'}} width={314} height={314}/>
                      : <img src={ULEY} alt='' style={{borderRadius: '15px', objectFit: 'cover'}} width={314} height={314}/>
                      }
                      <CToastClose onClick={()=>setShowCallCardRobot(false)} white style={{position: 'absolute'}}/>
                      <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px'}}>
                        <span style={{color: '#fff', fontSize: '33px', position: 'absolute', top: '0px'}}>{workerIshod.fio ? workerIshod.fio?.split(' ')[0] : ''}</span>
                        <span style={{color: '#fff', fontSize: '33px', position: 'absolute', top: '37px'}}>{workerIshod.fio ? workerIshod.fio?.split(' ')[1] : ''} {workerIshod.fio ? workerIshod.fio?.split(' ')[2]: ''}</span>
                        <div className="star-block" style={{marginTop: '85px'}}>
                          <img className='star-icon' src={StarActive} width={25} alt='' /> 
                          <img className='star-icon' src={StarActive} width={25} alt='' />
                          <img className='star-icon' src={StarActive} width={25} alt='' />
                          <img className='star-icon' src={Star} width={25} alt='' />
                          <img className='star-icon' src={Star} width={25} alt='' />
                        </div>

                        <span style={{fontSize: '20px', color: '#858585', fontWeight: '700'}}>Система оповещения активирована</span>
                        
                      </div>
                    </div>

                  </CToastBody>
                  {/* <CToastClose onClick={()=>setShowCallCard(false)} white style={{marginTop: '0px', marginRight: '0px'}}/> */}
                  <img 
                    src={robot} 
                    onClick={()=>setShowCallCardRobot(false)} 
                    width={70} alt='' 
                    style={{position: 'absolute', top: '20px', right: '20px'}}
                  />
                </div>
            </div>
          </CNavItem>

          {/* Next*/}
          <CNavItem>
            <CTooltip
              content="10 ближайших проектов"
              placement="bottom"
            >
              <CNavLink href="#" style={{position: 'relative'}}>
                <img onClick={()=>setShowModalEmpty(true)} src={Next} onMouseOver={e => (e.currentTarget.src = Next2)} onMouseOut={e => (e.currentTarget.src = Next)}  style={{width: '18px', paddingBottom: '5px'}}/>               
              </CNavLink>
            </CTooltip>
          </CNavItem>

          {/* Корзина*/}
          <CNavItem>
            <CTooltip
              content="Удаленные проекты"
              placement="bottom"
            >
              <CNavLink href="#" style={{position: 'relative'}}>
                <img onClick={()=>setShowModalEmpty(true)} src={Delete} onMouseOver={e => (e.currentTarget.src = Delete2)} onMouseOut={e => (e.currentTarget.src = Delete)} style={{width: '18px', paddingBottom: '5px'}}/>               
              </CNavLink>
            </CTooltip>
          </CNavItem>

          {/* Ошибки*/}
          <CNavItem>
            <CTooltip
              content="Ошибки в проектах"
              placement="bottom"
            >
              <CNavLink href="#" style={{position: 'relative'}}>
                <img onClick={()=>setShowModalEmpty(true)} src={Error} onMouseOver={e => (e.currentTarget.src = Error2)} onMouseOut={e => (e.currentTarget.src = Error)}  style={{width: '18px', paddingBottom: '5px'}}/>               
              </CNavLink>
            </CTooltip>
          </CNavItem>
          
          {/* Звуки */}
          <CNavItem>
            <CTooltip
              content="Звуковые уведомления"
              placement="bottom"
            >
              <CNavLink href="#" style={{position: 'relative'}}>
                <CIcon onClick={()=>setShowModalEmpty(true)} icon={cilBell} size="lg" />
                {/* <CBadge color="success" className="ms-2">
                  5
                </CBadge> */}
                {/* { newProject ?  <span className="badge bg-danger-gradient rounded-pill position-absolute top-0 end-0">1</span> 
                : ""
                } */}
              </CNavLink>
            </CTooltip>
          </CNavItem>
          
          {/* Конверт */}
          <CNavItem>
            <CNavLink href="#">
              <CIcon onClick={()=>setShowModalEmpty(true)} icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>

        <CHeaderNav className="dark-theme ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
       <CContainer fluid>
        <AppBreadcrumb tabs={props.tabs} />
      </CContainer>
    </CHeader>


    <CModal
      alignment="center"
      visible={showModalEmpty}
      onClose={() => setShowModalEmpty(false)}
      aria-labelledby="VerticallyCenteredExample"
    >
      <CModalBody style={{height: '100px', textAlign: 'center', fontSize: '18px', paddingTop: '15px', marginTop: '40px'}}>
        Функция доступна в расширенной версии. Подробности – в техподдержке
      </CModalBody>
    </CModal>
    
    </>
  )
}


export default AppHeader
