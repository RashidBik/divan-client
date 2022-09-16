import React, {useEffect } from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
// import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/posts';


function CreatePost() {
  let navigate = useNavigate();
  // const [image, setImage] = useState(null);

useEffect(() => {
  if (!localStorage.getItem("accessToken")){
    navigate('/login');
  }
},[navigate]);

const initialValues = {
  title: "", 
  postText: "",
  // myImage: [],
}; 

const validationSchema = Yup.object().shape({
    title: Yup.string().required('this field is required'),
    postText: Yup.string().required(),
    // myImage:Yup.array().min(1,"select at least 1 file")
  }
);
// cause it crashes the app due to low quality network arround me 
// const imageChange = (e) => {
//   setImage(e.target.files[0]);
// }

const onSubmit = (data) => {
  // const formData = new FormData();
  // formData.append(
  //   "myFile",
  //   image,
  //   image.name
  // );
  createPost(data)
  .then((response)=> {
    if (!response.data.error){ 
      navigate("/");
    }else{
      alert(response.data.error);  
    }
  });
 console.log(data); 
};

  return (
    <div className='flex min-h-screen xl:px-40 w-screen py-20 sm:px-20'>
    <div className='w-full m-auto p-6 h-full bg-["url()"]'>
      <div className='text-gray-200 flex justify-center'>
      </div>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} >
            <Form className='p-2 text-gray-500 text-center '>
                disabled<input type='file' onChange={''} disabled/>
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
                <button 
                className='border rounded-md text-gray-100 px-4 hover:text-[17px]'
                 type='submit'>CreatePost</button>
                </div>
            </Form>
        </Formik>
    </div>
   </div>
  )
};

export default CreatePost
