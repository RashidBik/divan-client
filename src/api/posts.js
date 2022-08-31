import axios from "./axios"
import {getComments} from './comments'

export function getAllPosts() {
    return axios.get('/posts').then(res => res.data)
}

// with comments and likes
export async function getPostById(id) {
    const post = await axios.get(`/posts/byId/${id}`).then(res => res.data)
    const comments = await getComments(id)

    console.log(comments)
    return {...post, comments }
}

export function getPostByUserId(id) {
    return axios.get(`/posts/byuserId/${id}`).then(res => res.data)
}

export function createPost(post) {
    return axios.post('/posts', post)
}

export function deletePost(id) {
    return axios.delete(`/posts/${id}`).then(res => res.data)
}

export async function editPost(id, post) {
    // edit title
    if(post.title) {
        await axios.put('/posts/title', {id, newTitle: post.title})
    }

    if(post.text) {
        await axios.put('/posts/postText', {id, newText: post.text})
    }
    return true
}
