import React, { useState, useRef } from "react";
import GNB from "../GNB/GNB";
import Footer from "../footer/Footer";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const UploadPost = () => {
  const [uploadedImage, setUploadedImage] = useState("");
  const [imageDirectory, setImageDirectory] = useState("");
  const [imageSelected, setImageSelected] = useState(false);
  const [cropperHidden, setCropperHidden] = useState(false);
  const [videoSelected, setVideoSelected] = useState(false);
  const [videoDirectory, setVideoDirectory] = useState("");
  const cropperRef = useRef(null);
  const [privacy, setPrivacy] = useState("public");
  const [imageSelectedAndCropped, setImageSelectedAndCropped] = useState(false);
  const [videoForBlob, setVideoForBlob] = useState(null);

  const [profileImageModal, setProfileImageModal] = useState(false);

  const handleProfileImage = () => {
    if (uploadedImage) {
      setProfileImageModal(false);
      setCropperHidden(false);
      setImageSelectedAndCropped(true);
    } else {
      toast.error("이미지를 선택해주세요");
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

  const handleModalCancel = () => {
    setProfileImageModal(false);
    setUploadedImage(null);
    setImageDirectory("");
    setImageSelected(false);
  }
  const handleCrop = () => {
    const imageElement = cropperRef?.current?.cropper;
    const canvas = imageElement.getCroppedCanvas();
    const croppedImage = canvas.toDataURL("image/jpeg");
  }
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
  const [fileName, setFileName] = useState("");

  const handleSelectImage = (e) => {
    // 동영상이면 비디오 태그로 미리보기
    if (e.target.files[0].type.includes("video")) {
      const reader = new FileReader();
      setFileName(e.target.files[0].name);
      reader.onload = (e) => {
        setVideoForBlob(e.target.result);
      }
      reader.readAsDataURL(e.target.files[0]);

      const selectedVideo = e.target.files[0];
      setVideoDirectory(URL.createObjectURL(selectedVideo));
      setVideoSelected(true);
      handleModalCancel();
    }
    else {
      setFileName(e.target.files[0].name);
      setImageDirectory(e.target.value);
      const selectedImage = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      }
      reader.readAsDataURL(selectedImage);
      setCropperHidden(false);
    }
  }
  const handlePrivacyChange = () => {
    setPrivacy((prev) => (prev === "public" ? "private" : "public"));
  }
  const deleteImage = () => {
    setUploadedImage(null);
    setImageDirectory("");
    setImageSelected(false);
    setImageSelectedAndCropped(false);
  }
  const base64ToBlob = (base64) => {
    const [metadata, base64Data] = base64.split(',');
    const mime = metadata.match(/:(.*?);/)[1];
    const byteString = atob(base64Data);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    console.log(mime);
    return new Blob([ab], { type: mime });
  };
  

  const handleUploadClick = () => {
    const formData = new FormData();
    const text = document.querySelector("textarea").value;
    const userId = localStorage.getItem("userid");
    const toastId = toast("업로드 중입니다...", { autoClose: false });
    // text라는 객체를 만들어서 그 안에 userId와 text를 넣어줌
    const textObj = {
      userId: userId,
      text: text,
    }
    formData.append("text", new Blob([JSON.stringify(textObj)], { type: "application/json" }));

    console.log(fileName);

    if (imageSelectedAndCropped) {
      const blob = base64ToBlob(uploadedImage);
      formData.append("image", blob, fileName);
    } else if (videoSelected) {
      const blob = base64ToBlob(videoForBlob);
      formData.append("video", blob, fileName);
    } 
    else {
      toast.update(toastId, { render: "이미지 또는 비디오를 선택해주세요", type: "error", autoClose: 1000 });
      return;
    }
    axios.post("http://110.10.3.11:8090/community/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      toast.update(toastId, { render: "업로드 성공!", type: "success", autoClose: 1000 });
      setTimeout(() => {
        window.location.href = "/community";
      }, 1000);
    })
    .catch((err) => {
      toast.update(toastId, { render: "업로드 실패!", type: "error", autoClose: 1000 });
      console.error(err.response.data.error.message);
    });
  }

  return (
    <>
    <GNB />
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
    <div className="flex flex-col items-center w-full gap-10">
      {profileImageModal &&
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10 min-w-screen-lg" onClick={handleProfileImageModalOutsideClick}>
        <div className="m-4 pt-10 w-full bg-white flex flex-col gap-10 items-center justify-center md:w-1/2 md:gap-10">
          <div className={`text-2xl md:text-3xl ${imageSelected ? 'hidden' : ''}`}>파일을 선택해주세요</div>
          <div className={`text-2xl md:text-3xl ${!imageSelected ? 'hidden' : ''}`}>이 사진으로 설정할까요?</div>

          <div className={`flex flex-col items-center justify-center ${!imageDirectory || imageSelected ? 'hidden' : ''}`} >
            <Cropper
              src={uploadedImage}
              style={{height: "50vh", width: "100%"}}
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
            <div className="overflow-hidden w-full flex justify-center items-center bg-cover h-[50vh]" >
              {/* 50vh height */}
              <img id="preview" src={uploadedImage} alt="preview" className=""/>
            </div>
            </>
          }
          <div className={`flex gap-4 w-full items-center justify-center ${imageDirectory ? 'hidden' : ''}`}>
            <input type="file" id="file2" className="hidden" accept="image/*, video/*" onChange={handleSelectImage}/>
            <input type="text" placeholder="첨부파일" className="h-12 border border-gray-300 px-6 py-3 cursor-not-allowed" value={imageDirectory}/>
            <label for="file2" className="bg-gray-200 mx-4 px-6 py-3 h-12 flex items-center justify-center hover:bg-gray-300">파일찾기</label>
          </div>
          <div className={`flex w-full items-center justify-center ${!imageDirectory || imageSelected ? '' : 'hidden'}`}>
            <button onClick={handleModalCancel} className={`w-1/2 h-14 bg-gray-500 text-white hover:bg-gray-600 `}>취소</button>
            <button className={`w-1/2 h-14 text-white ${!imageSelected ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-rose-500 hover:bg-rose-600'}`} onClick={handleProfileImage}>확인</button>
          </div>

          <div className={`flex w-full items-center justify-center ${(imageDirectory && !imageSelected) ? '' : 'hidden'}`}>
            <button onClick={handleModalCancel} className={`w-1/2 h-14 bg-gray-500 text-white hover:bg-gray-600`}>취소</button>
            <button onClick={endCrop} className={`w-1/2 h-14 bg-rose-500 text-white hover:bg-rose-600`}>이미지 자르기</button>
          </div>
        </div>
      </div>}

    <div className="w-full flex flex-col items-center gap-4">
      {
        imageSelectedAndCropped &&
        <>
        <div className="overflow-hidden w-full flex justify-center items-center bg-cover bg-[url('../public/images/landing-main-background.jpg')]">
          <img src={uploadedImage} alt="preview" className="h-96" />
        </div> 
        <button className="cursor-pointer " onClick={deleteImage}>
          x
        </button>
        </>
      }
      {
        videoSelected &&
        <video src={videoDirectory} autoPlay ></video>
      }
      {
        !imageSelectedAndCropped && !videoSelected &&
        <>
          <button htmlFor="file" className="cursor-pointer hover:rotate-45 transition-transform mt-10" onClick={() => setProfileImageModal(true)}>
            <img src="/images/add-plus.webp" alt="add-plus" className="w-20 h-20" />
          </button>
          <div>업로드할 사진/비디오 선택</div>
        </>
      }
    </div>

    {/* 경계선 */}
    <div className="w-full border-b-2 border-gray-300"></div>

    <div className="flex justify-between w-full justify-center items-center px-4">
      <div>공개 설정</div>
      <div>
        <button onClick={handlePrivacyChange} className="text-rose-600 hover:text-rose-800 font-bold" >{privacy === "public" ? "공개" : "비공개"}</button>
      </div>
    </div>
    <div className="w-full">
      <textarea placeholder="내용을 입력해주세요" className="w-full h-96 border-2 border-gray-300 p-4"></textarea>
    </div>
    <button onClick={handleUploadClick} className="w-full h-14 bg-rose-500 text-white hover:bg-rose-600">업로드</button>
  </div>
  <Footer />
  </>
  )
}

export default UploadPost;