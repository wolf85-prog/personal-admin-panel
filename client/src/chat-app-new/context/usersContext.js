import React, { createContext, useContext, useEffect, useState } from "react";

import { useSocketContext } from "./socketContext";

import { getClient, getClientCount } from "./../../http/clientAPI"

import { addManager, getManagerId, editManager } from 'src/http/managerAPI';

import { getAllMessages, getContacts, getConversation, getConversations, getMessages, getMessagesCount } from '../../http/chatAPI'

import { getWContacts, getWConversations, getWMessages, getWorkers, getWorker, getAllWMessages, 
	getWMessagesCount, getWorkersCount} from '../../http/workerAPI' 

import { getSpecialist, getSpecialistChatId} from '../../http/specAPI' 

import { getCompany } from '../../http/companyAPI'

import { getPlatforms } from '../../http/platformAPI'

import { getUserbot, getWUserbot } from "../../http/adminAPI";

import { getSLastMessages, getSConversation, getSConversations, getSMessages, getSMessagesCount } from '../../http/supportAPI'

import cities from 'src/data/cities';

import boopSfx from './../assets/sounds/zvuk-icq.mp3';
import soundMessage from './../assets/sounds/U.L.E.Y_messageNew.mp3';
import soundProject from './../assets/sounds/project_new2.mp3';
import soundSmeta from './../assets/sounds/predvarit_smeta2.mp3';
import sound120 from './../../assets/sound/120_minut_ULEY_new.mp3';
import sound60 from './../../assets/sound/60_minut_ULEY_new.mp3';
import sound30 from './../../assets/sound/30_minut_ULEY_new.mp3';
import sound15 from './../../assets/sound/15_minut_ULEY.mp3';
import sound0 from './../../assets/sound/0_minut_ULEY_new.mp3';
import sound5 from './../../assets/sound/5_minut_ULEY.mp3';
import sound10 from './../../assets/sound/10_minut_ULEY.mp3';
import soundNarush from './../../assets/sound/narush_ULEY.mp3';
import soundNarush2 from './../../assets/sound/narush2_ULEY.mp3';
import soundCall from './../../assets/sound/call_in.mp3';
import sendSound from './../assets/sounds/sendmessage.mp3';

import { getCompanyProfId } from '../../http/companyAPI'

const UsersContext = createContext();

const useUsersContext = () => useContext(UsersContext);

