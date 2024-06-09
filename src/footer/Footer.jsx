const Footer = () => {
  return (
    <div className="w-full bg-zinc-700 flex flex-col items-center justify-center">
      <div className="flex w-full max-w-screen-lg p-4 justify-between h-18 justify-center items-center text-white">
        <div className="text-xl font-bold">Pink Dumbbell</div>
      </div>
      <div className="flex w-full max-w-screen-lg p-4 justify-between h-18 justify-center items-center text-white">
        <div>Copyright ⓒ 2023 Pink Dumbbell Inc.</div>
        <div className="flex gap-6 underline text-sm md:text-base">
          <div>개인정보처리방침</div>
          <div>이용약관</div>
        </div>
      </div>
    </div>
  )
}

export default Footer;