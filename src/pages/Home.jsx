import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Avatar } from "../components/CommentBody";
import LikeButton from "../components/LikeButton";
// import StarsIcon from '@material-ui/icons/Stars';
import { AuthContext } from "../helpers/AuthContext";

function Home() {
  const { authState } = useContext(AuthContext);
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:8000/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfPosts(response.data.listOfPosts);
          // console.log(response.data);
          setLikedPosts(
            response.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
    }
  }, [navigate]);

  const likeApost = (postId) => {
    axios
      .post(
        "http://localhost:8000/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        console.log(response.data); ////////////////////
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likeArray = post.Likes;
                likeArray.pop();
                return { ...post, Likes: likeArray };
              }
            } else {
              return post;
            }
          })
        );
        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id !== postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  };

  return (
    <div className="grid m-2 mt-16 text-gray-300 sm:px-20 md:grid-cols-5">
      <div className=""></div>
      <div className="md:w-full md:col-span-3">
        <div className="flex flex-row justify-between items-baseline">
          <Link
            className="bg-gray-700 p-2 sm:p-4 rounded-full"
            to={`/Profile/${authState.id}`}
          >
            {authState.username}
          </Link>
          <Link
            className="bg-gray-700 w-full ml-2 p-2 sm:p-4 rounded-full text-gray-500"
            to="/createPost"
          >
            <span className="animate-pulse">Create Post.....</span>
          </Link>
        </div>
        <div>
          {listOfPosts.map((value) => {
            return (
              <div
                className="relative grid mt-6 bg-gray-800 border-t-2 border-gray-700 rounded-xl p-4 w-full"
                key={value.id}
              >
                <div className="absolute flex justify-between w-full transform -translate-x-1 -translate-y-3">
                  <div className="w-16 h-14 rounded-full border-t border-l border-t border-l border-gray-600 bg-gray-800 z-10">
                    <span className="flex justify-center w-full h-full">
                      <Avatar className="rounded-full h-20 w-20 text-gray-600 self-center p-[12px] mr-2" />
                       </span>
                  </div>
                  <div className="h-12 w-full transform translate-x-1 translate-y-3 p-2">
                    <div className="bg-gray-800 border-b border-gray-700 pl-4 rounded-xl">
                      {value.username}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 mt-8">
                  <div className="bg-gray-800 text-center text-xl p-2">
                    {value.title}
                  </div>
                  <div
                    className="break-word p-4 border-gray-700 border-b border-t rounded-md "
                    onClick={() => {
                      navigate(`/posts${value.id}`);
                    }}
                  >
                    {value.postText}
                  </div>
                </div>

                <div className="flex justify-between p-[3px] mt-2">
                  <div
                    className="flex flex-col ml-6"
                    onClick={() => {
                      navigate(`/posts${value.id}`);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                      <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                    </svg>
                    comment
                  </div>
                  <div className="flex flex-col justify-end items-end mr-6">
                    <LikeButton
                      count={value.Likes.length}
                      liked={likedPosts.includes(value.id)}
                      onClick={() => likeApost(value.id)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
