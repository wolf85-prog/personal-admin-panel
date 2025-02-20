import React, { Suspense, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppSidebar, AppFooter, AppHeader } from '../components/index'
import InputMask from 'react-input-mask';
import Autocomplete from '@mui/material/Autocomplete';
import { 
  CContainer, 
  CSpinner, 
  CCol,
  CRow,
  CButton, 
  CFormInput,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCard,
  CCardBody,
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
  CTooltip,

} from '@coreui/react'
//import Icon from "../chat-app-worker/components/Icon";
import { useUsersContext } from "../chat-app-new/context/usersContext";

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

import MyDropdown from 'src/components/Dropdown/Dropdown';
import MyDropdown2 from 'src/components/Dropdown2/Dropdown2';
import DropdownClient from 'src/components/DropdownClient/DropdownClient';

import comtegs from 'src/data/comtegs';
import companys from 'src/data/companys';
import cities from 'src/data/cities';
import dolgnostData from 'src/data/dolgnostData';
import sferaData from 'src/data/sfera';
import companyData from 'src/data/companyData';

import { getCompany, getCompanyCount, editCompany, addCompany, deleteCompany, uploadAvatar, getCompanyProfId, addCompanyProf, editCompanyProf } from '../http/companyAPI'
import { getManager, editManager, getManagerId } from 'src/http/managerAPI';
import { CollectionsOutlined } from '@mui/icons-material';

