import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import LikeButton from "../components/LikeButton";
import { getPostByUserId } from "../api/posts";
import { getUsername } from "../api/account";
import { likePost } from "../api/likes";
// import StarsIcon from '@material-ui/icons/Stars';

function Profile() {
  let { id } = useParams();
  const [myUsername, setMyUsername] = useState("");
  const [myPosts, setMyPosts] = useState([]);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    getUsername(id).then((data) => {
      setMyUsername(data.username);
    });

    getPostByUserId(id).then((posts) => {
      setMyPosts(posts);
    });
  }, [id, liked]);

  const likeApost = async (postId) => {
    await likePost(postId);
    setLiked(!liked);
  };

  return (
    <div className="flex flex-col m-auto w-full h-full mt-8 bg-gray-900 p-6 sm:px-20">
      <div className="bg-gray-900 h-auto text-gray-400">
        <div className="flex flex-col w-full items-center p-2">
          <div className="h-40 w-40 rounded-full bg-red-900 mt-2"></div>
          <div className="text-2xl">
           {authState.username === myUsername && (
              <span
                onClick={() => {
                  navigate("/ChangePswd");
                }}
              >
                {myUsername}
              </span>
            )}
          </div>
          <div className="text-center p-2">
            Never Give Up Beleave In You You Are Actual A Hero{" "}
          </div>
          <div>some Pictures are here</div>
        </div>
        <div></div>
      </div>

      <div className="bg-gray-900 border-t rounded border-gray-700">
        {myPosts.map((value) => {
          return (
            <div
              className="relative grid rounded-xl mt-6 bg-gray-800 p-4 w-full"
              key={value.id}
            >
              <div className="absolute flex justify-between w-full transform -translate-x-1 -translate-y-3">
                <div className="h-12 w-full transform translate-x-1 translate-y-3 p-2">
                  <div className="text-gray-600">{value.createdAt}</div>
                </div>
              </div>
              <div className="bg-gray-800 mt-8 text-gray-300">
                <div className="bg-gray-800 text-center border-t border-gray-700 font-black">
                  {value.title}
                </div>
                <div
                  className="break-all p-4 pt-0 "
                  onClick={() => {
                    navigate(`/posts${value.id}`);
                  }}
                >
                  {value.postText}
                </div>
              </div>

              <div className="flex justify-between text-gray-400 p-[3px] border-t border-gray-600 mt-2">
                <div
                  onClick={() => {
                    navigate(`/posts${value.id}`);
                  }}
                >
                  comment
                </div>
                <LikeButton
                  liked={
                    value.Likes.findIndex(
                      (like) => like.UserId === authState.id
                    ) !== -1
                  }
                  onClick={() => likeApost(value.id)}
                  count={value.Likes.length}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
