import axios from "axios"
import { async } from "q"


const baseUrl = " http://localhost:3004/"
const moduleUrl = "posts"

export const getAllPosts = async () => {
    // console.log(baseUrl + moduleUrl)
    const response = await axios.get(baseUrl + moduleUrl)
    return response
}

export const getPostById = async (id) => {
    const response = await axios.getById(baseUrl + moduleUrl+"/"+id)
    return response
}

export const createPost = async (payload) => {
    const response = await axios.post(baseUrl + moduleUrl,payload)
    return response
}

export const updatePost = async (id,payload) => {
    const response = await axios.put(baseUrl + moduleUrl+"/"+id,payload)
    return response
}
export const deletePost = async (id) => {
    const response = await axios.delete(baseUrl + moduleUrl+"/"+id)
    return response
}

