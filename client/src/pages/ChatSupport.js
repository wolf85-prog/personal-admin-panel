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
    
	});   

  const getUser = async () => {
          setPersonS({
              name: 'Тест', 
              id: userId, 
              avatar: ''
          });
  
      // if (Object.keys(contact.messages).length === 0) {
      //   console.log("Сообщения не загружены!")
      //   const messages = await getWMessages2(contact.conversationId, 10, 0)
      //   //console.log("messages: ", messages)
  
      //   const arrayMessage = []
      //     const allDate = []
          
      //     if (messages) {
      //       [...messages].map(message => {
      //         const d = new Date(message.createdAt);
      //         const year = d.getFullYear();
      //         const month = String(d.getMonth()+1).padStart(2, "0");
      //         const day = String(d.getDate()).padStart(2, "0");
      //         const chas = d.getHours();
      //         const minut = String(d.getMinutes()).padStart(2, "0");
            
      //         const newDateMessage = `${day}.${month}.${year}`
          
      //         const newMessage = {
      //           date: newDateMessage,
      //           content: message.text,
      //           image: message.type === 'image' ? true : false,
      //           descript: message.buttons ? message.buttons : '',
      //           sender: message.senderId,
      //           time: chas + ' : ' + minut,
      //           status: 'sent',
      //           id:message.messageId,
      //           reply:message.replyId,
      //         }
      //         arrayMessage.push(newMessage)
      //         allDate.push(newDateMessage)
      //       })
      //     }	
          
      //     const dates = [...allDate].filter((el, ind) => ind === allDate.indexOf(el));
          
      //     let obj = {};
      //     for (let i = 0; i < dates.length; i++) {
      //       const arrayDateMessage = []
      //       for (let j = 0; j < arrayMessage.length; j++) {
      //         if (arrayMessage[j].date === dates[i]) {
      //           arrayDateMessage.push(arrayMessage[j])							
      //         }
      //       }	
      //       obj[dates[i]] = arrayDateMessage;
      //     }
  
      //     //console.log("obj: ", obj)
  
      //     //сохранить сообщения в контексте пользователя
      //     setUserClients((userClients) => {
      //       let userIndex = userClients.findIndex((user) => user.chatId === contact.chatId.toString());
      //       const usersCopy = JSON.parse(JSON.stringify(userClients));
      //       usersCopy[userIndex].messages = obj
  
      //       return usersCopy;
      //     })
      // } 
      
  }

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
