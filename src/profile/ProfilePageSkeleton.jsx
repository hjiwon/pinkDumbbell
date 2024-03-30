const ProfilePageSkeleton = (props) => {

  console.log(props.loading);
  return (
    <>
    {props.loading &&
  <form className='w-full flex flex-col items-center gap-6'>
            <div className="w-4/6 justify-center flex">
              <input
                className="skeleton-loader w-full bg-gray-500 h-16 border rounded-lg px-10 text-lg"
              />
            </div>
            <div className="w-4/6 justify-center flex">
              <input
                className="skeleton-loader w-full bg-gray-500 h-16 border rounded-lg px-10 text-lg"
              />
            </div>
            <div className="w-4/6 justify-center flex">
              <input
                className="skeleton-loader w-full bg-gray-500 h-16 border rounded-lg px-10 text-lg"
              />
            </div>
            <div className="w-4/6 justify-center flex">
              <input
                className="skeleton-loader w-full bg-gray-500 h-16 border rounded-lg px-10 text-lg"
              />
            </div>
            <div className="w-4/6 justify-center flex">
              <input
                className="skeleton-loader w-full bg-gray-500 h-16 border rounded-lg px-10 text-lg"
              />
            </div>
            <div className="w-4/6 justify-center flex">
              <input
                className="skeleton-loader w-full bg-gray-500 h-16 border rounded-lg px-10 text-lg"
              />
            </div>

            <div className="w-4/6 justify-center flex">
              <input
                className="skeleton-loader w-full bg-gray-500 h-16 border rounded-lg px-10 text-lg"
              />
            </div>
            <div className="w-4/6 justify-center flex">
              <input
                className="skeleton-loader w-full bg-gray-500 h-16 border rounded-lg px-10 text-lg"
              />
            </div>
            <div className="w-4/6 justify-center flex">
              <input
                className="skeleton-loader w-full bg-gray-500 h-16 border rounded-lg px-10 text-lg"
              />
            </div>
            <div className="w-3/5 bg-rose-200 h-16 border rounded-lg px-10 text-lg" type="submit"></div>
          </form>
}
      </>
  )
}

export default ProfilePageSkeleton;