import 'react-app-polyfill/stable'
import 'core-js'
import React, { createContext } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import UserStore from "./store/UserStore";
import { UsersProvider } from "./chat-app-new/context/usersContext";
import { SocketProvider } from "./chat-app-new/context/socketContext";
import AccountProvider from './chat-app-new/context/AccountProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const Context = createContext(null)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Context.Provider value={{
        user: new UserStore(),
    }}>

      <Provider store={store}>
        <SocketProvider>
          <QueryClientProvider client={queryClient}>
            <UsersProvider>
              <AccountProvider>
                <App />
              </AccountProvider>          
            </UsersProvider>
          </QueryClientProvider>
        </SocketProvider>
      </Provider>

    </Context.Provider>
    
  </React.StrictMode> 
)
