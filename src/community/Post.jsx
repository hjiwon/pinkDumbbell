import axios from "axios";
import GNB from "../GNB/GNB";
import Footer from "../footer/Footer";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Post = () => {
  // 현재 페이지의 contentid를 가져온다.
  const url = window.location.href;
  const contentid = url.split('/')[4];
  const [comment, setComment] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["post", contentid],
    queryFn: async () => {
      const res = await axios.get(`http://110.10.3.11:8090/community/${contentid}`);
      return res.data.response
    }
  })
  console.log(data)
  const navigate = useNavigate();
  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`)
  }
  const checkIfVideo = (content) => {
    console.log(content)
    if (content && content.includes('.mp4' || '.mov' || '.avi' || '.mkv' || '.flv' || '.wmv' || '.3gp' || '.webm')) {
      return true;
    } else {
      return false;
    }
  }
  const postComment = async (comment) => {
    const url = `http://110.10.3.11:8090/community/${contentid}/comment`
    axios.post(url, {
      userId: localStorage.getItem("userid"),
      text: comment,
      contentId: contentid
    },
    {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
    .then((res) => {
      window.location.reload();
    })
    .catch((err) => {
      console.error(err)
    })
  }
  

  return (
    <>
    <GNB />
    <div className="w-1/2 mx-auto my-16">
      <div className="border-2 border-gray-300 p-4 my-4 rounded-md">
      {
        checkIfVideo(data?.content) ? (
          <video src={data?.content} controls className="w-1/2 mx-auto"></video>
        ) : (
          <img src={data?.content} alt="content" className="w-1/2 mx-auto" />
        )
      }
        <div className="px-4 pt-4 mt-4 rounded-md flex items-end">
          <img src={data?.profileImage} alt="profile" className="w-1/6 mx-auto rounded-full" onClick={() => handleUserClick(data?.userId)} />
          <p className="w-full text-end">{data?.text}</p>
        </div>
      </div>
      <div className="border-2 border-gray-300 p-4 my-4 rounded-md flex">
        <img src={data?.profileImage} alt="profile" className="w-[3rem] mx-auto rounded-full" />
        <input type="text" className="w-3/5 mx-auto" placeholder="댓글을 입력해주세요" onChange={(e) => setComment(e.target.value)} />
        <button className="w-1/5 mx-auto bg-rose-500 hover:bg-rose-600 text-white rounded-md p-2 mt-2" onClick={() => postComment(comment)}>작성</button>
      </div>
      {
        data?.comments?.map((comment, index) => (
          <div key={index} className="border-2 border-gray-300 p-4 my-4 rounded-md flex items-end">
            <img src={comment.profileImage} alt="profile" className="w-[3rem] mx-auto rounded-full" onClick={() => handleUserClick(comment.userId)} />
            <p className="w-full text-end">{comment.comment}</p>
          </div>
        ))
      }
    </div>
    <Footer />
    </>
  )
}

export default Post;

/* 
응답 예시

{
	"profileImage": string (url),
	"userId": int, // 유저 아이디
	"text": string, // 글 내용
	"content": string, // 동영상이나 이미지 url
	comments: [ // 댓글 배열
		{
			commentId: int,
			userId: int,
			profileImage: string,
			comment: string
		},
		{
			commentId, int,
			userId: int,
			profileImage: string,
			comment: string
		},
		...
	]
}
*/