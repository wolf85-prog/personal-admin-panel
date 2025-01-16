import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/main.css";
import avatar from "./../../assets/images/logo_chat_admin.png";
import Icon from "./../../components/Icon";
import Contact from "./Contact";
import OptionsBtn from "./../../components/OptionsButton";
import { useUsersContext } from "./../../context/usersContext";
import { CSpinner} from '@coreui/react'

import { getContacts, getConversation, getMessages, getLastMessages } from '../../../http/chatAPI'

const Sidebar = () => {
	const { userSupport, support, setUsers} = useUsersContext();
	//const { users, setUsers, contacts, setContacts} = useUsersContext();

    const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID 

	const [contacts, setContacts]= useState([]);
	const [text, setText]= useState("");
	const [loading, setLoading]= useState(true);
	const [users2, setUsers2] = useState([])


	const CountWorkers = 50

	const navigate = useNavigate()

	useEffect(() => {
		
		//сортировка
		// const userSort = [...userWorkers].sort((a, b) => {       
		// 	var dateA = new Date(a.date), dateB = new Date(b.date) 
		// 	return dateB-dateA //сортировка по убывающей дате  
		// })
		
		const arr = []

		for (const item of userSupport) {		
			arr.push(item)
			if (arr.length === CountWorkers)
			  break;
		}

		//console.log("contacts: ", userWorkers)

		setContacts(arr)
		
		if(arr.length > 0) {
			setLoading(false)
		}		
		
	},[userSupport])


	const onSelected = (index) => {
		switch(index) {
			case 0: //данные о контакте
				console.log('Профиль')
				break
		  
			case 1: 
				console.log('1')
				break
			
			case 4: 
				navigate("/dashboard");
				break
		  
			default:
				console.log("В разработке")
				break
		  }
	};

	return (
		<aside className="sidebarB">
			{/* Header */}
			<header className="headerB">
				<div className="sidebar__avatar-wrapper">
					<img src={avatar} alt='U.L.E.Y' className="avatar-adm" />
				</div>
				<div>Тех. поддержка</div>
				<div className="sidebar__actions">
					<OptionsBtn
						className="sidebar__action"
						ariaLabel="Menu"
						iconId="menu"
						iconClassName="sidebar__action-icon"
						onSelected={onSelected}
						options={[
							"Профиль",
							// "Архив",
							// "Избранные сообщения",
							// "Настройки",
							// "Вернуться в панель управления",
						]}
					/>
				</div>
			</header>
			
			{/* Search */}
			{/* <div className="search-wrapper">
				<div className="search-icons">
					<Icon id="search" className="search-icon" />
					<button className="search__back-btn">
						<Icon id="back" />
					</button>
				</div>
				<input 
					className="search" 
					placeholder="Поиск менеджера" 
					onChange={(e)=>setText(e.target.value)}
				/>
			</div> */}
			
			{/* Conversations */}
			<div className="sidebar__contacts">
				{loading ? 
				<CSpinner style={{margin: '50%'}}/> :
				contacts.map((contact) => (
					contact.chatId !== chatAdminId &&
                    <>   
						<Contact contact={contact} />
					</>
				))
				}
			</div>
		</aside>
	);
};

export default Sidebar;
