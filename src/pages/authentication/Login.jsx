import React, { useState, useEffect } from 'react';
import { getCourses } from '../../apis';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/authSlice';
import { signInApi } from '../../apis/login';

function Login() {
  const dispatch = useDispatch();
  const [tab, setTab] = useState('Player');
  // Player
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  //Admin
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const [cookies, setCookies] = useCookies();

  useEffect(() => {
    getCourses().then((courses) => setCourses(courses));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    // 로그인 로직 처리
    const loginData =
      tab === 'Admin' ? { id, password } : { selectedCourse, name, birthDate };
    console.log('로그인 시도:', loginData);

    const signInResponse = await signInApi(loginData);

    if (!signInResponse) {
      alert('로그인에 실패하였습니다.');
      return;
    }

    if (!signInResponse.result) {
      alert('로그인에 실패하였습니다.');
      return;
    }

    const { token, role } = signInResponse;
    setCookies('token', token);
    setCookies('role', role);
    // dispatch(setUser('admin'));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-4">로그인</h2>

        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 ${
              tab === 'Player' ? 'bg-gray-800 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setTab('Player')}
          >
            Player
          </button>
          <button
            className={`px-4 py-2 ${
              tab === 'Admin' ? 'bg-gray-800 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setTab('Admin')}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleLogin}>
          {tab === 'Admin' && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="id"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  아이디
                </label>
                <input
                  type="text"
                  id="id"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md px-1 py-2"
                  placeholder="아이디를 입력하세요"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  비밀번호
                </label>
                <input
                  type="password"
                  id="password"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md px-1 py-2"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </>
          )}

          {tab === 'Player' && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="className"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  코스명
                </label>
                <select
                  id="className"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-1"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  <option value="">-</option>
                  {courses.map((option) => (
                    <option key={option.id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md px-1 py-2"
                  placeholder="이름을 입력하세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="birthDate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  생년월일 6자리 (ex 9xxxxx)
                </label>
                <input
                  type="number"
                  id="birthDate"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md px-1 py-2"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-gray-800 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
