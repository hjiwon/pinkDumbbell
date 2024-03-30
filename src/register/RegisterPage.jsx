import React, { useState } from 'react';
import GNB from '../GNB/GNB';
import Footer from '../footer/Footer';
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { isLoggedInState } from '../atoms';

const fakeRegister = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('회원가입이 완료되었습니다.');
    }, 2000);
  });
};

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [uncorrect, setUncorrect] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { isUsernameValid, isPasswordValid } = validateCredentials(username, password);
      if (!isUsernameValid) {
        throw new Error('아이디는 6자리 이상의 영문과 숫자의 조합이어야 합니다.');
      } else if (!isPasswordValid) {
        throw new Error('비밀번호는 8자리 이상의 영문과 숫자의 조합이어야 합니다.');
      } else if (password !== confirmPassword) {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }
      setIsLoading(true);
      await fakeRegister();
      setIsLoading(false);
      // 회원가입 요청을 보내고 응답을 받아옵니다.
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ username, password })
      // });
  
      // if (!response.ok) {
      //   throw new Error('회원가입 요청에 실패했습니다.');
      // }
  
      // const data = await response.json();
  
      // 회원가입 성공 시 로그인 상태를 설정하고, 로그인 화면으로 이동합니다.
      setIsLoggedIn(true);
      localStorage.setItem('loggedIn', true);
    } catch (error) {
      setIsLoading(false);
      setUncorrect(error.message);
    }
  };
  
  const handleProfileButtonClick = () => {
    navigate('/profile');
  };

  return (
    <>
      <GNB />
      <div className='flex flex-col items-center py-40'>
        {isLoggedIn ?
        <div className='w-full flex flex-col items-center'>
          <div className='text-4xl my-16'>
            <h2>회원가입에 성공했어요 !</h2>
            <h2 className='font-bold text-rose-500'>지금 바로 프로필 입력하러 가요</h2>
          </div>
          <button onClick={handleProfileButtonClick} className="w-3/5 bg-rose-400 hover:bg-rose-500 h-16 border rounded-lg px-10 text-lg" type="submit">프로필 페이지로 이동</button>
        </div> : 
        <>
        <div className='text-4xl w-3/5 my-16'>
        <h2>경쟁하며 성장하는 사람들,</h2>
        <h2 className='font-bold text-rose-500'>핑크 덤벨</h2>
      </div>
        <form onSubmit={handleRegister} className='w-full flex flex-col items-center gap-6'>
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
          <div className="w-full justify-center flex">
            <label></label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='비밀번호 확인'
              className="w-3/5 h-16 border rounded-lg px-10 text-lg"
            />
          </div>
          {isLoading ? 
          <div className='w-3/5 bg-rose-200 h-16 border rounded-lg px-10 text-lg items-center justify-center flex'><div className='loading' /></div> :
          <button className="w-3/5 bg-rose-400 hover:bg-rose-500 h-16 border rounded-lg px-10 text-lg" type="submit">회원가입</button>
          }

          {uncorrect ? uncorrect : null}
        </form>
        </>}
        
          <div className='border border-x-transparent border-t-transparent w-3/5 my-10 '></div>
          <div>이미 회원이신가요? <Link to="/login" className='underline hover:text-gray-500'>로그인</Link></div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
