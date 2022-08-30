import axios from "./axios";

export function createComment(postId, comment) {
  return axios
    .post(`/comments`, { PostId: postId, commentBody: comment })
   
}

export function deleteComment(id) {
  return axios.delete(`/comments/${id}`).then((res) => res.data);
}

export function getComments(postId) {
  return axios.get(`/comments/${postId}`).then((res) => res.data);
}
