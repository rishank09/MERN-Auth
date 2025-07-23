import React from "react";
import { toast } from 'react-toastify';
import { createContext, useState , useEffect } from "react";
import axios from 'axios'

export const AppContent = createContext()

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
const [isLoggedin, setIsLoggedin] = useState(false);
const [userData, setUserData] = useState(false);

const getUserData = async () => {
  try {
    const { data } = await axios.get(backendUrl + '/api/user/data', {
  withCredentials: true,
});
    data.success 
      ? setUserData(data.userData) 
      : toast.error(data.message);
  } catch (error) {
    toast.error(error.message);
  }
}


const getAuthState = async () => {
  try {
    const { data } = await axios.get(backendUrl + '/api/auth/is-auth', {
      withCredentials: true,
    });

    if (data.success) {
      setIsLoggedin(true);
      getUserData();
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      toast.info("You're not logged in or session expired");
      setIsLoggedin(false);
    } else {
      toast.error(error.response?.data?.message || error.message);
    }
  }
};



useEffect(() => {
  getAuthState();
}, []);



const value = {
  backendUrl,
  isLoggedin,
  setIsLoggedin,
  userData,
  setUserData,
  getUserData,
  getAuthState
};


    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}
