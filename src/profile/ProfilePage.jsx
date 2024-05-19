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
    const res = await axios.get(url)
    const data = res.data.response
    return data;
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile", userid],
    queryFn: getProfile,
    keepPreviousData: true,
  })

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
    return <div>Error loading profile</div>
  }

  console.log(data)

  return (
    <>
      <GNB />
      <div className="flex justify-center items-center w-full h-40 bg-gray-200">
        {data && <img src={data.profileImage} alt="프로필 이미지" className="w-20 h-20 rounded-full" />}
      </div>
      { data && data.userId !== userid &&
        <div className="flex justify-center items-center">
          <button className="w-1/2 h-10 bg-rose-500 hover:bg-rose-600 bold" onClick={() => compete(data.userId)}>경쟁자 등록</button>
        </div>
      }
      <div className="flex flex-wrap w-full">
        {data && data.userContents.map((content, index) => (
          <div key={index} className="w-1/2 sm:w-1/3 aspect-square relative">
            <button onClick={() => navigate(`/community/${content.contentId}`)} className="w-full h-full">
              {content.contentType === "video" && <div className="absolute top-1/2 left-1/2">비디오</div>}
              <img src={content.thumbnail} alt="" className="w-full h-full object-cover" />
            </button>
          </div>
        ))}
      </div>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default Profile
