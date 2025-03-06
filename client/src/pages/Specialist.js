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

import { getSpecialist, getSpecCount, editSpecialist, addSpecialist, deleteSpecialist } from './../http/specAPI'
import { getWContacts } from './../http/workerAPI'
import { uploadAvatar, uploadFile } from '../http/chatAPI';

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

import MyDropdown from 'src/components/Dropdown/Dropdown';
import MyDropdown2 from 'src/components/Dropdown2/Dropdown2';
import DropdownClient from 'src/components/DropdownClient/DropdownClient';

import specData from 'src/data/specData';
import specOnlyData from 'src/data/specOnlyData';
import comtegs from 'src/data/comtegs';
import skills from 'src/data/skills';
import merchData from 'src/data/merchData';
import companys from 'src/data/companys';
import cities from 'src/data/cities';
import comtegsWorker from 'src/data/comtegsWorker';

//Workers.js
const Specialist = () => {
  const location = useLocation()
  const workerId= location.state?.workerId
  //console.log("workerId: ", workerId)

  const { userId, specialist, setSpecialist, specialistAll, 
    setSpecialistAll, specialistsCount, setSpecialistsCount, addNewSpecialist } = useUsersContext();

  const [specialistCount, setSpecialistCount] = useState([]);
  const [filterAll, setFilterAll] = useState([]);

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

  const [starActive1, setStarActive1] = useState(true)
  const [starActive2, setStarActive2] = useState(true)
  const [starActive3, setStarActive3] = useState(true)
  const [starActive4, setStarActive4] = useState(false)
  const [starActive5, setStarActive5] = useState(false)

  const [id, setId] = useState('');
  const [fio, setFio] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [age2, setAge2] = useState(0);
  const [speclist, setSpeclist] = useState('');
  const [phone, setPhone] = useState('');
  const [phone2, setPhone2] = useState('');
  const [telegram, setTelegram] = useState('');
  const [skill, setSkill] = useState('');
  const [reyting, setReyting] = useState('');
  const [rank, setRank] = useState('');
  const [company, setCompany] = useState('');
  const [comteg, setComteg] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [passport, setPassport] = useState('');
  const [passportScan, setPassportScan] = useState('');
  const [nik, setNik] = useState('');
  const [dateReg, setDateReg] = useState('');
  const [profile, setProfile] = useState('');

  const [countPress, setCountPress] = useState(0);
  const [countPressTG, setCountPressTG] = useState(0);
  const [countPressCity, setCountPressCity] = useState(0);
  const [countPressCategory, setCountPressCategory] = useState(0);

  const [blockProfile, setBlockProfile] = useState(true)
  const [showBlacklist, setShowBlacklist] = useState(false)
  const [showMenu1, setShowMenu1] = useState(false)
  const [showMenu2, setShowMenu2] = useState(false)
  const [showClearCity, setShowClearCity] = useState(false)

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
	// 	const filteredData = specialistAll.filter(user=> (user.fio + user.chatId + user.phone + user.speclist)?.replace(/[её]/g, '(е|ё)').toLowerCase().includes(text.replace(/[её]/g, '(е|ё)').toLowerCase()));
  //   setSpecialist(text === '' ? specialistCount : filteredData); 

  //   setSpecialistsCount(text === '' ? specialistAll.length : filteredData.length)
  //   //console.log("specialist", specialist)
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
      const res = specialistAll.find((item)=>item.id === workerId)
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


    const fetchData = async() => {
      // 2 специалисты 20 чел.
      let workers = await getSpecCount(userId, 20, specialist.length)
      console.log("specialist: ", workers)

      let arrWorkers = []

      workers && workers.map(async (worker, i) => {
        const d = new Date(worker.createdAt).getTime() //+ 10800000 //Текущая дата:  + 3 часа)
        const d2 = new Date(d)
        const month = String(d2.getMonth()+1).padStart(2, "0");
        const day = String(d2.getDate()).padStart(2, "0");
        const chas = d2.getHours();
        const min = String(d2.getMinutes()).padStart(2, "0");
        const newDate = `${day}.${month} ${chas}:${min}`;

        // let str_spec = ''
        // worker.specialization && JSON.parse(worker.specialization).map((item, index)=> {
        //   str_spec = str_spec + item.spec + (index+1 !== JSON.parse(worker.specialization).length ? ', ' : '')
        // })

        // let str_skill = ''
        // worker.skill && JSON.parse(worker.skill).map((item, index)=> {
        //   str_skill = str_skill + item.name + (index+1 !== JSON.parse(worker.skill).length ? ', ' : '')
        // })


        // let str_komteg = ''
        // worker.comteg && JSON.parse(worker.comteg).map((item, index)=> {
        //   str_komteg = str_komteg + item.name + (index+1 !== JSON.parse(worker.comteg).length ? ', ' : '')
        // })


        // let str_company = ''
        // worker.company && JSON.parse(worker.company).map((item, index)=> {
        //   str_company = str_company + item.name + (index+1 !== JSON.parse(worker.company).length ? ', ' : '')
        // })

        let str_comment = ''
        worker.comment && JSON.parse(worker.comment).map((item, index)=> {
          str_comment = str_comment + item.content + (index+1 !== JSON.parse(worker.comment).length ? ', ' : '')
        })


        const newWorker = {
          id: worker.id,
          fio: worker.fio,
          chatId: worker.chatId, 
          phone: worker.phone, 
          speclist: worker.specialization,
          city: worker.city, 
          skill: worker.skill,
          rank: worker.rank, 
          //company: str_company, 
          comteg: worker.comteg, 
          comment: str_comment, 
          age: worker.age, 
          reyting: worker.reyting, 
          passport: worker.passport, 
          profile: worker.profile, 
          passportScan: worker.passportScan, 
          email: worker.email, 
          nik: worker.nik,
          //blockW: worker.blockW,
          block18: worker.block18,
          krest: worker.krest,
          createdAt: worker.createdAt,
        }
        arrWorkers.push(newWorker)

        //если элемент массива последний
				if (i === workers.length-1) {
          const sortedWorker = [...arrWorkers].sort((a, b) => {       
            var idA = a.id, idB = b.id 
            return idB-idA  //сортировка по возрастанию 
          })

					setSpecialistCount(sortedWorker)
          setSpecialist(sortedWorker)
					
					//сохранить кэш
					//localStorage.setItem("specialist", JSON.stringify(sortedWorker));
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
    const res = await addSpecialist(data)
    console.log("res: ", res)

    // if (res) {
    //   await addNewSpecialist(res?.id, res?.fio, res?.profile)
    // }

    const newObj = {
      id: res?.id, 
      fio: res?.fio, 
      speclist: '',
      skill: '',
      comteg: '', 
      comment: '', 
  }

    specialist.push(newObj)
    //specialistAll.push(newObj)

    const sortedUser = [...specialist].sort((a, b) => {       
      var idA = a.id, idB = b.id 
      return idB-idA  //сортировка по возрастанию 
    })

    setSpecialist(sortedUser)
    //setSpecialistAll(specialistAll)
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
    setAge2(worker.age ? parseInt(currentYear) - parseInt(worker.age ? worker.age.split('-')[0] : 0) : '')
    setSpeclist(worker.speclist ? worker.speclist : '')
    //setShowBlacklist(worker.speclist.includes('Blacklist'))
    setPhone(worker.phone)
    setTelegram(worker.chatId)
    setSkill(worker.skill ? worker.skill : '')
    setReyting(worker.reyting === null ? '' : worker.reyting)
    setRank(worker.rank === null ? '' : worker.rank)
    //setCompany(worker.company ? worker.company.split(',') : [])
    setComteg(worker.comteg ? worker.comteg : '')
    setEmail(worker.email)
    setComment(worker.comment)
    setProfile(worker.profile)
    setPassport(worker.passport)
    setPassportScan(worker.passportScan)

    setNik(worker.nik)
    
    //if (userbots) {
      //setNik(userbots.find((user) => user.chatId?.toString() === worker.chatId?.toString())?.username)
      //setDateReg(userbots.find((user) => user.chatId?.toString() === worker.chatId?.toString())?.createdAt)
      //setDateReg(worker.createdAt)
    //}

    setDateReg(worker.createdAt)

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
		let response = await getSpecCount(20, specialist.length);
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
          speclist:  worker.speclist,
          city: worker.city, 
          skill:  worker.skill,
          rank: worker.rank, 
          //company: str_company, 
          comteg:  worker.komteg, 
          comment: str_comment, 
          age: worker.age, 
          reyting: worker.reyting,  
          passport: worker.passport, 
          profile: worker.profile, 
          passportScan: worker.passportScan, 
          email: worker.email, 
          //blockW: worker.blockW,
          block18: worker.block18,
          krest: worker.krest,
          createdAt: worker.createdAt,
          nik: worker.nik,
        }
		
				arrayWorker.push(newWorker)
			})    

      //console.log("Всего сейчас: ", arrayWorker.length)
			
      const sortedWorker = [...arrayWorker].sort((a, b) => {       
        var idA = a.id, idB = b.id 
        return idB-idA  //сортировка по возрастанию 
      })
      setSpecialist(sortedWorker)
      setSpecialistCount(sortedWorker)
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

    let specArr = []
    let strSpec = ''

    // speclist.map((item, index) => {
    //   specData.map((category)=> {
    //       category.models.map((work)=> {
    //           if (work.name === item){
    //               const obj = {
    //                   spec: item,
    //                   cat: category.icon,
    //               }
    //               strSpec = strSpec + item + (index+1 !== speclist.length ? ', ' : '')
    //               specArr.push(obj)
    //           }
    //       })
    //   })
    //   if (item === 'Blacklist') {
    //     const obj = {
    //         spec: item,
    //         cat: 'Blacklist',
    //     }
    //     strSpec = strSpec + item + (index+1 !== speclist.length ? ', ' : '')
    //     specArr.push(obj) 
    //   }
    // })


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
      chatId: telegram !== '' ? telegram : null,
      city: city,
      age: age ? age+'-01-01' : '', 
      speclist,
      //company: JSON.stringify(companyArr),
      skill,
      comteg,
      comment: JSON.stringify(commentArr),
      profile,
      reyting,
      email,
      passport,
      passportScan,
      //blockW,
      block18,
      krest,
      nik
    }
    console.log(saveData)

    setSpecialist((specialist) => {	

			let userIndex = specialist.findIndex((spec) => spec.id === id);
			const usersCopy = JSON.parse(JSON.stringify(specialist));

      const userObject = usersCopy[userIndex];
			usersCopy[userIndex] = { ...userObject, 
        fio, 
        phone, 
        city: city, 
        age: age ? age+'-01-01' : '', 
        speclist,
        //company: strCompany,
        skill,
        comteg,
        comment: strComment,
        chatId: telegram !== '' ? telegram : null,
        profile,
        reyting,
        email,
        passport,
        passportScan,
        //blockW,
        block18,
        krest,
        nik,
      };

      console.log("update user: ", usersCopy[userIndex])

			return usersCopy;
    });

    //сохранить изменения в базе
    await editSpecialist(saveData, id)

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
    console.log("speclist: ", speclist)
    

  }, [speclist]);


  const handleTg = event => {
    const result = event.target.value.replace(/\D/g, '');
    setTelegram(result);
  };


  const changeSpec = (e) => {
    console.log(e.target.innerText)
    setSpeclist([...specialist, e.target.innerText])
    setShowSpec(false)
  }

  const onChangeReyting = () => {
    setShowBlacklist(false)
    setShowMenu2(false)

    //убрать из списка специальностей Blacklist
    
  }

  const onChangeBlacklist = () => {
    setShowBlacklist(true)
    setShowMenu1(false)

    //добавить в список специальностей Blacklist

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

    await deleteSpecialist(id)
    addToast(deleteToast) //ваши данные сохранены

    setSpecialist([...specialist].filter(item=>item.id !== id))

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
        const sortedWorker = [...specialist].sort((a, b) => {       
          var fioA = a.fio.toUpperCase(), fioB = b.fio.toUpperCase(); 
          return (fioA < fioB) ? -1 : (fioA > fioB) ? 1 : 0;  //сортировка по возрастанию 
        })
        setSpecialist(sortedWorker)
      } else if (countPress + 1 === 2) {
        const sortedWorker = [...specialist].sort((a, b) => {       
          var fioA = a.fio.toUpperCase(), fioB = b.fio.toUpperCase(); 
          return (fioA > fioB) ? -1 : (fioA < fioB) ? 1 : 0;  //сортировка по возрастанию 
        })
        setSpecialist(sortedWorker)
      } else {
        const sortedWorker = [...specialist].sort((a, b) => {       
          var fioA = a.id, fioB = b.id 
          return fioB-fioA  //сортировка по убыванию 
        })
        setSpecialist(sortedWorker)
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
        const sortedWorker = [...specialist].sort((a, b) => {       
          var tgA = a.telegram, tgB = b.telegram 
          return (tgA < tgB) ? -1 : (tgA > tgB) ? 1 : 0;  //сортировка по возрастанию 
        })
        setSpecialist(sortedWorker)
      } else if (countPressTG + 1 === 2) {
        const sortedWorker = [...specialist].sort((a, b) => {       
          var tgA = a.telegram, tgB = b.telegram 
          return (tgA > tgB) ? -1 : (tgA < tgB) ? 1 : 0;  //сортировка по возрастанию 
        })
        setSpecialist(sortedWorker)
      } else {
        const sortedWorker = [...specialist].sort((a, b) => {       
          var fioA = a.id, fioB = b.id 
          return fioB-fioA  //сортировка по убыванию 
        })
  
        //setSpecialistCount(sortedWorker)
        setSpecialist(sortedWorker)
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
        const sortedWorker = [...specialist].sort((a, b) => {       
          var cityA = a.city, cityB = b.city
          return (cityA < cityB) ? -1 : (cityA > cityB) ? 1 : 0;  //сортировка по возрастанию 
        })
        setSpecialist(sortedWorker)
      } else if (countPressCity + 1 === 2) {
        const sortedWorker = [...specialist].sort((a, b) => {       
          var cityA = a.city, cityB = b.city
          return (cityA > cityB) ? -1 : (cityA < cityB) ? 1 : 0;  //сортировка по возрастанию 
        })
        setSpecialist(sortedWorker)
      } else {
        const sortedWorker = [...specialist].sort((a, b) => {       
          var idA = a.id, idB = b.id 
          return idB-idA  //сортировка по убыванию 
        })
  
        //setSpecialistCount(sortedWorker)
        setSpecialist(sortedWorker)
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
        const sortedWorker = [...specialist].sort((a, b) => {       
          var cityA = a.city, cityB = b.city
          return (cityA < cityB) ? -1 : (cityA > cityB) ? 1 : 0;  //сортировка по возрастанию 
        })
        setSpecialist(sortedWorker)
      } else if (countPressCategory + 1 === 2) {
        const sortedWorker = [...specialist].sort((a, b) => {       
          var cityA = a.city, cityB = b.city
          return (cityA > cityB) ? -1 : (cityA < cityB) ? 1 : 0;  //сортировка по возрастанию 
        })
        setSpecialist(sortedWorker)
      } else {
        const sortedWorker = [...specialist].sort((a, b) => {       
          var idA = a.id, idB = b.id 
          return idB-idA  //сортировка по убыванию 
        })
  
        //setSpecialistCount(sortedWorker)
        setSpecialist(sortedWorker)
      }
      
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
                              Всего: {specialistsCount}
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
                                        <CTableHeaderCell className='my-th widthTg'>Никнейм</CTableHeaderCell> 
                                        <CTableHeaderCell className='my-th widthPhone'>Телефон</CTableHeaderCell> 
                                        <CTableHeaderCell className='my-th widthSpace'>Специальность</CTableHeaderCell> 
                                        <CTableHeaderCell className='my-th widthSpace' onClick={onSortCity}>Город</CTableHeaderCell>   
                                        <CTableHeaderCell className='my-th widthSpace'>Год</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Проекты</CTableHeaderCell>                     
                                        <CTableHeaderCell className='my-th widthSpace'>Навык</CTableHeaderCell>                                     
                                        <CTableHeaderCell className='my-th widthSpace'>Прокатная компания</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Комтег</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Комментарии</CTableHeaderCell>                                       
                                        <CTableHeaderCell className='my-th widthSpace'>Рейтинг</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Паспорт</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Профиль</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Паспорт [скан]</CTableHeaderCell>
                                        <CTableHeaderCell className='my-th widthSpace'>Почта</CTableHeaderCell>
                                      </CTableRow>
                                    </CTableHead>
                                    <CTableBody >                                  
                                    {specialist.map((item, index) => (
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
                                          <CTableDataCell className="text-center widthSpace">
                                            {item.nik}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center">
                                            {item.phone}
                                          </CTableDataCell>
                                          <CTableDataCell className="widthSpace" style={{textAlign: 'left'}}>
                                          {item.speclist ? (item.speclist.length > 30 ? item.speclist.substr(0, 30) + '...' : item.speclist) : ''}
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
                                          {item.skill}
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
                                          <CTableDataCell className="widthSpace" style={{textAlign: 'left'}}>
                                          {item.passport ? (item.passport.length > 30 ? item.passport.substr(0, 30) + '...' : item.passport) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="widthSpace" style={{textAlign: 'left'}}>
                                          {item.profile ? (item.profile.length > 30 ? item.profile.substr(0, 30) + '...' : item.profile) : ''}
                                          </CTableDataCell>
                                          <CTableDataCell className="text-center widthSpace">
                                          {item.passportScan}
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
                              <div style={{position: 'relative', height: '531px', display: 'flex', flexDirection: 'row'}}>
                                  {/* ФИО */}
                                  <div style={{position: 'absolute', top: '5px', left: '286px', color: '#fff', zIndex: '100', display: 'flex', justifyContent: 'space-between'}}>   
                                    <div className="text-field">
                                      <input type="text" name="fio" id="fio" value={fio} onChange={(e)=>setFio(e.target.value)} style={{fontSize: '33px', position: 'absolute', top: '-17px', backgroundColor: 'transparent', border: '0', color: '#f3f3f3', width: '600px'}}></input>
                                    </div>
                                    
                                  </div>
                                  
                                  {/* Кнопки */}
                                  <div style={{display: 'flex', position: 'absolute', right: '0'}}>
                                      <CTooltip content="Удалить клиента" placement="bottom">
                                        {/* <Icon id="delete" onClick={()=>clickDelete(id)} style={{cursor: 'pointer'}}/> */}
                                        <img src={DeleteIcon} onClick={()=>clickDelete(id)} style={{ cursor: 'pointer', width: '26px', height: '26px', marginLeft: '20px'}}/>  
                                      </CTooltip>
                                      <img src={Trubka} onClick={()=>setShowProfile(false)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={Tg} onClick={()=>setShowProfile(false)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={blockProfile ? zamok : zamok2} onClick={blockedProfile} style={{cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={Disketa} onClick={()=>saveProfile(id)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={Close} onClick={closeProfile} style={{display: showClose ? 'block' : 'block', cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>  
                                  </div>
        {/* 1 */}                           
                                <div style={{width: '250px'}} onMouseOver={()=>setShowUpload(true)} onMouseOut={()=>setShowUpload(false)}>
                                  {filePreview ? 
                                  <img src={filePreview} alt='' style={{borderRadius: '15px', objectFit: 'cover'}} width={250} height={250}/>
                                  :
                                  (
                                    profile ? 
                                  <img src={profile} width='250px' height='250px' alt='poster' style={{borderRadius: '7px', marginBottom: '5px'}}/>
                                  : 
                                  <svg className="rounded me-2" width="250" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" style={{float:'left', margin: '4px 10px 2px 0px'}}>
                                    <rect width="250px" height="250px" fill="#007aff" rx="40"></rect> 
                                  </svg>
                                  )
                                  }
                                  <div className="file-upload" style={{marginBottom: '8px'}}>
                                    <img src={addAvatar} alt="upload" style={{display: showUpload ? 'block' : 'none', position: 'absolute', top: '100px', left: '100px', cursor: 'pointer', width: '50px', height: '50px'}}/>
                                    <input 
                                      type="file"
                                      id="formFile" 
                                      accept="image/*,image/jpeg" 
                                      name="photo"
                                      onChange={(e) => onFileChange(e)}
                                      style={{position: 'absolute', top: '130px', left: '10px', opacity: '0', zIndex: '100', width: '230px'}}
                                    />
                                  </div>

                                  <div className="menu-reyting">
                                      <div style={{width: '250px', display: 'flex', justifyContent: 'center'}}>
                                        {showBlacklist ?
                                        <span onClick={()=>setShowMenu2(true)} style={{cursor: 'pointer', color: 'red', fontSize: '24px', fontWeight: '700', marginBottom: '3px'}}>Blacklist</span>
                                        :<div className="star-block" style={{cursor: 'pointer', marginBottom: '8px'}} onClick={()=>setShowMenu1(true)}>
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
                                      <input disabled={true} className="text-field__input" type="text" name="dateReg" id="dateReg" value={id} style={{width: '250px'}}/>
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

                                  {/* ник */}
                                  <label className='title-label'>Никнейм</label>
                                  <div className="text-field" onMouseOver={()=>setShowSave3(true)} onMouseOut={()=>setShowSave3(false)}>
                                    {/* <img 
                                      src={Disketa} 
                                      onClick={()=>{navigator.clipboard.writeText(nik)}} 
                                      alt="" 
                                      style={{visibility: showSave3 ? 'visible' : 'hidden', position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', width: '20px', height: '20px'}}
                                    /> */}
                                    <input className="text-field__input" type="text" name="nik" id="nik" value={nik} onChange={(e) => setNik(e.target.value.replace(/[А-Яа-я]/g, ''))} style={{width: '250px'}}/>
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
                                <div className='widthBlock2' style={{marginLeft: '40px', marginTop: '70px', display: 'flex', flexDirection: 'column', position: 'relative'}}>
                                  {/* Город */}
                                  <label className='title-label' style={{position: 'absolute', top: '-25px', left: '140px'}}>Город</label>
                                  <div className="text-field" onMouseOver={()=>setShowClearCity(true)} onMouseOut={()=>setShowClearCity(false)} style={{position: 'relative'}}> 
                                      {/* <MyDropdown
                                        style={{backgroundColor: '#131c21'}}
                                        options={cities}
                                        selected={city}
                                        setSelected={setCity}
                                        // onChange={addCity}
                                      /> */}
                                      {/* <CFormSelect 
                                        aria-label="Default select example"
                                        style={{backgroundColor: '#131c21'}}
                                        options={sortedCities}
                                        value={cityValue}
                                        onChange={(e)=>addCity(e)}
                                      /> */}
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

                                  <label className='title-label'>Специальность</label>
                                  <div className="text-field"> 
                                      {/* <MyDropdown2
                                        tags={speclist.filter(item=>item !== 'Blacklist')}
                                        setTags={setSpeclist}
                                        options={specOnlyData}
                                        onChange={changeSpec}
                                      /> */}
                                      <DropdownClient
                                        style={{backgroundColor: '#131c21', left: '160px'}}
                                        options={specOnlyData}
                                        tags={speclist}
                                        setTags={setSpeclist}
                                      />
                                  </div>
                                  
                                  <label className='title-label'>Навык</label>
                                  <div className="text-field"> 
                                      {/* <MyDropdown2
                                        tags={skill}
                                        setTags={setSkill}
                                        options={skills}
                                        onChange={changeSpec}
                                      /> */}
                                      <DropdownClient
                                        style={{backgroundColor: '#131c21', left: '160px'}}
                                        options={skills}
                                        tags={skill}
                                        setTags={setSkill}
                                      />
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
                                        style={{backgroundColor: '#131c21', left: '160px'}}
                                        options={comtegsWorker}
                                        tags={comteg}
                                        setTags={setComteg}
                                      />
                                  </div>

                                  <label className='title-label'>Комментарии</label>
                                  <div className="text-field" style={{marginBottom: '0px'}}>
                                    <textarea 
                                      className="text-field__input" 
                                      type="text" 
                                      name="comment" 
                                      id="comment" value={comment} onChange={(e) => setComment(e.target.value)} 
                                      style={{resize: 'none', height: '125px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left'}}
                                    />
                                  </div> 

                                  
                                  
                                </div>
{/* 3 */}
                                <div className='widthBlock2' style={{marginLeft: '40px', marginTop: '70px', display: 'flex', flexDirection: 'column'}}>
                                  <div className="uley-line" style={{left: '670px', top: '60px', width: '70px'}}></div>
                                  <div className="uley-line" style={{left: '805px', top: '60px', width: '50px'}}></div>
                                  <div className="uley-line" style={{left: '900px', top: '60px', width: '50px'}}></div>
                                  <div style={{display: 'flex'}}>
                                    {/* возраст */}
                                    <CTooltip content="Возраст" placement="bottom">
                                      <div className="text-field">
                                        <input disabled className="text-field__input" type="text" name="age2" id="age2" value={age2}  onChange={(e) => setAge2(e.target.value)} style={{width: '40px', marginRight: '8px'}}/>  
                                      </div>
                                    </CTooltip>
                                    {/* год рождения */}
                                    <CTooltip content="Год рождения" placement="bottom">
                                      <div className="text-field">
                                        <input className="text-field__input" type="text" name="age" id="age" value={age} onChange={(e) => setAge(e.target.value)} style={{width: '80px', marginRight: '8px'}}/>
                                      </div>
                                    </CTooltip>
                                    
                                    {/* проекты за месяц */}
                                    <CTooltip content="Проекты за месяц" placement="bottom">
                                      <div className="text-field">
                                        <input disabled className="text-field__input" type="text" name="reyting" id="reyting" value={reyting} onChange={(e) => setReyting(e.target.value)} style={{width: '40px', marginRight: '8px'}}/>
                                      </div>
                                    </CTooltip>
                                    
                                    {/* проекты всего */}
                                    <CTooltip content="Проекты всего" placement="bottom">
                                      <div className="text-field">
                                        <input disabled className="text-field__input" type="text" name="rank" id="rank" value={rank} onChange={(e) => setRank(e.target.value)} style={{width: '40px', marginRight: '8px'}}/>
                                      </div> 
                                    </CTooltip>
                                    
                                    {/* опоздания */}
                                    <CTooltip content="Опоздания" placement="bottom">
                                      <div className="text-field">
                                        <input disabled className="text-field__input" type="text" name="rank" id="rank" value={rank} onChange={(e) => setRank(e.target.value)} style={{width: '40px', marginRight: '8px', color: 'red'}}/>
                                      </div>
                                    </CTooltip>
                                    
                                    {/* невыходы */}
                                    <CTooltip content="Невыходы" placement="bottom">
                                      <div className="text-field">
                                        <input disabled className="text-field__input" type="text" name="rank" id="rank" value={rank} onChange={(e) => setRank(e.target.value)} style={{width: '40px', color: 'red'}}/>
                                      </div>
                                    </CTooltip>
                                    
                                  </div>

                                  {/* скан паспорта */}
                                  <label className='title-label'>Скан паспорта</label>
                                  <div className="text-field">
                                    <input className="text-field__input" type="text" name="passportScan" id="passportScan" value={passportScan} onChange={(e) => setPassportScan(e.target.value)} style={{overflow: 'hidden', textOverflow: 'ellipsis'}}/>
                                  </div> 
                                  
                                  <div style={{position:'relative'}}>
                                    <label className='title-label'>Паспорт</label>
                                    <div className="text-field" style={{marginBottom: '0px'}}>
                                      <textarea 
                                        className="text-field__input" 
                                        type="text" 
                                        name="passport" 
                                        id="passport" 
                                        value={passport} 
                                        onChange={(e) => setPassport(e.target.value)} 
                                        style={{resize: 'none', height: '295px', whiteSpace: 'pre-line', textAlign: 'left', borderRadius:'6px'}}/>
                                    </div> 
                                    {/* <img src={Disketa} onClick={()=>{navigator.clipboard.writeText(passport)}} alt="" style={{position: 'absolute', top: '40px', left: '205px', cursor: 'pointer', width: '25px', height: '25px'}}/> */}
                                  </div>

                                </div>

{/* 4 */}
                                <div className='widthBlock4' style={{marginLeft: '40px', marginTop: '70px', display: 'flex', flexDirection: 'column', position: 'relative'}}>

                                  {/* phone */}
                                  <label className='title-label' style={{position: 'absolute', top: '-25px', left: '90px'}}>Телефон</label>
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
                                        style={{width: '100%'}}
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
                            

                                  {/* email */}
                                  <label className='title-label'>Почта</label>
                                  <div className="text-field">
                                    <input className="text-field__input" type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                  </div> 


                                  <label className='title-label'>Проекты</label>
                                  <div className="text-field" style={{marginBottom: '0px'}}>
                                    <ul className='spec-style' style={{width: '100%', height: '296px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left'}}>
                                    
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

export default Specialist
