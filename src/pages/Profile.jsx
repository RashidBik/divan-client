import React, {useState, useEffect, useContext} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';
// import StarsIcon from '@material-ui/icons/Stars';


function Profile() {
  let {id} = useParams();
  const [myUsername, setMyUsername] = useState("");
  const [myPosts, setMyPosts] = useState([]);
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const navigate = useNavigate()
  const {authState} = useContext(AuthContext);

  useEffect(() => {
      axios.get(`http://192.168.0.116:8000/auth/basicinfo/${id}`)
      .then((response) => {
        // let res = ;
        setMyUsername(response.data.username);
    });
      axios.get(`http://192.168.0.116:8000/posts/byuserId/${id}`)
      .then((response) => {
        setMyPosts(response.data);
      })
  },[id]);
 
  const likeApost = (postId) => {
    axios.post('http://192.168.0.116:8000/likes',{PostId: postId},
    {headers: {accessToken: localStorage.getItem("accessToken")}}
    ).then((response)=> {
    console.log(response.data);////////////////////
      setListOfPosts(listOfPosts.map((post) => {
        if (post.id === postId) {
          if (response.data.liked) {
            return {...post, Likes: [...post.Likes, 0]}
           }else{
            const likeArray = post.Likes;
              likeArray.pop()
            return {...post, Likes: likeArray}
           }
        }else{
          return post;
        }
      }))
      if (likedPosts.includes(postId)) {
          setLikedPosts(likedPosts.filter((id) => {
            return id !== postId;
          }))
      }else{
        setLikedPosts([...likedPosts, postId])
      }
  });
}

  return (
    <div className='flex flex-col m-auto w-full h-full mt-8 bg-gray-900 p-6 sm:px-20'>
      <div className='bg-gray-900 h-auto text-gray-400'>
        <div className='flex flex-col w-full items-center p-2'>
          <div className='h-40 w-40 rounded-full bg-red-900 mt-2'></div>
          <div className='text-2xl'>{authState.username === myUsername && (
              <span onClick={() => {
              navigate("/ChangePswd");
              }} >{myUsername}</span>)}
        </div>
        <div className='text-center p-2'>Never Give Up Beleave In You You Are Actual A Hero </div>
       <div>
        some Pictures are here
       </div>
       </div>
       <div>
          
      </div>
    </div>

    <div className='bg-gray-900 border-t rounded border-gray-700'>
       {myPosts.map((value) => {
        return <div className='relative grid rounded-xl mt-6 bg-gray-800 p-4 w-full' key={value.id} > 
        <div className='absolute flex justify-between w-full transform -translate-x-1 -translate-y-3'>
        <div className='h-12 w-full transform translate-x-1 translate-y-3 p-2'>
        <div className='text-gray-600'>{value.createdAt}</div>
        </div>
        </div>
        <div className='bg-gray-800 mt-8 text-gray-300'>
        <div className='bg-gray-800 text-center border-t border-gray-700 text-xl p-2'>{value.title}</div>
        <div className='break-all p-4 border-y border-gray-700 rounded-xl ' 
        onClick={()=>{navigate(`/posts${value.id}`)}} >{value.postText}</div>
     
        </div>
        
        <div className='flex justify-between text-gray-400 p-[3px] mt-2'>
        <div onClick={()=>{navigate(`/posts${value.id}`)}}>comment</div>
        <div>
        <label>{value.Likes.length}</label>
        {/* <StarsIcon 
           onClick={()=>{likeApost(value.id)}}
           
           className={
             likedPosts.includes(value.id) ? "text-red-800" : "text-red-200"}  /> */}
        </div>
        </div>
      </div>
    })}
  </div>
 </div>
  )
}

export default Profile
