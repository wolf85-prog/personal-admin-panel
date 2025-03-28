import React, { useContext, useState, useEffect } from "react";
import Icon from "src/chat-app-new/components/Icon";
import { Link } from "react-router-dom";
import formatTime from "../../../chat-app-new/utils/formatTime";
import { AccountContext } from '../../../chat-app-new/context/AccountProvider'
import avatarDefault from "./../../../chat-app-new/assets/images/no-avatar.png";
import avatarKrest from "./../../../chat-app-client/assets/images/uncheck.png";
import blockUser from "./../../../chat-app-client/assets/images/stop.png";
import block18 from "./../../../assets/images/block18.png";

import { useUsersContext } from "../../../chat-app-new/context/usersContext";

import { getWMessages2} from '../../../http/workerAPI'

import { newCountWMessage } from "src/http/adminAPI";

const Contact = ({ contact, worker }) => {
	//console.log("worker contact: ", contact)
	const { setPersonW } = useContext(AccountContext);
	const host = process.env.REACT_APP_API_URL
	
	//сделать пользователя непрочитанным
	//const { setUserWorkerAsUnread, setCountMessageWork } = useUsersContext();
	const { userClients, setUserClients } = useUsersContext();

	//обработка нажатия на пользователя из списка
    const getUser = async () => {
        setPersonW({
            name: contact.name, 
            id: contact.chatId, 
			avatar: contact.avatar
        });

		//setUserWorkerAsUnread(contact.chatId)
		//setCountMessageWork('0')
		//await newCountWMessage(0)

		if (Object.keys(contact.messages).length === 0) {
			console.log("Сообщения не загружены!")
			const messages = await getWMessages2(contact.conversationId, 10, 0)
			//console.log("messages: ", messages)

			const arrayMessage = []
				const allDate = []
				
				if (messages) {
					[...messages].map(message => {
						const d = new Date(message.createdAt);
						const year = d.getFullYear();
						const month = String(d.getMonth()+1).padStart(2, "0");
						const day = String(d.getDate()).padStart(2, "0");
						const chas = d.getHours();
						const minut = String(d.getMinutes()).padStart(2, "0");
					
						const newDateMessage = `${day}.${month}.${year}`
				
						const newMessage = {
							date: newDateMessage,
							content: message.text,
							image: message.type === 'image' ? true : false,
							descript: message.buttons ? message.buttons : '',
							sender: message.senderId,
							time: chas + ' : ' + minut,
							status: 'sent',
							id:message.messageId,
							reply:message.replyId,
						}
						arrayMessage.push(newMessage)
						allDate.push(newDateMessage)
					})
				}	
				
				const dates = [...allDate].filter((el, ind) => ind === allDate.indexOf(el));
				
				let obj = {};
				for (let i = 0; i < dates.length; i++) {
					const arrayDateMessage = []
					for (let j = 0; j < arrayMessage.length; j++) {
						if (arrayMessage[j].date === dates[i]) {
							arrayDateMessage.push(arrayMessage[j])							
						}
					}	
					obj[dates[i]] = arrayDateMessage;
				}

				//console.log("obj: ", obj)

				//сохранить сообщения в контексте пользователя
				setUserClients((userClients) => {
					let userIndex = userClients.findIndex((user) => user.chatId === contact.chatId.toString());
					const usersCopy = JSON.parse(JSON.stringify(userClients));
					usersCopy[userIndex].messages = obj

					return usersCopy;
				})
		} else {
			//console.log(contact.conversationId)
		}
		
    }
	
	const getLastMessage = () => {
			const messageDates = Object.keys(contact.messages);	
			let recentMessageDate
			
			messageDates.length !== 0 	
			? recentMessageDate = messageDates[messageDates.length - 1]
			: recentMessageDate = '2000-01-01'

			let messages = [];
			if (JSON.stringify(contact.messages) !== '{}') {
				messages = [...contact.messages[recentMessageDate]];
			}	

			//console.log("Сообщения: ", messages.length)

			if (messages.length) {
				const lastMessage = messages.pop();
				return lastMessage;
			} 
			const lastMessage = '';
			return lastMessage;
	};

	const lastMessage = getLastMessage(contact);

	const onImageError = (e) => {
		e.target.src = avatarDefault
	}

	return (
		<Link
			key={contact.id}
			className="sidebar-contact"
			onClick={() => getUser()}
		>
			<div className="sidebar-contact__avatar-wrapper" style={{position: 'relative'}}>
				{
					contact.avatar
					? <> {contact.blockW ? <img src={blockUser} alt='' className="avatar-adm" style={{position: 'absolute', top: '0', zIndex: '2'}} /> : <></>}
						<img src={`${contact.avatar}`} alt='' onError={onImageError} className="avatar-adm" style={{position: 'absolute', top: '0', zIndex: '0'}} />
					</>
					: <> {contact.blockW ? <img src={blockUser} alt='' className="avatar-adm" style={{position: 'absolute', top: '0', zIndex: '2'}} /> : <></>}
						<img src={avatarDefault} alt='' className="avatar-adm" style={{position: 'absolute', top: '0', zIndex: '0'}} />
					</>
				}
				
				{/* {
                    worker.length !== 0 ?  
                    ((JSON.parse(worker[0].worklist)).find(item => item.spec === 'Blacklist') ? 
                    <img src={avatarKrest} alt='' width={18} style={{position: 'absolute', top: '34px', left: '32px'}}/>
                    : "")
                    : ""
                } */}
                
				{/* {
                    worker.length !== 0 ? 
                    ((JSON.parse(worker[0].worklist)).find(item => item.spec === '+18') ?   
                    <img src={block18} alt='' width={18} style={{position: 'absolute', top: '-5px', left: '32px', width: '23px'}}/>
                    : "")
                    : ""
                } */}

				
			</div>
			<div className="sidebar-contact__content">
				<div className="sidebar-contact__top-content">
					<h2 className="sidebar-contact__name">{contact.name.split(' ')[0] === contact.name.split(' ')[1] ? contact.name.split(' ')[0] : contact.name}</h2>
					<span className="sidebar-contact__time">
						{lastMessage === ''  ? '' : formatTime(lastMessage.time)}
					</span>
				</div>
				<div className="sidebar-contact__bottom-content">
					<p className="sidebar-contact__message-wrapper">
						{lastMessage.status && (
							<Icon
								id={
									lastMessage?.status === "sent" ? "singleTick" : "doubleTick"
								}
								aria-label={lastMessage?.status}
								className={`sidebar-contact__message-icon ${
									lastMessage?.status === "read"
										? "sidebar-contact__message-icon--blue"
										: ""
								}`}
							/>
						)}
						<span
							className={`sidebar-contact__message ${
								!!contact.unread ? "sidebar-contact__message--unread" : ""
							}`}
						>
							{contact.typing ? <i> печатает...</i> : lastMessage?.content}
						</span>
					</p>
					<div className="sidebar-contact__icons">
						{contact.pinned && (
							<Icon id="pinned" className="sidebar-contact__icon" />
						)}
						{!!contact.unread && (
							<span className="sidebar-contact__unread">{contact.unread}</span>
						)}
						<button aria-label="sidebar-contact__btn">
							<Icon
								id="downArrow"
								className="sidebar-contact__icon sidebar-contact__icon--dropdown"
							/>
						</button>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Contact;
