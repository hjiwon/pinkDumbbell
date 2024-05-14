import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query"
import axios from "axios"
import GNB from "../GNB/GNB"
import Footer from "../footer/Footer"
import { useEffect, useRef } from "react"
import { useState } from "react"

const pageInitial = [1, 2, 4, 5, 6, 7, 8, 9, 10]

const Community = () => {
  const [pageData, setPageData] = useState([])
  console.log(pageData)
  const getCommunity = async (pageParam) => {
    console.log(pageParam)
    setPage(pageParam + 1)
    const url =`http://110.10.3.11:8090/community?page=${pageParam}` // API 주소
    const res = await axios.get(url)
    const data = res.data.response.contents
    setPageData([...pageData, ...data])
    return data
  }
  const { data, isLoading, } = useQuery({
    queryKey: ["community"],
    queryFn: () => getCommunity(page),
    keepPreviousData: true,
  })

  const [page, setPage] = useState(1)
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        getCommunity(page)
      }
    });

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [pageData]);

  return (
    <>
    <GNB />
    <div className="flex flex-wrap w-full">
      {
        pageData && pageData?.map((page, index) => (
            <img key={index} src={page.address} alt={page.contentType} className="w-1/2 sm:w-1/3 aspect-square" />
        ))
      }
    </div>
    <div ref={observerRef}></div>
    <Footer />
    </>
  )
}

export default Community;
