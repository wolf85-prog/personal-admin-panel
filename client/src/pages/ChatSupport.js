import React, { Suspense, useEffect, useState, useContext } from 'react'
import { CContainer, CSpinner, CNav, CNavLink, CNavItem } from '@coreui/react'
import { AppSidebar, AppFooter, AppHeaderChat } from '../components/index'

import "./../chat-app-new/App.css";
import "./../chat-app-new/assets/css/index.css";

// import Loader from "../chat-app-new/components/Loader";
import Home from "../chat-app-new/pages/Home";
import Sidebar from "../chat-app-support/components/Sidebar";
import Chat from "../chat-app-support/pages/Chat";

import { useUsersContext } from "../chat-app-new/context/usersContext";
import { AccountContext } from "../chat-app-new/context/AccountProvider";

const ChatSupport = () => {
  const { userId } = useUsersContext();
  const { setPersonS } = useContext(AccountContext);

	useEffect(() => {
		document.body.classList.add("dark-theme");

    getUser()
    
	}, []);   

  const getUser = async () => {
          setPersonS({
              name: 'Тест', 
              id: userId, 
              avatar: ''
          });

      
  }

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeaderChat />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>                 
                  
                  <div className="app" style={{background: 'transparent'}}>
                    <p className="app__mobile-message"> Доступно только на компьютере 😊. </p> 
                    <div className="app-content" style={{justifyContent: 'center', width: '70%'}}>
                      {/* <Sidebar /> */}
                      <Chat />
                    </div>
                  </div>

                </Suspense>
            </CContainer>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default ChatSupport
