import React, { useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navMenus } from '../../utils/naviLists';
import { FcGoogle } from 'react-icons/fc';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../redux/slides/authSlice';



const Navbar = () => {
  const path = useLocation();
  const isActive = (location) => path.pathname === location;
  const googleClientId = import.meta.env.VITE_AUTH_CLIENT_ID;
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth.authData);



  const userKey = state?.sub;
  const {name} = state || {}
  const [isAuth, setIsAuth] =useState(!!name)

// !! name 값이 있는지 엄격히 체크 
  const handleLoginSuccess = useCallback((credentialResponse) => {
    try { const decoded = jwtDecode(credentialResponse.credential);
      dispatch(login({ authData: decoded }));
      setIsAuth (true)
      
    } catch (error) {
      console.error('Google Login Error :', error)
    }
   
  },
[dispatch]
);
const handleLoginClick =()=>{
  dispatch(logout());
setIsAuth(false);
}


return (
  <nav className="bg-[#212121] w-1/5 h-full rounded-sm border border-gray-500 py-10 px-4 flex flex-col justify-between items-center">
    <div className="logo-wrapper flex w-full items-center justify-center gap-8">
      <div className="logo"></div>
      <h2 className="font-semibold text-xl">
        <Link to="/">Hijin</Link>
      </h2>
    </div>
    <ul className="menus">
      {navMenus.map((menu, idx) => (
        <li
          key={idx}
          className={`rounded-sm mb-2 border border-gray-700 hover:bg-gray-950 transition-all duration-300 ${
            isActive(menu.to) ? 'bg-gray-950' : ''
          }`}
        >
          <Link to={menu.to} className="flex gap-x-4 items-center py-2 px-10">
            {menu.icon} {menu.label}
          </Link>
        </li>
      ))}
    </ul>

    {isAuth ? (
      <div className="auth-button w-4/5 flex items-center">
        <button
          className="flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-3 px-4 rounded-md w-full"
          onClick={handleLoginSuccess}
        >
          <FcGoogle className="w-5 h-5" />
          <span className="text-sm">희진님 로그아웃</span>
        </button>
      </div>
    ) : (
      <div className="auth-wrapper flex justify-center w-4/5 login-btn">
        <GoogleOAuthProvider clientId={googleClientId}>
          <h1>Google 로그인 테스트</h1>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginClick}
          />
          {/* 아래 버튼은 GoogleLogin 외부에 독립적으로 배치했습니다 */}
          <button className="flex justify-center item-center gap-2 bg-gray-300 text-gray-900 py-3 px-4 rounded-md w-full mt-2">
            <FcGoogle className="w-5 h-5" />
            <span className="text-sm">Google login</span>
          </button>
        </GoogleOAuthProvider>
      </div>
    )}
  </nav>
);}
      {/* <div className="auth-button w-4/5 flex items-center">
        <button className="flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-3 px-4 rounded-md w-full">
          <FcGoogle />
          <span className="text-sm">희진님 로그아웃</span>
        </button>
      </div> */}
      {/* <GoogleOAuthProvider clientId={googleClientId}>
        <h1>Google 로그인 테스트</h1>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => {
            console.log('로그인 실패');
          }}
        />
      </GoogleOAuthProvider>
    </nav>
  );
}; */}


export default Navbar;



