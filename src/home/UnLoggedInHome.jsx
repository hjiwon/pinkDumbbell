import { Link } from "react-router-dom";

const UnLoggedInHome = () => {

  return (
    <>
      <div className="w-full h-full flex justify-center bg-cover bg-[url('../public/images/landing-main-background.jpg')]">
        <div className="w-full max-w-screen-lg h-[42rem] relative flex items-center">
          <div className="absolute top-20 left-10 font-bold text-white text-6xl">
            남들과 비교하며
          </div>
          <div className="absolute top-40 left-10 font-bold text-white text-6xl">
            성장해가는 운동 실력
          </div>

          <div className="absolute top-[17rem] left-10 text-white text-xl">
            나와 비슷한 체형의 사람들은
          </div>
          <div className="absolute top-[19rem] left-10 text-white text-xl">
            어떻게 운동하고 있는지
          </div>
          <div className="absolute top-[21rem] left-10 text-white text-xl">
            직접 확인해보세요
          </div>

          <Link to="/login" className="hover:bg-rose-500 text-2xl font-bold w-2/5 h-16 bg-rose-400 absolute bottom-20 rounded-lg left-10 flex items-center justify-center">
            운동 실력 비교하기
          </Link>
        </div>
      </div>

      <div className="w-full h-full flex justify-center bg-cover bg-zinc-800">
        <div className="w-full max-w-screen-lg h-[42rem] relative flex items-center">
          <img className="absolute w-1/2 h-3/4" src="images/powerlifting.png" alt="" />
          <div className="absolute top-20 right-10 font-bold text-white text-6xl">
            자세 교정부터
          </div>
          <div className="absolute top-40 right-10 font-bold text-white text-6xl">
            객관적인 순위까지
          </div>

          <div className="absolute top-[21rem] right-10 text-white text-xl">
            자세가 올바른지 궁금한가요?
          </div>
          <div className="absolute top-[23rem] right-10 text-white text-xl">
          다른 사용자에게 피드백을 받아보세요
          </div>
          <div className="absolute top-[25rem] right-10 text-white text-xl">
          다른 사용자들과 소통해가며 빠른 성장을 경험해보세요.
          </div>
          <div className="absolute top-[27rem] right-10 text-white text-xl">
            부상 없는 빠른 성장을 이룰 수 있어요.
          </div>
        </div>
      </div>
    </>
  )
}

export default UnLoggedInHome;