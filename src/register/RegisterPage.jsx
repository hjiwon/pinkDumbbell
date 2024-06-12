import React, { useState } from 'react';
import GNB from '../GNB/GNB';
import Footer from '../footer/Footer';
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { isLoggedInState, registeredTodayState } from '../atoms';
import axios from 'axios';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [uncorrect, setUncorrect] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const [registeredToday, setRegisteredToday] = useRecoilState(registeredTodayState);
  const [selectedGender, setSelectedGender] = useState('');
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);

  const validateCredentials = (username, password, email) => {
    const usernameRegex = /^[가-힣a-zA-Z0-9]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
  
    const isUsernameValid = usernameRegex.test(username);
    const isPasswordValid = passwordRegex.test(password);
    const isEmailValid = emailRegex.test(email);
  
    return {
      isUsernameValid,
      isPasswordValid,
      isEmailValid
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setUncorrect(null);
    try {
      const { isUsernameValid, isPasswordValid, isEmailValid } = validateCredentials(username, password, email);
      if (!isUsernameValid) {
        throw new Error('닉네임은 2자 이상의 한글, 영문, 숫자로 이루어져야 합니다.');
      } else if (!isPasswordValid) {
        throw new Error('비밀번호는 8자리 이상의 영문, 숫자로 이루어져야 합니다.');
      } else if (password !== confirmPassword) {
        throw new Error('비밀번호가 일치하지 않습니다.');
      } else if (!isEmailValid) {
        throw new Error('이메일 형식이 올바르지 않습니다.');
      } else if (!selectedGender) {
        throw new Error('성별을 선택해주세요.');
      }

      const res = await axios.post('http://110.10.3.11:8090/join', {
        name: username,
        email: email,
        password: password,
        sex: selectedGender
      });

      if (res.data.success) {
        setIsRegistered(true);
        localStorage.setItem('registeredToday', true);
      } else {
        setUncorrect('이미 존재하는 이메일입니다.');
      }
    } catch (error) {
      setUncorrect(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleProfileButtonClick = () => {
    navigate('/login');
  };

  const handleGenderClick = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <>
      <GNB />
      <div className='flex flex-col items-center py-40'>
        {isRegistered ?
        <div className='w-full flex flex-col items-center'>
          <div className='text-4xl my-16'>
            <h2>회원이 되셨어요 !</h2>
            <br />
            <h2 className='font-bold text-rose-500'>지금 바로 로그인 해보세요.</h2>
          </div>
          <button onClick={handleProfileButtonClick} className="w-3/5 bg-rose-400 hover:bg-rose-500 h-16 border rounded-lg px-10 text-lg" type="button">로그인 페이지로 이동</button>
        </div> : 
        <>
        <div className='text-4xl w-3/5 my-16'>
          <h2>경쟁하며 성장하는 사람들,</h2>
          <h2 className='font-bold text-rose-500'>핑크 덤벨</h2>
        </div>
        <form onSubmit={handleRegister} className='w-full flex flex-col items-center gap-6'>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='이메일'
            className="w-3/5 h-16 border rounded-lg px-10 text-lg"
          />
          <div className="w-full justify-center flex">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='닉네임'
              className="w-3/5 h-16 border rounded-lg px-10 text-lg"
            />
          </div>
          <div className="w-full flex justify-center">
            <div className="flex space-x-4 w-3/5">
              <button
                type="button"
                className={`w-1/2 h-16 border rounded-lg px-4 text-lg ${
                  selectedGender === '남' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
                onClick={() => handleGenderClick('남')}
              >
                남
              </button>
              <button
                type="button"
                className={`w-1/2 h-16 border rounded-lg px-4 text-lg ${
                  selectedGender === '여' ? 'bg-rose-500 text-white' : 'bg-gray-200'
                }`}
                onClick={() => handleGenderClick('여')}
              >
                여
              </button>
            </div>
          </div>
          <div className="w-full justify-center flex">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='비밀번호'
              className="w-3/5 h-16 border rounded-lg px-10 text-lg"
            />
          </div>
          <div className="w-full justify-center flex">
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
          {uncorrect && <div className="text-red-500 mt-2">{uncorrect}</div>}
        </form>
        </>
        }
        <div className='border border-x-transparent border-t-transparent w-3/5 my-10 '></div>
        <div>이미 회원이신가요? <Link to="/login" className='underline hover:text-gray-500'>로그인</Link></div>
      </div>
      <Footer />
    </>
  );
};

export default RegisterPage;
