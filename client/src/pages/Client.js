import React, { Suspense, useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AppSidebar, AppFooter, AppHeader, AppRightbar } from '../components/index'
import DataTable, { createTheme } from 'react-data-table-component';
import { useSelector, useDispatch } from 'react-redux'
import InputMask from 'react-input-mask';
import Autocomplete from '@mui/material/Autocomplete';
import { 
  CContainer, 
  CSpinner, 
  CCol,
  CRow,
  CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCard,
  CCardBody,
  CCollapse,
  CButton, 
  CTooltip,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormSelect,
  CToast, 
  CToastBody,
  CToastClose,
  CToaster,

} from '@coreui/react'
//import Icon from "./../chat-app-worker/components/Icon";
import { useUsersContext } from "../chat-app-new/context/usersContext";

import { getClient, getClientCount, editClient, addClient, deleteClient } from '../http/clientAPI'
import { getWContacts} from '../http/workerAPI'
import { uploadAvatar, uploadFile } from '../http/chatAPI';
import { getCompanySendCall } from '../http/adminAPI'

import ishodCall from '../assets/sound/call_out.mp3';

import DeleteIcon from "../assets/images/delete_icon.png"
import Close from "../assets/images/clear.svg"
import zamok from "../assets/images/замок.png"
import zamok2 from "../assets/images/замок2.png"
import addAvatar from "../assets/images/add_avatar.png"
import Krestik from './../assets/images/krestik.png';
import imgBlock18 from "./../assets/images/block18.png";
import Trubka from "./../assets/images/trubka.png";
import Tg from "./../assets/images/tg.png";
import Star from "./../assets/images/star.png";
import StarActive from "./../assets/images/star_activ.svg";
import Disketa from "./../assets/images/disketa.png";
import arrowDown from 'src/assets/images/arrowDown.svg'

import { array } from 'prop-types';

import DropdownClient from 'src/components/DropdownClient/DropdownClient';

import specData from 'src/data/specData';
import specOnlyData from 'src/data/specOnlyData';
import comtegs from 'src/data/comtegs';
import skills from 'src/data/skills';
import merchData from 'src/data/merchData';
//import companys from 'src/data/companys';
import cities from 'src/data/cities';
import sferaData from 'src/data/sfera';
import dolgnostData from 'src/data/dolgnostData';
import { _startAction } from 'mobx';

