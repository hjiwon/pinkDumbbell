import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Link } from "react-router-dom";
import { useState } from "react";

const data = {
  userId: 1,
  userName: "임도현",
  userProfile: "/images/something1.jpeg",
  height: 169,
  weight: 65,
  muscleMass: 33,
  bodyFat: 9.5,
  BMI: 22.75,
  percentageFat: 14.61,
  userPercentage: 1,
  competitor:
    [
      {
        userId: 2,
        userProfile: "/images/handsome.jpeg",
        userCompare:
        [
          [{
            name: "키",
            me: 169,
            competitor: 173,
          }],
          [{
            name: "몸무게",
            me: 65,
            competitor: 67,
          }],
          [{
            name: "근육량",
            me: 33,
            competitor: 35,
          }],
          [{
            name: "체지방량",
            me: 65,
            competitor: 67,
          }],
          [{
            name: "BMI",
            me: 22.75,
            competitor: 22.12,
          }],
          [{
            name: "체지방률",
            me: 14.61,
            competitor: 11.11
          }]
        ]
      },
      {
        userId: 3,
        userProfile: "/images/handsome.jpeg",
        userCompare:
        [
          [{
            name: "키",
            me: 169,
            competitor: 1730
          }],
          [{
            name: "몸무게",
            me: 65,
            competitor: 670
          }],
          [{
            name: "근육량",
            me: 33,
            competitor: 350
          }],
          [{
            name: "체지방량",
            me: 65,
            competitor: 670
          }],
          [{
            name: "BMI",
            me: 22.75,
            competitor: 202.12
          }],
          [{
            name: "체지방률",
            me: 14.61,
            competitor: 101.11
          }]
        ]
      },
      {
        userId: 44,
        userProfile: "/images/handsome.jpeg",
        userCompare:
        [
          [{
            name: "키",
            me: 169,
            competitor: 173
          }],
          [{
            name: "몸무게",
            me: 65,
            competitor: 67
          }],
          [{
            name: "근육량",
            me: 33,
            competitor: 35
          }],
          [{
            name: "체지방량",
            me: 65,
            competitor: 67
          }],
          [{
            name: "BMI",
            me: 22.75,
            competitor: 22.12
          }],
          [{
            name: "체지방률",
            me: 14.61,
            competitor: 11.11
          }]
        ]
      }
  ],
  userRecords:[
    {
      sportName: "데드리프트",
      record: "160kg",
      percentage: "30%"
    },
    {
      sportName: "벤치프레스",
      record: "100kg",
      percentage: "30%"
    },
    {
      sportName: "스쿼트",
      record: "130kg",
      percentage: "30%"
    },
  ],
  recommendedUser:[
    {
      userId: 4,
      userProfile: "/images/handsome.jpeg",
      weight: 130,
      height: 180,
      name:"김도현"
    },
    {
      userId: 5,
      userProfile: "/images/handsome.jpeg",
      weight: 130,
      height: 180,
      name:"김도현"
    },
    {
      userId: 6,
      userProfile: "/images/handsome.jpeg",
      weight: 130,
      height: 180,
      name:"김도현"
    },
    {
      userId: 7,
      userProfile: "/images/handsome.jpeg",
      weight: 130,
      height: 180,
      name:"김도현"
    },
    {
      userId: 8,
      userProfile: "/images/handsome.jpeg",
      weight: 130,
      height: 180,
      name:"김도현"
    },
    {
      userId: 9,
      userProfile: "/images/handsome.jpeg",
      weight: 130,
      height: 180,
      name:"김도현"
    },
  ],
}

