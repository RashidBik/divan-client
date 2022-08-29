import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { likePost } from "../api/likes";
import { getAllPosts } from "../api/posts";
import { PostCard } from "../components/Post";
import { AuthContext } from "../helpers/AuthContext";

function Home() {
  const { authState } = useContext(AuthContext);
  const [listOfPosts, setListOfPosts] = useState([]);
  const [liked, setLiked] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
     getAllPosts()
        .then((posts) => {
          setListOfPosts(posts.listOfPosts);
          // console.log(posts);
          setLikedPosts(
            posts.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
    }
  }, [navigate, liked]);

  const likeApost = async (postId) => {
    await likePost(postId)
    setLiked(!liked)
      // .then((response) => {
      //   console.log(response.data); ////////////////////
      //   setListOfPosts(
      //     listOfPosts.map((post) => {
      //       if (post.id === postId) {
      //         if (response.data.liked) {
      //           return { ...post, Likes: [...post.Likes, 0] };
      //         } else {
      //           const likeArray = post.Likes;
      //           likeArray.pop();
      //           return { ...post, Likes: likeArray };
      //         }
      //       } else {
      //         return post;
      //       }
      //     })
      //   );
      //   if (likedPosts.includes(postId)) {
      //     setLikedPosts(
      //       likedPosts.filter((id) => {
      //         return id !== postId;
      //       })
      //     );
      //   } else {
      //     setLikedPosts([...likedPosts, postId]);
      //   }
      // });
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
              <PostCard showDelete={false} likeApost={likeApost} authState={authState} post={value} showComment={true}/>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
