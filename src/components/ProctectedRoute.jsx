import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { all_provider } from './ContextProvider'

const ProctectedRoute = ({children}) => {
    const {Notify} = useContext(all_provider)
  const userlog = localStorage.getItem('userlog') || false

  if (userlog ){
    return children
  } 
    
  Notify('failure','no no back to login!!!')
  return <Navigate to={'/login'} replace/>
}

export default ProctectedRoute
