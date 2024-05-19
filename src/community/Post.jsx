import axios from "axios";
import GNB from "../GNB/GNB";
import Footer from "../footer/Footer";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Post = () => {
  // 현재 페이지의 contentid를 가져온다.
  const url = window.location.href;
  const contentid = url.split('/')[4];
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
  return (
    <>
    <GNB />
    <div className="w-1/2 mx-auto my-16">
      <div className="border-2 border-gray-300 p-4 my-4 rounded-md">
      {
        data?.content.includes('jpg') || data?.content.includes('png') || data?.content.includes('jpeg') ? (
          <img src={data?.content} alt="content" className="w-1/2 mx-auto" />
        ) : (
          <video src={data?.content} controls className="w-1/2 mx-auto"></video>
        )
      }
        <div className="px-4 pt-4 mt-4 rounded-md flex items-end">
          <img src={data?.profileImage} alt="profile" className="w-1/6 mx-auto rounded-full" onClick={() => handleUserClick(data?.userId)} />
          <p className="w-full text-end">{data?.text}</p>
        </div>
      </div>
      {
        data?.comments?.map((comment, index) => (
          <div key={index} className="border-2 border-gray-300 p-4 my-4 rounded-md flex items-end">
            <img src={comment.profileImage} alt="profile" className="w-1/6 mx-auto rounded-full" onClick={() => handleUserClick(comment.userId)} />
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

//저는 3학년 때 소프트웨어공학 복수전공을 시작했습니다. 남들보다 1년 늦은 시작이었습니다. 하지만 알고리즘으로 프로그래밍에 입문하며, CS 과목의 필요성을 느껴서 시작한 복수전공이었습니다.
//하지만 