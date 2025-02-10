import React, { useEffect, useRef, useState, useContext } from "react";
import "./styles/main.css";
import EmojiPicker from 'emoji-picker-react';

import EmojiTray from "./components/EmojiTray";
import ChatInput from "./components/ChatInput";
import Header from "./components/Header";
import ChatSidebar from "./components/ChatSidebar";
import Icon from "../../components/Icon";
import Search from "./components/Search";
import Profile from "./components/Profile";
import Convo from "./components/Convo";
import { useUsersContext } from "../../../chat-app-new/context/usersContext";
import { AccountContext } from '../../../chat-app-new/context/AccountProvider';
import { addConversation, getSConversation, newMessage, uploadFile } from "src/http/supportAPI";
import { $host } from '../../../http/index'
import sendSound from './../../../chat-app-new/assets/sounds/sendmessage.mp3';


import { 
	CButton,
	CModal,
	CModalHeader,
	CModalTitle,
	CModalBody,
	CModalFooter
  } from '@coreui/react'

const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID
const token_work = process.env.REACT_APP_TELEGRAM_API_TOKEN_SUPPORT
const host = process.env.REACT_APP_HOST
const baseURL = process.env.REACT_APP_API_URL
const webAppAnketa = process.env.REACT_APP_WEBAPP_ANKETA

