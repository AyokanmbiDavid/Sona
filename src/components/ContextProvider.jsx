import axios from 'axios';
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const all_provider = createContext();
export const endpoint = 'http://localhost:3000/api'

const api = axios.create({
  baseURL: "http://localhost:3000/api" ,
  timeout: 7000,
  headers:{
    
    'Content-Type':'application/json',
    'Accept':'application/json'
  }
})

const ContextProvider = ({ children }) => {

  const [notifystatus, setnotifystatus] = useState({ type: "", message: "", show: false });

  const Notify = (type, message) => {
    setnotifystatus({ type, message, show: true });
    if (type !== "loading") setTimeout(() => setnotifystatus({ type: "", message: "", show: false }), 3000);
  };

  const closenotify = () => setnotifystatus({ type: "", message: "", show: false });

  const fetchEverything = useCallback(async () => {
    try {
      Notify("loading", 'updating data')
      const [mRes] = await Promise.all([
        api.get('/store'),
      ]);

      const members = mRes.data
      const attHistory = aRes.data

        setlatest(members);
        setattendance(attHistory);
      Notify("success","you are connected")

    } catch (err) {
      console.error("Backend sync failed.",err.message);
      Notify('failure','no network, connet to the internet')
    }
  }, []);

  useEffect(() => { fetchEverything(); }, [fetchEverything]);

  return (
    <all_provider.Provider value={{
      Notify, notifystatus, closenotify, refresh: fetchEverything
    }}>
      {children}
    </all_provider.Provider>
  );
};

export default ContextProvider;