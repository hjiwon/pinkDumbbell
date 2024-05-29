import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import GNB from "../GNB/GNB"
import Footer from "../footer/Footer"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { userid } = useParams();
  console.log(userid)
  const getProfile = async () => {
    const url = `http://110.10.3.11:8090/user/${userid}/profile`
    const res = axios.get(url)
    console.log(res)  
    return res
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile", userid],
    queryFn: getProfile,
    keepPreviousData: true,
    retry: 0,
  })
  console.log(data)

  const compete = async (competitorId) => {
    const id = toast.loading("전송중입니다...");
    const url = `http://`
    await axios.post(url, {
      userId: userid,
      competitorId, 
    })
    .then(res => {
      toast.update(id, {
        render: "경쟁자 등록 완료!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      })
    })
    .catch(err => {
      toast.update(id, {
        render: "경쟁자 등록 실패",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    
    return (
      <>
        <GNB />
        <div className="flex justify-center items-center w-full h-40 bg-gray-200">
          {<div className="w-20 h-20 rounded-full bg-gray-300"> <img src="/images/profile-simple.svg" alt="" className="opacity-50" /> </div>}
        </div>
        <div className="flex justify-center items-center">
          확인할 수 없는 사용자입니다.
        </div>
        <div className="flex flex-wrap w-full">
            
        <div className="w-full h-40 flex justify-center items-center flex-col justify-between mt-24">
          <h1>게시물이 없습니다.</h1>
        </div>
            
          
        </div>
        <Footer />
        <ToastContainer />
      </>
    )
  }

  return (
    <>
      <GNB />
      <div className="flex justify-center items-center w-full h-40 bg-gray-200">
        {data.data && data.data.profileImage && <img src={data.data.profileImage} alt="프로필 이미지" className="w-20 h-20 rounded-full" />}
        {data.data && !data.data.profileImage && <div className="w-20 h-20 rounded-full bg-gray-300"> <img src="/images/profile-simple.svg" alt="" className="opacity-50" /> </div>}
      </div>
      { data.data && data.data.userId != userid &&
        <div className="flex justify-center items-center">
          <button className="w-1/2 h-10 bg-rose-500 hover:bg-rose-600 bold" onClick={() => compete(data.data.userId)}>경쟁자 등록</button>
        </div>
      }
      <div className="flex flex-wrap w-full">
        {data.data && data.data.userContents.map((content, index) => (
          <div key={index} className="w-1/2 sm:w-1/3 aspect-square relative">
            <button onClick={() => navigate(`/community/${content.contentId}`)} className="w-full h-full">
              {content.contentType === "video" && <div className="absolute top-1/2 left-1/2">비디오</div>}
              <img src={content.thumbnail} alt="" className="w-full h-full object-cover" />
            </button>
          </div>
        ))}
        {
          data.data && data.data.userContents.length === 0 && (
            <div className="w-full h-40 flex justify-center items-center flex-col justify-between mb-24">
              { data.data && data.data.userId == userid &&
                <button onClick={() => navigate("/upload")} className="w-full h-16 bg-rose-500 hover:bg-rose-600 font-bold text-white text-lg">업로드 하러가기</button>
              }
              <h1>게시물이 없습니다.</h1>
            </div>
          )
        }
      </div>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default Profile