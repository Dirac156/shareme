import React, { useEffect, useState } from 'react'
import { client, userQuery } from '../../services/sanity.client';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';
import Pins from '../Pins/Pins';
import {
  SideBar,
  UserProfile
} from "../../components/index";
import assets from '../../assets';

const { logo } = assets;

const Home = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const [user, setUser] = useState({
    _id: "",
    username: "",
    image: "",
  });
  const userInfo = 
    localStorage.getItem('user') !== 'undefined' ? 
      JSON.parse(localStorage.getItem('user') as string) : 
      localStorage.clear();

  useEffect(()=> {
    const query = userQuery(userInfo?.googleId);
    client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      })
    return () => {
      // clean up
    }
  }, [])
  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <SideBar user={user && user} />
      </div>
      <div className='flex md:hidden flex-row'>
        <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSideBar(true)}/>
        <Link to="/">
          <img alt='logo' src={logo} className="w-28" />
        </Link>
        <Link to={`user-profile/${user?._id}`}>
          <img alt='logo' src={user.image} className="w-28" />
        </Link>
      </div>
      { toggleSideBar && (
        <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
          <div className='absolute w-full flex justify-end items-center p-2'>
            <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSideBar(false)} />  
          </div>
          <SideBar user={user && user} closeToggle={setToggleSideBar}/>  
        </div>
      )}
    </div>
  )
}

export default Home