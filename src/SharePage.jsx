import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";

const SharePage = () => {
  const { userid } = useParams();
  const location = useLocation();
  console.log(location);

  const searchParams = new URLSearchParams(location.search);
  const ipTag = searchParams.get('ipTag');

  const decodedUserid = decodeURIComponent(userid);
  return (
    <>
      <div>Hi!</div>
      <div>{decodedUserid} Brought you here.</div>
      <div>{ipTag}</div>
    </>
  )
}

export default SharePage;