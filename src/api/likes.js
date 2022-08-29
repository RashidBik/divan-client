import axios from "./axios";

export function likePost(postId) {
    return axios.post('/likes', {PostId: postId}).then(res => res.data)
}