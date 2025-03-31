import React from 'react'
import { Button } from './ui/Button'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const { signOut }= UserAuth();
  const navigate= useNavigate();

  const handleSignOut= async()=>{
    try {
      const err= await signOut();
      if (!err){
        navigate("/signin");
      }
      console.log("An error occured: ", err)
    } catch (error) {
      console.log("An error occured ", error)
    }
  }
  return (
    <>
    <div>Dashboard</div>
    <Button
      type="submit"
      onClick= {handleSignOut}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2 mt-4"
    >
      Sign Out
    </Button>
    </>
  )
}

export default Dashboard