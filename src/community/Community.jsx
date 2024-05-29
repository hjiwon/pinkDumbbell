import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query"
import axios from "axios"
import GNB from "../GNB/GNB"
import Footer from "../footer/Footer"
import { useEffect, useRef } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const pageInitial = [0, 1, 2, 4, 5, 6, 7, 8, 9, 10]

const Community = () => {
  const [pageData, setPageData] = useState([])
  const [hasNext, setHasNext] = useState(true)
  console.log(pageData)
  const getCommunity = async (pageParam) => {
    console.log(pageParam)
    if (!hasNext) return
    setPage(pageParam + 1)
    const url =`http://110.10.3.11:8090/community?page=${pageParam}` // API 주소
    const res = await axios.get(url)
    console.log(res)
    setHasNext(res.data.response.hasNext)
    const data = res.data.response.contents
    setPageData([...pageData, ...data])
    return data
  }
  const { data, isLoading, } = useQuery({
    queryKey: ["community"],
    queryFn: () => getCommunity(page),
    keepPreviousData: true,
    retry: 0,
  })

  const [page, setPage] = useState(0)
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNext) {
        getCommunity(page)
      }
    });

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [pageData]);

  const navigate = useNavigate();

  const handleImageClick = (contentId) => {
    navigate(`/community/${contentId}`)
  }

  //동영상은 hover시 mute로 자동재생
  const handleVideoHover = (e) => {
    e.target.muted = true;
    e.target.play();
  }
  const handleVideoOut = (e) => {
    e.target.pause();
  }

  return (
    <>
    <GNB />
    <div className="flex flex-wrap w-full">
    <button onClick={() => navigate("/upload")} className="w-full h-16 bg-rose-500 hover:bg-rose-600 font-bold text-white text-lg">업로드 하러가기</button>
      {
        pageData && pageData?.map((page, index) => (
          page.contentType === "image" 
          ?
          <img key={index} src={page.address} alt={page.contentType} className={`w-1/2 sm:w-1/3 aspect-square cursor-pointer `} onClick={() => handleImageClick(page.contentId)} />
          :
          <div key={index} className="w-1/2 sm:w-1/3 aspect-square cursor-pointer" onClick={() => handleImageClick(page.contentId)} onMouseEnter={handleVideoHover} onMouseLeave={handleVideoOut}>
            <video src={page.address} className="w-full h-full" />
          </div>
        ))
      }
    </div>
<div ref={observerRef}></div>
    <Footer />
    </>
  )
}

export default Community;
