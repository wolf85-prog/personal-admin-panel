import React, { createContext, useContext, useEffect, useState } from "react";

import { useSocketContext } from "./socketContext";
import { addManager, getManagerId, editManager } from 'src/http/managerAPI';
import { getAllMessages, getContacts, getConversation, getMessages } from '../../http/chatAPI'
import { getCompany } from '../../http/companyAPI'
import { getPlatforms } from '../../http/platformAPI'

import cities from 'src/data/cities';

import { getDistributionsW, 
	getDistributionsCountW,
	getDistributionsWPlan,
	getProjectsApi, 
	//getCompanys,
	newCountMessage,
	newCountMessagePretendent,
	newCountWMessage,
	newCountProjects,
	getCountMessage, 
	getWorkerId,
	getProjectAll,
	getProjects,
	getProjectNewCash,
} from "src/http/adminAPI";

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
	// const [users, setUsers] = useState( () => {
	// 	const savedUsers = localStorage.getItem("users");
	//    	const parsedUsers = JSON.parse(savedUsers);
	//    	return parsedUsers || "";
	// });  //useState(contacts);	
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

	const [specialist, setSpecialist] =  useState([])

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


	//const [distributionsWork, setDistributionsWork] = useState([]); 

	const [conversations, setConversations] = useState([]); 
	const [wuserbots, setWuserbots] = useState([]); 

	const [soundsNotif, setSoundsNotif] = useState([]); 

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
			console.log("userId: ", userId)

			let company = await getCompany(userId);
			console.log("companys context: ", company)

		
			let arrCompanys = []
		
			company.map(async (user, i) => {
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

	},[userId])


//------------------------------------------------------------------------------------------
// get Platforms
//------------------------------------------------------------------------------------------	
	useEffect(() => {
		const fetchData = async () => {
			console.log("userId: ", userId)
			
			let platforms = await getPlatforms(userId);
			console.log("platforms context: ", platforms)
		
			let arrCompanys = []
		
			platforms.map(async (user, i) => {
		
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

	},[userId])

//------------------------------------------------------------------------------------------




	return (
		<UsersContext.Provider value={{ 
			userId, 
			setUserId,
			users, 
			setUsers,
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
			specialist, 
			setSpecialist,
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
			specialistsCount, 
			setSpecialistsCount,
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
