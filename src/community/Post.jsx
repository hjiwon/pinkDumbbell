import axios from "axios";
import GNB from "../GNB/GNB";
import Footer from "../footer/Footer";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Post = () => {
  const url = window.location.href;
  const contentid = url.split('/')[4];
  const [comment, setComment] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["post", contentid],
    queryFn: async () => {
      const res = await axios.get(`http://110.10.3.11:8090/community/${contentid}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      
      return res.data.response
    }
  });
  
  const videoRef = useRef(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('play', () => console.log('Video play event'));
      videoRef.current.addEventListener('pause', () => console.log('Video pause event'));
      videoRef.current.addEventListener('error', (e) => console.error('Video error event', e));
    }
  }, []);

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  }

  const checkIfVideo = (content) => {
    return content && (content.includes('.mp4') || content.includes('.mov') || content.includes('.avi') || content.includes('.mkv') || content.includes('.flv') || content.includes('.wmv') || content.includes('.3gp') || content.includes('.webm'));
  }

  const postComment = async (comment) => {
    const url = `http://110.10.3.11:8090/community/${contentid}/comment`;
    try {
      await axios.post(url, {
        userId: localStorage.getItem("userid"),
        text: comment,
        contentId: contentid
      }, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <GNB />
      <div className="w-1/2 mx-auto my-16">
        <div className="border-2 border-gray-300 p-4 my-4 rounded-md">
          {
            data && checkIfVideo(data?.content) ? (
              <video ref={videoRef} src={data?.content} controls className="w-full mx-auto"></video>
            ) : (
              <img src={data?.content} alt="content" className="w-full mx-auto" />
            )
          }
          <div className="px-4 pt-4 mt-4 rounded-md flex items-end">
            <img src={data?.profileImage || '/images/profile-simple.svg'} alt="profile" className="w-1/6 mx-auto rounded-full" onClick={() => handleUserClick(data?.userId)} />
            <p className="w-full text-end">{data?.text}</p>
          </div>
        </div>
        <div className="border-2 border-gray-300 p-4 my-4 rounded-md flex">
          <img src={data?.connectedUserProfile || '/images/profile-simple.svg'} alt="profile" className="w-[3rem] mx-auto rounded-full" />
          <input type="text" className="w-3/5 mx-auto" placeholder="댓글을 입력해주세요" onChange={(e) => setComment(e.target.value)} />
          <button className="w-1/5 mx-auto bg-rose-500 hover:bg-rose-600 text-white rounded-md p-2 mt-2" onClick={() => postComment(comment)}>작성</button>
        </div>
        {
          data?.comments?.map((comment, index) => (
            <div key={index} className="border-2 border-gray-300 p-4 my-4 rounded-md flex items-end">
              <img src={comment.profileImage || '/images/profile-simple.svg'} alt="profile" className="w-[3rem] mx-auto rounded-full" onClick={() => handleUserClick(comment.userId)} />
              <p className="w-full text-end">{comment.comment}</p>
            </div>
          ))
        }
      </div>
      <Footer />
    </>
  );
}

export default Post;
