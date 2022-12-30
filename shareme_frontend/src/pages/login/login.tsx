import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {gapi} from 'gapi-script';
import GoogleLogin from 'react-google-login'
import { FcGoogle } from "react-icons/fc";
import assets from '../../assets/index';
import config from '../../config';

const Login = () => {
  const navigate = useNavigate();
  const { googleConfig } = config;

  useEffect(() => {
    gapi.load("client:auth2", () => { 
      gapi.client.init({ 
        clientId: googleConfig.clientId, 
        scope: "email",
        plugin_name: "shareme", 
      }); });
  }, [googleConfig.clientId])

  const responseGoogle = (response: any) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj));

    const { name, googleId, imageUrl } = response.profileObj;

    const doc = {
      _id: googleId,
      type: 'user',
      userName: name,
      image: imageUrl
    }

    console.log(doc)

    navigate("/");
  }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video 
          src={assets.shareVideo}
          controls={false}
          loop
          muted
          autoPlay
          className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={assets.logoWhite} alt="logo" />
          </div>
          <div className='shadow-2xl'>
            <GoogleLogin
              clientId={config.googleConfig.clientId as string}
              render={(renderProps) => (
                <button 
                  type='button' 
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                >
                  <FcGoogle className='mr-4'/>
                  Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy='single_host_origin'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login