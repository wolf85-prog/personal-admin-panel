import React, {useContext, useState, useEffect} from 'react'
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
  CNavLink,
  CFormCheck,
  CFormLabel,
  CModal,
  CModalBody,
} from '@coreui/react'

import InputMask from 'react-input-mask';

import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilPhone, cilUser } from '@coreui/icons'
import {observer} from "mobx-react-lite";
import {ADMIN_ROUTE} from "../../../utils/consts";
import {addCode, getCode, checkCode, login, registration} from "../../../http/userAPI";
import {Context} from "../../../index";
import { useUsersContext } from "../../../chat-app-new/context/usersContext";

import {addManager} from "../../../http/managerAPI";
import {addCompanyProf} from "../../../http/companyAPI";
import { addConversation, newMessage } from 'src/http/supportAPI'
import {createTenant} from 'src/services/api/tenant'

import logo from './../../../assets/brand/logo_04_light.png'

const Login = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [passwordSave, setPasswordSave] = useState('')
    const [code, setCode] = useState('')
    const [showLogin, setShowLogin] = useState(true)
    const [activeKey, setActiveKey] = useState(1)

    const [showPassword, setShowPassword] = useState(false)
    const [showCode, setShowCode] = useState(false)
    const [checked, setChecked] = useState(false)
    const [checkedPass, setCheckedPass] = useState(false)
    const [enterCode, setEnterCode] = useState(false)
    const [sendCode, setSendCode] = useState(false)

    const [showModal, setShowModal] = useState(false)
    const [textToast, setTextToats] = useState('')

    const { userId, setUserId, addNewMessage3, sendMessSupport } = useUsersContext();

    const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID

    useEffect(()=> {
      console.log(phone.length)
      if (phone.length === 18) {
        if (checked) {
          setShowCode(true)
        } else {
          setShowCode(false)
        } 
      } else {
        setShowCode(false)
      }
    }, [phone, checked])

    useEffect(()=> {
      if (checked) {
        //setShowCode(false)
        //setShowPassword(true)
      } else {
        //setShowCode(false)
        //setShowPassword(false)
      }
    }, [checked])

    useEffect(()=> {
      if (checkedPass) {
        //localStorage.setItem("passwordSave", password);
        const saved = localStorage.getItem("passwordSave");
        setPassword(saved !== 'null' ? saved : '')
      } else {
        setPassword('')
      }
    }, [checkedPass])


    useEffect(()=> {
      if (code.length > 0) {
        setEnterCode(true)
        setSendCode(false)
      } else {
        setEnterCode(false)
      }
    }, [code])

    const getRandomIntInclusive = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); // Максимум и минимум включаются
    }


    const clickLogin = async () => {
        try {
            const data = await login(phone, password);
            console.log("data: ",data)
            //setTextToats(data)

            user.setUser(user)
            user.setIsAuth(true)

            setUserId(data.id)
            localStorage.setItem('user', JSON.stringify({id: data.id, phone: data.phone, role: data.role}))

            // const resTenant = await createTenant(data.id)
            // console.log("resTenant: ", resTenant)

            navigate(ADMIN_ROUTE)
        } catch (e) {
            //next(e)
            setTextToats(e.response?.data?.message)
            setShowModal(true)
        }
    }

    const clickReg = async () => {
      //console.log("password: ", password)
      try {
          
          if (password !== null) {
            //if (password === password2) {
              const data = await registration(phone, password, '2');
              console.log(data)

              //создание менеджера
              const resManager = await addManager({fio: "ФИО", userId: data?.id, phone: data?.role})
              console.log("resManager: ", resManager)

              //создание компании
              const resCompany = await addCompanyProf({userId: data?.id, title: 'Название компании' })

              user.setUser(data)
              user.setIsAuth(true)

              setUserId(data.id)
              localStorage.setItem('user', JSON.stringify({id: data.id, email: data?.role}))
              
              const resTenant = await createTenant(data.id)
              console.log("resTenant: ", resTenant)

              sendText(data.id)

              navigate(ADMIN_ROUTE)
            // } else {
            //   setTextToats("Пароли не совпадают!")
            //   setShowModal(true)
            // }
          } else {
            setTextToats("Введите пароль!")
            setShowModal(true)
          }
          
          
      } catch (e) {
        setTextToats(e.response?.data?.message)
        setShowModal(true)
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

    const clickEnterCode = async() => {
      if (enterCode) {
        const resGetCode = await getCode(phone, code)
        console.log("resGetCode: ", resGetCode)

        if (parseInt(resGetCode) === parseInt(code)) {
          setShowPassword(true)
          setShowCode(false)
        } else {
          setTextToats('Код неверный! Попробуйте еще раз!')
          setShowModal(true)
          setShowPassword(false)
          setShowCode(true)
        }
        
      } else {
        const code = getRandomIntInclusive(1000, 9999)
        console.log(code)

        const resAddCode = await addCode(phone, code)
        console.log("resAddCode: ", resAddCode)

        const resCheckCode = await checkCode(phone, code)
        setSendCode(true)
        setShowPassword(false)
        setShowCode(true)
      }  
    }

    const handleCode = event => {
      const result = event.target.value.replace(/\D/g, '');
      setCode(result)
    };

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
                    <div style={{textAlign: 'center', marginBottom: '10px'}}>
                      <img src={logo} alt='' height={35} className={"sidebar-brand-full"}/>
                    </div>
                    <p className="text-medium-emphasis" style={{textAlign: 'center', color: '#fff!important'}}>Войдите в свой аккаунт</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilPhone} />
                      </CInputGroupText>
                      <InputMask
                        className='form-control'
                        type="text" 
                        name="phone" 
                        id="phone"
                        mask="+7 (999) 999-99-99"
                        maskChar=""
                        onChange={(e) => setPhone(e.target.value)} 
                        value={phone}
                        placeholder="Введите ваш телефон..." 
                      >
                      </InputMask>
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
                    <div style={{fontSize: '14px', color: '#6d6b6b', marginBottom: '10px', marginTop: '-10px'}}>
                                    <CFormCheck 
                                      id="flexCheckDefault" 
                                      label="Запомнить пароль" 
                                      checked={checkedPass}
                                      onChange={() => {
                                        if (checkedPass) {
                                          localStorage.setItem("passwordSave", password);
                                        }
                                        
                                        setCheckedPass(!checkedPass)
                                      }
                                      }
                                      style={{
                                        backgroundColor: '#181924',
                                        border: '1px solid #fff',
                                      }}
                                    />
                    </div>
                                  
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
                    <div style={{textAlign: 'center', marginBottom: '10px'}}>
                      <img src={logo} alt='' height={35} className={"sidebar-brand-full"}/>
                    </div>
                    <p className="text-medium-emphasis" style={{textAlign: 'center', color: '#fff!important'}}>Создайте свой аккаунт</p>
                                  <CInputGroup className="mb-3">
                                    {/* <CInputGroupText>
                                      <CIcon icon={cilPhone} />
                                    </CInputGroupText> */}
                                    <InputMask
                                      className='form-control'
                                      style={{textAlign: 'center'}}
                                      type="text" 
                                      name="phone" 
                                      id="phone"
                                      mask="+7 (999) 999-99-99"
                                      maskChar=""
                                      onChange={(e) => setPhone(e.target.value)} 
                                      value={phone}
                                      placeholder="+7 (900) 000-00-00" 
                                    >
                                    </InputMask>
                                  </CInputGroup>
                                  {showPassword ? 
                                  <><CInputGroup className="mb-3">
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
                                  {/* <CInputGroup className="mb-4">
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
                                  </CInputGroup> */}
                                  </>
                                  :''}
                                  {!showPassword ? 
                                  <div style={{fontSize: '14px', color: '#6d6b6b', marginBottom: '10px'}}>
                                    <CFormCheck 
                                      id="flexCheckDefault" 
                                      label="Согласие на обработку персональных данных" 
                                      checked={checked}
                                      onChange={() => setChecked(!checked)}
                                      style={{
                                        backgroundColor: '#181924',
                                        border: '1px solid #fff',
                                      }}
                                    />
                                  </div>
                                  : ''}

                                  {showCode ? 
                                  <CCol xs="auto" style={{display: 'flex', alignItems: 'baseline', justifyContent: 'space-between'}}>
                                    <div style={{width: '48%'}}>
                                      {/* <CFormInput 
                                        type="text" 
                                        style={{paddingLeft: '50px'}}
                                        id="code"
                                        placeholder="Ввести код" 
                                        value={code}
                                        onChange={handleCode}
                                      /> */}
                                      <InputMask
                                        className="text-field__input" 
                                        style={{border: '1px solid #c0c0c9', backgroundColor: '#1f272c'}}
                                        type="text" 
                                        name="code" 
                                        id="inn"
                                        mask="9999"
                                        maskChar=""
                                        onChange={(e) => setCode(e.target.value)} 
                                        value={code}
                                        placeholder='Ввести код'
                                      >
                                      </InputMask>
                                    </div>

                                    { !sendCode ? 
                                      <CButton onClick={clickEnterCode} color="primary" style={{width: '48%'}} className="mb-3">
                                      {enterCode ? 'Ввести код' : 'Получить код'}
                                    </CButton>
                                    :<CButton color="success" style={{width: '48%'}} className="mb-3">
                                      {'Код отправлен'}
                                    </CButton>}
                                  </CCol>
                                  : ''}
                                  
                                  {showPassword ? 
                                  <div className="d-grid">
                                    <CButton onClick={clickReg} color="success">Создать</CButton>
                                  </div>
                                  :''}
                                </CForm>              
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>

                            <CModal
                              alignment="center"
                              visible={showModal}
                              onClose={() => setShowModal(false)}
                              aria-labelledby="VerticallyCenteredExample"
                            >
                              <CModalBody style={{height: '100px', textAlign: 'center', fontSize: '18px', paddingTop: '35px'}}>
                                {textToast}
                              </CModalBody>
                            </CModal>
        
                            {/* <CModal
                              alignment="center"
                              visible={showModalEmpty}
                              onClose={() => setShowModalEmpty(false)}
                              aria-labelledby="VerticallyCenteredExample"
                            >
                              <CModalBody style={{ textAlign: 'center', fontSize: '18px', paddingTop: '15px'}}>
                              Функция доступна в расширенной версии. Подробности – в техподдержке.
                              </CModalBody>
                            </CModal> */}
      </CContainer>
    </div>
  )
})

export default Login
