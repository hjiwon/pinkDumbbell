export default function NicknamePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] p-4 text-white">
      <div className="w-full max-w-xs">
        <h1 className="text-3xl font-bold">네네임을 입력해주세요</h1>
        <label className="sr-only" htmlFor="name">
          이름
        </label>
        <input
          className="mt-8 w-full rounded-none bg-transparent py-2 pl-0 text-lg border-b-2 border-white focus:border-red-600 focus:outline-none focus:ring-0"
          id="name"
          placeholder="이름"
          type="text"
        />
        <button className="mt-24 w-full rounded-lg bg-[#d32f2f] py-4 text-lg font-semibold">다음</button>
      </div>
    </div>
  )
}