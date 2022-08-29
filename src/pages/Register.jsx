import React,{useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Register() {
  // const [file, setFile] = useState();
    
    const navigate = useNavigate();

    const initialValues = {
        username: "",
        password: "",
        fullname: "",
        email: "",
        birthDate: "",
        phone: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(16).required(),
        password: Yup.string().min(5).max(16).required(),
        fullname: Yup.string().min(5).max(30).required(),
        email: Yup.string().min(12).max(32).required(),
        birthDate: Yup.string().min(12).max(24).required(),
        phone: Yup.string().min(10).max(16).required(),
      })
const onSubmit = (data) => {
  // const fData = new FormData();
  // fData.append('file',file)
  console.log(data, data.values)
    // axios.post(`http://localhost:8000/auth`, data).then((response) => {
    //    navigate("/login");  
    //    console.log(response.data);
    // });
};

// const onFileHandler = (event) =>{
//   setFile(event.target.files[0]);
// }
  return (
    <div className='mx-auto w-80 mt-0 mb-60 h-96'>
      <div className='relative flex justify-center'>
         <span className='absolute transform translate-y-6 rounded-full border-t-4 border-gray-700 bg-gray-900 h-24 w-24 shadow-md shadow-gray-500'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-600" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
             <input type="file" hidden />
            <span className='absolute bottom-[1px] left-0' >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="red" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
        </span>
    </div>
    <div className='block mt-16 pt-16 bg-gray-900 p-6 border-t-2 border-gray-700 rounded-3xl shadow-xl shadow-gray-600'>
    <h1 className='text-center text-xl text-gray-300'>New Member</h1>
      <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema} >
        <Form onSubmit={onSubmit}>
            <Field 
                className='input'
                type="text" 
                name="username" 
                placeholder="input your username" 
                autoComplete="off" />
            <ErrorMessage 
                className='text-red-900'
                name="username" 
                component="span"  />
            <Field
            className='input'
            type="text"
            name="fullname"
            placeholder="Full Name"
            
            />
            <Field
            className='input'
            type="text"
            name="email"
            placeholder="Email"
            
            />
            <Field
            className='input'
            type="text"
            name="BirthDate"
            placeholder="Birth Date"
            
            />
            <Field
            className='input'
            type="text"
            name="phone"
            placeholder="Phone Number"
            
            />

            <Field 
                className='input'
                type="password" 
                name="password" 
                placeholder="enter your password" 
                autoComplete="off" />
            <ErrorMessage 
                className='text-red-900'
                name="password"
                component="span"  />
            <div className='w-full text-gray-300 rounded-3xl pl-4 mt-2'>
              {/* <Field 
                className="accent-red-800 bg-gray-700 border"
                type="checkBox" 
                name="privcy"  
                 /> <span className='text-gray-300'> I accept your privicy policy </span> */}
            </div>
            <button 
            className='w-full bg-gray-700 rounded-3xl p-2 mt-3 hover:bg-gray-800 hover:border-l-2 hover:border-r-2 border-gray-700' 
            type="button"
            >Register</button>
        </Form>
      </Formik>
      <div className='grid'>
      <span className='text-[10px] leading-3 px-4 text-center mt-2 text-gray-500'>Plaese Try to accept our privcy policy 
      its an important thing for our client security</span>
      </div>
    </div>
</div>
  )
};

export default Register;
