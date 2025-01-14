import React, { createContext, useContext, useEffect, useState } from "react";

import { useSocketContext } from "./socketContext";

import { getClient } from "./../../http/clientAPI"

import { addManager, getManagerId, editManager } from 'src/http/managerAPI';

import { getAllMessages, getContacts, getConversation, getMessages, getMessagesCount, getClientCount } from '../../http/chatAPI'

import { getAllPretendent, getWContacts, getWConversation, 
	getWConversations, getWMessages, getWorkers, getWorker, getAllWMessages, 
	getWMessagesCount, getWorkersCount} from '../../http/workerAPI'

import { getCompany } from '../../http/companyAPI'

import { getPlatforms } from '../../http/platformAPI'

import { getUserbot, getWUserbot } from "../../http/adminAPI";

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
import soundCall from './../../assets/sound/Skype.mp3';
import sendSound from './../assets/sounds/sendmessage.mp3';


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
	const [clientAll, setClientAll] = useState([]);
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

	const [userWorkers, setUserWorkers] = useState([]); 
	const [workers, setWorkers] = useState([]); //100 последних специалистов;
	const [workersAll, setWorkersAll] = useState([]); //все специалисты;

	const [userClients, setUserClients] = useState([]); 

	const [specialistsCount, setSpecialistsCount] = useState(0)
	const [managersCount, setManagersCount] = useState(0)
	const [companysCount, setCompanysCount] = useState(0)
	const [clientsCount, setClientsCount] = useState(0)


	const [countMessageWork, setCountMessageWork] = useState(() => {
		// getting stored value
		const saved = localStorage.getItem("countMessageWork");
		const initialValue = saved;
		return initialValue || 0;
	});


	const [conversations, setConversations] = useState([]); 
	const [wuserbots, setWuserbots] = useState([]); 


	const [showCallCard, setShowCallCard] = useState(false);
	const [workerCall, setWorkerCall] = useState('');

	const [showCallCardNo, setShowCallCardNo] = useState(false);
	const [workerCallNo, setWorkerCallNo] = useState('');
	const [callIndex, setCallIndex] = useState(0)
	const [callIndex2, setCallIndex2] = useState(0)

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
		  console.log("user: ", JSON.parse(user))
	
		  if (user) {
			setUserId(JSON.parse(user)?.id)
			setEmail(JSON.parse(user)?.email)
			
			const result = await getManagerId(JSON.parse(user)?.id)
		  	console.log("Manager: ", result)
	
		  	setManagerProfile(result)
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
			console.log("companys context: ", company)

		
			let arrCompanys = []
		
			company && company.map(async (user, i) => {
				const d = new Date(user.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
				const d2 = new Date(d)
				const month = String(d2.getMonth()+1).padStart(2, "0");
				const day = String(d2.getDate()).padStart(2, "0");
				const chas = d2.getHours();
				const min = String(d2.getMinutes()).padStart(2, "0");
				const newDate = `${day}.${month} ${chas}:${min}`;
		
				let str_sfera = ''
				user.sfera && JSON.parse(user.sfera).map((item, index)=> {
				str_sfera = str_sfera + item.name + (index+1 !== JSON.parse(user.sfera).length ? ', ' : '')
				})

				let str_comteg = ''
				user.comteg && JSON.parse(user.comteg).map((item, index)=> {
				str_comteg = str_comteg + item.name + (index+1 !== JSON.parse(user.comteg).length ? ', ' : '')
				})
		
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
				sfera: str_sfera,
				comteg: str_comteg,
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
			console.log("platforms context: ", platforms)
		
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
			
		//0 все клиенты
		let all = await getClient(JSON.parse(user)?.id)
		console.log("Client all: ", all)

		const arrayClientAll = []
	
		all.map(async (user) => {
			const newClient = {
			id: user.id,
			userfamily: user.fio, //user.userfamily != null ? user.userfamily : '',
			username: '',//user.username,
			phone: user.phone,
			phone2: user.phone2,
			dateborn: user.age,
			city: user.city, 
			//newcity: user.newcity, 
			companys: user.company,
			//stag: user.stag,
			worklist:  user.specialization,
			chatId: user.chatId,
			createDate: user.createdAt,
			avatar: user.profile,
			//from: user.from,
			promoId: user.promoId,
			blockW: user.blockW,
			deleted: user.deleted,
			comment: user.comment,
			comteg: user.comteg,
			}
	
			arrayClientAll.push(newClient)
		})
	
		setClientAll(arrayClientAll)


		//1 все специалисты 100
		let response = await getClientCount(JSON.parse(user)?.id, 100, client.length);
		console.log("client 100: ", response)
	
		const arrayClient = []
	
		response.reverse().map(async (user) => {
			const newClient = {
				id: user.id,
				userfamily: user.fio, //user.userfamily != null ? user.userfamily : '',
				username: '',//user.username,
				phone: user.phone,
				phone2: user.phone2,
				dateborn: user.age,
				city: user.city, 
				companys: user.company,
				worklist:  user.specialization,
				chatId: user.chatId,
				createDate: user.createdAt,
				avatar: user.profile,
				promoId: user.promoId,
				blockW: user.blockW,
				deleted: user.deleted,
			}
	
			arrayClient.push(newClient)
		})
	
		setClient(arrayClient)	
	
		//2 все пользователи бота
		let userbots = await getUserbot();
		//console.log("wuserbots size: ", wuserbots.length)
		const arrayContact = []

		//3 все беседы (conversations)
		let convers = await getConversation()
		//console.log("conversations: ", convers.length)
		setConversations(convers)

		//4 все сообщения бота
		let messagesAll = await getMessagesCount(1000) //getWMessagesCount(1000) //getAllWMessages()
		//console.log("messagesAll: ", messagesAll.length)

		let count = 0
		convers.forEach(async (user, index) => {
	
			let client = arrayClientAll.find((item)=> item.chatId === user.members[0])
			let userbot = userbots.find((item)=> item.chatId === client?.chatId)	
				
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
					id: client.id,
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

			//0 все специалисты
			let all = await getWUserbot()
			console.log("WUserbot all: ", all)

			const arrayWorkerAll = []
		
			all.map(async (user) => {
				const newWorker = {
				id: user.id,
				userfamily: user.fio, //user.userfamily != null ? user.userfamily : '',
				username: '',//user.username,
				phone: user.phone,
				dateborn: user.age,
				city: user.city, 
				//newcity: user.newcity, 
				companys: user.company,
				//stag: user.stag,
				worklist:  user.specialization,
				chatId: user.chatId,
				createDate: user.createdAt,
				avatar: user.profile,
				//from: user.from,
				promoId: user.promoId,
				blockW: user.blockW,
				deleted: user.deleted,
				comment: user.comment,
				comteg: user.comteg,
				}
		
				arrayWorkerAll.push(newWorker)
			})
		
			setWorkersAll(arrayWorkerAll)


			//1 все специалисты 100
			//let response = await getWorkersCount(100, workers.length);
			let response = await getClientCount(100, client.length);
			//console.log("client 100: ", response)
		
			const arrayWorker = []
		
			response.reverse().map(async (user) => {
				const newWorker = {
					id: user.id,
					userfamily: user.fio, //user.userfamily != null ? user.userfamily : '',
					username: '',//user.username,
					phone: user.phone,
					dateborn: user.age,
					city: user.city, 
					//newcity: user.newcity, 
					companys: user.company,
					//stag: user.stag,
					worklist:  user.specialization,
					chatId: user.chatId,
					createDate: user.createdAt,
					avatar: user.profile,
					//from: user.from,
					promoId: user.promoId,
					blockW: user.blockW,
					deleted: user.deleted,
				}
		
				arrayWorker.push(newWorker)
			})
		
			setWorkers(arrayWorker)	
		
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


	return (
		<UsersContext.Provider value={{ 
			userId, 
			setUserId,
			users, 
			setUsers,

			specialist,
			setSpecialist,
			
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
			userWorkers,
			workersAll,

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
		}}>
			{children}
		</UsersContext.Provider>
	);
};

export { useUsersContext, UsersProvider };
