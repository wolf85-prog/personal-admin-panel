import React, { Suspense, useEffect, useState, useContext } from 'react'
import { CContainer, CSpinner, CNav, CNavLink, CNavItem } from '@coreui/react'
import { AppSidebar, AppFooter, AppHeaderChat } from '../components/index'

import "./../chat-app-new/App.css";
import "./../chat-app-new/assets/css/index.css";

// import Loader from "../chat-app-new/components/Loader";
import Home from "../chat-app-new/pages/Home";
import Sidebar from "../chat-app-worker/components/Sidebar";
import Chat from "../chat-app-worker/pages/Chat";

import { 
	CButton,
	CModal,
	CModalHeader,
	CModalTitle,
	CModalBody,
	CModalFooter
  } from '@coreui/react'

import { AccountContext } from "../chat-app-new/context/AccountProvider";

const ChatsWorker = () => {

  const { personW } = useContext(AccountContext); 

  const [showModal, setShowModal] = useState(true);

	useEffect(() => {
		document.body.classList.add("dark-theme");
	});   


  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeaderChat />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>                 
                  
                  <div className="app">
                    <p className="app__mobile-message"> Доступно только на компьютере 😊. </p> 
                    <div className="app-content">
                      <Sidebar />
                      {Object.keys(personW).length ? <Chat /> : <Home /> }
                    </div>
                  </div>

                  {/* <CModal
                          alignment="center"
                          visible={showModal}
                          onClose={() => setShowModal(false)}
                          aria-labelledby="VerticallyCenteredExample"
                        >
                          <CModalBody style={{height: '100px', textAlign: 'center', fontSize: '18px', paddingTop: '35px'}}>
                            Функция находится в разработке
                          </CModalBody>
                  </CModal> */}

                </Suspense>
            </CContainer>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default ChatsWorker