const UsersProvider = ({ children }) => {
	const socket = useSocketContext();
	const [userId, setUserId] = useState(''); 
	const [users, setUsers] = useState([]); //все специалисты;
	const [email, setEmail] = useState('');

	const [contacts, setContacts] = useState([]); //useState(contacts);
	const chatAdminId = process.env.REACT_APP_CHAT_ADMIN_ID
	const [count, setCount] = useState(0)
	const [countMessage, setCountMessage] = useState(0)
	const [countMessageRent, setCountMessageRent] = useState(0)

	const [managerProfile, setManagerProfile] = useState({});

	const [sortedCities, setSortedCities] = useState([])

	const [specialistAll, setSpecialistAll] = useState([]);
	const [managersAll, setManagersAll]= useState([]); // менеджеры (заказчики)
	const [companysAll, setCompanysAll]= useState([]); // менеджеры (заказчики)
	const [usersOnline, setUsersOnline] = useState([]);
	const [managers, setManagers]= useState([]); // менеджеры (заказчики)

	const [specialist, setSpecialist] = useState([])

	const [companys, setCompanys]= useState([]);

	const [platforms, setPlatforms] = useState([])
	const [platformsAll, setPlatformsAll] = useState([])

	const [projects, setProjects] = useState([]); 
	const [newProject, setNewProject]= useState(false);
	const [countProjects, setCountProjects] = useState(0)
	const [client, setClient] = useState([]); 

	const [userClients, setUserClients] = useState([]);  
	const [clients, setClients] = useState([]); //100 последних специалистов;
	const [clientAll, setClientAll] = useState([]); //все специалисты

	const [userWorkers, setUserWorkers] = useState([]); 
	const [workers, setWorkers] = useState([]); //100 последних специалистов;
	const [workersAll, setWorkersAll] = useState([]); //все специалисты;

	const [support, setSupport] = useState([]); 
	const [userSupport, setUserSupport] = useState([]); 

	const [specialistsCount, setSpecialistsCount] = useState(0)
	const [managersCount, setManagersCount] = useState(0)
	const [companysCount, setCompanysCount] = useState(0)
	const [clientsCount, setClientsCount] = useState(0)

	const [companyId, setCompanyId] = useState('');


	const [countMessageWork, setCountMessageWork] = useState(() => {
		// getting stored value
		const saved = localStorage.getItem("countMessageWork");
		const initialValue = saved;
		return initialValue || 0;
	});


	const [conversations, setConversations] = useState([]); 
	const [wconversations, setWConversations] = useState([]); 
	const [sconversations, setSConversations] = useState([]); 

	const [wuserbots, setWuserbots] = useState([]); 


	const [showCallCard, setShowCallCard] = useState(false);
	const [workerCall, setWorkerCall] = useState('');

	const [showCallCard2, setShowCallCard2] = useState(false);
	const [clientCall, setClientCall] = useState('');
	const [callIndex3, setCallIndex3] = useState(1)
	const [callIndex4, setCallIndex4] = useState(1)

	const [showCallCardNo, setShowCallCardNo] = useState(false);
	const [workerCallNo, setWorkerCallNo] = useState('');
	const [callIndex, setCallIndex] = useState(1)
	const [callIndex2, setCallIndex2] = useState(1)


	const [showCallCardWorker, setShowCallCardWorker] = useState(false);
	const [workerIshod, setWorkerIshod] = useState({});

	const [showCallCardClient, setShowCallCardClient] = useState(false);
	const [clientIshod, setClientIshod] = useState({});

	const [showCallCardRobot, setShowCallCardRobot] = useState(false);
	const [robotIshod, setRobotIshod] = useState({});

	//show distrib
	const [showDistrib, setShowDistrib] = useState(false);

	const [projectsNew, setProjectsNew] = useState([])


	const [showGetMess, setShowGetMess ] = useState(false);

	const [soundVolume, setSoundVolume] = useState(() => {
		const savedItem = localStorage.getItem("soundVolume");
		const parsedItem = JSON.parse(savedItem);
		return parsedItem || 1.0;
	})
	const [soundMute, setSoundMute] = useState(() => {
		const savedItem = localStorage.getItem("soundMute");
		const parsedItem = JSON.parse(savedItem);
		return parsedItem || false;
	})

	const audioMessage = new Audio(soundMessage);
	const audioMessageW = new Audio(boopSfx);
	const audioProject = new Audio(soundProject);
	const audioSmeta = new Audio(soundSmeta);

	const audioNarush = new Audio(soundNarush)
	const audioNarush2 = new Audio(soundNarush2)
	
	const audioSend = new Audio(sendSound);

	const audioCall = new Audio(soundCall)
	const audioCall2 = new Audio(soundCall)

	const audio120 = new Audio(sound120);
	const audio60 = new Audio(sound60);
	const audio30 = new Audio(sound30);
	const audio15 = new Audio(sound15);
	const audio0 = new Audio(sound0);
	const audio10 = new Audio(sound10);
	const audio5 = new Audio(sound5);

//----------------------------------------------------------------------

	useEffect(() => {	
		// storing input name
		console.log("volume: ", soundVolume)

		localStorage.setItem("soundVolume", soundVolume);
		localStorage.setItem("soundMute", soundMute);
		
	}, [soundVolume, soundMute]);

	//------------------------------------------------------------------------------------------
	//звонок по телефону
	useEffect(()=>{
		if (showCallCard) {
			const savedVolume = localStorage.getItem("soundVolume");
			const savedMute = localStorage.getItem("soundMute");

			if (savedMute === 'false') {
				console.log("savedMute: ", savedMute)
				audioCall.volume = parseFloat(savedVolume)
				audioCall.play();
			} 
		} else {
			//audioCall.pause()
		}

		if (showCallCardNo) {
			const savedVolume = localStorage.getItem("soundVolume");
			const savedMute = localStorage.getItem("soundMute");

			if (savedMute === 'false') {
				console.log("savedMute: ", savedMute)
				audioCall2.volume = parseFloat(savedVolume)
				audioCall2.play();
			}
		} else {
			//audioCall2.pause()
		}
		
	},[showCallCard, showCallCardNo])

	
	//-----------------------------------------------------------------------------------------
	//			get profile
	//-----------------------------------------------------------------------------------------
	useEffect(()=> {
	
		//console.log("cities: ", cities)
		// сортировка городов
		const newCities = cities.map((item)=> { 
		  const newArr = item.label
		  return newArr
		})
		const one = [...newCities].slice(0, 4)
		const city = [...newCities].slice(5)
		const sorted = city.sort((a, b) => {       
		  var cityA = a, cityB = b
		  return (cityA < cityB) ? -1 : (cityA > cityB) ? 1 : 0;  //сортировка по возрастанию 
		})
		const newSorted = [...one, ...city]
		setSortedCities(newSorted)
		
		
		const fetchData = async() => {

			const user = localStorage.getItem('user')
		  
	
		  if (user) {
			setUserId(JSON.parse(user)?.id)
			setEmail(JSON.parse(user)?.email)
			
			const result = await getManagerId(JSON.parse(user)?.id)
		  	console.log("Manager: ", result)
		  	setManagerProfile(result)

			const result2 = await getCompanyProfId(JSON.parse(user)?.id)
		  	console.log("Company: ", result2)
		  	setCompanyId(result2?.id)
		  }
		  
		}
		fetchData()
	}, [])


//------------------------------------------------------------------------------------------
// get Companys
//------------------------------------------------------------------------------------------	
	useEffect(() => {
		const fetchData = async () => {

			const user = localStorage.getItem('user')

			let company = await getCompany(JSON.parse(user)?.id);
			//console.log("companys context: ", company)

		
			let arrCompanys = []
		
			company && company.map(async (user, i) => {
				const d = new Date(user.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
				const d2 = new Date(d)
				const month = String(d2.getMonth()+1).padStart(2, "0");
				const day = String(d2.getDate()).padStart(2, "0");
				const chas = d2.getHours();
				const min = String(d2.getMinutes()).padStart(2, "0");
				const newDate = `${day}.${month} ${chas}:${min}`;
		
				// let str_sfera = ''
				// user.sfera && JSON.parse(user.sfera).map((item, index)=> {
				// str_sfera = str_sfera + item.name + (index+1 !== JSON.parse(user.sfera).length ? ', ' : '')
				// })

				// let str_comteg = ''
				// user.comteg && JSON.parse(user.comteg).map((item, index)=> {
				// str_comteg = str_comteg + item.name + (index+1 !== JSON.parse(user.comteg).length ? ', ' : '')
				// })
		
				let str_comment = ''
				user.comment && JSON.parse(user.comment).map((item, index)=> {
				str_comment = str_comment + item.content + (index+1 !== JSON.parse(user.comment).length ? ', ' : '')
				})
			
		
				const newUser = {
				id: user.id,
				userId: user.userId,
				title: user.title,
				city: user.city,
				office: user.office,
				sklad: user.sklad,
				comment: str_comment,
				inn: user.inn,
				bugalterFio: user.bugalterFio, 
				bugalterEmail: user.bugalterEmail,
				bugalterPhone: user.bugalterPhone,
				profile: user.profile,
				sfera: user.sfera,
				comteg: user.comteg,
				}
				arrCompanys.push(newUser)
		
				//если элемент массива последний
				if (i === company.length-1) {
					const sortedUser = [...arrCompanys].sort((a, b) => {       
						var idA = a.id, idB = b.id 
						return idB-idA  //сортировка по возрастанию 
					})
		
					setCompanysAll(sortedUser)
							
					//сохранить кэш
					//localStorage.setItem("companys", JSON.stringify(sortedUser));
				}
		
			})
		}

		fetchData();

	},[])


//------------------------------------------------------------------------------------------
// get Platforms
//------------------------------------------------------------------------------------------	
	useEffect(() => {
		const fetchData = async () => {
			const user = localStorage.getItem('user')
			
			let platforms = await getPlatforms(JSON.parse(user)?.id);
			//console.log("platforms context: ", platforms)
		
			let arrCompanys = []
		
			platforms && platforms.map(async (user, i) => {
		
				const newUser = {
				id: user.id,
				title: user.title,
				city: user.city,
				address: user.address,
				track: user.track, //
				url: user.url,
				karta: user.karta,
				}
				arrCompanys.push(newUser)
		
				//если элемент массива последний
				if (i === platforms.length-1) {
					const sortedUser = [...arrCompanys].sort((a, b) => {       
						let titleA = a.title 
						let titleB = b.title
						// return titleB-titleA  //сортировка по возрастанию 
						if (titleA.toLowerCase() < titleB.toLowerCase()) {
							return -1;
						}
						if (titleA.toLowerCase() > titleB.toLowerCase()) {
							return 1;
						}
						return 0;
					})
					//console.log("sortedUser: ", sortedUser)
		
					setPlatformsAll(sortedUser)
							
					//сохранить кэш
					//localStorage.setItem("companys", JSON.stringify(sortedUser));
				}
		
			})

		}

		fetchData();

	},[])

//------------------------------------------------------------------------------------------

//---------get UserClient----------------------------------------------------
useEffect(() => {
	//---------get UserClients-----------------------------------------
	const fetchUserClientData = async () => {
		const user = localStorage.getItem('user')
		//console.log("userId: ", JSON.parse(user)?.id)
			
		//0 все клиенты
		let all = await getClient(JSON.parse(user)?.id)
		//console.log("Client all: ", all)

		const arrayClientAll = []
	
		all.map(async (user) => {
			const newClient = {
			id: user.id,
			userfamily: user.fio, //user.userfamily != null ? user.userfamily : '',
			username: '',//user.username,
			phone: user.phone,
			dateborn: user.age,
			city: user.city, 
			companys: user.company,
			worklist:  user.specialization,
			chatId: user.chatId,
			createDate: user.createdAt,
			avatar: user.profile,
			blockW: user.blockW,
			deleted: user.deleted,
			comment: user.comment,
			comteg: user.comteg,
			sfera: user.sfera,
			dolgnost: user.dolgnost,
			}
			//console.log("newClient: ", newClient)
			arrayClientAll.push(newClient)
		})
	
		setClientAll(arrayClientAll)


		//1 все специалисты 100
		//let response = await getClientCount(JSON.parse(user)?.id, 100, client.length);
		//console.log("client 100: ", response)
	
		const arrayClient = []
	
		// response.reverse().map(async (user) => {
		// 	const newClient = {
		// 		id: user.id,
		// 		userfamily: user.fio, //user.userfamily != null ? user.userfamily : '',
		// 		username: '',//user.username,
		// 		phone: user.phone,
		// 		phone2: user.phone2,
		// 		dateborn: user.age,
		// 		city: user.city, 
		// 		companys: user.company,
		// 		worklist:  user.specialization,
		// 		chatId: user.chatId,
		// 		createDate: user.createdAt,
		// 		avatar: user.profile,
		// 		promoId: user.promoId,
		// 		blockW: user.blockW,
		// 		deleted: user.deleted,
		// 	}
	
		// 	arrayClient.push(newClient)
		// })
	
		setClient(arrayClientAll)	
	
		//2 все пользователи бота
		let userbots = await getUserbot();
		//console.log("userbots size: ", userbots.length)
		const arrayContact = []

		//3 все беседы (conversations)
		let convers = await getConversations()
		//console.log("conversations: ", convers)
		setConversations(convers)

		//4 все сообщения бота
		let messagesAll = await getMessagesCount(1000) //getWMessagesCount(1000) //getAllWMessages()
		//console.log("messagesAll: ", messagesAll.length)

		let count = 0
		convers.forEach(async (user, index) => {
	
			let client = arrayClientAll.find((item)=> item.chatId === user.members[0])
			let userbot = userbots.find((item)=> item.chatId === client?.chatId)	
			//console.log("Client: ", client)
				
			let conversationId = user.id //await getWConversation(user.members[0])

			let messages = []
			let messages2 = []
			
			//messages = messagesAll.filter(item => item.conversationId === conversationId.toString()) //await getWMessages(conversationId)
			//messagesAll.reverse()

			//выбрать из всех сообщений только пользователя в кол-ве 10 шт.
			for (let i = messagesAll.length-1; i >= 0; i--) {
				if (messagesAll[i].conversationId === conversationId.toString())
					messages.push(messagesAll[i])
				
				if (messages.length === 20)
				break;
			}

			//console.log("messages: ", messages)

			//получить последнее сообщение (без сообщений из рассылки)
			if (messages.length > 0) {
				[...messages].reverse().map((message) => {
					if (message.isBot === false || message.isBot === null) {
						messages2.push(message)
					}	
				})
			}

			//console.log("last messages: ", user, messages2)
				
			const messageDates = Object.keys(messages2); //messages

			const recentMessageDate = messageDates[messageDates.length - 1];
			const message = messages2[recentMessageDate];
			
			const dateMessage = message ? messages2[recentMessageDate].createdAt : "2000-01-01T00:00:00";
			const lastMessage = message ? messages2[recentMessageDate].text : "";			
			
			const arrayMessage = []
			const allDate = []
			
			if (messages) {
				[...messages].reverse().map(message => {
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
			
			if (client) {
				const newUser = {
					id: client?.id,
					username: userbot?.username ? userbot?.username : '', // user.username ? user.username : '',
					name: client?.userfamily + " " + client?.username, //notion[0]?.fio ? notion[0]?.fio : '',
					city: client?.city, //notion[0]?.city ? notion[0]?.city : '',
					//newcity: worker?.newcity,
					phone: client?.phone, //notion[0]?.phone ? notion[0]?.phone : '',
					age: client?.dateborn, //notion[0]?.age ? notion[0]?.age : "",
					chatId: client?.chatId,
					avatar: client?.avatar, //avatars[0]?.image ? avatars[0]?.image : '', //user.avatar,
					conversationId: conversationId ? conversationId : 0,
					block: userbot?.block ? userbot?.block : '',
					blockW: client?.blockW,
					unread: 0, 
					pinned: false,
					typing: false,
					message:  lastMessage,
					date: dateMessage,
					messages: obj, // { "01/01/2023": arrayMessage,"Сегодня":[] },	
				}
				console.log("newUser: ", newUser)
				arrayContact.push(newUser)
			}		
			
			//console.log(arrayContact)
		
			//если элемент массива последний
			if (index === convers.length-1) {
				const sortedClients = [...arrayContact].sort((a, b) => {       
					var dateA = new Date(a.date), dateB = new Date(b.date) 
					return dateB-dateA  //сортировка по убывающей дате  
				})

				//console.log("sortedClients: ", sortedClients)
	
				setUserClients(sortedClients)
			}				
		})	
	}
	
	//все сообщения клиентов
	fetchUserClientData();
	
},[])

//---------get UserWorker----------------------------------------------------
	useEffect(() => {
		//---------get UserWorkers-----------------------------------------
		const fetchUserWorkerData = async () => {

			const user = localStorage.getItem('user')
			//console.log("userId: ", JSON.parse(user)?.id)

			//0 все специалисты
			let all = await getWorkers(JSON.parse(user)?.id)
			//console.log("Workers all: ", all)

			const arrayWorkerAll = []
		
			all.map(async (user) => {
				const newWorker = {
				id: user.id,
				userfamily: user.fio, //user.userfamily != null ? user.userfamily : '',
				username: '',//user.username,
				phone: user.phone,
				dateborn: user.age,
				city: user.city, 
				companys: user.company,
				worklist:  user.specialization,
				chatId: user.chatId,
				createDate: user.createdAt,
				avatar: user.profile,
				blockW: user.blockW,
				deleted: user.deleted,
				comment: user.comment,
				comteg: user.comteg,
				nik: user.nik,
				skill: user.skill,
				}
		
				arrayWorkerAll.push(newWorker)
			})

			setWorkersAll(arrayWorkerAll)	


			//1 все специалисты 100
			let response = await getWorkersCount(JSON.parse(user)?.id, 100, workers.length);
			//let response = await getClientCount(JSON.parse(user)?.id, 100, client.length);
			//console.log("worker 100: ", response)
		
			const arrayWorker = []
		
			response.reverse().map(async (user) => {
				const newWorker = {
					id: user.id,
					userfamily: user.fio, //user.userfamily != null ? user.userfamily : '',
					username: '',//user.username,
					phone: user.phone,
					dateborn: user.age,
					city: user.city, 
					companys: user.company,
					worklist:  user.specialization,
					chatId: user.chatId,
					createDate: user.createdAt,
					avatar: user.profile,
					//from: user.from,
					blockW: user.blockW,
					deleted: user.deleted,
					nik: user.nik,
				}
		
				arrayWorker.push(newWorker)
			})
		
			setWorkers(arrayWorker)	
			setSpecialist(arrayWorker)
		
			//2 все пользователи бота
			let wuserbots = await getWContacts();
			//console.log("wuserbots size: ", wuserbots.length)
			const arrayContact = []

			//3 все беседы (conversations)
			let convers = await getWConversations()
			//console.log("conversations: ", convers.length)
			setConversations(convers)

			//4 все сообщения бота
			let messagesAll = await getWMessagesCount(1000) //getWMessagesCount(1000) //getAllWMessages()
			//console.log("messagesAll: ", messagesAll.length)

			let count = 0
			convers.forEach(async (user, index) => {
		
				let worker = arrayWorkerAll.find((item)=> item.chatId === user.members[0])
				let userbot = wuserbots.find((item)=> item.chatId === worker?.chatId)	
					
				let conversationId = user.id //await getWConversation(user.members[0])

				let messages = []
				let messages2 = []
				
				//messages = messagesAll.filter(item => item.conversationId === conversationId.toString()) //await getWMessages(conversationId)
				//messagesAll.reverse()

				//выбрать из всех сообщений только пользователя в кол-ве 10 шт.
				for (let i = messagesAll.length-1; i >= 0; i--) {
					if (messagesAll[i].conversationId === conversationId.toString())
						messages.push(messagesAll[i])
					
					if (messages.length === 20)
					break;
				}

				//console.log("messages: ", messages)

				//получить последнее сообщение (без сообщений из рассылки)
				if (messages.length > 0) {
					[...messages].reverse().map((message) => {
						if (message.isBot === false || message.isBot === null) {
							messages2.push(message)
						}	
					})
				}

				//console.log("last messages: ", user, messages2)
					
				const messageDates = Object.keys(messages2); //messages

				const recentMessageDate = messageDates[messageDates.length - 1];
				const message = messages2[recentMessageDate];
				
				const dateMessage = message ? messages2[recentMessageDate].createdAt : "2000-01-01T00:00:00";
				const lastMessage = message ? messages2[recentMessageDate].text : "";			
				
				const arrayMessage = []
				const allDate = []
				
				if (messages) {
					[...messages].reverse().map(message => {
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
				
				if (worker) {
					const newUser = {
						id: worker.id,
						username: userbot?.username ? userbot?.username : '', // user.username ? user.username : '',
						name: worker?.userfamily + " " + worker?.username, //notion[0]?.fio ? notion[0]?.fio : '',
						city: worker?.city, //notion[0]?.city ? notion[0]?.city : '',
						//newcity: worker?.newcity,
						phone: worker?.phone, //notion[0]?.phone ? notion[0]?.phone : '',
						age: worker?.dateborn, //notion[0]?.age ? notion[0]?.age : "",
						chatId: worker?.chatId,
						avatar: worker?.avatar, //avatars[0]?.image ? avatars[0]?.image : '', //user.avatar,
						conversationId: conversationId ? conversationId : 0,
						block: userbot?.block ? userbot?.block : '',
						blockW: worker?.blockW,
						unread: 0, 
						pinned: false,
						typing: false,
						message:  lastMessage,
						date: dateMessage,
						messages: obj, // { "01/01/2023": arrayMessage,"Сегодня":[] },	
					}
					//console.log(newUser)
					arrayContact.push(newUser)
				}		
				
				//console.log(arrayContact)
			
				//если элемент массива последний
				if (index === convers.length-1) {
					const sortedClients = [...arrayContact].sort((a, b) => {       
						var dateA = new Date(a.date), dateB = new Date(b.date) 
						return dateB-dateA  //сортировка по убывающей дате  
					})

					//console.log("sortedClients: ", sortedClients.length)
		
					setUserWorkers(sortedClients)

					//сохранить кэш
					//localStorage.setItem("userWorkers", JSON.stringify(sortedClients));
				}				
			})	
		}
		
		//все сообщения специалистов
		fetchUserWorkerData();
		
	},[])


	//---------get UserSupport----------------------------------------------------
	useEffect(() => {
		//---------get UserClients-----------------------------------------
		const fetchUserSupportData = async () => {
			const user = localStorage.getItem('user')
			//console.log("userId: ", JSON.parse(user)?.id)
				
			//0 клиент ULEY

			const arrayClientAll = []
		
			const newClient = {
				id: user ? JSON.parse(user)?.id : '',
				userfamily: 'U.L.E.Y', //user.userfamily != null ? user.userfamily : '',
				username: '',//user.username,
				phone: '',
				phone2: '',
				dateborn: '',
				city: '', 
				chatId: user ? JSON.parse(user)?.id : '',
				createDate: '',
				avatar: '',
				blockW: '',
				deleted: '',
				comment: '',
				comteg: '',
			}
			console.log("newClient ULEY: ", newClient)
			arrayClientAll.push(newClient)
		
			setSupport(arrayClientAll)	
			
			const arrayContact = []

			//3 все беседы (conversations)
			let convers = await getSConversations()
			//console.log("sconversations: ", convers)
			setSConversations(convers)

			//4 все сообщения бота
			let messagesAll = await getSMessages(JSON.parse(user)?.id) //getWMessagesCount(1000) //getAllWMessages()
			//console.log("messagesAll Support: ", messagesAll.length)

			let count = 0
			convers.forEach(async (user, index) => {
				//console.log("user S: ", arrayClientAll)

				let client = arrayClientAll.find((item)=> item.chatId.toString() === user.members[0])
				console.log("Client S: ", client)
					
				let conversationId = user.id //await getWConversation(user.members[0])

				//console.log("messages: ", messagesAll)
					
				const messageDates = Object.keys(messagesAll); //messages

				const recentMessageDate = messageDates[messageDates.length - 1];
				const message = messagesAll[recentMessageDate];
				
				const dateMessage = message ? messagesAll[recentMessageDate].createdAt : "2000-01-01T00:00:00";
				const lastMessage = message ? messagesAll[recentMessageDate].text : "";			
				
				const arrayMessage = []
				const allDate = []
				
				if (messagesAll) {
					[...messagesAll].map(message => {
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
							sender: message.receiverId,
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
				
				if (client) {
					const newUser = {
						id: client?.chatId,
						username: 'Менеджер', 
						name: client?.userfamily + " " + client?.username, 
						city: client?.city, 
						phone: client?.phone, 
						age: client?.dateborn, 
						chatId: client?.chatId,
						avatar: client?.avatar, //avatars[0]?.image ? avatars[0]?.image : '', //user.avatar,
						conversationId: conversationId ? conversationId : 0,
						block: '',
						blockW: client?.blockW,
						unread: 0, 
						pinned: false,
						typing: false,
						message:  lastMessage,
						date: dateMessage,
						messages: obj, // { "01/01/2023": arrayMessage,"Сегодня":[] },	
					}
					//console.log("newUser: ", newUser)
					arrayContact.push(newUser)
				}		

				console.log("arrayContact: ", arrayContact)
				setUserSupport(arrayContact)
			
			})	
		}
		
		//все сообщения клиентов
		fetchUserSupportData();
		
	},[])


//------------------------------------------------------------------------------------
	useEffect(() => {
		console.log("socket uley.company work!")

		socket.on("getMessageCustomer", fetchMessageCustomerResponse);
		socket.on("getAdminCustomer", fetchAdminCustomer);	
		socket.on("getDelAdminCustomer", fetchDelAdminCustomer);

		socket.on("getMessageWorker", fetchMessageWorkerResponse);
		socket.on("getAdminWorker", fetchAdminWorker);	
		socket.on("getDelAdminWorker", fetchDelAdminWorker);

		socket.on("getMessageSupport", fetchMessageSupportResponse);
		socket.on("getPersonSupport", fetchAdminSupport);	
		socket.on("getDelAdminSupport", fetchDelAdminSupport);



		socket.on("getNotif", fetchNotifAdmin);

		//socket.on("start_typing", setUserAsTyping);
		//socket.on("stop_typing", setUserAsNotTyping);
		
	}, [socket]);

//=======================================================================
// 						Customer
//=======================================================================

//получить сообщение из телеграмма WorkersBot
const fetchMessageCustomerResponse = async(data) => {
	
	console.log("Получено сообщение от специалиста: ", data)
	const { isBot} = data;

	let arrWorkers = []
			
	//пришло новое сообщение
	//const kol = await getCountMessage()
	//setCountMessageWork(count + 1)
	//const res = await newCountWMessage(kol.workers + 1)
	console.log("Пришло новое сообщение в Customer: ", count + 1)

	if (!isBot || isBot === null) {
			//play sound
			//audioMessageW.play();
			const savedVolume = localStorage.getItem("soundVolume");
			const savedMute = localStorage.getItem("soundMute");

			if (savedMute === 'false') {
				console.log("savedMute: ", savedMute)
				audioMessageW.volume = parseFloat(savedVolume)
				audioMessageW.play();
			}	
	} 
		

	setUserClients((userClients) => {
		const { senderId, text, type, messageId, convId, replyId, isBot } = data;
		//console.log("users: ", users)
		let userIndex = userClients.findIndex((user) => user.chatId === senderId.toString());
		const usersCopy = JSON.parse(JSON.stringify(userClients));

		if (userIndex === -1) {
			const newUser = {
				id: usersCopy.length,
				name: 'Новый клиент',
				chatId: `${senderId}`,
				avatar: '',
				conversationId: convId,
				unread: 0, 
				pinned: false,
				typing: false,
				message:  '',
				date: '2000-01-01T00:00:00',
				messages: {}, 
			}	
			usersCopy.push(newUser)
			//console.log("usersCopy: ", usersCopy)

			userIndex = usersCopy.length-1; //usersCopy.findIndex((user) => user.chatId === senderId.toString());

			//("userIndex new: ", userIndex)
		}
		
		const newMsgObject = {
			date: new Date().toLocaleDateString(),
			content: text,
			image: type === 'image' ? true : false,
			sender: senderId,
			time: new Date().toLocaleTimeString(),
			status: null,
			id: messageId,
			reply: replyId,
			isBot: isBot,  
		};

		const currentDate = new Date().toLocaleDateString()

		if (usersCopy[userIndex].messages[currentDate]) {
			usersCopy[userIndex].messages[currentDate].push(newMsgObject);
		} else {
			usersCopy[userIndex].messages[currentDate] = [];
			usersCopy[userIndex].messages[currentDate].push(newMsgObject);
		}
		
		const userObject = usersCopy[userIndex];
		if (isBot) {
			usersCopy[userIndex] = { ...userObject, ['date']: '2000-01-01T00:00:00', ['message']: newMsgObject.content};
		} else {
			usersCopy[userIndex] = { ...userObject, ['unread']: count + 1, ['date']: new Date(), ['message']: newMsgObject.content};
		}
		

		//сортировка
		const userSort = [...usersCopy].sort((a, b) => {       
			var dateA = new Date(a.date), dateB = new Date(b.date) 
			return dateB-dateA  //сортировка по убывающей дате  
		})

		return userSort;
	});

	//_updateUserProp(data.senderId, "uread", value +1);
};

//получить исходящее сообщение в админку workhub
const fetchAdminCustomer = (data) => {
	//console.log("Пришло сообщение в Админку: ", data)

	setUserClients((userClients) => {
		const { senderId, receiverId, text, type, buttons, messageId, isBot } = data;

		//console.log("userWorkers: ", userWorkers)

		let userIndex = userClients.findIndex((user) => user.chatId === receiverId.toString());
		const usersCopy = JSON.parse(JSON.stringify(userClients));
		//console.log("usersCopy: ", usersCopy)

		const newMsgObject = {
			date: new Date().toLocaleDateString(),
			content: text,
			image: type === 'image' ? true : false,
			descript: buttons ? buttons : '',
			sender: senderId,
			time: new Date().toLocaleTimeString(),
			status: 'delivered',
			id: messageId,
		};

		const currentDate = new Date().toLocaleDateString()

		//if (usersCopy[userIndex].messages[currentDate]) {
		if (!isObjectEmpty(usersCopy[userIndex].messages)) {
			if (usersCopy[userIndex].messages[currentDate]) {
				usersCopy[userIndex].messages[currentDate].push(newMsgObject);
			} else {
				usersCopy[userIndex].messages[currentDate] = [];
				usersCopy[userIndex].messages[currentDate].push(newMsgObject);
			}
		} else {
			usersCopy[userIndex].messages[currentDate] = [];
			usersCopy[userIndex].messages[currentDate].push(newMsgObject);
		}
		
		const userObject = usersCopy[userIndex];
		if (isBot) {
			usersCopy[userIndex] = { ...userObject, ['date']: '2000-01-01T00:00:00', ['message']: newMsgObject.content};
		} else {
			usersCopy[userIndex] = { ...userObject, ['date']: new Date(), ['message']: newMsgObject.content};
		}
		

		//сортировка
		const userSort = [...usersCopy].sort((a, b) => {       
			var dateA = new Date(a.date), dateB = new Date(b.date) 
			return dateB-dateA  //сортировка по убывающей дате  
		})

		//console.log(userSort)

		return userSort;
	});
}

//получить исходящее сообщение в админку
const fetchDelAdminCustomer = (data) => {
	//console.log("Удаление сообщение в Админке: ", data)

	setUserClients((userClients) => {
		const { messageId, messageDate, chatId } = data;

		let userIndex = userClients.findIndex((user) => user.chatId === chatId);
		const usersCopy = JSON.parse(JSON.stringify(userClients));

		const messageIndex = usersCopy[userIndex].messages[messageDate].map(el => el.id).lastIndexOf(messageId);
		usersCopy[userIndex].messages[messageDate].splice(messageIndex, 1); 

		const userObject = usersCopy[userIndex];
		const userSort = [...usersCopy]

		return userSort;
	});
}


//отправить сообщение из админки workhub
const addNewMessage = (userId, message, type, textButton, convId, messageId, isBot) => {
	console.log("isBot: ", isBot)

	socket.emit("sendAdminCustomer", { 
		senderId: chatAdminId,
		receiverId: userId,
		text: message,
		type: type,
		buttons: textButton,
		convId: convId,
		messageId,
		isBot: isBot,
	})
};

//удалить сообщение из админки workhub
const delWMessageContext = (messageId, messageDate, chatId) => {
	socket.emit("delAdminCustomer", { 
		messageId,
		messageDate,
		chatId,
	})
}

//=======================================================================
// 						Worker
//=======================================================================

//получить сообщение из телеграмма WorkersBot
const fetchMessageWorkerResponse = async(data) => {
	
	console.log("Получено сообщение от сотрудника: ", data)
	const { isBot} = data;

	let arrWorkers = []
			
	//пришло новое сообщение
	//const kol = await getCountMessage()
	//setCountMessageWork(count + 1)
	//const res = await newCountWMessage(kol.workers + 1)
	//console.log("Пришло новое сообщение в Worker: ", count + 1)

	if (!isBot || isBot === null) {
			//play sound
			//audioMessageW.play();
			const savedVolume = localStorage.getItem("soundVolume");
			const savedMute = localStorage.getItem("soundMute");

			if (savedMute === 'false') {
				console.log("savedMute: ", savedMute)
				audioMessageW.volume = parseFloat(savedVolume)
				audioMessageW.play();
			}	
	} 
		

	setUserWorkers((userWorkers) => {
		const { senderId, text, type, messageId, convId, replyId, isBot } = data;
		//console.log("users: ", users)
		let userIndex = userWorkers.findIndex((user) => user.chatId === senderId.toString());
		const usersCopy = JSON.parse(JSON.stringify(userWorkers));

		if (userIndex === -1) {
			const newUser = {
				id: usersCopy.length,
				name: 'Новый сотрудник',
				chatId: `${senderId}`,
				avatar: '',
				conversationId: convId,
				unread: 0, 
				pinned: false,
				typing: false,
				message:  '',
				date: '2000-01-01T00:00:00',
				messages: {}, 
			}	
			usersCopy.push(newUser)
			//console.log("usersCopy: ", usersCopy)

			userIndex = usersCopy.length-1; //usersCopy.findIndex((user) => user.chatId === senderId.toString());

			//("userIndex new: ", userIndex)
		}
		
		const newMsgObject = {
			date: new Date().toLocaleDateString(),
			content: text,
			image: type === 'image' ? true : false,
			sender: senderId,
			time: new Date().toLocaleTimeString(),
			status: null,
			id: messageId,
			reply: replyId,
			isBot: isBot,  
		};

		const currentDate = new Date().toLocaleDateString()

		if (usersCopy[userIndex].messages[currentDate]) {
			usersCopy[userIndex].messages[currentDate].push(newMsgObject);
		} else {
			usersCopy[userIndex].messages[currentDate] = [];
			usersCopy[userIndex].messages[currentDate].push(newMsgObject);
		}
		
		const userObject = usersCopy[userIndex];
		if (isBot) {
			usersCopy[userIndex] = { ...userObject, ['date']: '2000-01-01T00:00:00', ['message']: newMsgObject.content};
		} else {
			usersCopy[userIndex] = { ...userObject, ['unread']: count + 1, ['date']: new Date(), ['message']: newMsgObject.content};
		}
		

		//сортировка
		const userSort = [...usersCopy].sort((a, b) => {       
			var dateA = new Date(a.date), dateB = new Date(b.date) 
			return dateB-dateA  //сортировка по убывающей дате  
		})

		return userSort;
	});

	//_updateUserProp(data.senderId, "uread", value +1);
};

//получить исходящее сообщение в админку workhub
const fetchAdminWorker= (data) => {
	//console.log("Пришло сообщение в Админку: ", data)

	setUserWorkers((userWorkers) => {
		const { senderId, receiverId, text, type, buttons, messageId, isBot } = data;

		//console.log("userWorkers: ", userWorkers)

		let userIndex = userWorkers.findIndex((user) => user.chatId === receiverId.toString());
		const usersCopy = JSON.parse(JSON.stringify(userWorkers));
		//console.log("usersCopy: ", usersCopy)

		const newMsgObject = {
			date: new Date().toLocaleDateString(),
			content: text,
			image: type === 'image' ? true : false,
			descript: buttons ? buttons : '',
			sender: senderId,
			time: new Date().toLocaleTimeString(),
			status: 'delivered',
			id: messageId,
		};

		const currentDate = new Date().toLocaleDateString()

		//if (usersCopy[userIndex].messages[currentDate]) {
		if (!isObjectEmpty(usersCopy[userIndex].messages)) {
			if (usersCopy[userIndex].messages[currentDate]) {
				usersCopy[userIndex].messages[currentDate].push(newMsgObject);
			} else {
				usersCopy[userIndex].messages[currentDate] = [];
				usersCopy[userIndex].messages[currentDate].push(newMsgObject);
			}
		} else {
			usersCopy[userIndex].messages[currentDate] = [];
			usersCopy[userIndex].messages[currentDate].push(newMsgObject);
		}
		
		const userObject = usersCopy[userIndex];
		if (isBot) {
			usersCopy[userIndex] = { ...userObject, ['date']: '2000-01-01T00:00:00', ['message']: newMsgObject.content};
		} else {
			usersCopy[userIndex] = { ...userObject, ['date']: new Date(), ['message']: newMsgObject.content};
		}
		

		//сортировка
		const userSort = [...usersCopy].sort((a, b) => {       
			var dateA = new Date(a.date), dateB = new Date(b.date) 
			return dateB-dateA  //сортировка по убывающей дате  
		})

		//console.log(userSort)

		return userSort;
	});
}

//получить исходящее сообщение в админку
const fetchDelAdminWorker = (data) => {
	//console.log("Удаление сообщение в Админке: ", data)

	setUserWorkers((userWorkers) => {
		const { messageId, messageDate, chatId } = data;

		let userIndex = userWorkers.findIndex((user) => user.chatId === chatId);
		const usersCopy = JSON.parse(JSON.stringify(userWorkers));

		const messageIndex = usersCopy[userIndex].messages[messageDate].map(el => el.id).lastIndexOf(messageId);
		usersCopy[userIndex].messages[messageDate].splice(messageIndex, 1); 

		const userObject = usersCopy[userIndex];
		const userSort = [...usersCopy]

		return userSort;
	});
}


//отправить сообщение из админки workhub
const addNewMessage2 = (userId, message, type, textButton, convId, messageId, isBot) => {
	console.log("isBot: ", isBot)

	socket.emit("sendAdminWorker", { 
		senderId: chatAdminId,
		receiverId: userId,
		text: message,
		type: type,
		buttons: textButton,
		convId: convId,
		messageId,
		isBot: isBot,
	})
};

//удалить сообщение из админки workhub
const delWMessageContext2 = (messageId, messageDate, chatId) => {
	socket.emit("delAdminWorker", { 
		messageId,
		messageDate,
		chatId,
	})
}



//=======================================================================
// 						Support
//=======================================================================

//получить сообщение из телеграмма WorkersBot
const fetchMessageSupportResponse = async(data) => {
	
	console.log("Получено сообщение от Support: ", data)
	const { isBot} = data;

	let arrWorkers = []
			
	//пришло новое сообщение
	//const kol = await getCountMessage()
	//setCountMessageWork(count + 1)
	//const res = await newCountWMessage(kol.workers + 1)
	
		

	setUserSupport((userSupport) => {
		const { senderId, text, type, messageId, convId, replyId, isBot } = data;
		console.log("userSupport: ", userSupport)
		let userIndex = userSupport.findIndex((user) => user.chatId.toString() === senderId.toString());
		console.log("userIndex: ", userIndex)
		const usersCopy = JSON.parse(JSON.stringify(userSupport));

		// if (userIndex === -1) {
		// 	const newUser = {
		// 		id: usersCopy.length,
		// 		name: 'Новый клиент',
		// 		chatId: `${senderId}`,
		// 		avatar: '',
		// 		conversationId: convId,
		// 		unread: 0, 
		// 		pinned: false,
		// 		typing: false,
		// 		message:  '',
		// 		date: '2000-01-01T00:00:00',
		// 		messages: {}, 
		// 	}	
		// 	usersCopy.push(newUser)
		// 	//console.log("usersCopy: ", usersCopy)

		// 	userIndex = usersCopy.length-1; //usersCopy.findIndex((user) => user.chatId === senderId.toString());

		// 	//("userIndex new: ", userIndex)
		// }
		if (userIndex !== -1) {
			console.log("Пришло новое сообщение в Support: ", count + 1)

			//play sound
			//audioMessageW.play();
			const savedVolume = localStorage.getItem("soundVolume");
			const savedMute = localStorage.getItem("soundMute");

			if (savedMute === 'false') {
						console.log("savedMute: ", savedMute)
						audioMessageW.volume = parseFloat(savedVolume)
						audioMessageW.play();
			}	

			const newMsgObject = {
				date: new Date().toLocaleDateString(),
				content: text,
				image: type === 'image' ? true : false,
				sender: senderId,
				time: new Date().toLocaleTimeString(),
				status: null,
				id: messageId,
				reply: replyId,
				isBot: isBot,  
			};
	
			const currentDate = new Date().toLocaleDateString()
	
			if (usersCopy[userIndex].messages[currentDate]) {
				usersCopy[userIndex].messages[currentDate].push(newMsgObject);
			} else {
				usersCopy[userIndex].messages[currentDate] = [];
				usersCopy[userIndex].messages[currentDate].push(newMsgObject);
			}
			
			const userObject = usersCopy[userIndex];
			if (isBot) {
				usersCopy[userIndex] = { ...userObject, ['date']: '2000-01-01T00:00:00', ['message']: newMsgObject.content};
			} else {
				usersCopy[userIndex] = { ...userObject, ['unread']: count + 1, ['date']: new Date(), ['message']: newMsgObject.content};
			}
		}

		
		

		//сортировка
		const userSort = [...usersCopy].sort((a, b) => {       
			var dateA = new Date(a.date), dateB = new Date(b.date) 
			return dateB-dateA  //сортировка по убывающей дате  
		})

		return userSort;
	});

	//_updateUserProp(data.senderId, "uread", value +1);
};

//получить исходящее сообщение в админку workhub
const fetchAdminSupport = (data) => {
	console.log("Пришло сообщение в Админку: ", data)

	setUserSupport((userSupport) => {
		const { senderId, receiverId, text, type, buttons, messageId, isBot } = data;

		console.log("userSupport: ", userSupport)

		let userIndex = userSupport.findIndex((user) => user.id.toString() === senderId.toString());
		console.log("userIndex: ",  userIndex)
		const usersCopy = JSON.parse(JSON.stringify(userSupport));

		if (userIndex >= 0) {
			const newMsgObject = {
				date: new Date().toLocaleDateString(),
				content: text,
				image: type === 'image' ? true : false,
				descript: buttons ? buttons : '',
				sender: receiverId,
				time: new Date().toLocaleTimeString(),
				status: 'delivered',
				//id: messageId,
			};

			const currentDate = new Date().toLocaleDateString()

			//if (usersCopy[userIndex].messages[currentDate]) {
			if (!isObjectEmpty(usersCopy[userIndex].messages)) {
				if (usersCopy[userIndex].messages[currentDate]) {
					usersCopy[userIndex].messages[currentDate].push(newMsgObject);
				} else {
					usersCopy[userIndex].messages[currentDate] = [];
					usersCopy[userIndex].messages[currentDate].push(newMsgObject);
				}
			} else {
				usersCopy[userIndex].messages[currentDate] = [];
				usersCopy[userIndex].messages[currentDate].push(newMsgObject);
			}
			
			const userObject = usersCopy[userIndex];
			usersCopy[userIndex] = { ...userObject, ['date']: new Date(), ['message']: newMsgObject.content};
			
		}

		//сортировка
		const userSort = [...usersCopy].sort((a, b) => {       
			var dateA = new Date(a.date), dateB = new Date(b.date) 
			return dateB-dateA  //сортировка по убывающей дате  
		})

		//console.log(userSort)

		return userSort;
	});
}

//получить исходящее сообщение в админку
const fetchDelAdminSupport = (data) => {
	//console.log("Удаление сообщение в Админке: ", data)

	setUserSupport((userSupport) => {
		const { messageId, messageDate, chatId } = data;

		let userIndex = userSupport.findIndex((user) => user.chatId === chatId);
		const usersCopy = JSON.parse(JSON.stringify(userSupport));

		const messageIndex = usersCopy[userIndex].messages[messageDate].map(el => el.id).lastIndexOf(messageId);
		usersCopy[userIndex].messages[messageDate].splice(messageIndex, 1); 

		const userObject = usersCopy[userIndex];
		const userSort = [...usersCopy]

		return userSort;
	});
}


//отправить сообщение из админки workhub
const addNewMessage3 = (userId, message, type, textButton, convId, messageId, isBot) => {
	//console.log("isBot: ", isBot)

	socket.emit("sendPersonSupport", { 
		senderId: userId,
		receiverId: chatAdminId,
		text: message,
		type: type,
		buttons: textButton,
		convId: convId,
		//messageId,
		//isBot: isBot,
	})
};

//отправить сообщение из админки workhub
const sendMessSupport = (userId, message, type, convId, messageId, isBot) => {
	//console.log("isBot: ", isBot)

	socket.emit("sendMessagePersonSupport", { 
		senderId: userId,
        text: message,
        type: type,
        convId: convId,
        // messageId,
        // replyId,
        // isBot, 
	})
};

//удалить сообщение из админки workhub
const delWMessageContext3 = (messageId, messageDate, chatId) => {
	socket.emit("delAdminSupport", { 
		messageId,
		messageDate,
		chatId,
	})
}


function isObjectEmpty(obj) {
	return Object.keys(obj).length === 0;
}





//===============================================================
//                  Notifications
//===============================================================
const fetchNotifAdmin = async (dataAll) => {
	console.log("Получено уведомление: ", dataAll)
	const { task, 
		tg_id,
		fio,
		sity,
		year_of_birth, 
		rating, 
		projects, 
		specialities, 
		comtags, 
		phone,
		telegram_id, 
		srm_id, 
		chat_link,
		skill,
		comment,
		city,
		dolgnost,
		sfera,
		comteg,
		companys,
	} = dataAll;

	if (task === 100) {
		const savedVolume = localStorage.getItem("soundVolume");
		const savedMute = localStorage.getItem("soundMute");

		if (savedMute === 'false') {
			console.log("savedMute: ", savedMute)
			audioNarush.volume = parseFloat(savedVolume)
		   	audioNarush.play();
		} 
	}
	else if (task === 101) {
		const savedVolume = localStorage.getItem("soundVolume");
		const savedMute = localStorage.getItem("soundMute");

		if (savedMute === 'false') {
			console.log("savedMute: ", savedMute)
			audioNarush2.volume = parseFloat(savedVolume)
			audioNarush2.play();
		} 
	}
	//звонок специалиста
	else if (task === 200) {
		//console.log("fio: ", fio)
		console.log("userId: ", userId)
		const worker = await getSpecialist(userId)
		console.log("worker: ", worker)
		setWorkerCall({
			tg_id,
			fio,
            sity,
            year_of_birth, 
            rating, 
            projects, 
            specialities, 
            comtags,
			comment,
			skill,
			avatar: worker?.profile,
		})
		console.log("workerCall:", workerCall)

		setShowCallCard(true)

		setCallIndex(3)
		setCallIndex2(2)
	}
	//неизвестный номер
	else if (task === 201) {
		//console.log("fio: ", data)
		setShowCallCardNo(true)

		setWorkerCallNo(phone)


		setCallIndex(2)
		setCallIndex2(3)
	}
	//звонок клиента
	else if (task === 202) {
		//console.log("fio: ", fio)
		console.log("userId: ", userId)
		const client = await getClient(userId)		
		console.log("worker: ", client)
		setClientCall({
			tg_id,
			fio,
            city,
            companys, 
            rating, 
            projects, 
            dolgnost, 
			sfera,
            comteg,
			comment,
			avatar: client?.profile,
		})
		console.log("ClientCall:", clientCall)

		setShowCallCard(true)

		setCallIndex(3)
		setCallIndex2(2)
	}

}

	return (
		<UsersContext.Provider value={{ 
			userId, 
			setUserId,
			users, 
			setUsers,

			companyId, 
			setCompanyId,

			specialist,
			setSpecialist,
			workers,
			setWorkers,
			
			contacts,
			setContacts,
			companys,
			setCompanys,
			managersAll, 
			setManagersAll,
			companysAll,
			platforms, 
			setPlatforms,
			setCompanysAll,
			platformsAll,
			setPlatformsAll,
			
			userClients,
			client, 
			setClient,
			clientAll,
			setClientAll,
			client,
			setClient,

			conversations,
			wconversations,
			sconversations,

			userWorkers,
			workersAll,

			support, 
			setSupport,
			userSupport, 
			setUserSupport,

			managersCount,
			setManagersCount,
			companysCount,
			setCompanysCount,
			
			clientsCount, 
			setClientsCount,
			clientsCount, 
			setClientsCount,

			managerProfile, 
			setManagerProfile,
			sortedCities,
			email,

			soundVolume, 
			setSoundVolume,
			soundMute, 
			setSoundMute,

			workerCall,
			showCallCard,
			setShowCallCard,
			showCallCardNo,
			setShowCallCardNo,
			workerCallNo,
			callIndex,
			callIndex2,

			clientCall,
			showCallCard2,
			setShowCallCard2,
			callIndex3,
			callIndex4,

			//исходящий звонок сотруднику
			showCallCardWorker,
			setShowCallCardWorker,
			workerIshod, 
			setWorkerIshod,
			showCallCardClient, 
			setShowCallCardClient,
			clientIshod,
			setClientIshod,

			//исходящий звонок робот
			showCallCardRobot,
			setShowCallCardRobot,
			robotIshod, 
			setRobotIshod,

			addNewMessage,
			addNewMessage2,
			addNewMessage3,
			delWMessageContext,
			delWMessageContext2,
			delWMessageContext3,
			sendMessSupport,
		}}>
			{children}
		</UsersContext.Provider>
	);
};

export { useUsersContext, UsersProvider };
