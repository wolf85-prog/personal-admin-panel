import React, {useContext, useEffect} from 'react'
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
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import avatar from './../../assets/images/avatars/logo_chat_admin.png'
import {observer} from "mobx-react-lite";
import { useUsersContext } from "../../chat-app-new/context/usersContext";

const AppHeaderDropdown = observer(() => {
  const {user} = useContext(Context)
  const { userId, setUserId } = useUsersContext();

  const logOut = () => {
    console.log("Выход")
    user.setUser({})
    user.setIsAuth(false)
  }

  useEffect(()=> { 
    const fetchData = async() => {
      
      const user = localStorage.getItem('user')
      //console.log("user: ", JSON.parse(user))

      if (user) {
        setUserId(JSON.parse(user)?.id)
        //setEmail(JSON.parse(user)?.email)
      }
      
    }
    fetchData()
  }, [])


  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light dark:bg-white dark:bg-opacity-10 fw-semibold py-2">Аккаунт ID: {'0000'+ userId}</CDropdownHeader>

        <CDropdownHeader className="bg-light dark:bg-white dark:bg-opacity-10 fw-semibold py-2">Роль: Пользователь</CDropdownHeader>

        <CDropdownItem href="/profile">
          <CIcon icon={cilUser} className="me-2" />
          Профиль
        </CDropdownItem>
        
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Настройки
        </CDropdownItem>       
        <CDropdownDivider />
        <CDropdownItem onClick={()=> logOut()}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Выйти
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
});

export default AppHeaderDropdown
