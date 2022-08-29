import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import React,{useState,useContext} from 'react';
import { AuthContext } from '../helpers/AuthContext';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {setAuthState} = useContext(AuthContext);
  let navigate = useNavigate(); 

  const login = () => {
    const data = {username: username, password: password};
    axios.post("http://localhost:8000/auth/login", data)
    .then((response) => { 
     if (response.data.error){
          alert(response.data.error);
    } else{
      localStorage.setItem("accessToken", response.data.token);
        setAuthState({ 
          username: response.data.username,
          id: response.data.id,
          status: true,
        });     
      // console.log(AuthContext);
      //  the console.log() has an unblivble power really
      
      navigate("/");
    }
  });
};

  return ( 
    <div className='w-screen'>
    <div className=' m-auto  w-80 mt-0 h-96'>
      <div className='relative flex justify-center'>
        <span className='absolute   transform  translate-y-6 rounded-full border-t-4 border-gray-600  bg-gray-900 h-24 w-24 shadow-gray-400 shadow-md'>
         
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-600 " fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      
      </span>
    </div>  
    <div className='block mt-16 pt-16 bg-gray-900 p-6 border-t-[3px] border-gray-600 rounded-3xl shadow-xl shadow-gray-700'>
      <h1 className='text-center text-xl text-gray-200'>Login</h1>
      {/* <label>UserName</label> */}
      <input type="text"
      className='input' 
      placeholder="username"
      onChange={(event)=>{
        setUsername(event.target.value)
      }} />

      {/* <label>password</label> */}
      {/* <i class="fa fa-user icon"></i> */}
      <input type="password"
      className='input' 
      placeholder='password'
      onChange={(event) =>{
        setPassword(event.target.value)
      }}/>
      <div>
       <input type="checkBox"
      className='mt-3 accent-gray-800'
      /><span className='text-gray-300'> Remember me</span>
      </div>
      <button className='w-full bg-gray-700 rounded-3xl p-2 mt-3 hover:bg-gray-700 hover:border-l-2 hover:border-r-2 border-gray-700'
       onClick={login}>Login</button>
       <div >
      <Link className='grid' to="/register"> <span className='text-right mt-3 text-gray-400 hover:text-gray-300'>
      Create Account </span></Link>
       </div>
    </div>
    </div>
    </div>
  )
}

export default Login
