import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SharePage from './SharePage';
import LoginPage from './login/LoginPage';
import { RecoilRoot } from 'recoil';
import Home from './home/Home';
import RegisterPage from './register/RegisterPage';
import ProfilePage from './profile/ProfilePage';


const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/share/:userid" element={<SharePage />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
