import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CNav,
  CNavItem,
  CNavLink
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import {observer} from "mobx-react-lite";
import {ADMIN_ROUTE} from "../../../utils/consts";
import {login, registration} from "../../../http/userAPI";
import {Context} from "../../../index";
import { useUsersContext } from "../../../chat-app-new/context/usersContext";

import {addManager} from "../../../http/managerAPI";
import {addCompanyProf} from "../../../http/companyAPI";
import { addConversation, newMessage } from 'src/http/supportAPI'

const Login = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [showLogin, setShowLogin] = useState(true)
    const [activeKey, setActiveKey] = useState(1)

    const { userId, setUserId, addNewMessage3, sendMessSupport } = useUsersContext();

    const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID

    const clickLogin = async () => {
        try {
            const data = await login(email, password);
            console.log(data)

            user.setUser(user)
            user.setIsAuth(true)

            setUserId(data.id)
            localStorage.setItem('user', JSON.stringify({id: data.id, email: data.email, role: data.role}))

            navigate(ADMIN_ROUTE)
        } catch (e) {
            alert(e.message)
        }
    }

    const clickReg = async () => {
      try {
          if (password === password2) {
            const data = await registration(email, password, '2');
            console.log(data)

            //создание менеджера
            const resManager = await addManager({fio: "ФИО", userId: data?.id, email: data?.role})
            console.log("resManager: ", resManager)

            //создание компании
            const resCompany = await addCompanyProf({userId: data?.id, title: 'Название компании' })

            user.setUser(data)
            user.setIsAuth(true)

            setUserId(data.id)
            localStorage.setItem('user', JSON.stringify({id: data.id, email: data?.role}))

            sendText(data.id)

            navigate(ADMIN_ROUTE)
          } else {
            alert("Пароли не совпадают!")
          }
          
      } catch (e) {
          alert(e.message)
      }
    }

    const openLogin = (hub) => {
      if (hub === 'Авторизация') { 
        setShowLogin(true)
        setActiveKey(1)
      }
      if (hub === 'Регистрация') { 
        setShowLogin(false)
        setActiveKey(2)
      }
    }

    //функция отправки сообщения
    const sendText = async (id) => {
      //отправка сообщения
    
      //создать беседу
      const conv = await addConversation({senderId: id, receiverId: chatAdminId})
      console.log("conv: ", conv)

      const mess = 'Менеджер успешно зарегистрировался в личном кабинете!'
      
      const message = {
          senderId: id, 
          receiverId: chatAdminId,
          conversationId: conv?.id,
          type: "text",
          text: mess
          //isBot: null,
          //messageId: sendToTelegram.data.result.message_id,
      }
    
      //сохранение сообщения в базе данных
      await newMessage(message)	
    
      //сохранить в контексте
      addNewMessage3(id, mess, 'text', '', conv?.id, null, null);
    
      //получить сообщение у абонента
      sendMessSupport(id, mess, 'text', conv?.id, null, null)
          
      console.log("message send: ", message);
      
    }

  return (
    <div className="bg-dark min-vh-100 d-flex flex-row align-items-center dark-theme bg-uley">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CNav variant="tabs">
              <CNavItem>
                <CNavLink 
                  style={{background: activeKey !== 1 ? '#08080869' : '', cursor: 'pointer'}} 
                  onClick={() => openLogin("Авторизация")} 
                  active={activeKey === 1}
                >
                  Авторизация
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink 
                  style={{background: activeKey !== 2 ? '#08080869' : '', cursor: 'pointer'}} 
                  onClick={() => openLogin("Регистрация")} 
                  active={activeKey === 2}
                >Регистрация</CNavLink>
              </CNavItem>
            </CNav>

            <CCardGroup>
              <CCard className="p-4">

                <CCardBody style={{display: showLogin ? 'block' : 'none', height: '300px'}}>
                  <CForm>
                    <h1 style={{textAlign: 'center', color: '#fff'}}>{'U.L.E.Y'}</h1>
                    <p className="text-medium-emphasis" style={{textAlign: 'center', color: '#fff!important'}}>Войдите в свой аккаунт</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput 
                        placeholder="Введите ваш email..." 
                        autoComplete="username" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Введите ваш пароль..."
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow className='text-center'>
                      <CCol xs={12}>
                        <CButton 
                          color="primary" 
                          className="px-4"
                          onClick={clickLogin}
                        >
                          {'Войти'}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        {/* <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton> */}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>

                <CCardBody className="p-4" style={{display: !showLogin ? 'block' : 'none', height: '300px'}}>
                  <CForm style={{marginTop: '-20px'}}>
                    <h1 style={{textAlign: 'center', color: '#fff'}}>U.L.E.Y</h1>
                    <p className="text-medium-emphasis" style={{textAlign: 'center', color: '#fff!important'}}>Создайте свой аккаунт</p>
                                  <CInputGroup className="mb-3">
                                    <CInputGroupText>@</CInputGroupText>
                                    <CFormInput 
                                      placeholder="Введите ваш email..." 
                                      autoComplete="email"
                                      value={email}
                                      onChange={e => setEmail(e.target.value)} 
                                    />
                                  </CInputGroup>
                                  <CInputGroup className="mb-3">
                                    <CInputGroupText>
                                      <CIcon icon={cilLockLocked} />
                                    </CInputGroupText>
                                    <CFormInput
                                      type="text"
                                      placeholder="Пароль"
                                      autoComplete="new-password"
                                      value={password}
                                      onChange={e => setPassword(e.target.value)}
                                    />
                                    <a href="#" className="password-control"></a>
                                  </CInputGroup>
                                  <CInputGroup className="mb-4">
                                    <CInputGroupText>
                                      <CIcon icon={cilLockLocked} />
                                    </CInputGroupText>
                                    <CFormInput
                                      type="text"
                                      placeholder="Повторить пароль"
                                      autoComplete="new-password"
                                      value={password2}
                                      onChange={e => setPassword2(e.target.value)}
                                    />
                                  </CInputGroup>
                                  <div className="d-grid">
                                    <CButton onClick={clickReg} color="success">Создать</CButton>
                                  </div>
                                </CForm>              
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
})

export default Login
