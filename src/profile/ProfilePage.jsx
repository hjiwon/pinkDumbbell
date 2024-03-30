import React, { useState, useEffect } from 'react';
import GNB from "../GNB/GNB"
import Footer from "../footer/Footer"
import ProfilePageSkeleton from './ProfilePageSkeleton';

const data = {
  userId: 1,
  name: "임도현",
  profile: "/images/something1.jpeg",
  height: 169,
  weight: 65,
  muscleMass: 33,
  bodyFat: 9.5,
  BMI: 22.75,
  percentageFat: 14.61,
  userPercentage: "20%",
  userRecords:[
    {
      sportName: "데드리프트",
      record: "160kg",
      percentage: "30%",
      contents: "/video/asf.mp3"
    },
    {
      sportName: "벤치프레스",
      record: "100kg",
      percentage: "30%",
      contents: "/video/asdff.mp3"
    },
    {
      sportName: "스쿼트",
      record: "130kg",
      percentage: "30%",
      contents: "/video/asdsdfsff.mp3"
    },
  ]
}

const ProfilePage = () => {
  const [editClicked, setEditClicked] = useState(false);
  const [userData, setUserData] = useState(null);
  const [inputData, setInputData] = useState({
    userId: '',
    name: '',
    height: '',
    weight: '',
    muscleMass: '',
    bodyFat: '',
    BMI: '',
    percentageFat: '',
    userPercentage: '',
    profile: '',
    userRecords: [],
  });

  useEffect(() => {
    // Mock API를 통해 데이터를 받아옵니다.
    const fetchData = () => {
      setTimeout(() => {
        // 실제로는 여기에서 API를 호출하여 데이터를 받아옵니다.
        // 받아온 데이터를 userData 상태에 저장합니다.
        const mockData = {
          userId: 1,
          name: "황지원",
          height: 160,
          weight: 70,
          muscleMass: 50,
          bodyFat: 20,
          BMI: 22,
          percentageFat: 15,
          userPercentage: "20%",
          profile: '/images/muscle.webp',
          userRecords:[
            {
              sportName: "데드리프트",
              record: "160kg",
              percentage: "30%",
              contents: "/video/asf.mp3"
            },
            {
              sportName: "벤치프레스",
              record: "100kg",
              percentage: "30%",
              contents: "/video/asdff.mp3"
            },
            {
              sportName: "스쿼트",
              record: "130kg",
              percentage: "30%",
              contents: "/video/asdsdfsff.mp3"
            },
          ]
        };
        //
        mockData.userRecords.forEach(user => {
          user.record = user.record.replace('kg', '');
        });
        setUserData(mockData);
        setInputData(mockData);
      }, 2000);
    };

    fetchData();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name.includes('userRecord')) {
      const recordIndex = parseInt(name.split('userRecord')[1]); // 인덱스 추출
      // 입력값이 숫자인지 확인
      if (!isNaN(value)) {
        setInputData(prevState => ({
          ...prevState,
          userRecords: prevState.userRecords.map((record, index) => {
            if (index === recordIndex) {
              return {
                ...record,
                record: value
              };
            }
            return record;
          })
        }));
      }
    } else if (name.includes('sportName')) {
      // sportName을 포함하고 있는 경우
      const recordIndex = parseInt(name.split('sportName')[1]); // 인덱스 추출
      console.log(recordIndex);
      setInputData(prevState => ({
        ...prevState,
        userRecords: prevState.userRecords.map((record, index) => {
          if (index === recordIndex) {
            console.log(value);
            return {
              ...record,
              sportName: value
            };
          }
          return record;
        })
      }));
    } else {
      // 숫자인 경우만 변경
      if (!isNaN(value)) {
        setInputData(prevState => ({
          ...prevState,
          [name]: value
        }));
      }
    }
  };

  
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!editClicked) {
      // 수정 버튼 누른 상태
      setEditClicked(true);
      return;
    } else {
      // 저장 버튼 누른 상태
    }

    // 여기서 수정된 데이터를 백엔드에 전송합니다.
    console.log('수정된 데이터:', inputData);
  };

  return (
    <>
      <GNB />
      <div className="flex flex-col items-center justify-center my-10">
        <ProfilePageSkeleton loading={!userData} />
        {userData && (
          <form onSubmit={handleSubmit} className='w-full flex flex-col items-center gap-6'>
            <div className="w-4/6 justify-between flex">
              <label>키(cm)</label>
              <input
                type="text"
                name="height"
                value={inputData.height}
                onChange={handleChange}
                placeholder={userData.height}
                disabled={!editClicked}
                className="w-3/5 h-16 border rounded-lg px-10 text-lg"
              />
            </div>
            <div className="w-4/6 justify-between flex">
              <label>체중(kg)</label>
              <input
                type="text"
                name="weight"
                value={inputData.weight}
                onChange={handleChange}
                placeholder={userData.weight}
                disabled={!editClicked}
                className="w-3/5 h-16 border rounded-lg px-10 text-lg"
              />
            </div>
            <div className="w-4/6 justify-between flex">
              <label>근육량(kg)</label>
              <input
                type="text"
                name="muscleMass"
                value={inputData.muscleMass}
                onChange={handleChange}
                placeholder={userData.muscleMass}
                disabled={!editClicked}
                className="w-3/5 h-16 border rounded-lg px-10 text-lg"
              />
            </div>
            <div className="w-4/6 justify-between flex">
              <label>지방량(kg)</label>
              <input
                type="text"
                name="bodyFat"
                value={inputData.bodyFat}
                onChange={handleChange}
                placeholder={userData.bodyFat}
                disabled={!editClicked}
                className="w-3/5 h-16 border rounded-lg px-10 text-lg"
              />
            </div>
            <div className="w-4/6 justify-between flex">
              <label>BMI</label>
              <input
                type="text"
                name="BMI"
                value={inputData.BMI}
                onChange={handleChange}
                placeholder={userData.BMI}
                disabled={!editClicked}
                className="w-3/5 h-16 border rounded-lg px-10 text-lg"
              />
            </div>
            <div className="w-4/6 justify-between flex">
              <label>체지방률(%)</label>
              <input
                type="text"
                name="percentageFat"
                value={inputData.percentageFat}
                onChange={handleChange}
                placeholder={userData.percentageFat}
                disabled={!editClicked}
                className="w-3/5 h-16 border rounded-lg px-10 text-lg"
              />
            </div>
            {/* 사용자 기록에 대한 입력 필드 */}
            <div className="w-4/6 justify-between flex">
              <label>
                <select name="sportName0" value={inputData.userRecords[0].sportName} onChange={handleChange} className="h-16 border rounded-lg" disabled={!editClicked}>
                  <option value="">종목 선택</option>
                  <option value="스쿼트">스쿼트</option>
                  <option value="벤치프레스">벤치프레스</option>
                  <option value="데드리프트">데드리프트</option>
                  <option value="밀리터리프레스">밀리터리프레스</option>
                  <option value="바벨로우">바벨로우</option>
                  <option value="기타">기타</option>
                </select>
              </label>
              <input
                type="text"
                name="userRecord0"
                value={inputData.userRecords[0].record}
                onChange={handleChange}
                placeholder={userData.userRecords[0].record}
                disabled={!editClicked}
                className="w-3/5 h-16 border rounded-lg px-10 text-lg"
              />
            </div>
            <div className="w-4/6 justify-between flex">
              <label>
                <select name="sportName1" value={inputData.userRecords[1].sportName} onChange={handleChange} className="h-16 border rounded-lg" disabled={!editClicked}>
                  <option value="">종목 선택</option>
                  <option value="스쿼트">스쿼트</option>
                  <option value="벤치프레스">벤치프레스</option>
                  <option value="데드리프트">데드리프트</option>
                  <option value="밀리터리프레스">밀리터리프레스</option>
                  <option value="바벨로우">바벨로우</option>
                  <option value="기타">기타</option>
                </select>
              </label>
              <input
                type="text"
                name="userRecord1"
                value={inputData.userRecords[1].record}
                onChange={handleChange}
                placeholder={userData.userRecords[1].record}
                disabled={!editClicked}
                className="w-3/5 h-16 border rounded-lg px-10 text-lg"
              />
            </div>
            <div className="w-4/6 justify-between flex">
              <label>
                <select name="sportName2" value={inputData.userRecords[2].sportName} onChange={handleChange} className="h-16 border rounded-lg" disabled={!editClicked}>
                  <option value="">종목 선택</option>
                  <option value="스쿼트">스쿼트</option>
                  <option value="벤치프레스">벤치프레스</option>
                  <option value="데드리프트">데드리프트</option>
                  <option value="밀리터리프레스">밀리터리프레스</option>
                  <option value="바벨로우">바벨로우</option>
                  <option value="기타">기타</option>
                </select>
              </label>
              <input
                type="text"
                name="userRecord2"
                value={inputData.userRecords[2].record}
                onChange={handleChange}
                placeholder={userData.userRecords[2].record}
                disabled={!editClicked}
                className="w-3/5 h-16 border rounded-lg px-10 text-lg"
              />
            </div>
            <button className={`w-3/5 h-16 border rounded-lg px-10 text-lg ${editClicked ? 'bg-rose-400 hover:bg-rose-500' : 'bg-gray-400 hover:bg-gray-500'}`}  type="submit">{editClicked ? "저장" : "수정"}</button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
