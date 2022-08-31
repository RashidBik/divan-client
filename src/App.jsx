import {Routes,Route, Link, useNavigate} from "react-router-dom";
import Home from './pages/Home';
import CreatePost from './components/CreatePost';
import Post from './components/Post';
import Register from './pages/Register';
import Login from './pages/Login';
import { AuthContext } from './helpers/AuthContext';
import {useState, useEffect} from 'react';
import Error from './pages/Error'
import Profile from './pages/Profile';
import ChangePswd from './components/ChangePswd';
import { getAuthState } from "./api/account";

function App() {
 const navigate = useNavigate();
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false
  });

useEffect(() => {
  getAuthState().then((response) => {
    if (response.data.error){
        setAuthState({...authState, status: false});
      }else{
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        }); 
    }
  });
},[]);

// LOGOUT PART////////////////////////////////
const logout = () => {
  localStorage.removeItem("accessToken");
  setAuthState({
    username: "",
    id: 0,
    status: false,
  });
  navigate("/login");
};
///////////////////////////////////////////////
  return (
    <div className="grid relative bg-gray-900 max-w-screen h-full min-h-screen p-0  ">
      <AuthContext.Provider value={{authState, setAuthState}}>    
          {authState.status && (
        <div className="flex items-center fixed t-0 r-0 l-0 w-full px-2 text-gray-300 bg-gray-900 border-b-2 rounded-xl flex-row  h-12 justify-between z-10">
          <div className="p-2">
           <span className="flex  items-baseline">
           <Link to="/" className=" mr-6">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
             </svg>
           </Link>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <label className="font-mono">m<span className="animate-ping text-red-300">00</span>n</label>
          </span>
        </div>
        <span onClick={logout} className="bg-gray-800 rounded-xl border-r-2 border-gray-500 p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </span>
      </div>)} 
    
        <Routes>
            <Route index="/" exact element={<Home />} />
            <Route path="/Profile/:id" exact element={<Profile />} />
            <Route path="/CreatePost" exact element={<CreatePost />} />
            <Route path="/Posts:id" exact element={<Post />} />
            <Route path="/Register" exact element={<Register />} />
            <Route path="/Login" exact element={<Login />} />
            <Route path="*" exact element={<Error />} />
            <Route path="/ChangePswd" exact element={<ChangePswd/>} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
