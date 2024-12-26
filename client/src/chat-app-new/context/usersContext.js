import React, { createContext, useContext, useEffect, useState } from "react";

import { useSocketContext } from "./socketContext";
import { getAllMessages, getContacts, getConversation, getMessages } from '../../http/chatAPI'


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
	const [users, setUsers] = useState([]); //все специалисты;
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

	const [specialistAll, setSpecialistAll] = useState([]);
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

	const [pretendents, setPretendents] = useState([])
	const [newPretendent, setNewPretendent] = useState(false);
	const [countPretendent, setCountPretendent] = useState(0)

	const [userWorkers, setUserWorkers] = useState( () => {
		const savedUserWorkers = localStorage.getItem("userWorkers");
	   	const parsedUserWorkers = JSON.parse(savedUserWorkers);
	   	return parsedUserWorkers || "";
	}); 
	const [workers, setWorkers] = useState([]); //100 последних специалистов;
	const [workersAll, setWorkersAll] = useState([]); //все специалисты;
	// const [workersAll, setWorkersAll] =  useState( () => {
	// 	const savedUserWorkers = localStorage.getItem("specialist");
	//    	const parsedUserWorkers = JSON.parse(savedUserWorkers);
	//    	return parsedUserWorkers || "";
	// });  //все специалисты;

	const [specialist, setSpecialist] =  useState([])

	const [specialistsCount, setSpecialistsCount] = useState(0)
	const [managersCount, setManagersCount] = useState(0)
	const [companysCount, setCompanysCount] = useState(0)


	const [userRenthub, setUserRenthub] = useState( () => {
		const savedUserRenthub = localStorage.getItem("userRenthub");
	   	const parsedUserRenthub = JSON.parse(savedUserRenthub);
	   	return parsedUserRenthub || "";
	}); 

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
	//update workers
	const [showUpdate, setShowUpdate] = useState(false);
	const [workerUpdate, setWorkerUpdate] = useState(100);
	//update avatar
	const [showUpdate2, setShowUpdate2] = useState(false);
	const [avatarUpdate, setAvatarUpdate] = useState(100);
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




	return (
		<UsersContext.Provider value={{ 
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

			managersCount,
			setManagersCount,
			companysCount,
			setCompanysCount,
			specialistsCount, 
			setSpecialistsCount,
		}}>
			{children}
		</UsersContext.Provider>
	);
};

export { useUsersContext, UsersProvider };