const Chat = () => {
	const { userId, userSupport, setUserAsUnread, addNewMessage3, sconversation, support, sendMessSupport } = useUsersContext();
	const { personS } = useContext(AccountContext);
	const { setCountMessage } = useUsersContext();

	
	let data2

	const [user, setUser] = useState('');
	const lastMsgRef = useRef(null);
	const [showAttach, setShowAttach] = useState(false);
	const [showEmojis, setShowEmojis] = useState(false);
	const [showProfileSidebar, setShowProfileSidebar] = useState(false);
	const [showSearchSidebar, setShowSearchSidebar] = useState(false);
	const [file, setFile] = useState();
	const [image, setImage]= useState("");
	const [mess, setMess] = useState("");
	const [fileType, setFileType] = useState("");
	const [showPicker, setShowPicker] = useState(false)
	const [chosenEmoji, setChosenEmoji] = useState('');


	const [clearFile, setClearFile] = useState(false)
	const [showCloseButton, setShowCloseButton] = useState(false)
	const [showErrorFile, setShowErrorFile] = useState(false);

	//select
    const [selectedElement, setSelectedElement] = useState("")
	const [scenari, setScenari] = useState("")

	// для хранения ответа от бекенда
	const [data, getFile] = useState({ name: "", path: "" });
	const [progress, setProgess] = useState(0); // progessbar
  	const el = useRef(); // для доступа к инпуту

	const audio = new Audio(sendSound);

	const [poster, setPoster] = useState("")

	const refreshPage = ()=>{
		window.location.reload(true);
	 }

	useEffect(() => {
		const chatId = userId //personS.id;
		let user = userSupport.filter((item) => item.chatId.toString() === chatId.toString())[0];
		setUser(user)

		console.log("support: ", support, userSupport[0])

		if (user) {
			scrollToLastMsg();
		}
	}, []);
	

	useEffect(() => {
		user && scrollToLastMsg();
	}, [userSupport]);


	//прокрутка
	const scrollToLastMsg = () => {
		lastMsgRef.current?.scrollIntoView({transition: "smooth"});
	};

	useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name); // добавление имени файла
                data.append("photo", file); // добавление файла

               let response = await uploadFile(data);
			   console.log("response: ", response)

			//    axios.post(baseURL + 'api/file/upload', data, {
			// 		onUploadProgress: (ProgressEvent) => {
			// 			let progress = Math.round(
			// 			ProgressEvent.loaded / ProgressEvent.total * 100
			// 			) + '%';
			// 			setProgess(progress);
			// 		}
			// 	}).then(res => {
			// 	console.log(res);
			// 	getFile({
			// 		name: res.data.name,
			// 		path: baseURL + res.data.path
			// 	})
			// 	}).catch(err => console.log(err))

               setImage(baseURL + response.data.path);
			   //сообщение с ссылкой на файл
			   setMess(baseURL + response.data.path)
            }
        }
        getImage();
    }, [file])

	const onFileChange = (e, key) => {	
		setProgess(0)
		const file = e.target.files[0]; // доступ к файлу
		console.log("key: ", key);
		setFileType(key)
		console.log(file);
		setFile(file); // сохранение файла
		setShowAttach(false)
    }

	const openSidebar = (cb) => {
		// close any open sidebar first
		setShowProfileSidebar(false);
		setShowSearchSidebar(false);

		setShowCloseButton(true)

		// call callback fn
		cb(true);
	};

	const closeSidebar = (cb) => {
		// close any open sidebar first
		setShowProfileSidebar(false);

		setShowCloseButton(false)

		// call callback fn
		cb(false);
	};

	//функция отправки сообщения
	const sendText = async () => {
			//отправка сообщения

			let temp=mess.replace(/\n/g, '%0A'); //экранирование переноса строки
			temp = temp.replace(/#/g, '%23'); 		 //экранирование решетки
			temp = temp.replace(/&/g, '%26'); 		 //экранирование &
			temp = temp.replace(/\+/g, '%2b'); 		 //экранирование +
			temp = temp.replace(/>/g, '%3e'); 		 //экранирование >
			temp = temp.replace(/</g, '%3c'); 		 //экранирование <
			
			let conv

			//найти беседу
			conv = await getSConversation(userId)
			console.log("conv1: ", conv)

			if (!conv) {
				//создать беседу
				conv = await addConversation({senderId: userId, receiverId: chatAdminId})
				console.log("conv2: ", conv)
			}

			let message = {};
			if(!file) {
				message = {
					senderId: userId, 
					receiverId: chatAdminId,
					conversationId: conv?.id,
					type: "text",
					text: mess,
					//isBot: null,
					//messageId: sendToTelegram.data.result.message_id,
				}

				//сохранение сообщения в базе данных
				await newMessage(message)	

				//сохранить в контексте
				addNewMessage3(userId, mess, 'text', '', conv.id, null, null);

				//получить сообщение у абонента
				sendMessSupport(userId, mess, 'text', conv.id, null, null)
			} else {
				message = {
					senderId: userId, 
					receiverId: chatAdminId,
					conversationId: conv?.id,
					type: "image",
					text: image,
					//isBot: null,
					//messageId: sendToTelegram.data.result.message_id,
				}

				//сохранение сообщения в базе данных
				await newMessage(message)	

				//сохранить в контексте
				addNewMessage3(userId, image, 'image', '', conv?.id, null, null);

				//получить сообщение у абонента
				sendMessSupport(userId, mess, 'image', conv?.id, null, null)
			}
			console.log("message send: ", message);
	}

	const submitNewMessage = () => {
		audio.play();
		sendText();

		setMess("");
		scrollToLastMsg();
		setFile("");
        setImage("");
		setSelectedElement('')
	};


	const clickClearFile = () => {
		console.log("clear file...")
		setClearFile(false)
		
	}

	const onEmojiClick = (emojiObject, event) => {
		console.log(emojiObject)
		setMess(prevInp =>prevInp + emojiObject.emoji);

	};

	return (
		<div className="chat">
			<div className="chat__body">
				<div className="chat__bg"></div>

				<Header
					user={personS}
					worker={support[0]}
					openProfileSidebar={() => openSidebar(setShowProfileSidebar)}
					openSearchSidebar={() => openSidebar(setShowSearchSidebar)}
					closeSidebar={() => closeSidebar(setShowProfileSidebar)}
					showCloseButton={showCloseButton}
					setClearFile={setClearFile}
					clearFile={clearFile}
					clickClearFile={clickClearFile}
				/>
				<div className="chat__content">
					<Convo lastMsgRef={lastMsgRef} messages={userSupport[0]?.messages} convId={userSupport[0]?.conversationId} />
					
					<CModal alignment="center" visible={showErrorFile} onClose={() => setShowErrorFile(false)}>
                        <CModalHeader>
                        	<CModalTitle>Предупреждение</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                        	...
                        </CModalBody>
                        <CModalFooter>
                        	<CButton color="primary" onClick={() => setShowErrorFile(false)}>ОК</CButton>
                        </CModalFooter>
                    </CModal>
					
				</div>
				<div style={{position: 'absolute', bottom: '70px', zIndex: '100'}}>
					<EmojiPicker 
						open={showPicker} 
						theme='dark'
						height={400} 
						width={400} 
						onEmojiClick={onEmojiClick}
					/>
				</div>
				
				<footer className="chat__footer">
				
					<div className="chat__footer-wrapper">
						<button
							className="chat__scroll-btn"
							aria-label="scroll down"
							onClick={scrollToLastMsg}
						>
						<Icon id="downArrow" />
						</button>
						{/* <EmojiTray
							showEmojis={showEmojis}
							mess={mess}
							setMess={setMess}
						/> */}
						{/* <EmojiPicker 
							open={showPicker} 
							theme='dark'
							height={500} 
							width={400} 
							onEmojiClick={onEmojiClick}
						/> */}
						<ChatInput
							showEmojis={showEmojis}
							setShowEmojis={setShowEmojis}
							setShowPicker={setShowPicker}
							showAttach={showAttach}
							setShowAttach={setShowAttach}
							onFileChange={onFileChange}
							mess={mess}
							setMess={setMess}
							submitNewMessage={submitNewMessage}
							setSelectedElement={setSelectedElement}
							chosenEmoji={chosenEmoji}
						/>

						{/* <div className="progessBar" style={{ width: progress, height: '1rem', width: '0%',  backgroundColor: 'rgb(68, 212, 231)', color: 'white',  padding: '2px' }}>
							{progress}
						</div> */}
					</div>		
				</footer>
			</div>
			<ChatSidebar
				heading="Поиск сообщения"
				active={showSearchSidebar}
				closeSidebar={() => setShowSearchSidebar(false)}
			>
				<Search />
			</ChatSidebar>

			{/* <ChatSidebarProfile
				// heading="Данные контакта"
				active={showProfileSidebar}
			>
				<Profile user={user} />
			</ChatSidebarProfile> */}

		</div>
	);
};

export default Chat;
