import GNB from "../GNB/GNB";
import Footer from "../footer/Footer";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "../atoms";
import UnLoggedInHome from "./UnLoggedInHome";
import LoggedInHome from "./LoggedInHome";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  return (
    <>
      <GNB />
      {isLoggedIn 
      ? <LoggedInHome />
      : <UnLoggedInHome />}
      <Footer />
    </>
  )
}

export default Home;