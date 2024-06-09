import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import GNB from "../GNB/GNB"
import Footer from "../footer/Footer"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { useState } from "react";

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
    const url = `http://110.10.3.11:8090/home/${userid}/addCompetitor`
    await axios.post(url, {
      userId: myUserid,
      competitorId, 
    }, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
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
      console.error(err)
      toast.update(id, {
        render: "경쟁자 등록 실패",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    })
  }
  
  
  const [videoIndex, setVideoIndex] = useState(0);
  if (isLoading) {
    return <div>Loading...</div>
  }
  console.log(data.data.userExerciseRecords)
  const carouselClick = (index) => {
    console.log(index, data?.data.userExerciseRecords.length -1)
    if (index === -1 || index === data?.data.userExerciseRecords.length ) {
      return;
    }
    setVideoIndex(index);
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
  const myUserid = localStorage.getItem("userid")

  return (
    <div className="bg-stone-800 w-full h-full">
      <GNB />
      <div className="flex justify-center items-center w-full h-60 bg-gray-200">
        {data.data && data.data.profileImage && <img src={data.data.profileImage} alt="프로필 이미지" className="w-48 h-48 rounded-full" />}
        {data.data && !data.data.profileImage && <div className="w-20 h-20 rounded-full bg-gray-300"> <img src="/images/profile-simple.svg" alt="" className="opacity-50" /> </div>}
      </div>
      { data.data && data.data.userId != myUserid &&
        <div className="flex justify-center items-center">
          <button className="w-full h-16 font-bold text-lg text-white bg-rose-500 hover:bg-rose-600 bold" onClick={() => compete(data.data.userId)}>경쟁자 등록</button>
        </div>
      }
{ data?.data && data?.data.userId == myUserid &&
                <button onClick={() => navigate("/upload")} className="w-full h-16 bg-rose-500 hover:bg-rose-600 font-bold text-white text-lg">업로드 하러가기</button>
              }
      {
        data.data && data.data.userExerciseRecords.length !== 0 &&
        <>
        <div className="border border-b-transparent border-x-transparent flex flex-col items-center mt-16 w-full py-4 text-white text-2xl relative ">
            {data.data && data.data.userName} 님의 운동 기록
        </div>
        
        <div className="flex flex-col items-center w-full">
          <div className="flex gap-4 w-full justify-center items-center">
          <button onClick={() => carouselClick(videoIndex - 1)} className={`text-white text-4xl ${videoIndex === 0 ? 'cursor-not-allowed opacity-30' : ''}`}>{"<"}</button>
          
          {data?.data.userExerciseRecords[videoIndex]?.video &&
          <>
            <div className="w-full h-[30rem]">
              <video src={data?.data.userExerciseRecords[videoIndex]?.video} controls className="w-full h-full" autoPlay={true} muted={true}/>
            </div>
          </>
          }
          {
            data?.data.userExerciseRecords === null &&
            <div className="w-full h-[30rem] flex justify-center items-center">
              <h1 className="text-white text-4xl font-bold">인증 영상이 없습니다.</h1>
            </div>
          }
            <button onClick={() => carouselClick(videoIndex + 1)} className={`text-white text-4xl ${videoIndex === data?.data?.userExerciseRecords?.length - 1 ? 'cursor-not-allowed opacity-30' : ''}`}>{">"}</button>

            </div>
        </div>
        <div className="border border-t-transparent border-x-transparent flex flex-col items-center mb-16 w-full py-4 text-white text-2xl relative ">
          {data.data && data.data.userExerciseRecords[videoIndex]?.exerciseName} {data.data && data.data.userExerciseRecords[videoIndex]?.record}을 성공했어요!
        </div>
        </>
}


        <div className="border border-b-transparent border-x-transparent flex flex-col items-center mt-16 w-full py-4 text-white text-2xl relative ">
          {data.data && data.data.userName} 님의 게시물
        </div>

      <div className="flex flex-wrap w-full">
        {data.data && data.data.userContents.map((content, index) => (
          <div key={index} className="w-1/2 sm:w-1/3 aspect-square relative">
            <button onClick={() => navigate(`/community/${content.contentId}`)} className="w-full h-full">
              {content.contentType === "video" && <video src={content.address} className="w-full h-full object-cover" />}
              {content.contentType === "image" && <img src={content.address} alt="content" className="w-full h-full object-cover" />}
            </button>
          </div>
        ))}
        {
          data.data && data.data.userContents.length === 0 && (
            <div className="w-full h-40 flex justify-center items-center flex-col justify-between mt-24 font-bold text-2xl text-white">
              <h1>게시물이 없습니다.</h1>
            </div>
          )
        }
      </div>
      <Footer />
      <ToastContainer />
    </div>
  )
}

export default Profile
