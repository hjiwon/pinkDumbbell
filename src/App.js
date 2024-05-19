import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SharePage from './SharePage';
import LoginPage from './login/LoginPage';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './home/Home';
import RegisterPage from './register/RegisterPage';
import ProfilePage from './profile/ProfilePage';
import UploadPost from './uploadPost/uploadPost';
import Community from './community/Community';
import Post from './community/Post';


const App = () => {
  const queryClient = new QueryClient();
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile/:userid" element={<ProfilePage />} />
            <Route path="/share/:userid" element={<SharePage />} />
            <Route path="/upload" element={<UploadPost />} />
            <Route path="/community" element={<Community />} />
            <Route path="/community/:contentid" element={<Post />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