//Workers.js
const Client = () => {
  const location = useLocation()
  const workerId= location.state?.workerId
  //console.log("workerId: ", workerId)

  const audioIshodCall = new Audio(ishodCall);

  const { userId, clientAll, setClientAll, client, setClient,
    clientsCount, setClientsCount, companysAll } = useUsersContext();
  const { clientIshod, setClientIshod, showCallCardClient, setShowCallCardClient} = useUsersContext();

  const [clientCount, setClientCount] = useState([]);
  const [filterAll, setFilterAll] = useState([]);

  const [companyData, setCompanyData] = useState([]);

  const [userbots, setUserbots] = useState([]);

  const [loading, setLoading]= useState(true);
  const [text, setText]= useState("");
  //const [spec, setSpec] = useState([]); 
  const [visibleSm, setVisibleSm] = useState(false)
  const [modalWorker, setModalWorker] = useState({})
  const [showProfile, setShowProfile] = useState(false)
  const [showSpec, setShowSpec] = useState(false)
  const [showClose, setShowClose] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [showSearch, setShowSearch] = useState(true)
  const [showClear, setShowClear] = useState(false)
  const [showMenuBlock18, setShowMenuBlock18] = useState(false)
  const [showBlock18, setShowBlock18] = useState(false)
  const [block18, setBlock18] = useState(false)
  //const [blockW, setBlockW] = useState(false)
  const [showMenuKrest, setShowMenuKrest] = useState(false)
  const [krest, setKrest] = useState(false)
  
  const [cityValue, setCityValue] = useState(0)
  
  const [showSave, setShowSave] = useState(false)
  const [showSave2, setShowSave2] = useState(false)
  const [showSave3, setShowSave3] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [clientId, setClientId] = useState('');
  const [id, setId] = useState('');
  const [fio, setFio] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [speclist, setSpeclist] = useState([]);
  const [phone, setPhone] = useState('');
  const [telegram, setTelegram] = useState('');
  const [reyting, setReyting] = useState('');
  const [comteg, setComteg] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [nik, setNik] = useState('');
  const [dateReg, setDateReg] = useState('');
  const [profile, setProfile] = useState('');
  const [sfera, setSfera] = useState('');
  const [dolgnost, setDolgnost] = useState('');

  const [company, setCompany] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companysData, setCompanysData] = useState([]);

  const [countPress, setCountPress] = useState(0);
  const [countPressTG, setCountPressTG] = useState(0);
  const [countPressCity, setCountPressCity] = useState(0);
  const [countPressCategory, setCountPressCategory] = useState(0);

  const [blockProfile, setBlockProfile] = useState(true)
  const [showBlacklist, setShowBlacklist] = useState(false)
  const [showMenu1, setShowMenu1] = useState(false)
  const [showMenu2, setShowMenu2] = useState(false)
  const [showClearCity, setShowClearCity] = useState(false)

  const [starActive1, setStarActive1] = useState(true)
  const [starActive2, setStarActive2] = useState(true)
  const [starActive3, setStarActive3] = useState(true)
  const [starActive4, setStarActive4] = useState(false)
  const [starActive5, setStarActive5] = useState(false)

  const [visibleDelete, setVisibleDelete] = useState(false)

  const [file, setFile] = useState(0);
  const [filePreview, setFilePreview] = useState();
  const [image, setImage]= useState("");

  const host = process.env.REACT_APP_HOST

  const [toast, addToast] = useState(0)
  const toaster = useRef()
  const [sortedCities, setSortedCities] = useState([])

  const exampleToast = (
    <CToast autohide={true} visible={true} color="success" className="text-white align-items-center">
      <div className="d-flex">
        <CToastBody>Данные успешно сохранены!</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )

  const deleteToast = (
    <CToast autohide={true} visible={true} color="success" className="text-white align-items-center">
      <div className="d-flex">
        <CToastBody>Данные успешно удалены!</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )


  //поиск
  // useEffect(() => {
	// 	const filteredData = clientAll.filter(user=> (user.fio + user.chatId + user.phone + user.speclist)?.replace(/[её]/g, '(е|ё)').toLowerCase().includes(text.replace(/[её]/g, '(е|ё)').toLowerCase()));
  //   setClient(text === '' ? clientCount : filteredData); 

  //   setClientsCount(text === '' ? clientAll.length : filteredData.length)
  //   //console.log("client", client)
  //   setShowClear(text === '' ? false : true)
  // }, [text]);

  useEffect(() => {
    let count = 0
    if (starActive1) {
      count = 1
      console.log("reyting: ", 1)
    }
    if (starActive2) {
      count = 2
      console.log("reyting: ", 2)
    }
    if (starActive3) {
      count = 3
      console.log("reyting: ", 3)
    }
    if (starActive4) {
      count = 4
      console.log("reyting: ", 4)
    }
    if (starActive5) {
      count = 5
      console.log("reyting: ", 5)
    }
    setReyting(count)
  }, [starActive1, starActive2, starActive3, starActive4, starActive5]);

  useEffect(()=> {

    if (workerId) {
      const res = clientAll.find((item)=>item.id === workerId)
      console.log("res: ", res)
      clickFio(res)
    }

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

    let arrCompany = []
    //компании
    companysAll.map((item, index)=> {
      const obj = {
        label: item.title,
        value: index+1
      }
      arrCompany.push(obj)
    })
    setCompanyData(arrCompany)

    const fetchData = async() => {

      // 2 специалисты 20 чел.
      let workers = await getClientCount(userId, 20, client.length)
      console.log("client: ", workers)

      let arrWorkers = []

      workers && workers.map(async (worker, i) => {
        const d = new Date(worker.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
        const d2 = new Date(d)
        const month = String(d2.getMonth()+1).padStart(2, "0");
        const day = String(d2.getDate()).padStart(2, "0");
        const chas = d2.getHours();
        const min = String(d2.getMinutes()).padStart(2, "0");
        const newDate = `${day}.${month} ${chas}:${min}`;


        let str_comment = ''
        worker.comment && JSON.parse(worker.comment).map((item, index)=> {
          str_comment = str_comment + item.content + (index+1 !== JSON.parse(worker.comment).length ? ', ' : '')
        })

        const newWorker = {
          id: worker.id,
          fio: worker.fio,
          chatId: worker.chatId, 
          phone: worker.phone, 
          city: worker.city, 
          company: worker.company, 
          comteg: worker.comteg, 
          comment: str_comment, 
          age: worker.age, 
          reyting: worker.reyting, 
          profile: worker.profile, 
          email: worker.email, 
          //blockW: worker.blockW,
          block18: worker.block18,
          krest: worker.krest,
          createdAt: worker.createdAt,
          dolgnost: worker.dolgnost,
          sfera: worker.sfera,
        }
        arrWorkers.push(newWorker)

        //если элемент массива последний
				if (i === workers.length-1) {
          const sortedWorker = [...arrWorkers].sort((a, b) => {       
            var idA = a.id, idB = b.id 
            return idB-idA  //сортировка по возрастанию 
          })

					setClientCount(sortedWorker)
          setClient(sortedWorker)
					
					//сохранить кэш
					localStorage.setItem("client", JSON.stringify(sortedWorker));
				}

      })  

      setLoading(false)

      let wuserbots = await getWContacts();
      console.log("wuserbots: ", wuserbots)
      setUserbots(wuserbots)

      
    }
    fetchData()
  }, [])

  useEffect(() => {
    const getImage = async () => {
        if (file) {
          //setShowUpload(true)
          console.log("file:", file)
          const data = new FormData();
          data.append("name", file.name);
          data.append("avatar", file);
          
          let response = await uploadAvatar(data) //distribFile(data) // uploadFile(data)
          console.log("response: ", response.data.path)

          setImage(response.data.path.split('.team')[1]);
          //сообщение с ссылкой на файл
          console.log("Путь к файлу: ", host + response.data.path.split('.team')[1])
          setProfile(host + response.data.path.split('.team')[1])
          //setValue(host + response.data.path)
          //setPoster(host + response.data.path.split('.team')[1])
        }
    }
    getImage();
  }, [file])
  

  //Добавить специалиста
  const clickAdd = async()=> {   

    const data = {
      userId,
      fio: 'ФИО',
    }
    const res = await addClient(data)
    console.log("res: ", res)

    // if (res) {
    //   await addNewclient(res?.id, res?.fio, res?.profile)
    // }

    const newObj = {
      id: res?.id, 
      fio: res?.fio, 
      speclist: '',
      skill: '',
      merch: '',  
      company: '', 
      comteg: '', 
      comteg2: '', 
      comment: '', 
      comment2: '', 
  }

    client.push(newObj)
    clientAll.push(newObj)

    const sortedUser = [...client].sort((a, b) => {       
      var idA = a.id, idB = b.id 
      return idB-idA  //сортировка по возрастанию 
    })

    setClient(sortedUser)
    //setClientAll(clientAll)
  }

  const clickFio = (worker)=> {
    console.log("worker: ", worker)
    //setVisibleXL(true)
    setShowProfile(true)
    setModalWorker(worker)
    setShowSearch(false)
    setShowClear(false)

    const Val = cities.find(item=> item.label === worker.city)
    if (Val) {
      setCityValue(Val.value)
      console.log(worker.city, Val)
    }   

    const currentYear = new Date().getFullYear()

    if (worker.reyting === '1') {
      setStarActive1(true)
      setStarActive2(false)
      setStarActive3(false)
      setStarActive4(false)
      setStarActive5(false)
    } 
    if (worker.reyting === '2') {
      setStarActive1(true)
      setStarActive2(true)
      setStarActive3(false)
      setStarActive4(false)
      setStarActive5(false)
    } 
    if (worker.reyting === '3') {
      setStarActive1(true)
      setStarActive2(true)
      setStarActive3(true)
      setStarActive4(false)
      setStarActive5(false)
    }
    if (worker.reyting === '4') {
      setStarActive1(true)
      setStarActive2(true)
      setStarActive3(true)
      setStarActive4(true)
      setStarActive5(false)
    }
    if (worker.reyting === '5') {
      setStarActive1(true)
      setStarActive2(true)
      setStarActive3(true)
      setStarActive4(true)
      setStarActive5(true)
    }

    setId(worker.id)
    setFio(worker.fio)
    setCity(worker.city ? worker.city : '')
    setAge(worker.age ? worker.age.split('-')[0] : '')

    setPhone(worker.phone)
    setTelegram(worker.chatId)

    setReyting(worker.reyting === null ? '' : worker.reyting)

    const compTitle = companysAll.find(item=> item.id.toString() === worker.company)
    setCompanyName(compTitle?.title ? {name: worker.company} : {name: ''})
    setCompany(worker.company ?  worker.company : '')

    setComteg(worker.comteg ? worker.comteg : '')
    setEmail(worker.email)
    setComment(worker.comment)
    setProfile(worker.profile)
    setSfera(worker.sfera)
    setDolgnost(worker.dolgnost)
    
    // if (userbots) {
    //   setNik(userbots.find((user) => user.chatId?.toString() === worker.chatId?.toString())?.username)
    // }
    //setDateReg(worker.createdAt)

    //setBlockW(worker.blockW)
    setBlock18(worker.block18)
    setKrest(worker.krest)

    setShowBlock18(worker.block18)
    console.log("user", userbots.find((user) => user.chatId === worker.chatId))
  }

  const copyText = (text)=> {
    window.prompt("", text);
  }



  //ЕЩЁ
  const clickNext = async() => {
    //1 все специалисты
		let response = await getClientCount(20, client.length);
    //console.log("workers size: ", response)

    const arrayWorker = []
		
			response.reverse().map(async (worker) => {
        const d = new Date(worker.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
        const d2 = new Date(d)

        const month = String(d2.getMonth()+1).padStart(2, "0");
        const day = String(d2.getDate()).padStart(2, "0");
        const chas = d2.getHours();
        const min = String(d2.getMinutes()).padStart(2, "0");
        
        const newDate = `${day}.${month} ${chas}:${min}`;

        let str_comment = ''
        worker.comment && JSON.parse(worker.comment).map((item, index)=> {
          str_comment = str_comment + item.content + (index+1 !== JSON.parse(worker.comment).length ? ', ' : '')
        })     

				const newWorker = {
          id: worker.id,
          fio: worker.fio,
          chatId: worker.chatId, 
          phone: worker.phone, 
          city: worker.city, 
          rank: worker.rank, 
          company: '', //str_company, 
          comteg: '', //str_komteg, 
          comment: str_comment, 
          age: worker.age, 
          reyting: worker.reyting, 
          profile: worker.profile, 
          email: worker.email, 
          //blockW: worker.blockW,
          block18: worker.block18,
          krest: worker.krest,
          createdAt: worker.createdAt,
        }
		
				arrayWorker.push(newWorker)
			})    

      //console.log("Всего сейчас: ", arrayWorker.length)
			
      const sortedWorker = [...arrayWorker].sort((a, b) => {       
        var idA = a.id, idB = b.id 
        return idB-idA  //сортировка по возрастанию 
      })
      setClient(sortedWorker)
      setClientCount(sortedWorker)
  }

  const closeProfile = () => { 
    setShowProfile(false)
    setShowClose(false)
    setShowSearch(true)

    setShowClear(true)
    setFilePreview('')
    setCityValue(0)
  }

  

  //сохранить профиль
  const saveProfile = async(id) => { 

    //Toast
    setShowModal(true)

    //setShowClose(true)
    console.log(id)



    //комментарии 1
    let commentArr = []
    let strComment = ''
    const obj1 = {
       content: comment,
    }
    strComment = comment
    commentArr.push(obj1)


    const saveData = {
      fio,
      phone,
      chatId: telegram,
      city: city,
      age: age ? age+'-01-01' : '', 
      company: company, //companysAll.find((item)=>item.title === companyName)?.id,
      comteg, //JSON.stringify(comtegArr),
      comment: JSON.stringify(commentArr),
      profile,
      reyting,
      email,
      block18,
      krest,
      dolgnost,
      sfera,
    }
    console.log(saveData)

    setClient((client) => {	

			let userIndex = client.findIndex((spec) => spec.id === id);
			const usersCopy = JSON.parse(JSON.stringify(client));

      const userObject = usersCopy[userIndex];
			usersCopy[userIndex] = { ...userObject, 
        fio, 
        phone, 
        city: city, 
        age: age ? age+'-01-01' : '', 
        company, //strCompany,
        comteg, //strComteg,
        comment: strComment,
        chatId: telegram,
        profile,
        reyting,
        email,
        block18,
        krest,
        dolgnost,
        sfera,
      };

      console.log("update user: ", usersCopy[userIndex])

			return usersCopy;
    });

    //сохранить изменения в базе
    await editClient(saveData, id)

    //addToast(exampleToast) //ваши данные сохранены

    setTimeout(()=> {
      setShowModal(false)
      closeProfile()
    }, 2000)
  }

  const blockedProfile = () => { 
    setBlockProfile(!blockProfile)
  }


  useEffect(() => {
    console.log("city: ", cityValue)
    

  }, [city, cityValue]);


  useEffect(() => {
    console.log("client: ", client)
    

  }, [client]);


  const handleId = event => {
    const result = event.target.value.replace(/\D/g, '');
    setClientId(result);
  };

  const handleTg = event => {
    const result = event.target.value.replace(/\D/g, '');
    setTelegram(result);
  };


  const onChangeReyting = () => {
    setShowBlacklist(false)
    setShowMenu2(false)

    //убрать из списка специальностей Blacklist
    const res = speclist.filter(item=>item !== 'Blacklist')
    console.log("speclist: ", res)

    setSpeclist(res)
  }

  const onChangeBlacklist = () => {
    setShowBlacklist(true)
    setShowMenu1(false)

    //добавить в список специальностей Blacklist
    speclist.push('Blacklist')
    console.log("speclist: ", speclist)

    setSpeclist(speclist)
  }

  const onChangeBlock18 = () => {
    setShowBlock18(!showBlock18)
    setShowMenuBlock18(false)
    setBlock18(!block18)
  }  

  const onChangeKrest = () => {
    setKrest(!krest)
    setShowMenuKrest(false)
    //setBlockW(!blockW)
  } 

  {/* Добавление файла */}
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setFilePreview(URL.createObjectURL(e.target.files[0]));
  }

  const clickSearch = (e) => {
    setShowClear(true)
    setText(e.target.value)
  }

  const clearSearch = () => {
    setText('')
  }

  const clickDelete = (id) => {
    console.log(id)

    setVisibleDelete(!visibleDelete)

  }


  //удаление специалиста
  const deleteProfile = async(id) => {
    console.log(id)
    setVisibleDelete(false)

    await deleteClient(id)
    addToast(deleteToast) //ваши данные сохранены

    setClient([...client].filter(item=>item.id !== id))

    setShowProfile(false)
  }

  const addCity = (e) => {
    //console.log(e.target.value)
    const city = cities.find(item=> parseInt(item.value) === parseInt(e.target.value))
    //console.log(city.label)
    setCity(city.label)
    setCityValue(e.target.value)
  }

  const clearCity = () => {
    setCity('')
    setCityValue(0)
  }


    //сортировка по ФИО
    const onSortFio = () => {
      setCountPress(countPress + 1)
      
      if (countPress + 1 >= 3) {
        setCountPress(0)
      }
      console.log("check sort", countPress + 1)
  
      if (countPress + 1 === 1) {
        const sortedWorker = [...client].sort((a, b) => {       
          var fioA = a.fio.toUpperCase(), fioB = b.fio.toUpperCase(); 
          return (fioA < fioB) ? -1 : (fioA > fioB) ? 1 : 0;  //сортировка по возрастанию 
        })
        setClient(sortedWorker)
      } else if (countPress + 1 === 2) {
        const sortedWorker = [...client].sort((a, b) => {       
          var fioA = a.fio.toUpperCase(), fioB = b.fio.toUpperCase(); 
          return (fioA > fioB) ? -1 : (fioA < fioB) ? 1 : 0;  //сортировка по возрастанию 
        })
        setClient(sortedWorker)
      } else {
        const sortedWorker = [...client].sort((a, b) => {       
          var fioA = a.id, fioB = b.id 
          return fioB-fioA  //сортировка по убыванию 
        })
        setClient(sortedWorker)
      }
      
    }
  
    //сортировка по telegram
    const onSortTG = () => {
      setCountPressTG(countPressTG + 1)
      
      if (countPressTG + 1 >= 3) {
        setCountPressTG(0)
      }
      console.log("check sort", countPressTG + 1)
  
      if (countPressTG + 1 === 1) {
        const sortedWorker = [...client].sort((a, b) => {       
          var tgA = a.telegram, tgB = b.telegram 
          return (tgA < tgB) ? -1 : (tgA > tgB) ? 1 : 0;  //сортировка по возрастанию 
        })
        setClient(sortedWorker)
      } else if (countPressTG + 1 === 2) {
        const sortedWorker = [...client].sort((a, b) => {       
          var tgA = a.telegram, tgB = b.telegram 
          return (tgA > tgB) ? -1 : (tgA < tgB) ? 1 : 0;  //сортировка по возрастанию 
        })
        setClient(sortedWorker)
      } else {
        const sortedWorker = [...client].sort((a, b) => {       
          var fioA = a.id, fioB = b.id 
          return fioB-fioA  //сортировка по убыванию 
        })
  
        //setClientCount(sortedWorker)
        setClient(sortedWorker)
      }
      
    }
  
    //сортировка по Городу
    const onSortCity = () => {
      setCountPressCity(countPressCity + 1)
      
      if (countPressCity + 1 >= 3) {
        setCountPressCity(0)
      }
      //console.log("check sort", countPressTG + 1)
  
      if (countPressCity + 1 === 1) {
        const sortedWorker = [...client].sort((a, b) => {       
          var cityA = a.city, cityB = b.city
          return (cityA < cityB) ? -1 : (cityA > cityB) ? 1 : 0;  //сортировка по возрастанию 
        })
        setClient(sortedWorker)
      } else if (countPressCity + 1 === 2) {
        const sortedWorker = [...client].sort((a, b) => {       
          var cityA = a.city, cityB = b.city
          return (cityA > cityB) ? -1 : (cityA < cityB) ? 1 : 0;  //сортировка по возрастанию 
        })
        setClient(sortedWorker)
      } else {
        const sortedWorker = [...client].sort((a, b) => {       
          var idA = a.id, idB = b.id 
          return idB-idA  //сортировка по убыванию 
        })
  
        //setClientCount(sortedWorker)
        setClient(sortedWorker)
      }
      
    }
  
    //сортировка по Специальности
    const onSortCategory = () => {
      setCountPressCategory(countPressCategory + 1)
      
      if (countPressCategory + 1 >= 3) {
        setCountPressCity(0)
      }
      //console.log("check sort", countPressTG + 1)
  
      if (countPressCategory + 1 === 1) {
        const sortedWorker = [...client].sort((a, b) => {       
          var cityA = a.city, cityB = b.city
          return (cityA < cityB) ? -1 : (cityA > cityB) ? 1 : 0;  //сортировка по возрастанию 
        })
        setClient(sortedWorker)
      } else if (countPressCategory + 1 === 2) {
        const sortedWorker = [...client].sort((a, b) => {       
          var cityA = a.city, cityB = b.city
          return (cityA > cityB) ? -1 : (cityA < cityB) ? 1 : 0;  //сортировка по возрастанию 
        })
        setClient(sortedWorker)
      } else {
        const sortedWorker = [...client].sort((a, b) => {       
          var idA = a.id, idB = b.id 
          return idB-idA  //сортировка по убыванию 
        })
  
        //setClientCount(sortedWorker)
        setClient(sortedWorker)
      }
      
    }

    const clickToCall = async(id, callType) => {
      audioIshodCall.play();
      await getCompanySendCall(id, callType)
    }


  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

            <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                    {/* <h2>Специалисты</h2> */}
                    <CToaster ref={toaster} push={toast} placement="top-end" /> 
                    <CRow className="mb-3">
                      <CCol sm={3} style={{position: 'relative'}}>
                        <CFormInput 
                          placeholder="Поиск..." 
                          onChange={(e)=>clickSearch(e)} 
                          aria-label="spec"
                          value={text}
                          style={{display: showSearch ? 'block' : 'none'}}
                        >   
                        </CFormInput>
                        <img src={Close} alt='' onClick={clearSearch} width={10} style={{display: showClear ? 'block' : 'none', position: 'absolute', top: '15px', right: '20px'}}/>
                      </CCol>
                      <CCol>
                        <CButton onClick={clickAdd} className='uley_add_user' style={{display: showSearch ? 'block' : 'none'}}>
                          <span style={{position: 'absolute', top: '-12px', left: '6px', fontSize: '36px', color: '#2d2e38'}}>
                          +</span>
                        </CButton>
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol style={{textAlign: 'center'}}>
                        <CCard className="mb-4"> 
                            <p style={{position: 'absolute', top: '-18px', right: '15px', fontSize: '14px', color: '#f3f3f3'}}>
                              Всего: {clientsCount}
                            </p>
                            <CCardBody>
                              {!showProfile ?
                              
                              (loading ? 
                                      
                                <CSpinner/> :
                                <div className='scrooll-table'>
                                  <div className="table-head-content"></div>
                                  <div className="table-head-content2"></div>
                                  <div className="table-head-content3"></div>
                                  {/* <div className="table-col-content"></div> */}
                                  <CTable align="middle" className="mb-0 border my-table table-dark" hover bordered>
                                    <CTableHead className='table-light'>
                                      <CTableRow>
                                        <CTableHeaderCell className='myid-th widthSpace'>№</CTableHeaderCell> 
                                        <CTableHeaderCell className='myfio-th widthSpace' onClick={onSortFio}>ФИО</CTableHeaderCell>  
                                        <CTableHeaderCell className='my-th widthTg' onClick={onSortTG}>Телеграм</CTableHeaderCell> 
                                        <CTableHeaderCell className='my-th widthPhone'>Телефон</CTableHeaderCell> 
                                        <CTableHeaderCell className='my-th widthSpace' onClick={onSortCity}>Город</CTableHeaderCell>   
                                        <CTableHeaderCell className='my-th widthSpace'>Год</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Проекты</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Компания</CTableHeaderCell> 
                                        <CTableHeaderCell className='my-th widthSpace'>Комтег</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Комментарии</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Рейтинг</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>ИНН</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Профиль</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Почта</CTableHeaderCell>
                                      </CTableRow>
                                    </CTableHead>
                                    <CTableBody >                                  
                                    {client.map((item, index) => (
                                        <CTableRow v-for="item in tableItems" key={index+1} style={{lineHeight: '14px'}}>
                                          <CTableDataCell className="text-center widthSpace my-td">
                                            {index+1}
                                          </CTableDataCell>
                                          <CTableDataCell onClick={()=>clickFio(item)} className="widthSpace myfio-td" style={{cursor: 'pointer', textAlign: 'left'}}>
                                            {item.fio ? (item.fio.length > 30 ? item.fio.substr(0, 30) + '...' : item.fio) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                            {item.chatId}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center">
                                            {item.phone}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.city ? (item.city.length > 30 ? item.city.substr(0, 30) + '...' : item.city) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.age ? item.age.split('-')[0] : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.rank}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.company ? (item.company.length > 20 ? item.company.substr(0, 20) + '...' : item.company) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.comteg ? (item.comteg.length > 30 ? item.comteg.substr(0, 30) + '...' : item.comteg) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="widthSpace" style={{textAlign: 'left'}}>
                                          {item.comment ? (item.comment.length > 30 ? item.comment.substr(0, 30) + '...' : item.comment) : ''}
                                          </CTableDataCell>                                       
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.reyting}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.inn}
                                          </CTableDataCell>
                                          <CTableDataCell className="widthSpace" style={{textAlign: 'left'}}>
                                          {item.profile ? (item.profile.length > 30 ? item.profile.substr(0, 30) + '...' : item.profile) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.email}
                                          </CTableDataCell>

                                        </CTableRow>
                                        ))
                                    }
                                    
                                  </CTableBody>                   
                                  </CTable>
                                </div>
                                
                                
                              )
                              :
                              <div style={{position: 'relative', height: '450px', display: 'flex', flexDirection: 'row'}}>
                                {/* ФИО */}
                                <div style={{position: 'absolute', top: '5px', left: '286px', color: '#fff', zIndex: '100', display: 'flex', justifyContent: 'space-between'}}>   
                                    <div className="text-field">
                                      <input type="text" name="fio" id="fio" value={fio} onChange={(e)=>setFio(e.target.value)} style={{fontSize: '33px', position: 'absolute', top: '-17px', backgroundColor: 'transparent', border: '0', color: '#f3f3f3', width: '600px'}}></input>
                                    </div> 
                                  </div>
                                  <div style={{display: 'flex', position: 'absolute', right: '0'}}>
                                      <CTooltip content="Удалить клиента" placement="bottom">
                                        {/* <Icon id="delete" onClick={()=>clickDelete(id)} style={{cursor: 'pointer'}}/> */}
                                        <img src={DeleteIcon} onClick={()=>clickDelete(id)} style={{ cursor: 'pointer', width: '26px', height: '26px', marginLeft: '20px'}}/>  
                                      </CTooltip>
                                      <img src={Trubka} onClick={()=>{
                                                // const client = clientAll.find(item=> item.userfamily === managerName)
                                                // console.log("client: ", clientAll, client)
                                                // setClientIshod({fio: client?.userfamily, city: client?.city, avatar: client?.avatar, comteg: client?.comteg, dolgnost: client?.dolgnost, companys: client?.companys, sfera: client?.sfera, comment: client?.comment})
                                                // setShowCallCardClient(true)
                                                // clickToCall(client.id, 'c')
                                              }}  
                                        style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                       {/* <img src={Tg} onClick={()=>setShowProfile(false)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/> */}
                                      <img src={blockProfile ? zamok : zamok2} onClick={blockedProfile} style={{cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>
                                      <CTooltip content="Сохранить" placement="bottom">
                                        <img src={Disketa} onClick={()=>saveProfile(id)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                      </CTooltip>
                                      <CTooltip content="Закрыть" placement="bottom">
                                        <img src={Close} onClick={closeProfile} style={{display: showClose ? 'block' : 'block', cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>  
                                      </CTooltip>
                                      
                                    </div>

                                <div style={{position: 'relative', width: '250px'}} onMouseOver={()=>setShowUpload(true)} onMouseOut={()=>setShowUpload(false)}>
                                  {profile ? 
                                  <img src={profile} width='250px' height='250px' alt='poster' style={{borderRadius: '7px', marginBottom: '5px'}}/>
                                  : 
                                  <svg className="rounded me-2" width="250" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" style={{float:'left', margin: '4px 10px 2px 0px'}}>
                                    <rect width="250px" height="250px" fill="#007aff" rx="40"></rect> 
                                  </svg>
                                  }
                                  <div className="file-upload" style={{marginBottom: '8px'}}>
                                    
                                  </div>

                                  <div className="menu-reyting">
                                      <div style={{width: '250px', display: 'flex', justifyContent: 'center'}}>
                                        {showBlacklist ?
                                        <span style={{cursor: 'pointer', color: 'red', fontSize: '24px', fontWeight: '700', marginBottom: '3px'}}>Blacklist</span>
                                        :<div className="star-block" style={{cursor: 'pointer', marginBottom: '8px'}}>
                                          <img className='star-icon' onClick={()=>setStarActive1(!starActive1)} src={starActive1 ? StarActive : Star} alt='' /> 
                                          <img className='star-icon' onClick={()=>setStarActive2(!starActive2)} src={starActive2 ? StarActive : Star} alt='' />
                                          <img className='star-icon' onClick={()=>setStarActive3(!starActive3)} src={starActive3 ? StarActive : Star} alt='' />
                                          <img className='star-icon' onClick={()=>setStarActive4(!starActive4)} src={starActive4 ? StarActive : Star} alt='' />
                                          <img className='star-icon' onClick={()=>setStarActive5(!starActive5)} src={starActive5 ? StarActive : Star} alt='' />
                                        </div>
                                        }
                                      </div>
                                      <div className="menu-content" style={{display: showMenu1 ? 'block' : 'none'}}>
                                          <span>Изменить рейтинг</span>
                                          <span onClick={onChangeBlacklist} style={{cursor: 'pointer'}}>Blacklist</span>
                                      </div>
                                      <div className="menu-content" style={{display: showMenu2 ? 'block' : 'none'}}>
                                          <span>Изменить рейтинг</span>
                                          <span onClick={onChangeReyting} style={{cursor: 'pointer'}}>Рейтинг</span>
                                      </div>
                                  </div>

                                  
                                  
                                  <label className='title-label'>ID</label>
                                  <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <div className="text-field">
                                      <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" value={id}  style={{width: '250px'}}/>
                                    </div>
                                  </div> 

                                  <label className='title-label'>Telegram</label>
                                  <div className="text-field" onMouseOver={()=>setShowSave2(true)} onMouseOut={()=>setShowSave2(false)}>
                                    <img 
                                      src={Disketa} 
                                      onClick={()=>{navigator.clipboard.writeText(telegram)}} 
                                      alt="" 
                                      style={{visibility: showSave2 ? 'visible' : 'hidden', position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', width: '20px', height: '20px'}}
                                    />
                                    <input 
                                      className="text-field__input" 
                                      type="text" 
                                      pattern="[0-9]*"
                                      name="telegram" 
                                      id="telegram" 
                                      value={telegram} 
                                      onChange={handleTg} 
                                      style={{width: '250px'}}
                                    />
                                  </div>
                                  
                                </div>
                                  <img src={imgBlock18} className="block-img"  width={50} alt='' style={{position: 'absolute', top: '0px', left: '195px', opacity: block18 ? '1' : '0' }}/>                                 
                                  <div className="menu-content-block">
                                    <span onClick={onChangeBlock18} style={{cursor: 'pointer'}}>{block18 ? 'Убрать' : 'Добавить'} 18+</span>
                                  </div>
                                  
                                  <img src={Krestik} width={25} alt='' style={{position: 'absolute', top: '215px', left: '215px', opacity: krest ? '1' : '0' }}/>
                                  <div className="menu-content-krest">
                                    <span onClick={onChangeKrest} style={{cursor: 'pointer'}}>{krest ? 'Убрать' : 'Добавить'}</span>
                                  </div>

                                  
{/* 2 */}
                                <div style={{marginLeft: '40px', marginTop: '70px', display: 'flex', flexDirection: 'column', width: '320px', position: 'relative'}}>
                                  {/* Город */}
                                  <label className='title-label' style={{position: 'absolute', top: '-25px', left: '140px'}}>Город</label>
                                  <div className="text-field" onMouseOver={()=>setShowClearCity(true)} onMouseOut={()=>setShowClearCity(false)} style={{position: 'relative'}}> 
                                      <Autocomplete
                                              sx={{
                                                  display: 'inline-block',
                                                  '& input': {zIndex: '25',
                                                      width: '100%',
                                                      border: 'none',
                                                      height: '40px',
                                                      padding: '5px 4px',
                                                      fontFamily: 'inherit',
                                                      fontSize: '14px',
                                                      fontWeight: '400',
                                                      lineHeight: '1.5',
                                                      textAlign: 'center',
                                                      color: '#ffffff',
                                                      backgroundColor: 'transparent', 
                                                  }
                                              }}
                                              className="text-field__input" 
                                              openOnFocus
                                              id="custom-input-demo"
                                              options={sortedCities}
                                              style={{width: '100%', padding: '0'}}
                                              isOptionEqualToValue={(option, value) => option.value === value.value}
                                              onInputChange={(e)=>setCity(e.target.value)}
                                              onChange={(event, newValue) => {
                                                if (newValue && newValue.length) {                                                      
                                                  setCity(newValue)
                                                }  
                                              }}
                                              value={city} 
                                              inputValue={city}
                                              renderInput={(params) => (
                                              <div ref={params.InputProps.ref} style={{position: 'relative'}}>
                                                  <input 
                                                      className="text-field__input" 
                                                      type="text" {...params.inputProps} 
                                                      placeholder=''
                                                  />
                                              </div>
                                              )}
                                      />
                                      <img src={Close} onClick={clearCity} width={15} alt='' style={{position: 'absolute', top: '13px', right: '15px', visibility: showClearCity ? 'visible' : 'hidden', cursor: 'pointer'}}></img>
                                  </div>

                                  <label className='title-label'>Компания</label>
                                  <div className="text-field"> 
                                    <DropdownClient
                                      style={{backgroundColor: '#131c21', width: '320px', left: '160px'}}
                                      options={companyData}
                                      tags={company}
                                      setTags={setCompany}
                                    />
                                  </div>
                          

                                  <label className='title-label'>Должность</label>
                                  <div className="text-field"> 
                                    <input className="text-field__input" type="text" name="dolgnost" id="dolgnost" value={dolgnost} onChange={(e) => setDolgnost(e.target.value)} style={{width: '320px'}}/>
                                  </div>

                                  <label className='title-label'>Сфера деятельности</label>
                                  <div className="text-field"> 
                                    <input className="text-field__input" type="text" name="sfera" id="sfera" value={sfera} onChange={(e) => setSfera(e.target.value)} style={{width: '320px'}}/>
                                  </div>

                                  {/* email */}
                                  <label className='title-label'>Почта</label>
                                  <div className="text-field">
                                    <input className="text-field__input" type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{width: '320px'}}/>
                                  </div> 
                                  
                                </div>
{/* 3 */}
                                <div style={{marginLeft: '40px', marginTop: '70px', display: 'flex', flexDirection: 'column', width: '320px'}}>
                                  <div className="uley-line" style={{left: '685px', top: '60px', width: '85px'}}></div>
                                  <div className="uley-line" style={{left: '850px', top: '60px', width: '85px'}}></div>
                                  <div style={{display: 'flex'}}>
                                    {/* проекты за месяц */}
                                    <CTooltip content="Проекты за месяц" placement="bottom">
                                      <div className="text-field" style={{marginRight: '8px'}}>
                                        <input className="text-field__input" type="text" name="reyting" id="reyting" value={'0'} style={{marginRight: '8px'}}/>
                                      </div>
                                    </CTooltip>
                                    
                                    {/* проекты всего */}
                                    <CTooltip content="Проекты всего" placement="bottom">
                                      <div className="text-field" style={{marginRight: '8px'}}>
                                        <input className="text-field__input" type="text" name="rank" id="rank" value={'0'}  style={{marginRight: '8px'}}/>
                                      </div>
                                    </CTooltip>
                                    
                                    {/* опоздания */}
                                    <CTooltip content="Отмененные проекты" placement="bottom">
                                      <div className="text-field" style={{marginRight: '8px'}}>
                                        <input className="text-field__input" type="text" name="rank" id="rank" value={'0'} style={{marginRight: '8px', color: 'red'}}/>
                                      </div>
                                    </CTooltip>
                                    
                                    {/* невыходы */}
                                    <CTooltip content="... проеты" placement="bottom">
                                      <div className="text-field" >
                                        <input className="text-field__input" type="text" name="rank" id="rank" value={'0'} style={{color: 'red'}}/>
                                      </div>
                                    </CTooltip>
                                    
                                  </div>

                                  <label className='title-label'>Комтег</label>
                                  <div className="text-field"> 
                                      {/* <MyDropdown3
                                        tags={comteg}
                                        setTags={setComteg}
                                        options={comtegs}
                                        onChange={changeSpec}
                                        style={{minHeight: '40px !important'}}
                                      /> */}
                                      <DropdownClient
                                        style={{backgroundColor: '#131c21', width: '320px', left: '160px', }}
                                        options={comtegs}
                                        tags={comteg}
                                        setTags={setComteg}
                                      />
                                  </div>

                                  <label className='title-label'>Комментарий</label>
                                  <div className="text-field" style={{marginBottom: '0px'}}>
                                    <textarea 
                                      className="text-field__input" 
                                      type="text" 
                                      name="comment" 
                                      id="comment" 
                                      value={comment} onChange={(e) => setComment(e.target.value)} 
                                      style={{resize: 'none', width: '320px', height: '209px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left'}}/>
                                  </div> 
                                </div>

{/* 4 */}
                                <div style={{marginLeft: '40px', marginTop: '46px', display: 'flex', flexDirection: 'column', width: '250px', position: 'relative'}}>

                                  {/* phone */}
                                  <label className='title-label'>Телефон</label>
                                  <div className="text-field" onMouseOver={()=>setShowSave(true)} onMouseOut={()=>setShowSave(false)}>
                                    <img 
                                      src={Disketa} 
                                      onClick={()=>{navigator.clipboard.writeText(phone)}} 
                                      alt="" 
                                      style={{visibility: showSave ? 'visible' : 'hidden', position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', width: '20px', height: '20px'}}
                                    />
                                    {/* <input className="text-field__input" type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={{width: '250px'}}/> */}
                                    <InputMask
                                        className="text-field__input" 
                                        style={{width: '250px'}}
                                        type="text" 
                                        name="phone" 
                                        id="phone"
                                        mask="+7 (999) 999-99-99"
                                        disabled={!blockProfile}
                                        maskChar=""
                                        onChange={(e) => setPhone(e.target.value)} 
                                        value={phone}
                                        placeholder=''
                                    >
                                    </InputMask>
                                    
                                  </div> 

                                  <label className='title-label'>Проекты</label>
                                  <div className="text-field" style={{marginBottom: '0px'}}>
                                    <ul className='spec-style' style={{width: '250px', height: '293px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left'}}>
                                    
                                    </ul>
                                  </div> 
                                </div>

                              </div>
                              }
                            </CCardBody>

                              <div style={{display: 'flex', justifyContent: 'center' }}>
                                <img src={arrowDown} alt='' onClick={()=>clickNext()} style={{display: !showProfile ? 'block' : 'none', width: '50px', marginBottom: '15px', cursor: 'pointer'}}></img>
                              </div> 
                          </CCard>
                        </CCol>
                    </CRow>

                    <CModal
                      alignment="center"
                      visible={showModal}
                      onClose={() => setShowModal(false)}
                      aria-labelledby="VerticallyCenteredExample"
                    >
                      <CModalBody style={{height: '100px', textAlign: 'center', fontSize: '18px', paddingTop: '35px'}}>
                        Данные успешно сохранены
                      </CModalBody>
                    </CModal>

                    <CModal
                      backdrop="static"
                      visible={visibleDelete}
                      onClose={() => setVisibleDelete(false)}
                      aria-labelledby="StaticBackdropExampleLabel"
                    >
                      <CModalHeader>
                        <CModalTitle id="StaticBackdropExampleLabel">Предупреждение</CModalTitle>
                      </CModalHeader>
                      <CModalBody>
                        Пользователь будет удален из базы!
                      </CModalBody>
                      <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisibleDelete(false)}>
                          Отмена
                        </CButton>
                        <CButton color="primary" onClick={()=>deleteProfile(id)}>Удалить</CButton>
                      </CModalFooter>
                    </CModal>
                  </Suspense>
            </CContainer>
        </div>
        <AppFooter />
      </div>
      {/* <AppRightbar /> */}
    </div>
  )
}

export default Client
