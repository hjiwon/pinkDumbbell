import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "../atoms";

const GNB = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('loggedIn');
    navigate('/');
  }
  const userid = localStorage.getItem('userid');

  return (
    <div className="w-full bg-zinc-700 flex justify-center">
      <div className="flex w-full max-w-screen-lg p-4 justify-between h-16 justify-center items-center text-white">
        <Link to="/" className="text-xl font-bold hover:text-rose-500 transition-colors duration-300">Pink Dumbbell</Link>
        <div className="flex gap-10">
          <Link to="/community">커뮤니티</Link>
          {isLoggedIn ?
          <Link to={`/profile/${userid}`}>내 프로필</Link> : null}
          {isLoggedIn ? 
          <button onClick={handleLogoutClick}>로그아웃</button> :
          <Link to="/login">로그인</Link>
          }
        </div>
      </div>
    </div>
  )
}

export default GNB;