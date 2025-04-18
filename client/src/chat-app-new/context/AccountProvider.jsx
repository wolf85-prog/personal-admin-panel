import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client"

export const AccountContext = createContext(null);


const AccountProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(false);
    const [account, setAccount] = useState();
    const [person, setPerson] = useState({});
    const [personW, setPersonW] = useState({});
    const [personR, setPersonR] = useState({});
    const [personS, setPersonS] = useState({});
    const [activeUsers, setActiveUsers]= useState([]);
    const [newMessageFlag, setNewMessageFlag] = useState(false);

    const socket = useRef();

    useEffect(()=>{
        //socket.current = io("https://proj.uley.team:9000");
    },[])


    return (
        <AccountContext.Provider value={{
            isAuth,
            setIsAuth,
            account,
            setAccount,
            person,
            setPerson,
            personW,
            setPersonW,
            personR, 
            setPersonR,
            personS, 
            setPersonS,
            socket,
            activeUsers,
            setActiveUsers,
            newMessageFlag,
            setNewMessageFlag
        }} >
            {children}
        </AccountContext.Provider>
    )
}

export default AccountProvider;