//Workers.js
const ProfileCompany = () => {
  const navigate = useNavigate()
  const { userId, companys, setCompanys, companysAll, companysCount, setCompanysCount, managersAll, setManagersAll, role } = useUsersContext();
  const [sortedCities, setSortedCities] = useState([])
  const [companyCount, setCompanyCount] = useState([]); 

  const [loading, setLoading]= useState(true);
  const [text, setText]= useState("");
  const [showProfile, setShowProfile] = useState(false)
  const [showClose, setShowClose] = useState(false)
  const [showUpload, setShowUpload] = useState(false)
  const [showSearch, setShowSearch] = useState(true)
  const [showClear, setShowClear] = useState(false)
  const [block, setBlock] = useState(false)
  const [showMenuKrest, setShowMenuKrest] = useState(false)
  const [showKrest, setShowKrest] = useState(false)

  
  const [showSavePhone, setShowSavePhone] = useState(false)
  const [showSaveFio, setShowSaveFio] = useState(false)
  const [showSave3, setShowSave3] = useState(false)
  const [showSaveOffice, setShowSaveOffice] = useState(false)
  const [showSaveSklad, setShowSaveSklad] = useState(false)

  const [id, setId] = useState('');
  const [title, setTitle] = useState('Название компании');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('+7 (999) 999-99-99');
  const [managers, setManagers] = useState([]);
  const [managersObj, setManagersObj] = useState([]);
  const [managersData, setManagersData] = useState([])
  const [managerName, setManagerName] = useState('')
  const [office, setOffice] = useState('');
  const [sklad, setSklad] = useState('');

  const [bugalterFio, setBugalterFio] = useState('')
  const [bugalterEmail, setBugalterEmail] = useState('')
  const [bugalterPhone, setBugalterPhone] = useState('')

  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [comteg, setComteg] = useState('');
  const [sfera, setSfera] = useState('');
  const [dogovorDate, setDogovorDate] = useState('');
  const [dogovorNumber, setDogovorNumber] = useState('');
  const [dateReg, setDateReg] = useState('');
  const [profile, setProfile] = useState('');
  const [projects, setProjects] = useState('');

  const [direktor, setDirektor] = useState('');
  const [inn, setInn] = useState('');
  const [raschet, setRaschet] = useState('');
  const [corschet, setCorschet] = useState('');
  const [bik, setBik] = useState('');
  const [okpo, setOkpo] = useState('');
  const [ogrn, setOgrn] = useState('');
  const [bank, setBank] = useState('');
  const [phoneK, setPhoneK] = useState('');
  const [emailK, setEmailK] = useState('');
  const [urAddress, setUrAddress] = useState('');

  const [innEr, setInnEr] = useState(false);
  const [raschetEr, setRaschetEr] = useState(false);
  const [corschetEr, setCorschetEr] = useState(false);
  const [bikEr, setBikEr] = useState(false);
  const [okpoEr, setOkpoEr] = useState(false);
  const [ogrnEr, setOgrnEr] = useState(false);
  const [bankEr, setBankEr] = useState(false);
  const [phoneKEr, setPhoneKEr] = useState(false);
  const [emailKEr, setEmailKEr] = useState(false);
  const [urAddressEr, setUrAddressEr] = useState(false);

  const [inn1, setInn1] = useState('');
  const [raschet1, setRaschet1] = useState('');
  const [corschet1, setCorschet1] = useState('');
  const [bik1, setBik1] = useState('');
  const [ogrn1, setOgrn1] = useState('');
  const [bank1, setBank1] = useState('');
  const [phoneK1, setPhoneK1] = useState('');
  const [emailK1, setEmailK1] = useState('');
  const [urAddress1, setUrAddress1] = useState('');

  const [inn2, setInn2] = useState('');
  const [raschet2, setRaschet2] = useState('');
  const [corschet2, setCorschet2] = useState('');
  const [bik2, setBik2] = useState('');
  const [ogrn2, setOgrn2] = useState('');
  const [bank2, setBank2] = useState('');
  const [phoneK2, setPhoneK2] = useState('');
  const [emailK2, setEmailK2] = useState('');
  const [urAddress2, setUrAddress2] = useState('');

  const [inn3, setInn3] = useState('');
  const [raschet3, setRaschet3] = useState('');
  const [corschet3, setCorschet3] = useState('');
  const [bik3, setBik3] = useState('');
  const [ogrn3, setOgrn3] = useState('');
  const [bank3, setBank3] = useState('');
  const [phoneK3, setPhoneK3] = useState('');
  const [emailK3, setEmailK3] = useState('');
  const [urAddress3, setUrAddress3] = useState('');

  const [contragents, setContragents] = useState([])
  const [contragent1, setContragent1] = useState('Тест')
  const [contragent2, setContragent2] = useState('Тест2')
  const [contragent3, setContragent3] = useState('Тест3')
  const [contragent4, setContragent4] = useState('Тест4')

  const [showContr4, setShowContr4] = useState(false)
  const [showEditContr, setShowEditContr] = useState(false)


  const [selectContr, setSelectContr] = useState(0);

  const [selectRekviz, setSelectRekviz] = useState(false);
  const [selectManager, setSelectManager] = useState(false);

  const [man, setMan] = useState([])
  const [manData, setManData] = useState([])
  const [man3, setMan3] = useState('')

  const [rekviziti, setRekviziti] = useState('');
  const [objRekviz, setObjRekviz] = useState([]);

  const [countPress, setCountPress] = useState(0);
  const [countPressTG, setCountPressTG] = useState(0);
  const [countPressCity, setCountPressCity] = useState(0);

  const [blockProfile, setBlockProfile] = useState(true)
  const [showBlacklist, setShowBlacklist] = useState(false)
  const [showMenu1, setShowMenu1] = useState(false)
  const [showMenu2, setShowMenu2] = useState(false)
  const [showManagers, setShowManagers] = useState(false)
  const [showClearCity, setShowClearCity] = useState(false)
  const [showRekviz, setShowRekviz] = useState(false)
  const [showSave, setShowSave] = useState(true)

  const [showModal, setShowModal] = useState(false)

  const [visibleDelete, setVisibleDelete] = useState(false)

  const [file, setFile] = useState(0);
  const [filePreview, setFilePreview] = useState();
  const [image, setImage]= useState("");

  const host = process.env.REACT_APP_HOST

  const [toast, addToast] = useState(0)
  const toaster = useRef()

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



  //-----------------------------------------------------------------------------------------
  //			get managers
  //-----------------------------------------------------------------------------------------
  useEffect(()=> {
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
 
      const managerBD = await getManager()
      console.log("managerBD: ", managerBD)

      const result = await getCompanyProfId(userId)
      console.log("Company: ", result, userId)

      let arr = []
      const massManager = result?.managers.split(', ')
      massManager.map((item)=> {
        const res = managerBD.find(item2=> item2.email === item && item)
        console.log("res: ", res)
        if (res) {
          const obj = {
            fio: res.fio,
            dolgnost: res.dolgnost,
            phone: res.phone,
          }
          arr.push(obj)
        }
        
      })
      setManData(arr)

      const objRekviz = result.rekviziti ? JSON.parse(result.rekviziti) : ''
      setObjRekviz(objRekviz)
      console.log("objRekviz: ", objRekviz)


      const objContragent = result.contragent ? JSON.parse(result.contragent) : ''
      console.log("objContragent: ", objContragent)
      if (objContragent && objContragent.length>0) {
        setContragent1(objContragent[0])
        setContragent2(objContragent[1])
        setContragent3(objContragent[2])
        setContragent4(objContragent[3])
      }
      

      setDirektor(objRekviz[0]?.direktor ? objRekviz[0]?.direktor : '')
      setInn(objRekviz[0]?.inn ? objRekviz[0]?.inn : '')
      setRaschet(objRekviz[0]?.raschet ? objRekviz[0]?.raschet : '')
      setCorschet(objRekviz[0]?.corschet ? objRekviz[0]?.corschet : '')
      setBik(objRekviz[0]?.bik ? objRekviz[0]?.bik : '')
      setOkpo(objRekviz[0]?.okpo ? objRekviz[0]?.okpo : '')
      setOgrn(objRekviz[0]?.ogrn ? objRekviz[0]?.ogrn : '')
      setBank(objRekviz[0]?.bank ? objRekviz[0]?.bank : '')
      setPhoneK(objRekviz[0]?.phoneK ? objRekviz[0]?.phoneK : '')
      setEmailK(objRekviz[0]?.emailK ? objRekviz[0]?.emailK : '')
      setUrAddress(objRekviz[0]?.urAddress ? objRekviz[0]?.urAddress : '')

      setId(result?.id)
      setTitle(result?.title)
      setCity(result ? (result.city ? result.city : '') : '')

      setOffice(result?.office ? result.office : '')
      setSklad(result?.sklad ? result.sklad : '')
      setManagers(result?.managers ? result.managers.split(', ') : [])
      setManagersObj(result?.managers ? result.managers.split(', ') : [])
      setMan(result?.managers ? result.managers.split(', ') : [])
      setBugalterFio(result?.bugalterFio ? result.bugalterFio : '')
      setBugalterEmail(result?.bugalterEmail ? result.bugalterEmail : '')
      setBugalterPhone(result?.bugalterPhone ? result.bugalterPhone : '')
      setProfile(result?.profile)
      setSfera(result?.sfera ? result.sfera : '')
      setComteg(result?.comteg ? result.comteg : '')
      setComment(result?.comment)
      setShowBlacklist(result?.sfera ? result.sfera.includes('Blacklist') : false)

      setLoading(false)
    }
    fetchData()
  }, [])


  useEffect(()=> {

    const objRekviz2 = rekviziti ? JSON.parse(rekviziti) : ''

    if (objRekviz2) {
      setDirektor(objRekviz2[selectContr]?.direktor ? objRekviz2[selectContr].direktor : '')
      setInn(objRekviz2[selectContr]?.inn ? objRekviz2[selectContr].inn : '')
      setRaschet(objRekviz2[selectContr]?.raschet ? objRekviz2[selectContr]?.raschet : '')
      setCorschet(objRekviz2[selectContr]?.corschet ? objRekviz2[selectContr]?.corschet : '')
      setBik(objRekviz2[selectContr]?.bik ? objRekviz2[selectContr]?.bik : '')
      setOkpo(objRekviz2[selectContr]?.okpo ? objRekviz2[selectContr]?.okpo : '')
      setOgrn(objRekviz2[selectContr]?.ogrn ? objRekviz2[selectContr]?.ogrn : '')
      setBank(objRekviz2[selectContr]?.bank ? objRekviz2[selectContr]?.bank : '')
      setPhoneK(objRekviz2[selectContr]?.phoneK ? objRekviz2[selectContr]?.phoneK : '')
      setEmailK(objRekviz2[selectContr]?.emailK ? objRekviz2[selectContr]?.emailK : '')
      setUrAddress(objRekviz2[selectContr]?.urAddress ? objRekviz2[selectContr]?.urAddress : '')
    } else {
      setDirektor(objRekviz[selectContr]?.direktor ? objRekviz[selectContr].direktor : '')
      setInn(objRekviz[selectContr]?.inn ? objRekviz[selectContr].inn : '')
      setRaschet(objRekviz[selectContr]?.raschet ? objRekviz[selectContr]?.raschet : '')
      setCorschet(objRekviz[selectContr]?.corschet ? objRekviz[selectContr]?.corschet : '')
      setBik(objRekviz[selectContr]?.bik ? objRekviz[selectContr]?.bik : '')
      setOkpo(objRekviz[selectContr]?.okpo ? objRekviz[selectContr]?.okpo : '')
      setOgrn(objRekviz[selectContr]?.ogrn ? objRekviz[selectContr]?.ogrn : '')
      setBank(objRekviz[selectContr]?.bank ? objRekviz[selectContr]?.bank : '')
      setPhoneK(objRekviz[selectContr]?.phoneK ? objRekviz[selectContr]?.phoneK : '')
      setEmailK(objRekviz[selectContr]?.emailK ? objRekviz[selectContr]?.emailK : '')
      setUrAddress(objRekviz[selectContr]?.urAddress ? objRekviz[selectContr]?.urAddress : '')
    }


  }, [selectContr, objRekviz, rekviziti])


  useEffect(()=> {
    console.log("managersObj: ", managersObj)
  }, [managersObj])

  useEffect(()=> {
    console.log("man: ", man)
  }, [man])


