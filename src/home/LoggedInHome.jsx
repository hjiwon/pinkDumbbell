import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  Legend,
  Rectangle,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "@tanstack/react-query";
import UnLoggedInHome from "./UnLoggedInHome";

import { useRecoilState } from "recoil";
import { isLoggedInState } from "../atoms";

          const data2 = [
            {
              name: '백엔드에서',
              me: 120,
              competitor: 40,
            },
            {
              name: '정한',
              me: 150,
              competitor: 100,
            },
            {
              name: '운동 3가지',
              me: 70,
              competitor: 80,
            }
          ];

const LoggedInHome = () => {
  const [bodyModal, setBodyModal] = useState(false);
  const [exerciseModal, setExerciseModal] = useState(false);
  const [profileImageModal, setProfileImageModal] = useState(false);
  const userid = localStorage.getItem('userid');
  console.log(localStorage.getItem("token"))
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const { data, refetch, error, isLoading } = useQuery({
    queryKey: ["home"],
    queryFn: () => {
    console.log("fetching data");
    return axios.get(`http://110.10.3.11:8090/home/${userid}`,
      {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }
    )
    .then((res) => res.data.response)
    .catch((err) => {
      console.log(err);
        // 로그인 상태 풀기
      localStorage.removeItem("loggedIn");
      setIsLoggedIn(false);
    })},
    retry: 0,
  });
  
  const [selectedCompetitor, setSelectedCompetitor] = useState(0);
  const [imageDirectory, setImageDirectory] = useState();

  const [userHeight, setUserHeight] = useState("");
  const [userWeight, setUserWeight] = useState("");
  const [userMuscleMass, setUserMusclemass] = useState("");
  const [userBodyFat, setUserBodyFat] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const handleBodyModalInput = (e) => {
    // 숫자만 입력이 가능하도록 해야함
    if(isNaN(e.target.value)) {
      toast.warn("숫자만 입력해주세요!");
      return;
    }
    if(e.target.name === "height") {
      setUserHeight(e.target.value);
    } else if(e.target.name === "weight") {
      setUserWeight(e.target.value);
    } else if(e.target.name === "muscleMass") {
      setUserMusclemass(e.target.value);
    } else if(e.target.name === "bodyFat") {
      setUserBodyFat(e.target.value);
    }
  }
  const [exercise, setExercise] = useState( {
    exerciseName: "benchPress",
    record: ""
  });

  const handleExerciseModalInput = (e) => {
    if(isNaN(e.target.value)) {
      toast.warn("숫자만 입력해주세요!");
      return;
    }
    setExercise({
      ...exercise,
      exerciseName: document.getElementById("exercise").value,
      record: parseFloat(e.target.value)
    });
  }
  const handleExerciseNameChange = (e) => {
    setExercise({
      ...exercise,
      exerciseName: e.target.value
    });
  }
  const handleCompetitorClick = (num) => {
    setSelectedCompetitor(num);
  };
  
  const [hoveredIndex, setHoveredIndex] = useState(0);
  
  const handleMouseEnter = (index) => {
    setSelectedCompetitor(index);
    setHoveredIndex(index);
  };
  const handleBodyModalOutsideClick = (e) => {
    if(e.target === e.currentTarget) {
      setBodyModal(false);
      setUserBodyFat("");
      setUserHeight("");
      setUserMusclemass("");
      setUserWeight("");
    }
  }
  const handleExerciseModalOutsideClick = (e) => {
    if(e.target === e.currentTarget) {
      setExerciseModal(false);
    }
  }
  const handleProfileImageModalOutsideClick = (e) => {
    if(e.target === e.currentTarget) {
      setProfileImageModal(false);
      setUploadedImage(null);
      setImageDirectory("");
      setImageSelected(false);
    }
  }
  const handleSelectImage = (e) => {
    setImageDirectory(e.target.value);
    const selectedImage = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
    }
    reader.readAsDataURL(selectedImage);
    setCropperHidden(false);
  }
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  const cropperRef = useRef(null);
  const handleCrop = () => {
    const imageElement = cropperRef?.current?.cropper;
    const canvas = imageElement.getCroppedCanvas();
    const croppedImage = canvas.toDataURL("image/jpeg");
  }
  const [cropperHidden, setCropperHidden] = useState(true);
  const [imageSelected, setImageSelected] = useState(false);
  const endCrop = () => {
    const imageElement = cropperRef?.current?.cropper;
    const canvas = imageElement.getCroppedCanvas();
    const croppedImage = canvas.toDataURL("image/jpeg");
    // CroppedImage를 uploadedImage로 설정
    setUploadedImage(croppedImage);
    // Cropper를 닫기
    setCropperHidden(true);
    setImageSelected(true);
  }

  const handleModalCancel = () => {
    setBodyModal(false);
    setExerciseModal(false);
    setProfileImageModal(false);
    setUploadedImage(null);
    setImageDirectory("");
    setImageSelected(false);
    setUserBodyFat("");
    setUserHeight("");
    setUserMusclemass("");
    setUserWeight("");
  }

  const actLikeSendData = () => {
    const id = toast.loading("전송중입니다...");
    setTimeout(() => {
      toast.update(id, { type: "success", render: "전송 완료!", isLoading: false, autoClose: 2000 });
    }, 3000);
  }
  const actLikeFailData = () => {
    const id = toast.loading("전송중입니다...");
    setTimeout(() => {
      toast.update(id, { type: "error", render: "전송 실패!", isLoading: false, autoClose: 2000 });
    }, 3000);
  }

  console.log(localStorage.getItem("token"));

  const handleBodyModify = () => {
    ///user/{userId}/modify
    console.log(`http://110.10.3.11:8090/user/${userid}/modify`)
    console.log(userHeight, userWeight, userMuscleMass, userBodyFat)
    console.log(localStorage.getItem("token"))
    axios.post(`http://110.10.3.11:8090/user/${userid}/modify`, {
      height: userHeight,
      weight: userWeight,
      muscleMass: userMuscleMass,
      fatMass: userBodyFat,
      userId: userid
    }, 
    {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then((res) => {
      toast.success("신체 정보가 수정되었습니다!");
      //모달 닫기
      setBodyModal(false);
      setUserBodyFat("");
      setUserHeight("");
      setUserMusclemass("");
      setUserWeight("");
    })
    .then(() => {
      refetch();
    })
    .catch((err) => {
      console.log(err);
      toast.error("신체 정보 수정에 실패했습니다.");
    });
  };

  const handleExerciseRecord = () => {
    // /home/{userId}/uploadRecord
    if (!exercise.record) {
        toast.warn("기록을 입력해주세요!");
        return;
    }

    const tempBlob = new Blob([exercise.record], { type: "audio/mp4" });
    const formData = new FormData();
    console.log(exercise)
    exercise.record = exercise.record.toString() + "kg";
    formData.append("exercise", new Blob([JSON.stringify(exercise)], { type: "application/json" }));
    formData.append("exerciseVideo", tempBlob);
    const toastId = toast.loading("운동 기록을 업로드 중입니다...");
    const token = localStorage.getItem("token");

    axios.post(`http://110.10.3.11:8090/user/${userid}/record`, formData, {
      headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token
      }
    })
    .then((res) => {
      toast.update(toastId, { type: "success", render: "운동 기록이 업로드되었습니다!", isLoading: false, autoClose: 2000 });
      setExercise({
          exerciseName: "benchPress",
          record: ""
      })
    })
    .then(() => {
      refetch();
    })
    .catch((err) => {
      console.log(err);
      toast.update(toastId, { type: "error", render: "운동 기록 업로드에 실패했습니다!", isLoading: false, autoClose: 2000 });
    });
};

  const handleProfileImage = () => {
    const toastId = toast.loading("프로필 사진을 업로드 중입니다...");
    const formData = new FormData();
    const blobImage = new Blob([uploadedImage]);
    console.log(uploadedImage)
    formData.append("profileImage", blobImage);
    axios.post(`http://110.10.3.11:8090/user/${userid}/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("token")
      }
    })
    .then((res) => {
      toast.update(toastId, { type: "success", render: "프로필 사진이 업로드되었습니다!", isLoading: false, autoClose: 2000 });
      setProfileImageModal(false);
      setImageDirectory("");
      setUploadedImage(null);
      setImageSelected(false);
    })
    .then(() => {
      refetch();
    })
    .catch((err) => {
      toast.update(toastId, { type: "error", render: "프로필 사진 업로드에 실패했습니다!", isLoading: false, autoClose: 2000 });
      console.log(err);
    });
  }
  const handleCompetitorAdd = (competitorId) => {
    if(data.competitors.length >= 3) {
      const competitorGraph = document.getElementById("competitorGraph");
      competitorGraph.scrollIntoView({ behavior: "smooth" });
      toast.error("경쟁자는 최대 3명까지 추가할 수 있습니다.");
      return;
    }
    const id = toast.loading("경쟁자를 추가하는 중입니다...");
    axios.post(`http://110.10.3.11:8090/home/${competitorId}/addCompetitor`)
    .then((res) => {
      toast.update(id, { type: "success", render: "경쟁자가 추가되었습니다!", isLoading: false, autoClose: 2000 });
    })
    .then(() => {
      refetch();
    })
    .catch((err) => {
      toast.update(id, { type: "error", render: "경쟁자 추가에 실패했습니다!", isLoading: false, autoClose: 2000 });
    });
  }  
  
  const registeredToday = localStorage.getItem('registeredToday');
  useEffect(() => {
    if (registeredToday) {
      setBodyModal(true);
      localStorage.removeItem('registeredToday');
    }
  }, [])

  if(isLoading) return <div>Loading...</div>;

  if(!data) {
    return (
      <>
        <UnLoggedInHome />
        <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={data2}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* y축에 단위로 kg 추가하기 */}
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'kg', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="me" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="competitor" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
        </ResponsiveContainer>
        </>
    )
  }

  if (!data) return <div>Loading...</div>;
  const noCompetitors = data.competitors?.length === 0;
  const watchCompetitors = () => {
    const recommendedUserSection = document.getElementById("recommendedProfile");
    recommendedUserSection.scrollIntoView({ behavior: "smooth" });
  }


  console.log(data);
              {/* 
          
0
: 
{name: '데드리프트', me: '160kg', average: '130kg'}
1
: 
{name: '벤치프레스', me: '100kg', average: '90kg'}
2
: 
{name: '스쿼트', me: '130kg', average: '110kg'}

data.graph에서 kg를 빼고 숫자만 넣어야함
 */}

  data.graph?.forEach((item) => {
    item.me = parseInt(item.me);
    item.average = parseInt(item.average);
  });


  return (
    <div className="w-full h-full flex justify-center bg-cover bg-zinc-800">
      <ToastContainer 
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      style={{width: "25%"}}
      theme="light" />

      {profileImageModal &&
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10 min-w-screen-lg" onClick={handleProfileImageModalOutsideClick}>
        <div className="m-4 pt-20 w-full bg-white flex flex-col gap-20 items-center justify-center md:w-1/2">
          <div className={`text-2xl md:text-3xl ${imageSelected ? 'hidden' : ''}`}>이미지를 선택해주세요</div>
          <div className={`text-2xl md:text-3xl ${!imageSelected ? 'hidden' : ''}`}>프로필을 설정할까요?</div>

          <div className={`flex flex-col items-center justify-center ${!imageDirectory || imageSelected ? 'hidden' : ''}`} >
            <Cropper
              src={uploadedImage}
              style={{height: 400, width: "100%"}}
              initialAspectRatio={1}
              guides={true}
              crop={handleCrop}
              ref={cropperRef}
              movable={false}
              zoomable={false}
              scalable={false}
              // Fixed Ratio
              aspectRatio={1}
            />
          </div>
          {uploadedImage && cropperHidden && 
            <>
            <div className="w-60 h-60 overflow-hidden">
              <img id="preview" src={uploadedImage} alt="preview" className="rounded-full"/>
            </div>
            </>
          }
          <div className={`flex gap-4 w-full items-center justify-center ${imageDirectory ? 'hidden' : ''}`}>
            <input type="file" id="file2" className="hidden" accept="image/*" onChange={handleSelectImage}/>
            <input type="text" placeholder="첨부파일" className="h-12 border border-gray-300 px-6 py-3 cursor-not-allowed" value={imageDirectory}/>
            <label for="file2" className="bg-gray-200 mx-4 px-6 py-3 h-12 flex items-center justify-center hover:bg-gray-300">파일찾기</label>
          </div>
          <div className={`flex w-full items-center justify-center ${!imageDirectory || imageSelected ? '' : 'hidden'}`}>
            <button onClick={handleModalCancel} className={`w-1/2 h-14 bg-gray-500 text-white hover:bg-gray-600 `}>취소</button>
            <button className={`w-1/2 h-14 text-white ${!imageSelected ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-rose-500 hover:bg-rose-600'}`} onClick={handleProfileImage}>전송</button>
          </div>

          <div className={`flex w-full items-center justify-center ${(imageDirectory && !imageSelected) ? '' : 'hidden'}`}>
            <button onClick={handleModalCancel} className={`w-1/2 h-14 bg-gray-500 text-white hover:bg-gray-600`}>취소</button>
            <button onClick={endCrop} className={`w-1/2 h-14 bg-rose-500 text-white hover:bg-rose-600`}>이미지 자르기</button>
          </div>
        </div>
      </div>}

      {bodyModal && 
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10 min-w-screen-lg" onClick={handleBodyModalOutsideClick}>
        <div className="m-4 pt-20 w-full bg-white flex flex-col gap-10 items-center justify-center md:w-1/2">
          <div className="text-2xl md:text-3xl">신체 정보를 입력해주세요</div>
          <span className="text-gray-400">적합한 경쟁자를 추천해드릴게요</span>
          <div className="flex flex-col items-center gap-4 w-2/3 pb-10">
            <input type="text" placeholder="키(cm)" className="w-full h-10 border border-gray-300 rounded-md p-3" value={userHeight} onChange={handleBodyModalInput} name="height"/>
            {/* <input type="range" placeholder="키" className="w-full h-10 border border-gray-300 rounded-md" min="120" max="210" step="0.1" value={userHeight} onChange={(e) => setUserHeight(e.target.value)}/> */}
            <input type="text" placeholder="몸무게(kg)" className="w-full h-10 border border-gray-300 rounded-md p-3" value={userWeight} onChange={handleBodyModalInput} name="weight"/>
            <input type="text" placeholder="근육량(kg)" className="w-full h-10 border border-gray-300 rounded-md p-3" value={userMuscleMass} onChange={handleBodyModalInput} name="muscleMass"/>
            <input type="text" placeholder="체지방량(kg)" className="w-full h-10 border border-gray-300 rounded-md p-3" value={userBodyFat} onChange={handleBodyModalInput} name="bodyFat"/>
          </div>
          
          <div className="flex w-full items-center justify-center">
            <button onClick={handleModalCancel} className={`w-1/2 h-14 bg-gray-500 text-white hover:bg-gray-600 ${!cropperHidden ? 'hidden' : ''}`}>취소</button>
            <button className={`w-1/2 h-14 bg-rose-500 text-white hover:bg-rose-600 ${!cropperHidden ? 'hidden' : ''}`} onClick={handleBodyModify}>전송</button>
          </div>
        </div>
      </div>}
      {exerciseModal &&
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10 min-w-screen-lg" onClick={handleExerciseModalOutsideClick}>
        <div className="m-4 pt-20 w-full bg-white flex flex-col gap-10 items-center justify-center md:w-1/2">
          <div className="text-2xl md:text-3xl">1RM 기록을 입력해주세요</div>
          <span className="text-gray-400">여기서 1RM이란, 1회에 최대로 들 수 있는 무게를 말해요</span>
          <div className="flex flex-col items-center gap-4 w-2/3 pb-10">
            <select name="exercise" id="exercise" className="w-full border border-gray-300 rounded-md p-3" onChange={handleExerciseNameChange}>
              <option value="benchPress">벤치프레스</option>
              <option value="squat">스쿼트</option>
              <option value="deadlift">데드리프트</option>
              <option value="shoulderPress">숄더프레스</option>
              <option value="pullUp">풀업</option>
              <option value="dip">딥</option>
              <option value="bicepCurl">바벨컬</option>
              <option value="tricepExtension">트라이셉익스텐션</option>
              <option value="legPress">레그프레스</option>
              <option value="legCurl">레그컬</option>
              <option value="legExtension">레그익스텐션</option>
              <option value="calfRaise">카프레이즈</option>
              <option value="crunch">크런치</option>
              <option value="legRaise">레그레이즈</option>
            </select>
            <input type="text" placeholder="운동 기록(kg)" className="w-full h-10 border border-gray-300 rounded-md p-3" onChange={handleExerciseModalInput} value={exercise.record} name="exercise"/>
          </div>
          
          <div className="flex w-full items-center justify-center">
            <button onClick={handleModalCancel} className={`w-1/2 h-14 bg-gray-500 text-white hover:bg-gray-600 ${!cropperHidden ? 'hidden' : ''}`}>취소</button>
            <button onClick={handleExerciseRecord} className={`w-1/2 h-14 bg-rose-500 text-white hover:bg-rose-600 ${!cropperHidden ? 'hidden' : ''}`}>전송</button>
          </div>
        </div>
      </div>}

      <div className="w-full max-w-screen-lg h-full relative flex flex-col items-center">
        <div className="text-3xl flex flex-col items-center justify-around text-white md:flex-row mt-10">
          {
            noCompetitors ? 
            <div><span className="text-[#9894f8]">{data?.name}</span>님은 아직 경쟁자가 없어요</div> :
            <div className=""><span className="text-[#9894f8]">{data?.name}</span>님과 <span className="text-[#82ca9d]">{data?.competitors[selectedCompetitor]?.userName}</span>님의<br/>운동 기록을 비교해봤어요</div>
          }

          {
          data?.profile
          ?
          <div className="w-40 h-40 m-12 overflow-hidden rounded-full">
            <img className="w-full h-full object-cover" src={`${data?.competitors[0]?.userProfile}`} alt="" /> 
          </div>
          :
          <div className="m-12 flex items-center gap-4 flex-col justify-center">
            <button onClick={() => setProfileImageModal(true)}>
            <div className="hover:rotate-45 transition-transform bg-gray-200 w-40 h-40 rounded-full flex items-center justify-center hover:bg-gray-300">
              <img className="w-1/3" src="/images/add-plus.webp" alt="" />
            </div>
            <span className="text-white text-sm">프로필 추가하기</span>
            </button>
          </div>
          }
          </div>

        {/* 그래프 */}
        
        <div className="relative flex flex-col items-center justify-center w-full border border-top-white border-x-transparent gap-8 py-12">
          { noCompetitors && 
          <>
            <div className="flex flex-col items-center justify-center gap-14 text-white text-xl mt-10">
              경쟁자를 추가해서 운동 기록을 비교해보세요!
            </div>
            <div className="flex flex-col items-center justify-center gap-14 text-white font-bold text-xl mb-10">
              <button onClick={watchCompetitors} className="w-40 h-12 bg-rose-500 hover:bg-rose-600 rounded-md">경쟁자 보러가기</button>
            </div>
          </>
          }
          
         
          { !noCompetitors &&
          <div className="grid grid-cols-2 md:grid-cols-3 items-center justify-center justify-items-center content-center self-center place-items-center place-self-center justify-self-center" id="competitorGraph">
          <BarChart
            width={isMobile ? 170 : 200}
            height={isMobile ? 200 : 300}
            data={data.competitors[selectedCompetitor]?.userCompare[0]}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis stroke="#ffffff" dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="me" fill="#9894f8" />
            <Bar dataKey="competitor" fill="#82ca9d" />
          </BarChart>
          
          <BarChart
            width={isMobile ? 170 : 200}
            height={isMobile ? 200 : 300}
            data={data.competitors[selectedCompetitor]?.userCompare[1]}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis stroke="#ffffff" dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="me" fill="#9894f8" />
            <Bar dataKey="competitor" fill="#82ca9d" />
          </BarChart>


          <BarChart
            width={isMobile ? 170 : 200}
            height={isMobile ? 200 : 300}
            data={data.competitors[selectedCompetitor]?.userCompare[2]}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis stroke="#ffffff" dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="me" fill="#9894f8" />
            <Bar dataKey="competitor" fill="#82ca9d" />
          </BarChart>

          <BarChart
            width={isMobile ? 170 : 200}
            height={isMobile ? 200 : 300}
            data={data.competitors[selectedCompetitor]?.userCompare[3]}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis stroke="#ffffff" dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="me" fill="#9894f8" />
            <Bar dataKey="competitor" fill="#82ca9d" />
          </BarChart>

          <BarChart
            width={isMobile ? 170 : 200}
            height={isMobile ? 200 : 300}
            data={data.competitors[selectedCompetitor]?.userCompare[4]}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis stroke="#ffffff" dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="me" fill="#9894f8" />
            <Bar dataKey="competitor" fill="#82ca9d" />
          </BarChart>

          <BarChart
            width={isMobile ? 170 : 200}
            height={isMobile ? 200 : 300}
            data={data.competitors[selectedCompetitor]?.userCompare[5]}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis stroke="#ffffff" dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="me" fill="#9894f8" />
            <Bar dataKey="competitor" fill="#82ca9d" />
          </BarChart>
          </div>
          }

          { !noCompetitors && 
          <div className="flex flex-col items-end pr-10">

          {data.competitors.map((competitor, index) => (
            <div key={index} className="flex items-center">
              <img onClick={() => {handleCompetitorClick(index); handleMouseEnter(index)}} className="rounded-md w-20 bg-white" src={`${competitor.userProfile}`} alt="경쟁프로필" onMouseEnter={() => handleMouseEnter(index)} style={{height: hoveredIndex === index ? '200px' : '100px', transition: 'height 0.3s ease', width: hoveredIndex === index ? '200px' : '100px'}}/>
              {
              competitor.userName ? 
              <div>
                <button className="text-white break-keep" style={{width: hoveredIndex === index ? '100px' : '0px', opacity: hoveredIndex === index ? 1 : 0, transition: 'all 0.3s ease'}}>프로필 보기</button>
                <button className="text-white break-keep" style={{width: hoveredIndex === index ? '100px' : '0px', opacity: hoveredIndex === index ? 1 : 0, transition: 'all 0.3s ease'}}>삭제</button>
              </div> :
              <div>
                <button className="text-white break-keep" style={{width: hoveredIndex === index ? '100px' : '0px', opacity: hoveredIndex === index ? 1 : 0, transition: 'all 0.3s ease'}}>경쟁자 없음</button>
                <button className="text-white break-keep" style={{width: hoveredIndex === index ? '100px' : '0px', opacity: hoveredIndex === index ? 1 : 0, transition: 'all 0.3s ease'}} onClick={watchCompetitors}>보러가기</button>
              </div>
              }
            </div>))}
          </div>
          }
        </div>
        <div className="flex flex-col w-full items-center relative">
          <button onClick={() => {setBodyModal(true)}} className="text-3xl text-white transition-transform hover:rotate-45 hover:text-gray-400 absolute right-5 top-5">+</button>

          { data.userPercentage !== "null%" ?
          <div className="text-xl text-white pt-10">{data.name}님은 상위 {data.userPercentage}의 신체를 갖고 있어요</div> :
          <div className="text-xl text-white pt-10">{data.name}님의 신체 정보가 없어요!</div>
          }

          {/* 차트 오른쪽으로 20px 이동 */}
          <ResponsiveContainer width="100%" height={400} className="mr-16">
          
          <LineChart
              width={500}
              height={300}
              data={data.graph}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
                {/* y축 단위로 kg 추가하기 */}
              <YAxis label={{ value: 'kg', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="me" stroke="#8884d8" />
              <Line type="monotone" dataKey="average" stroke="#82ca9d" />

            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 운동 기록 */}

        <div className="border border-b-transparent flex flex-col items-center mt-16 w-full py-4 text-white text-2xl relative">
            운동 기록
            <button onClick={() => setExerciseModal(true)} className="text-3xl text-white transition-transform hover:rotate-45 hover:text-gray-400 absolute right-5">+</button>
        </div>
        <div className="border h-60 text-white flex w-full justify-around mb-20">
          <div className="w-1/3 flex flex-col items-center">
            <div className="h-1/3 flex items-center">
              {data.userRecords[0]?.sportName}
            </div>
            <div className="h-1/3 flex items-center">
              {data.userRecords[0]?.record}
            </div>
            <div className="h-1/3 flex items-center">
              상위 {data.userRecords[1]?.percentage}
            </div>
          </div>

          <div className="w-1/3 border-x flex flex-col items-center">
            <div className="h-1/3 flex items-center">
              {data.userRecords[1]?.sportName}
            </div>
            <div className="h-1/3 flex items-center">
              {data.userRecords[1]?.record}
            </div>
            <div className="h-1/3 flex items-center">
              상위 {data.userRecords[1]?.percentage}
            </div>
          </div>

          <div className="w-1/3 flex flex-col justify-center items-center">
            <div className="h-1/3 flex items-center">
              {data.userRecords[2]?.sportName}
            </div>
            <div className="h-1/3 flex items-center">
              {data.userRecords[2]?.record}
            </div>
            <div className="h-1/3 flex items-center">
              상위 {data.userRecords[2]?.percentage}
            </div>
          </div>
        </div>
        {/* 운동 기록 비교 그래프 (graphData 사용) */}
        {/* <div className="border border-b-transparent flex flex-col items-center mt-16 w-full py-4 text-white text-2xl">
            운동 기록 비교
        </div>
        <BarChart width={800} height={400} data={graphData[0]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip />
          <Bar dataKey="me" fill="#9894f8" />
          <Bar dataKey="competitor" fill="#82ca9d" />
        </BarChart>

        <BarChart width={800} height={400} data={graphData[1]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip />
          <Bar dataKey="me" fill="#9894f8" />
          <Bar dataKey="competitor" fill="#82ca9d" />
        </BarChart>

        <BarChart width={800} height={400} data={graphData[2]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip />
          <Bar dataKey="me" fill="#9894f8" />
          <Bar dataKey="competitor" fill="#82ca9d" />
        </BarChart> */}

              

        {/* 추천 프로필 */}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-white" id="recommendedProfile">
        {data.recommendedUsers.map((profile, index) => (
          <div key={index} className="max-w-sm my-20 border p-4 rounded-md">
            <img className="w-full rounded" src={profile.userProfile} alt="post" />
            
            <div className="flex items-end justify-between">
              <div className="py-4">
                <div>
                  <div className="font-bold text-xl">{profile.name}</div>
                  <div>{profile.height}cm {profile.weight}kg</div>
                </div>
              </div>
              <div className="flex gap-2 items-end mb-3">
                <button className="text-rose-400 hover:text-rose-500 font-bold" onClick={() => handleCompetitorAdd(profile.userId)}>
                  경쟁
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
      </div>
    </div>
  );
}

export default LoggedInHome;