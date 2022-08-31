import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

import { Icon } from "@iconify/react";
import CommentBody from "./CommentBody";
import LikeButton from "./LikeButton";
import { deletePost, editPost, getPostById } from "../api/posts";
import { createComment, deleteComment } from "../api/comments";
import { likePost } from "../api/likes";

export function PostCard({
  authState,
  editPost,
  showComment,
  showDelete,
  likeApost,
  deleteApost,
  post,
}) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="relative grid mt-6 bg-gray-800 border-t-2 border-gray-700 rounded-xl p-4 w-full">
        <div className="absolute flex  justify-between w-full transform -translate-x-1 -translate-y-3">
          <div className="w-16 h-14 rounded-full border-t border-l border-gray-600 bg-gray-800 z-10 ">
            <span className="flex justify-center w-full h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 text-gray-600 self-center p-[12px] mr-2"
                fill="none"
                viewBox="0 0 20 20"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>
          </div>
          <div className="flex justify-between h-12 w-full transform translate-x-1 translate-y-3 p-2">
            <div className="bg-gray-800 border-b rounded w-full border-gray-700">
              {post.username}
            </div>
            <div className="text-gray-400">
              {authState.username === post.username && showDelete && (
                <button
                  onClick={() => {
                    deleteApost(post.id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 p-[4px]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="bg-gray-800 border-gray-700 mt-8">
          <div
            className="bg-gray-800 border-gray-700 rounded-xl p-2 text-center text-xl"
            onDoubleClick={() => {
              if (authState.username === post.username) {
                editPost("title");
              }
            }}
          >
            {post.title}
          </div>
          <div
            className="break-all p-4 border-t border-gray-700 border-b rounded-xl "
            onDoubleClick={() => {
              if (authState.username === post.username) {
                editPost("body");
              }
            }}
          >
            {post.postText}
          </div>
        </div>

        <div className="flex justify-between mt-2">
          <div
            className="flex flex-col ml-6"
            onClick={() => {
              navigate(`/posts${post.id}`);
            }}
          >
            {showComment && (
              <>
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
              </>
            )}
          </div>

          <LikeButton
            count={post.Likes.length}
            liked={
              post.Likes.findIndex((like) => like.UserId === authState.id) > -1
            }
            onClick={() => {
              likeApost(post.id);
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Post() {
  const [postObject, setPostObject] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [liked, setLiked] = useState(false);

  const { id } = useParams({});
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(id).then((post) => {
      console.log(post);
      setPostObject(post);
      setComments(post.comments);
    });
  }, [id, liked]);

  // Adding comment ...................................//

  const addComment = () => {
    createComment(id, newComment).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        const commentToAdd = {
          commentBody: newComment,
          username: response.data.username,
        };
        setComments([...comments, commentToAdd]);
        setNewComment("");
      }
    });
  };
  // Deleting A Comment///////////////////////////////////////
  const deleteAcomment = (id) => {
    deleteComment(id).then(() => {
      alert("COMMENT DELETED");
      setComments(
        comments.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  const deleteApost = async () => {
    await deletePost(id);
    alert("deleted");
    navigate("/");
  };

  const editApost = (option) => {
    if (option === "title") {
      let newTitle = prompt("Enter new title");

      editPost(id, { title: newTitle });
      setPostObject({ ...postObject, title: newTitle });
    } else {
      let newPostText = prompt("Enter new Text");
      editPost(id, { text: newPostText });
      setPostObject({ ...postObject, postText: newPostText });
    }
  };

  const likeApost = async (postId) => {
    await likePost(postId);
    setLiked(!liked);
  };

  if (!postObject) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col m-2 mt-14 sm:px-20 text-gray-300">
      <PostCard
        showComment={false}
        likeApost={likeApost}
        editPost={editApost}
        deleteApost={deleteApost}
        showDelete={true}
        authState={authState}
        post={postObject}
      />
      <div className="grid h-full bg-gray-900 mt-2 p-4">
        <div>
          <div className="fixed flex gap-2 bottom-0 bg-gray-800 left-0 w-full p-4">
            <input
              className="w-full text-white bg-gray-700 bg-opacity-50 hover:bg-opacity-100 focus:bg-opacity-100 outline-none rounded-xl p-2 text-gray-900"
              type="text"
              value={newComment}
              placeholder="Comment..."
              onChange={(event) => {
                setNewComment(event.target.value);
              }}
            />
            
            <button
              disabled={newComment === ''}
            className="flex p-2 transition duration-300 bg-blue-700 disabled:bg-gray-700 text-2xl rounded-xl justify-center items-center"
              type="submit"
              onClick={addComment}
            >
              <Icon icon="bi:send-fill" />
            </button>
          </div>

          <div className="mb-16 ">
            {comments.map((comment) => {
              return (
                <CommentBody
                  deleteComment={deleteAcomment}
                  key={comment.id}
                  comment={comment}
                  myUsername={authState.username}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