//------ загрузить аватар-------------
  useEffect(() => {
    const getImage = async () => {
        if (file) {
          setShowUpload(true)
          //console.log("file:", file)
          const data = new FormData();
          data.append("name", file.name);
          data.append("avatar", file);
          
          let response = await uploadAvatar(data) //distribFile(data) // uploadFile(data)

          setImage(response.data.path.split('.team')[1]);
          //сообщение с ссылкой на файл
          console.log("Путь к файлу: ", host + response.data.path.split('.team')[1])
          setProfile(host + response.data.path.split('.team')[1])
          //setShowUpload(false)
        }
    }
    getImage();
  }, [file])

  {/* Добавление файла */}
  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setFilePreview(URL.createObjectURL(e.target.files[0]));
  }


  //сохранить профиль
  const saveProfile = async(id) => { 
      console.log("save profile id: ", id)

      setShowSave(true)
      setShowModal(true)

      let managersObjArr = []
      let strManagersObj = ''

      //менеджеры
      let strMan = ''
          
      man.map(async(item, index)=> {
        strMan = strMan + item + (index+1 !== man.length ? ', ' : '')
        //managersObjArr.push(item)
      })
      //console.log("managersObjArr: ", managersObjArr)
    
      const saveData = { 
          userId,  
          title, 
          city,
          office,
          sklad,
          comment,
          //projects: JSON.stringify(projectsArr),
          managers: strMan,
          dogovorDate, 
          dogovorNumber, 
          bugalterFio, 
          bugalterEmail,
          bugalterPhone,  
          inn, //инн компании
          profile,
          sfera,
          comteg,
          //rekviziti: JSON.stringify(rekvizCopy),
        }
        console.log("saveData: ", saveData)
    
        setCompanys((companys) => {	
    
          let userIndex = companys.findIndex((comp) => comp.id === id);
          const usersCopy = JSON.parse(JSON.stringify(companys));
    
          const userObject = usersCopy[userIndex];
          usersCopy[userIndex] = { ...userObject, 
            title, 
            city,
            office,
            sklad,
            comment,
            projects,
            managers: strManagersObj,
            dogovorDate, 
            dogovorNumber, 
            bugalterFio, 
            bugalterEmail,
            bugalterPhone,  
            inn, //инн компании
            profile,
            sfera,
            comteg,
            //rekviziti: JSON.stringify(rekvizCopy),
          };
    
          console.log("update user: ", usersCopy[userIndex])
    
          return usersCopy;
        });


        const result = await getCompanyProfId(userId)
        console.log("Company: ", result)

        const saveData2 = { 
          companyId: result?.id
        }
        
        if (!result) {
          const resAdd = await addCompanyProf(saveData)

          //добавить Id компании в профиль
          const result2 = await getManagerId(userId)
          const resAdd2 = await editManager(saveData2, result2?.id)
          
        } else {
          //сохранить изменения в базе
          const resUpdate = await editCompanyProf(saveData, result?.id)

          //добавить Id компании в профиль
          const result2 = await getManagerId(userId)
          const resAdd2 = await editManager(saveData2, result2?.id)
        }
    
        //addToast(exampleToast) //ваши данные сохранены

        setTimeout(()=> {
          setShowModal(false)
          closeProfile()
        }, 2000)  

      //} else {
       // setShowModal(true)

       // setTimeout(()=> {
       //   setShowModal(false)
        //}, 2000)
      //}
  }

  const saveProfileManager = async(id) => { 
    console.log("save profile id: ", id)
    
    setShowSave(true)
    setShowModal(true)

    let managersObjArr = []
    let strManagersObj = ''

    //менеджеры
    let strMan = ''
        
    man.map(async(item, index)=> {
      strMan = strMan + item + (index+1 !== man.length ? ', ' : '')
      //managersObjArr.push(item)
    })
    //console.log("managersObjArr: ", managersObjArr)
  
    const saveData = { 
        userId,  
        title, 
        city,
        office,
        sklad,
        comment,
        //projects: JSON.stringify(projectsArr),
        managers: strMan,
        dogovorDate, 
        dogovorNumber, 
        bugalterFio, 
        bugalterEmail,
        bugalterPhone,  
        inn, //инн компании
        profile,
        sfera,
        comteg,
        //rekviziti: JSON.stringify(rekvizCopy),
      }
      console.log("saveData: ", saveData)
  
      setCompanys((companys) => {	
  
        let userIndex = companys.findIndex((comp) => comp.id === id);
        const usersCopy = JSON.parse(JSON.stringify(companys));
  
        const userObject = usersCopy[userIndex];
        usersCopy[userIndex] = { ...userObject, 
          title, 
          city,
          office,
          sklad,
          comment,
          projects,
          managers: strManagersObj,
          dogovorDate, 
          dogovorNumber, 
          bugalterFio, 
          bugalterEmail,
          bugalterPhone,  
          inn, //инн компании
          profile,
          sfera,
          comteg,
          //rekviziti: JSON.stringify(rekvizCopy),
        };
  
        console.log("update user: ", usersCopy[userIndex])
  
        return usersCopy;
      });


      const result = await getCompanyProfId(userId)
      console.log("Company: ", result)

      const saveData2 = { 
        companyId: result?.id
      }
      
      if (!result) {
        const resAdd = await addCompanyProf(saveData)

        //добавить Id компании в профиль
        const result2 = await getManagerId(userId)
        const resAdd2 = await editManager(saveData2, result2?.id)
        
      } else {
        //сохранить изменения в базе
        const resUpdate = await editCompanyProf(saveData, result?.id)

        //добавить Id компании в профиль
        const result2 = await getManagerId(userId)
        const resAdd2 = await editManager(saveData2, result2?.id)
      }
  
      //addToast(exampleToast) //ваши данные сохранены

      setTimeout(()=> {
        setShowModal(false)
        closeProfile()
      }, 2000)  

    //} else {
     // setShowModal(true)

     // setTimeout(()=> {
     //   setShowModal(false)
      //}, 2000)
    //}
}
  
  const blockedProfile = () => { 
      setBlockProfile(!blockProfile)
  }

  const closeProfile = () => { 

    navigate("/dashboard")
  }

  const onChangeKrest = () => {
    setShowKrest(!showKrest)
    setShowMenuKrest(false)
    setBlock(!block)
  } 


  const onChangeManager = (e, index) => {
    console.log(e.target.value, index)

    setManagersObj((managersObj) => {                                           
      const usersCopy = JSON.parse(JSON.stringify(managersObj));			
      //const userObject = JSON.parse(usersCopy[index]);
      usersCopy[index] = e.target.value;		
      //console.log(usersCopy) 
      return usersCopy;
    });   
  }

  useEffect(()=> {
    console.log("managersObj: ", managersObj)
  }, [managersObj])

  //добавить менеджера
  const addManager = () => {
    
    //console.log("managersObj: ", managersObj)
    //const obj = {id: '', chatId: '', fio: '', companyId: ''}
    setManagersObj([ // with a new array
      ...managersObj, // that contains all the old items
      'id/email' // and one new item at the end
    ])
  }

  //удалить менеджера
  const deleteManager = (item) => {
    setManagersObj(
      managersObj.filter(a =>
        a !== item
      )
    );
  }

  const changeKontra = (item) => {
    console.log(item)
    setSelectContr(item)
    // if (item === 0) {
    //   setInn(inn1)
    // } else if (item === 1) {
    //   setInn(inn2)
    // } else if (item === 2) {
    //   setInn(inn3)
    // }
    
  }

  const saveRekviz = async() => {
    if (bank.length === 0) {
      setBankEr(true)
      setShowSave(false)
      setShowModal(true)
    } else {
      setBankEr(false)
    }

    if (inn.length < 10) {
      setInnEr(true)
      setShowSave(false)
      setShowModal(true)
    } else {
      setInnEr(false)
    }

    if (raschet.length < 20) {
      setRaschetEr(true)
      setShowSave(false)
      setShowModal(true)
    } else {
      setRaschetEr(false)
    }

    if (corschet.length < 20) {
      setCorschetEr(true)
      setShowSave(false)
      setShowModal(true)
    } else {
      setCorschetEr(false)
    }

    if (bik.length < 9) {
      setBikEr(true)
      setShowSave(false)
      setShowModal(true)
    } else {
      setBikEr(false)
    }

    if (okpo.length < 13) {
      setOkpoEr(true)
      setShowSave(false)
      setShowModal(true)
    } else {
      setOkpoEr(false)
    }

    if (ogrn.length < 13) {
      setOgrnEr(true)
      setShowSave(false)
      setShowModal(true)
    } else {
      setOgrnEr(false)
    }

    // if (phoneK.length < 11) {
    //   setPhoneKEr(true)
    //   setShowSave(false)
    // }

    if (urAddress.length === 0) {
      setUrAddressEr(true)
      setShowSave(false)
      setShowModal(true)
    } else {
      setUrAddressEr(false)
    }

    if (bank.length > 0 && 
      inn.length >= 10 && 
      raschet.length >= 20 && 
      corschet.length >= 20 && 
      bik.length >= 9 &&
      okpo.length >= 13 &&
      ogrn.length >= 13 &&
      urAddress.length > 0) {
      setShowSave(true)
      setShowModal(true)

      //реквизиты
      let strRek = ''
      
      let arr = []

      const rekvizCopy = objRekviz.length > 0 ? JSON.parse(JSON.stringify(objRekviz)) : [];
      const userObject = rekvizCopy[selectContr];
      rekvizCopy[selectContr] = { ...userObject, direktor, inn, raschet, corschet, bik, okpo, ogrn, bank, phoneK, emailK, urAddress};
      
      arr.push(contragent1)
      arr.push(contragent2)
      arr.push(contragent3)
      arr.push(contragent4)

      console.log("реквизиты", rekvizCopy)
      setRekviziti(JSON.stringify(rekvizCopy))

      //saveProfile(id)
      const saveData = { 
        userId,  
        title, 
        city,
        office,
        sklad,
        comment,
        dogovorDate, 
        dogovorNumber, 
        bugalterFio, 
        bugalterEmail,
        bugalterPhone,  
        inn, //инн компании
        profile,
        sfera,
        comteg,
        rekviziti: JSON.stringify(rekvizCopy),
        contragent: JSON.stringify(arr),
      }
      console.log("saveData: ", saveData)
  
      setCompanys((companys) => {	
  
        let userIndex = companys.findIndex((comp) => comp.id === id);
        const usersCopy = JSON.parse(JSON.stringify(companys));
  
        const userObject = usersCopy[userIndex];
        usersCopy[userIndex] = { ...userObject, 
          title, 
          city,
          office,
          sklad,
          comment,
          projects,
          dogovorDate, 
          dogovorNumber, 
          bugalterFio, 
          bugalterEmail,
          bugalterPhone,  
          inn, //инн компании
          profile,
          sfera,
          comteg,
          rekviziti: JSON.stringify(rekvizCopy),
          contragent: JSON.stringify(arr),
        };
  
        console.log("update user: ", usersCopy[userIndex])
  
        return usersCopy;
      });


      const result = await getCompanyProfId(userId)
      console.log("Company: ", result)

      const saveData2 = { 
        companyId: result?.id
      }
      
      if (!result) {
        const resAdd = await addCompanyProf(saveData)

        //добавить Id компании в профиль
        const result2 = await getManagerId(userId)
        const resAdd2 = await editManager(saveData2, result2?.id)
        
      } else {
        //сохранить изменения в базе
        const resUpdate = await editCompanyProf(saveData, result?.id)

        //добавить Id компании в профиль
        const result2 = await getManagerId(userId)
        const resAdd2 = await editManager(saveData2, result2?.id)
      }
    }


    setTimeout(()=> {
      setShowModal(false)
    }, 2000)

  }

  const changeMan = (e, index) => {
    let arr = JSON.parse(JSON.stringify(man)) 
    arr[index] = e.target.value 
    setMan(arr)
  }


  useEffect(()=> {
    console.log("contragents: ", contragents)
  }, [contragents])


  //Добавить контрагента
  const addContragent = () => {
    //setShowContr4(true)
    
    //let arr = []
    //arr.push("Новый")

    setContragents([...contragents, "Новый"])
  }

  //Удалить контрагента
  const delContragent = () => {
    setContragents(contragents.filter((item, index)=>index !== contragents.length-1))
  }

  //Редактировать контрагента
  const editContragent = () => {
    setShowEditContr(!showEditContr)
  }


  return (
    <div className='dark-theme'>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-uley">
        <AppHeader />
        <div className="body flex-grow-1 px-3">

        <CContainer lg>
                <Suspense fallback={<CSpinner color="primary" />}>
                  {/* <h2>Менеджеры</h2> */}
                  <CToaster ref={toaster} push={toast} placement="top-end" /> 

                    <CRow>
                      <CCol style={{textAlign: 'center'}}>
                        <CCard className="mb-4"> 
                            <CCardBody>
                              {loading ? 
                                      
                              <CSpinner/> :

                              <div style={{position: 'relative', height: showManagers ? 'auto' : (showRekviz ? 'auto' : '402px'), display: 'flex', flexDirection: 'row'}}>
{/* 1 */}                               
                                <div style={{width: '250px'}} onMouseOver={()=>setShowUpload(true)} onMouseOut={()=>setShowUpload(false)}>
                                  {filePreview ? 
                                  <img src={filePreview} alt='' style={{borderRadius: '15px', objectFit: 'cover'}} width={250} height={250}/>
                                  :
                                  (
                                    profile ? 
                                  <img src={profile} width='250px' height='250px' alt='poster' style={{borderRadius: '7px', marginBottom: '5px'}}/>
                                  : 
                                  <svg className="rounded me-2" width="250" height="250" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" style={{float:'left', marginBottom: '3px'}}>
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
                                      name="avatar"
                                      onChange={(e) => onFileChange(e)}
                                      style={{position: 'absolute', top: '130px', left: '10px', opacity: '0', zIndex: '100', width: '230px'}}
                                    />
                                  </div>

                                  <label className='title-label'>ID</label>
                                  <div className="text-field" >
                                    <input disabled={true} className="text-field__input" type="text" name="companyId" id="companyId" value={id} style={{width: '250px', marginRight: '25px'}}/>
                                  </div>

                                  <label className='title-label'>Реквизиты</label>
                                  <CButton onClick={()=> {
                                        if (role === '1') {
                                          setSelectRekviz(!selectRekviz)
                                          setSelectManager(false)
                                          setShowManagers(false)
                                          setShowRekviz(!showRekviz)
                                        }
                                      }} className='uley_add_user' style={{width: '250px', height: '40px', marginLeft: '1px', boxShadow: selectRekviz ?'0 0 0 1px #2684ff' : ''}}>
                                    <span style={{fontSize: '18px', color: '#fff', position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)'}}>
                                      Реквизиты
                                    </span>
                                  </CButton>

                                  {showRekviz ? (
                                                            <>
                                                              <div className="div7">
                                                                  <div style={{ marginTop: '20px' }}>
                                                                    <label className='title-label'>Контрагент</label>
                                                                    {!showEditContr ? 
                                                                    <div onClick={()=>changeKontra(0)} className="py-2 uley-data-main" style={{height: '40px', cursor: 'pointer', boxShadow: selectContr === 0 ?'0 0 0 1px #2684ff' : ''}}>{contragent1}</div>
                                                                    :<input onChange={(e)=>setContragent1(e.target.value)} className="text-field__input" type="text" name="contragent1" id="contragent1" value={contragent1} style={{ height: '40px', cursor: 'pointer'}} />
                                                                    }
                                                                  </div>
                                                                  <div style={{ marginTop: '20px' }}>
                                                                    <label className='title-label'>Контрагент</label>
                                                                    {!showEditContr ? 
                                                                    <div onClick={()=>changeKontra(1)} className="py-2 uley-data-main" style={{height: '40px', cursor: 'pointer', boxShadow: selectContr === 1 ?'0 0 0 1px #2684ff' : ''}}>{contragent2}</div>
                                                                    :<input onChange={(e)=>setContragent2(e.target.value)} className="text-field__input" type="text" name="contragent1" id="contragent1" value={contragent2} style={{ height: '40px', cursor: 'pointer' }} />
                                                                    }
                                                                  </div>
                                  
                                                                  <div style={{ marginTop: '20px' }}>
                                                                    <label className='title-label'>Контрагент</label>
                                                                    {!showEditContr ? 
                                                                    <div onClick={()=>changeKontra(2)} style={{height: '40px', cursor: 'pointer', boxShadow: selectContr === 2 ?'0 0 0 1px #2684ff' : ''}} className="py-2 uley-data-main">{contragent3}</div>
                                                                    :<input onChange={(e)=>setContragent3(e.target.value)} className="text-field__input" type="text" name="contragent1" id="contragent1" value={contragent3} style={{ height: '40px', cursor: 'pointer' }} />
                                                                    }
                                                                  </div>

                                                                  {contragents && contragents.map((item, index)=> (
                                                                    <div style={{ marginTop: '20px'}} key={index}>
                                                                      <label className='title-label'>Контрагент</label>
                                                                      {!showEditContr ? 
                                                                      <div onClick={()=>changeKontra(index+3)} style={{height: '40px', cursor: 'pointer', boxShadow: selectContr === index+3 ?'0 0 0 1px #2684ff' : ''}} className="py-2 uley-data-main">{item}</div> 
                                                                      :<input onChange={(e)=>{
                                                                        contragents[index] = e.target.value
                                                                        setContragents(contragents)
                                                                      }} className="text-field__input" type="text" name="contragent1" id="contragent1" value={contragents[index]} style={{ height: '40px', cursor: 'pointer' }} />
                                                                      }
                                                                    </div>
                                                                  ))
                                                                  }

                                                                  <div style={{ marginTop: '46px', display: 'flex', justifyContent: 'space-between'}}>
                                                                    <CButton onClick={addContragent} className='uley_edit_manager' style={{width: '45%', height: '40px', marginLeft: '1px', borderColor: 'blue'}}>
                                                                      <span style={{fontSize: '16px', color: 'blue', position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)'}}>
                                                                        Добавить
                                                                      </span>
                                                                    </CButton>
                                                                    <CButton onClick={delContragent} className='uley_edit_manager' style={{width: '45%', height: '40px', marginLeft: '1px', borderColor: 'red'}}>
                                                                      <span style={{fontSize: '16px', color: 'red', position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)'}}>
                                                                        Удалить
                                                                      </span>
                                                                    </CButton>      
                                                                  </div>
                                                              </div>
                                                            </>
                                                          ) : (
                                                            ''
                                  )}

                                  {showManagers ? (
                                                            <>
                                                              <div className="div7">
                                                              {/* {managersObj && managersObj.length > 0 ? managersObj.map((item, index) => (
                                                                <div key={index}  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                  <div className="text-field" style={{position: 'relative'}}>
                                                                    <label className='title-label'>Менеджер №</label>
                                                                    <input className="text-field__input" type="text" value={item}  onChange={(e)=>onChangeManager(e, index)} style={{marginTop: '5px'}}/>
                                                                  </div>
                                                                  <div style={{textAlign: 'left', display: showManagers ? 'block' : 'none', marginTop: '4px'}}>
                                                                    <CButton onClick={()=>addManager()} className='uley_add_user' style={{marginLeft: '0'}}>
                                                                      <span style={{position: 'absolute', top: '-12px', left: '6px', fontSize: '36px', color: '#2d2e38'}}>
                                                                      +</span>
                                                                    </CButton>
                                                                  </div> 
                                                                </div>
                                                                
                                                                )
                                                                ) : */}
                                                                <>
                                                                <div style={{ marginTop: '20px'}}>
                                                                  <div>
                                                                    <label className='title-label'>Менеджер №1</label>
                                                                    <input className="text-field__input" type="text" placeholder='Почта / ID' name="contragent1" id="contragent1" value={man[0]} onChange={(e)=>changeMan(e, 0)} style={{ height: '40px', cursor: 'pointer'}} />
                                                                  </div>            
                                                                </div>

                                                                <div style={{ marginTop: '20px'}}>
                                                                  <div>
                                                                    <label className='title-label'>Менеджер №2</label>
                                                                    <input className="text-field__input" type="text" placeholder='Почта / ID' name="contragent2" id="contragent2" value={man[1]} onChange={(e)=>changeMan(e, 1)} style={{ height: '40px', cursor: 'pointer'}} />
                                                                  </div>                                            
                                                                </div>

                                                                <div style={{ marginTop: '20px'}}>
                                                                  <div>
                                                                    <label className='title-label'>Менеджер №3</label>
                                                                    <input className="text-field__input" type="text" placeholder='Почта / ID' name="contragent3" id="contragent3" value={man[2]} onChange={(e)=>changeMan(e, 2)} style={{ height: '40px', cursor: 'pointer'}} />
                                                                  </div>        
                                                                </div>

                                                                <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'space-between'}}>
                                                                  <CButton className='uley_edit_manager' style={{width: '45%', height: '40px', marginLeft: '1px', borderColor: 'blue'}}>
                                                                    <span style={{fontSize: '16px', color: 'blue', position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)'}}>
                                                                      Добавить
                                                                    </span>
                                                                  </CButton>
                                                                  <CButton className='uley_edit_manager' style={{width: '45%', height: '40px', marginLeft: '1px', borderColor: 'red'}}>
                                                                    <span style={{fontSize: '16px', color: 'red', position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)'}}>
                                                                      Удалить
                                                                    </span>
                                                                  </CButton>      
                                                                </div>
                                                              </>
                                                                  
                                                              {/* } */}
                                                              </div>
                                                            </>
                                                          ) : (
                                                            ''
                                  )}

                                  <img src={Krestik} width={25} alt='' style={{position: 'absolute', top: '215px', left: '215px', opacity: block ? '1' : '0' }}/>
                                  <div className="menu-content-krest">
                                    <span onClick={onChangeKrest} style={{cursor: 'pointer'}}>{block ? 'Убрать' : 'Добавить'}</span>
                                  </div>

                                  {/* ФИО */}
                                  <div style={{position: 'absolute', top: '5px', left: '286px', color: '#fff', zIndex: '100', display: 'flex', justifyContent: 'space-between', width: '-webkit-fill-available'}}>   
                                    <div className="text-field">
                                      <input type="text" name="title" id="title" value={title} onChange={(e)=>setTitle(e.target.value)} style={{fontSize: '33px', position: 'absolute', top: '-15px', backgroundColor: 'transparent', border: '0', color: '#f3f3f3', width: '600px'}}></input>
                                    </div>
                                    <div style={{display: 'flex'}}>
                                      {/* <Icon id="delete" onClick={()=>clickDelete(id)} /> */}
                                      {/* <img src={Trubka} onClick={()=>setShowProfile(false)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={Tg} onClick={()=>setShowProfile(false)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/> */}
                                      <img src={blockProfile ? zamok : zamok2} onClick={blockedProfile} style={{cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={Disketa} onClick={()=>saveProfile(id)} style={{cursor: 'pointer', width: '24px', height: '24px', marginLeft: '20px'}}/>
                                      <img src={Close} onClick={closeProfile} style={{display: showClose ? 'block' : 'block', cursor: 'pointer', width: '19px', height: '24px', marginLeft: '20px'}}/>  
                                    </div>
                                  </div>
                                </div>

{/* 2 */}
                                <div style={{marginLeft: '40px', marginTop: '85px', display: 'flex', flexDirection: 'column', width: '320px'}}>
                                  {/* Город */}
                                  <label className='title-label'>Город</label>
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
                                      <img src={Close} onClick={() => setCity('')} width={15} alt='' style={{position: 'absolute', top: '13px', right: '15px', visibility: showClearCity ? 'visible' : 'hidden', cursor: 'pointer'}}></img>
                                  </div>

                                  {/*  */}
                                  <label className='title-label'>Офис</label>
                                  <div className="text-field" onMouseOver={()=>setShowSaveOffice(true)} onMouseOut={()=>setShowSaveOffice(false)}>
                                    <img 
                                      src={Disketa} 
                                      onClick={()=>{navigator.clipboard.writeText(office)}} 
                                      alt="" 
                                      style={{visibility: showSaveOffice ? 'visible' : 'hidden', position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', width: '20px', height: '20px'}}
                                    />
                                    <input className="text-field__input" type="text" name="office" id="office" value={office} onChange={(e) => setOffice(e.target.value)}/>
                                  </div> 

                                  {/*  */}
                                  <label className='title-label'>Склад</label>
                                  <div className="text-field">
                                    <input className="text-field__input" type="text" name="sklad" id="sklad" value={sklad} onChange={(e) => setSklad(e.target.value)}/>
                                  </div> 

                                  {/* Менеджеры */}
                                  <label className='title-label'>Менеджеры</label>
                                  <CButton onClick={()=> {
                                        if (role === '1') {
                                          setSelectManager(!selectManager)
                                          setSelectRekviz(false) 
                                          setShowRekviz(false)
                                          setShowManagers(!showManagers)
                                        }
                                      }}  className='uley_add_user' style={{width: '320px', height: '42px', marginLeft: '0',  boxShadow: selectManager ?'0 0 0 1px #2684ff' : ''}}>
                                    <span style={{fontSize: '18px', color: '#fff', position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)'}}>
                                      Менеджеры
                                    </span>
                                  </CButton>

                                  {/* <div style={{display: showManagers ? 'block' : 'none'}}>
                                    {managersObj.map((item, index) => (
                                    <div className="text-field" key={index} style={{position: 'relative'}}>
                                      <div className="text-field">
                                        <input className="text-field__input" type="text" value={item}  onChange={(e)=>onChangeManager(e, index)} style={{width: '280px', marginTop: '45px'}}/>
                                      </div> 
                                      <img src={Close} onClick={()=> deleteManager(item)} width={15} alt='' style={{position: 'absolute', top: '13px', right: '15px',  cursor: 'pointer'}}></img>
                                    </div>)
                                    )}
                                  </div> */}

                                  {showRekviz ? (
                                                            <>
                                                              <div className="div7">
                                                                <div>

                                                                <div style={{ marginTop: '20px' }}>
                                                                    <label className='title-label'>Руководитель</label>
                                                                    {/* <InputMask
                                                                        className="text-field__input" 
                                                                        type="text" 
                                                                        name="direktor" 
                                                                        id="direktor"
                                                                        mask="999999999999"
                                                                        maskChar=""
                                                                        onChange={(e) => setDirektor(e.target.value)} 
                                                                        value={inn}
                                                                        placeholder=''
                                                                        style={{borderColor: direktorEr ? 'red' : '' }}
                                                                    >
                                                                    </InputMask> */}
                                                                    <input 
                                                                      className="text-field__input" 
                                                                      type="text" 
                                                                      name="direktor" 
                                                                      id="direktor" 
                                                                      value={direktor} 
                                                                      onChange={(e)=>setDirektor(e.target.value)} 
                                                                      style={{ height: '40px' }} 
                                                                    />
                                                                  </div>

                                                                  <div style={{ marginTop: '20px' }}>
                                                                    <label className='title-label'>ИНН / КПП</label>
                                                                    <InputMask
                                                                        className="text-field__input" 
                                                                        type="text" 
                                                                        name="inn" 
                                                                        id="inn"
                                                                        mask="999999999999 / 999999999"
                                                                        maskChar=""
                                                                        onChange={(e) => setInn(e.target.value)} 
                                                                        value={inn}
                                                                        placeholder=''
                                                                        style={{borderColor: innEr ? 'red' : '' }}
                                                                    >
                                                                    </InputMask>
                                                                    {/* <input className="text-field__input" type="text" name="inn" id="inn" value={inn} onChange={(e)=>setInn(e.target.value)} style={{ height: '40px' }} /> */}
                                                                  </div>

                                                                  <div style={{ marginTop: '20px' }}>
                                                                    <label className='title-label'>ОКПО</label>
                                                                    <InputMask
                                                                        className="text-field__input" 
                                                                        type="text" 
                                                                        name="okpo" 
                                                                        id="okpo"
                                                                        mask="999999999999999"
                                                                        maskChar=""
                                                                        onChange={(e) => setOkpo(e.target.value)} 
                                                                        value={okpo}
                                                                        placeholder=''
                                                                        style={{borderColor: okpoEr ? 'red' : '' }}
                                                                    >
                                                                    </InputMask>
                                                                    {/* <input className="text-field__input" type="text" name="ogrn" id="ogrn" value={ogrn} onChange={(e)=>setOgrn(e.target.value)} style={{ height: '40px' }} /> */}
                                                                  </div>
                                  
                                                                  <div style={{ marginTop: '20px' }}>
                                                                    <label className='title-label'>ОГРН</label>
                                                                    <InputMask
                                                                        className="text-field__input" 
                                                                        type="text" 
                                                                        name="ogrn" 
                                                                        id="ogrn"
                                                                        mask="999999999999999"
                                                                        maskChar=""
                                                                        onChange={(e) => setOgrn(e.target.value)} 
                                                                        value={ogrn}
                                                                        placeholder=''
                                                                        style={{borderColor: ogrnEr ? 'red' : '' }}
                                                                    >
                                                                    </InputMask>
                                                                    {/* <input className="text-field__input" type="text" name="ogrn" id="ogrn" value={ogrn} onChange={(e)=>setOgrn(e.target.value)} style={{ height: '40px' }} /> */}
                                                                  </div>
                                  
                                                                   
                                                                </div> 
                                                              </div>                              
                                                            </>
                                                          ) : (
                                                            ''
                                  )}

                                  {showManagers ? (
                                                            <>
                                                              <div className="div7">
                                                                  {/* {managersObj && managersObj.length > 0 ? 
                                                                    <div style={{ marginTop: '20px' }}>
                                                                    <label className='title-label'>ФИО</label>
                                                                    <input disabled className="text-field__input" type="text" name="contragent1" id="contragent1" value={mans[0]?.fio} style={{ height: '40px', cursor: 'pointer'}} />
                                                                  </div>
                                                                  : */}
                                                                  <>
                                                                    <div style={{ marginTop: '20px' }}>
                                                                      <label className='title-label'>ФИО</label>
                                                                      <CTooltip content="Данные подгрузятся после сохранения профиля">
                                                                        <div className="text-field__input" type="text" name="contragent1" id="contragent1" style={{ height: '40px', cursor: 'pointer', paddingTop: '8px' }}>
                                                                          {manData[0]?.fio}
                                                                        </div>
                                                                      </CTooltip>
                                                                    </div>
                                    
                                                                    <div style={{ marginTop: '20px' }}>
                                                                      <label className='title-label'>ФИО</label>
                                                                      <CTooltip content="Данные подгрузятся после сохранения профиля">
                                                                        <div className="text-field__input" type="text" name="contragent1" id="contragent1" style={{ height: '40px', cursor: 'pointer', paddingTop: '8px' }}>
                                                                          {manData[1]?.fio}
                                                                        </div>
                                                                      </CTooltip>
                                                                    </div>

                                                                    <div style={{ marginTop: '20px' }}>
                                                                      <label className='title-label'>ФИО</label>
                                                                      <CTooltip content="Данные подгрузятся после сохранения профиля">
                                                                        <div className="text-field__input" type="text" name="contragent1" id="contragent1" style={{ height: '40px', cursor: 'pointer', paddingTop: '8px' }}>
                                                                        {manData[2]?.fio}
                                                                        </div>
                                                                      </CTooltip>
                                                                    </div>
                                                                  </>
                                                                  {/* } */}
                                                              </div>
                                                            </>
                                                          ) : (
                                                            ''
                                  )}

                                </div>

{/* 3 */}
                                <div style={{marginLeft: '40px', marginTop: '85px', display: 'flex', flexDirection: 'column', width: '320px'}}>
                                  {/* phone */}
                                  <label className='title-label'>Телефон</label>
                                  <div className="text-field" >
                                      {/* <input className="text-field__input" type="text" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={{width: '250px'}}/> */}
                                      <InputMask
                                          className="text-field__input" 
                                          style={{width: '320px'}}
                                          type="text" 
                                          name="phone" 
                                          id="phone"
                                          mask="+7 (999) 999-99-99"
                                          disabled={!blockProfile}
                                          maskChar=""
                                          onChange={(e) => setBugalterPhone(e.target.value)} 
                                          value={bugalterPhone}
                                          placeholder=''
                                      >
                                      </InputMask>    
                                  </div> 

                                  {/* email */}
                                  <label className='title-label'>Почта</label>
                                  <div className="text-field">
                                    <input className="text-field__input" type="text" name="email" id="email" value={bugalterEmail} onChange={(e) => setBugalterEmail(e.target.value)} style={{width: '320px'}}/>
                                  </div> 

                                  {/*  */}
                                  <label className='title-label'>Сфера деятельности</label>
                                  <div className="text-field" style={{marginBottom: '20px'}}> 
                                    <input className="text-field__input" type="text" name="sfera" id="sfera" value={sfera} onChange={(e) => setSfera(e.target.value)} style={{width: '320px'}}/>
                                  </div>

                                  {/* + добавить менеджера */}
                                  {/* <div style={{textAlign: 'left', display: showManagers ? 'block' : 'none'}}>
                                    <CButton onClick={()=>addManager()} className='uley_add_user' style={{marginBottom: '20px', marginLeft: '0'}}>
                                      <span style={{position: 'absolute', top: '-12px', left: '6px', fontSize: '36px', color: '#2d2e38'}}>
                                      +</span>
                                    </CButton>
                                  </div>    */}

                                  <div style={{position: 'relative'}}>
                                    <label className='title-label' style={{position: 'absolute', top: '-15px', left: '40%'}}>Проекты</label>
                                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0px'}}>                                   
                                      {/* проекты за месяц */}
                                      <div style={{marginRight: '10px'}}>
                                        <label className='title-label'>За месяц</label>
                                        <div className="text-field">
                                            <input disabled className="text-field__input" type="text" name="reyting" id="reyting" value={'0'} style={{width: '100%', marginRight: '8px'}}/>
                                        </div>
                                      </div>
                                      {/* проекты всего */}
                                      <div> 
                                        <label className='title-label'>Всего</label>
                                        <div className="text-field">
                                            <input disabled className="text-field__input" type="text" name="rank" id="rank" value={'0'} style={{width: '100%', marginRight: '8px'}}/>
                                        </div>
                                      </div>
                                      
                                    </div>
                                  </div>


                                  {showRekviz ? (
                                                            <>
                                                              <div style={{ marginTop: '2px' }}>
                                                                    <label className='title-label'>Расчетный счет</label>
                                                                    <InputMask
                                                                        className="text-field__input" 
                                                                        type="text" 
                                                                        name="raschet" 
                                                                        id="raschet"
                                                                        mask="99999999999999999999"
                                                                        maskChar=""
                                                                        onChange={(e) => setRaschet(e.target.value)} 
                                                                        value={raschet}
                                                                        placeholder=''
                                                                        style={{borderColor: raschetEr ? 'red' : '' }}
                                                                    >
                                                                    </InputMask>
                                                                    {/* <input className="text-field__input" type="text" name="raschet" id="raschet" value={raschet} onChange={(e)=>setRaschet(e.target.value)} style={{ height: '40px' }} /> */}
                                                                  </div>
                                  
                                                                  <div style={{ marginTop: '20px' }}>
                                                                    <label className='title-label'>Корреспондентский счет</label>
                                                                    <InputMask
                                                                        className="text-field__input" 
                                                                        type="text" 
                                                                        name="corschet" 
                                                                        id="corschet"
                                                                        mask="99999999999999999999"
                                                                        maskChar=""
                                                                        onChange={(e) => setCorschet(e.target.value)} 
                                                                        value={corschet}
                                                                        placeholder=''
                                                                        style={{borderColor: corschetEr ? 'red' : '' }}
                                                                    >
                                                                    </InputMask>
                                                                    {/* <input className="text-field__input" type="text" name="corschet" id="raschet" value={corschet} onChange={(e)=>setCorschet(e.target.value)} style={{ height: '40px' }} /> */}
                                                                  </div>

                                                              <div className="div7">
                                                                <div>
                                                                  <div style={{ marginTop: '20px' }}>
                                                                    <label className='title-label'>БИК</label>
                                                                    <InputMask
                                                                        className="text-field__input" 
                                                                        type="text" 
                                                                        name="bik" 
                                                                        id="bik"
                                                                        mask="999999999"
                                                                        maskChar=""
                                                                        onChange={(e) => setBik(e.target.value)} 
                                                                        value={bik}
                                                                        placeholder=''
                                                                        style={{borderColor: bikEr ? 'red' : '' }}
                                                                    >
                                                                    </InputMask>
                                                                    {/* <input className="text-field__input" type="text" name="bik" id="bik" value={bik} onChange={(e)=>setBik(e.target.value)} style={{ height: '40px' }} /> */}
                                                                  </div>
                                  
                                                                  
                                                                  <div style={{ marginTop: '20px' }}>
                                                                    <label className='title-label'>Банк</label>
                                                                    <input 
                                                                      className="text-field__input" 
                                                                      type="text" name="bank" id="bank" 
                                                                      value={bank} 
                                                                      onChange={(e)=>setBank(e.target.value)} 
                                                                      style={{ height: '40px', borderColor: bankEr ? 'red' : '' }} 
                                                                    />
                                                                  </div>

                                                                </div>
                                                              </div>
                                                              
                                                            </>
                                                          ) : (
                                                            ''
                                  )}

                                  {showManagers ? (
                                                            <>
                                                              <div className="div7">
                                                                {/* {managersObj && managersObj.length > 0 ? 
                                                                  <div>
                                                                    <label className='title-label'>Должность</label>
                                                                    <input disabled className="text-field__input" type="text" name="contragent1" id="contragent1" value={mans[0]?.dolgnost} style={{ height: '40px', cursor: 'pointer'}} />
                                                                  </div>
                                                                  : */}
                                                                  <>
                                                                    <div style={{ marginTop: '2px' }}>
                                                                      <label className='title-label'>Должность</label>
                                                                      <CTooltip content="Данные подгрузятся после сохранения профиля">
                                                                        <div className="text-field__input" type="text" name="contragent1" id="contragent1" style={{ height: '40px', cursor: 'pointer', paddingTop: '8px' }}>
                                                                          {manData[0]?.dolgnost}
                                                                        </div>
                                                                      </CTooltip>
                                                                    </div>
                                                                    <div style={{ marginTop: '20px' }}>
                                                                      <label className='title-label'>Должность</label>
                                                                      <CTooltip content="Данные подгрузятся после сохранения профиля">
                                                                        <div className="text-field__input" type="text" name="contragent1" id="contragent1" style={{ height: '40px', cursor: 'pointer', paddingTop: '8px' }}>
                                                                          {manData[1]?.dolgnost}
                                                                        </div>
                                                                      </CTooltip>
                                                                    </div>
                                    
                                                                    <div style={{ marginTop: '20px' }}>
                                                                      <label className='title-label'>Должность</label>
                                                                      <CTooltip content="Данные подгрузятся после сохранения профиля">
                                                                        <div className="text-field__input" type="text" name="contragent1" id="contragent1" style={{ height: '40px', cursor: 'pointer', paddingTop: '8px' }}>
                                                                          {manData[2]?.dolgnost}
                                                                        </div>
                                                                      </CTooltip>
                                                                    </div>
                                                                  </>
                                                                  {/* } */}

                                                              </div>
                                                            </>
                                                          ) : (
                                                            ''
                                  )}


                                </div>

{/* 4 */}
                                <div style={{marginLeft: '40px', marginTop: '85px', display: 'flex', flexDirection: 'column', width: '250px'}}>
                                  
                                  <label className='title-label'>Проекты</label>
                                  <div className="text-field" style={{marginBottom: '-10px'}}>
                                    <ul className='spec-style' style={{width: '100%', height: '292px', whiteSpace: 'pre-line', borderRadius: '6px', textAlign: 'left'}}>
                                    
                                    </ul>
                                  </div> 

                                  {showRekviz ? (
                                                            <>
                                                              <div style={{ marginTop: '17px' }} className="div8">
                                                                  <label className='title-label'>Юридический адрес</label>
                                                                  <input 
                                                                    className="text-field__input" 
                                                                    type="text" 
                                                                    name="urAddress" 
                                                                    id="urAddress" 
                                                                    value={urAddress} 
                                                                    onChange={(e)=>setUrAddress(e.target.value)} 
                                                                    style={{borderColor: urAddressEr ? 'red' : '', height: '40px' }}
                                                                  />
                                                                </div>

                                                              <div className="div7">
                                                                <div style={{ marginTop: '20px' }}>
                                                                    <label className='title-label'>Телефон</label>
                                                                    <InputMask
                                                                      className="text-field__input" 
                                                                      type="text" 
                                                                      name="phoneK" 
                                                                      id="phoneK"
                                                                      mask="+7 (999) 999-99-99"
                                                                      maskChar=""
                                                                      onChange={(e) => setPhoneK(e.target.value)} 
                                                                      value={phoneK}
                                                                      placeholder=''  
                                                                  >
                                                                  </InputMask>
                                                                    {/* <input className="text-field__input" type="text" name="phoneK" id="phoneK" value={phoneK} onChange={(e)=>setPhoneK(e.target.value)} style={{ height: '40px' }} /> */}
                                                                  </div>
                                  
                                                                  <div style={{ marginTop: '20px' }}>
                                                                    <label className='title-label'>Почта</label>
                                                                    <input className="text-field__input" type="text" name="emailK" id="ogrn" value={emailK} onChange={(e)=>setEmailK(e.target.value)} style={{ height: '40px' }} />
                                                                  </div>

                                                                <div style={{ marginTop: '45px', display: 'flex', justifyContent: 'space-between'}}>
                                                                      <CButton onClick={editContragent} className='uley_edit_manager' style={{width: '45%', height: '40px', marginLeft: '1px', borderColor: 'yellow'}}>
                                                                        <span style={{fontSize: '16px', color: 'yellow', position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)'}}>
                                                                        {showEditContr ? 'Применить' : 'Изменить'}
                                                                        </span>
                                                                      </CButton>
                                                                      <CButton onClick={saveRekviz} className='uley_edit_manager' style={{width: '45%', height: '40px', marginLeft: '1px', borderColor: 'green'}}>
                                                                        <span style={{fontSize: '16px', color: 'green', position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)'}}>
                                                                          Сохранить
                                                                        </span>
                                                                      </CButton>      
                                                                    </div>
                                                              </div>

                                                            </>
                                                          ) : (
                                                            ''
                                                          )}

                                  {showManagers ? (
                                                            <>
                                                              <div className="div7">
                                                                {/* {managersObj && managersObj.length > 0 ? 
                                                                  <div>
                                                                    <label className='title-label'>Телефон</label>
                                                                    <input disabled className="text-field__input" type="text" name="contragent1" id="contragent1" value={mans[0]?.phone} style={{ height: '40px', cursor: 'pointer'}} />
                                                                  </div>
                                                                  : */}
                                                                  <>
                                                                    <div style={{ marginTop: '20px' }}>
                                                                      <label className='title-label'>Телефон</label>
                                                                      <CTooltip content="Данные подгрузятся после сохранения профиля">
                                                                        <div className="text-field__input" type="text" name="contragent1" id="contragent1" style={{ height: '40px', cursor: 'pointer', paddingTop: '8px' }}>
                                                                          {manData[0]?.phone}
                                                                        </div>
                                                                      </CTooltip>
                                                                    </div>
                                    
                                                                    <div style={{ marginTop: '17px' }}>
                                                                      <label className='title-label'>Телефон</label>
                                                                      <CTooltip content="Данные подгрузятся после сохранения профиля">
                                                                        <div className="text-field__input" type="text" name="contragent1" id="contragent1" style={{ height: '40px', cursor: 'pointer', paddingTop: '8px' }}>
                                                                          {manData[1]?.phone}
                                                                        </div>
                                                                      </CTooltip>
                                                                    </div> 

                                                                    <div style={{ marginTop: '20px' }}>
                                                                      <label className='title-label'>Телефон</label>
                                                                      <CTooltip content="Данные подгрузятся после сохранения профиля">
                                                                        <div className="text-field__input" type="text" name="contragent1" id="contragent1" style={{ height: '40px', cursor: 'pointer', paddingTop: '8px' }}>
                                                                          {manData[2]?.phone}
                                                                        </div>
                                                                      </CTooltip>
                                                                    </div> 

                                                                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between'}}>
                                                                      <CButton className='uley_edit_manager' style={{width: '45%', height: '40px', marginLeft: '1px', borderColor: 'yellow'}}>
                                                                        <span style={{fontSize: '16px', color: 'yellow', position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)'}}>
                                                                          Изменить
                                                                        </span>
                                                                      </CButton>
                                                                      <CButton onClick={()=>saveProfileManager(id)} className='uley_edit_manager' style={{width: '45%', height: '40px', marginLeft: '1px', borderColor: 'green'}}>
                                                                        <span style={{fontSize: '16px', color: 'green', position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)'}}>
                                                                          Сохранить
                                                                        </span>
                                                                      </CButton>      
                                                                    </div>
                                                                  </>
                                                                  {/* } */}
                                                              </div>
                                                            </>
                                                          ) : (
                                                            ''
                                  )}
                                  
                                </div>
                                  

                              </div>
                              }
                            </CCardBody>
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
                                            {showSave ? 'Данные успешно сохранены' : 'Некорректно заполненные данные!'}
                                          </CModalBody>
                                        </CModal>
                  
                </Suspense>
            </CContainer>

        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default ProfileCompany
