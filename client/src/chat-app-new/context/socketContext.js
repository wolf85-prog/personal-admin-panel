import React, { createContext, useContext } from "react";
import io from "socket.io-client";

const SOCKET_URL = process.env.REACT_APP_HOST_SOCKET

const socket = io.connect(SOCKET_URL);

const SocketContext = createContext();

const useSocketContext = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};

export { useSocketContext, SocketProvider };
