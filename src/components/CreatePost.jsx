import React, {useEffect } from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  let navigate = useNavigate();

useEffect(() => {
  if (!localStorage.getItem("accessToken")){
    navigate('/login');
  }
},[navigate]);

const initialValues = {
  title: "", 
  postText: "",
}; 

const validationSchema = Yup.object().shape({
    title: Yup.string().required('this field is required'),
    postText: Yup.string().required(),
  }
);

const onSubmit = (data) => {
  axios.post('http://192.168.0.116:8000/posts',data,{
    headers:
      {accessToken: localStorage.getItem('accessToken')},
  })
  .then((response)=> {
    if (!response.data.error){ 
      navigate("/");
    }else{
      alert(response.data.error);  
    }
  });
};
// const TexArea = (props) => {
//   <Field {...props} as="textarea" id="postText" name="postText" children={props.children}></Field>
// }
  return (
    <div className='flex min-h-screen xl:px-40 w-screen py-20 sm:px-20'>
    <div className='w-full m-auto p-6 h-full'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
            <Form className='p-2 text-gray-500 text-center '>
                <div>Write here what your topic is about</div>
                <ErrorMessage className='text-red-900' name="title" component="span" />
                <Field
                className="w-full p-2 rounded-xl bg-gray-700 focus:text-gray-300"
                name="title" 
                placeholder="Title" 
                 />
                <div>Be patiant and try to write best qoutes or poems ever </div> 
                <ErrorMessage className='text-red-900' name="postText" component="span" />
                <Field
                as="textarea"
                className="w-full p-2 h-40 rounded-xl bg-gray-700 focus:text-gray-300" 
                name="postText" 
                placeholder="Text Content" />
                <div className='flex justify-end pr-2'>
                <button type='submit'>CreatePost</button>
                </div>
            </Form>
        </Formik>
    try to write usefull qoutes and poems
    </div>
   </div>
  )
};

export default CreatePost
