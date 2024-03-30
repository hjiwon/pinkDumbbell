import React, { useState } from 'react';
import GNB from '../GNB/GNB';
import Footer from '../footer/Footer';
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../atoms';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [uncorrect, setUncorrect] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const navigate = useNavigate();

  const validateCredentials = (username, password) => {
    // 아이디와 비밀번호의 유효성을 검사하는 정규 표현식
    const usernameRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  
    // 아이디와 비밀번호가 각각 조건에 맞는지 검사
    const isUsernameValid = usernameRegex.test(username);
    const isPasswordValid = passwordRegex.test(password);
  
    return {
      isUsernameValid,
      isPasswordValid
    };
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { isUsernameValid, isPasswordValid } = validateCredentials(username, password);
      if (!isUsernameValid) {
        throw new Error('아이디는 6자리 이상의 영문과 숫자의 조합이어야합니다.');
      } else if (!isPasswordValid) {
        throw new Error('비밀번호는 8자리 이상의 영문과 숫자의 조합이어야합니다.');
      }

      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ username, password })
      // });
  
      // if (!response.ok) {
      //   throw new Error('로그인 요청에 실패했습니다.');
      // }
  
      // const data = await response.json();
  
      setIsLoggedIn(true);
      localStorage.setItem('loggedIn', true);
      navigate('/');

    } catch (error) {
      setUncorrect(error.message);
    }
  };

  return (
    <>
      <GNB />
      <div className='flex flex-col items-center py-40'>
        <div className='text-4xl w-3/5 my-16'>
          <h2>경쟁하며 성장하는 사람들,</h2>
          <h2 className='font-bold text-rose-500'>핑크 덤벨</h2>
        </div>
        <form onSubmit={handleLogin} className='w-full flex flex-col items-center gap-6'>
          <div className="w-full justify-center flex">
            <label></label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='아이디'
              className="w-3/5 h-16 border rounded-lg px-10 text-lg"
            />
          </div>
          <div className="w-full justify-center flex">
            <label></label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='비밀번호'
              className="w-3/5 h-16 border rounded-lg px-10 text-lg"
            />
          </div>
          <button className="w-3/5 bg-rose-400 hover:bg-rose-500 h-16 border rounded-lg px-10 text-lg" type="submit">로그인</button>
          {uncorrect ? uncorrect : null}

        </form>
          <div className='border border-x-transparent border-t-transparent w-3/5 my-10 '></div>
          <div>회원이 아니신가요? <Link to="/register" className='underline hover:text-gray-500'>회원가입</Link></div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
