import React, { useState, useContext, useEffect, useRef }  from "react";
import { Link, useLocation } from 'react-router-dom'
import Icon from "../../../components/Icon";
import OptionsBtn from "../../../components/OptionsButton";

import avatarDefault from "./../../../../chat-app-new/assets/images/no-avatar.png";
import avatarBlacklist from "./../../../../chat-app-worker/assets/images/uncheck.png";
import blockUser from "./../../../../chat-app-worker/assets/images/stop.png";
import block18 from "./../../../../assets/images/block18.png";
import robot from "./../../../../chat-app-worker/assets/images/robot.png";
import editIcon from './../../../../assets/images/pencil.png'

import { 
	CButton
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPhone } from '@coreui/icons'

import sendSound from './../../../../chat-app-new/assets/sounds/sendmessage.mp3';
import ishodCall from './../../../../assets/sound/ishod.mp3';

import { getSendCall, getSendCallRaut } from '../../../../http/adminAPI';
  
const Header = ({ user, worker, openProfileSidebar, openSearchSidebar, closeSidebar, showCloseButton, clearFile, setClearFile, clickClearFile  }) => {

	const [press, setPress] = useState(false)

	const audio = new Audio(sendSound);
	const audioIshodCall = new Audio(ishodCall);

	const host = process.env.REACT_APP_API_URL

	//console.log("user: ", user)
	//console.log("worker: ", worker)

	const onSelected = (index) => {
		switch(index) {
			case 0: //данные о контакте
				openProfileSidebar()
				break
		  
			case 1: 
				console.log('1')
				break
		  
			default:
				console.log("В разработке")
				break
		  }
	};

	const onImageError = (e) => {
		e.target.src = avatarDefault
	}

	return (
		<header className="headerB chat__header">
			<div className="chat__avatar-wrapper" onClick={openProfileSidebar}>
				{/* {
					user.avatar
					? <img src={`${user.avatar}`} onError={onImageError} alt={user?.name} className="avatar-adm" />
					: <img src={avatarDefault} alt={user?.name} className="avatar-adm" />
				} */}
				{
					user.avatar
					? <> {worker[0]?.blockW ? <img src={blockUser} alt='' className="avatar-adm" style={{position: 'absolute', zIndex: '2', width: '40px', height: '40px'}} /> : <></>}
						<img src={`${user.avatar}`} alt='' onError={onImageError} className="avatar-adm" />
					</>
					: <> {worker[0]?.blockW ? <img src={blockUser} alt='' className="avatar-adm" style={{position: 'absolute', zIndex: '2', width: '40px', height: '40px'}} /> : <></>}
						<img src={avatarDefault} alt='' className="avatar-adm" />
					</>
				}
				
				{/* {
                    worker && worker.length !== 0 ?  
                    ((JSON.parse(worker[0].worklist)).find(item => item.spec === 'Blacklist') ? 
                    <img src={avatarBlacklist} alt='' width={18} style={{position: 'absolute', top: '34px', left: '32px'}}/>
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

			<div className="chat__contact-wrapper" onClick={openProfileSidebar}>
				<h2 className="chat__contact-name"> Техническая поддержка</h2>
				<p className="chat__contact-desc">
					{user.typing ? "печатает..." : "данные контакта"}
				</p>
			</div>
			<div className="chat__actions">
				{clearFile ? <CButton color="danger" onClick={clickClearFile}>Очистить</CButton> : ''}

				
				<button
					className="chat__action"
					aria-label="Search"
					onClick={openSearchSidebar}
				>
					<Icon
						id="search"
						className="chat__action-icon chat__action-icon--search"
					/>
				</button>


				{/* <OptionsBtn
					className="chat__action"
					ariaLabel="Menu"
					iconId="menu"
					iconClassName="chat__action-icon"
					onSelected={onSelected}
					options={[
						"Данные о контакте",
						"Очистить переписку",
						"Удалить чат",
					]}
				/> */}

				<button onClick={closeSidebar} style={{marginLeft: '15px', display: showCloseButton ? "block": "none"}}>
					<Icon id="cancel" className="chat-sidebar__header-icon-close" />
				</button>
			</div>
		</header>
	);
};

export default Header;
