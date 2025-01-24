import React, {useContext, useEffect, useState} from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import {Context} from "../../index";
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton, 
} from '@coreui/react'
import {
  cilBell,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilPeople,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import avatar from './../../assets/images/avatars/logo_chat_admin.png'
import {observer} from "mobx-react-lite";
import { useUsersContext } from "../../chat-app-new/context/usersContext";
import { getCompanyProfId } from '../../http/companyAPI'

const AppHeaderDropdown = observer(() => {
  const {user} = useContext(Context)
  const { userId, setUserId, companyId } = useUsersContext();
  // const [companyId, setCompanyId] = useState('');

  const [visibleOut, setVisibleOut] = useState(false)

  const location = useLocation();

  const logOut = () => {
    console.log("Выход")
    user.setUser({})
    user.setIsAuth(false)
    setUserId('')
    localStorage.setItem('user', '')
  }

  

  const openProfile = () => { 
    //location("/profile")
  }

  return (
    <>
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="dark:bg-white fw-semibold py-2">Аккаунт ID: {'0000'+ userId}</CDropdownHeader>
        <CDropdownHeader className="dark:bg-white fw-semibold py-2">Компания ID: {companyId ? '000'+ companyId : ''}</CDropdownHeader>

        <CDropdownHeader className="dark:bg-white fw-semibold py-2">Роль: Пользователь</CDropdownHeader>

        <CDropdownDivider />

        <Link to='/profile' style={{textDecoration:'none'}}><CDropdownItem>
            <CIcon icon={cilUser} className="me-2" />
            Профиль
          </CDropdownItem>
        </Link>

        <Link to='/my_company' style={{textDecoration:'none'}}><CDropdownItem>
            <CIcon icon={cilPeople} className="me-2" />
            Компания
          </CDropdownItem>
        </Link>

        <CDropdownItem href="/settings">
          <CIcon icon={cilSettings} className="me-2" />
          Настройки
        </CDropdownItem>  

        <CDropdownDivider />

        <CDropdownItem onClick={()=> setVisibleOut(true)}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Выйти
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>

    <CModal
                          backdrop="static"
                          visible={visibleOut}
                          onClose={() => setVisibleOut(false)}
                          aria-labelledby="StaticBackdropExampleLabel"
                        >
                          <CModalHeader>
                            <CModalTitle id="StaticBackdropExampleLabel">Предупреждение</CModalTitle>
                          </CModalHeader>
                          <CModalBody>
                            Вы точно хотите выйти из системы?
                          </CModalBody>
                          <CModalFooter>
                            <CButton color="secondary" onClick={() => setVisibleOut(false)}>
                              Отмена
                            </CButton>
                            <CButton color="primary" onClick={()=>logOut()}>Выйти</CButton>
                          </CModalFooter>
    </CModal>
    </>
  )
});

export default AppHeaderDropdown