const LoggedInHome = () => {
  const [selectedCompetitor, setSelectedCompetitor] = useState(0);
  
  const handleCompetitorClick = (num) => {
    setSelectedCompetitor(num);
    console.log(num);
  };

  const [hoveredIndex, setHoveredIndex] = useState(0);

  const handleMouseEnter = (index) => {
    setSelectedCompetitor(index);
    setHoveredIndex(index);
  };
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  console.log(isMobile);

  return (
    <div className="w-full h-full flex justify-center bg-cover bg-zinc-800">
      <div className="w-full max-w-screen-lg h-full relative flex flex-col items-center">
        <div className="text-3xl flex items-center justify-around text-white">
          <div className=""><span className="text-[#9894f8]">{data.userName}님</span>과 <span className="text-[#82ca9d]">{data.competitor[0].userId}님</span>의<br/>운동 기록을 비교해봤어요</div>
          <img className="w-2/5 p-10 rounded-full" src={`${data.competitor[0].userProfile}`} alt="" />
        </div>

        {/* 그래프 */}
        
        <div className="relative flex flex-col-reverse sm:flex-row items-center justify-center border border-top-white border-x-transparent gap-8 py-12">
          <Link to="/profile" className="text-3xl text-white transition-transform hover:rotate-45 hover:text-gray-400 absolute right-5 top-5">+</Link>
          <div className="grid grid-cols-2 md:grid-cols-3 items-center justify-center justify-items-center content-center self-center place-items-center place-self-center justify-self-center">
          <BarChart
            width={isMobile ? 170 : 200}
            height={isMobile ? 200 : 300}
            data={data.competitor[selectedCompetitor].userCompare[0]}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis stroke="#ffffff" dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="me" fill="#9894f8" />
            <Bar dataKey="competitor" fill="#82ca9d" />
          </BarChart>
          
          <BarChart
            width={isMobile ? 170 : 200}
            height={isMobile ? 200 : 300}
            data={data.competitor[selectedCompetitor].userCompare[1]}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis stroke="#ffffff" dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="me" fill="#9894f8" />
            <Bar dataKey="competitor" fill="#82ca9d" />
          </BarChart>


          <BarChart
            width={isMobile ? 170 : 200}
            height={isMobile ? 200 : 300}
            data={data.competitor[selectedCompetitor].userCompare[2]}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis stroke="#ffffff" dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="me" fill="#9894f8" />
            <Bar dataKey="competitor" fill="#82ca9d" />
          </BarChart>

          <BarChart
            width={isMobile ? 170 : 200}
            height={isMobile ? 200 : 300}
            data={data.competitor[selectedCompetitor].userCompare[3]}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis stroke="#ffffff" dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="me" fill="#9894f8" />
            <Bar dataKey="competitor" fill="#82ca9d" />
          </BarChart>

          <BarChart
            width={isMobile ? 170 : 200}
            height={isMobile ? 200 : 300}
            data={data.competitor[selectedCompetitor].userCompare[4]}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis stroke="#ffffff" dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="me" fill="#9894f8" />
            <Bar dataKey="competitor" fill="#82ca9d" />
          </BarChart>

          <BarChart
            width={isMobile ? 170 : 200}
            height={isMobile ? 200 : 300}
            data={data.competitor[selectedCompetitor].userCompare[5]}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis stroke="#ffffff" dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="me" fill="#9894f8" />
            <Bar dataKey="competitor" fill="#82ca9d" />
          </BarChart>
          </div>
          <div className="flex flex-col items-end pr-10">
            <div className="flex items-center">
              <img onClick={() => {handleCompetitorClick(0); handleMouseEnter(0)}} className="rounded-md" src={`${data.competitor[0].userProfile}`} alt="" onMouseEnter={() => handleMouseEnter(0)} style={{height: hoveredIndex === 0 ? '200px' : '100px', transition: 'height 0.3s ease'}}/>
              <button className="text-white break-keep" style={{width: hoveredIndex === 0 ? '100px' : '0px', opacity: hoveredIndex === 0 ? 1 : 0, transition: 'all 0.3s ease'}}>프로필 보기</button>
            </div>

            <div className="flex items-center">
              <img onClick={() => {handleCompetitorClick(1); handleMouseEnter(1)}} className="rounded-md" src={`${data.competitor[1].userProfile}`} alt="" onMouseEnter={() => handleMouseEnter(1)} style={{height: hoveredIndex === 1 ? '200px' : '100px', transition: 'height 0.3s ease'}}/>
              <button className="text-white break-keep" style={{width: hoveredIndex === 1 ? '100px' : '0px', opacity: hoveredIndex === 1 ? 1 : 0, transition: 'all 0.3s ease'}}>프로필 보기</button>
            </div>

            <div className="flex items-center">
              <img onClick={() => {handleCompetitorClick(2); handleMouseEnter(2)}} className="rounded-md" src={`${data.competitor[2].userProfile}`} alt="" onMouseEnter={() => handleMouseEnter(2)} style={{height: hoveredIndex === 2 ? '200px' : '100px', transition: 'height 0.3s ease'}}/>
              <button className="text-white break-keep" style={{width: hoveredIndex === 2 ? '100px' : '0px', opacity: hoveredIndex === 2 ? 1 : 0, transition: 'all 0.3s ease'}}>프로필 보기</button>
            </div>
          </div>
        </div>
        <div className="text-xl text-white pt-10">{data.userName}님은 상위 {data.userPercentage}%의 신체를 갖고 있어요</div>

        {/* 운동 기록 */}

        <div className="border border-b-transparent flex flex-col items-center mt-16 w-full py-4 text-white text-2xl">
            운동 기록
            <Link to="/profile" className="text-3xl text-white transition-transform hover:rotate-45 hover:text-gray-400 absolute right-5">+</Link>
        </div>
        <div className="border h-60 text-white flex w-full justify-around">
          <div className="w-1/3 flex flex-col items-center">
            <div className="h-1/3 flex items-center">
              {data.userRecords[0].sportName}
            </div>
            <div className="h-1/3 flex items-center">
              {data.userRecords[0].record}
            </div>
            <div className="h-1/3 flex items-center">
              상위 {data.userRecords[1].percentage}
            </div>
          </div>

          <div className="w-1/3 border-x flex flex-col items-center">
            <div className="h-1/3 flex items-center">
              {data.userRecords[1].sportName}
            </div>
            <div className="h-1/3 flex items-center">
              {data.userRecords[1].record}
            </div>
            <div className="h-1/3 flex items-center">
              상위 {data.userRecords[1].percentage}
            </div>
          </div>

          <div className="w-1/3 flex flex-col justify-center items-center">
            <div className="h-1/3 flex items-center">
              {data.userRecords[2].sportName}
            </div>
            <div className="h-1/3 flex items-center">
              {data.userRecords[2].record}
            </div>
            <div className="h-1/3 flex items-center">
              상위 {data.userRecords[2].percentage}
            </div>
          </div>
        </div>

        {/* 추천 프로필 */}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-white">
        {data.recommendedUser.map((profile, index) => (
          <div key={index} className="max-w-sm my-20 border p-4 rounded-md">
            <img className="w-full rounded" src={profile.userProfile} alt="post" />
            
            <div className="flex items-end justify-between">
              <div className="py-4">
                <div>
                  <div className="font-bold text-xl">{profile.name}</div>
                  <div>{profile.height}cm {profile.weight}kg</div>
                </div>
              </div>
              <div className="flex gap-2 items-end mb-3">
                <button className="text-rose-400 hover:text-rose-500">
                  경쟁
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
      </div>
    </div>
  );
}

export default LoggedInHome;