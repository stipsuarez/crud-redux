import axios from "axios"
import { async } from "q"


const baseUrl = "http://localhost:3004/"
const moduleUrl = "posts"

const getAllPosts = async () => {
    // console.log(baseUrl + moduleUrl)
    const response = await axios.get(baseUrl + moduleUrl)
    return response
}

 const getPostById = async (id) => {
    //console.log("Ruta:  "+baseUrl + moduleUrl+"/"+id)
    const response = await axios.get(baseUrl + moduleUrl+"/"+id)
    return response
}

 const createPost = async (payload) => {
    const response = await axios.post(baseUrl + moduleUrl,payload)
    return response
}

 const updatePost = async (id,payload) => {
    const response = await axios.put(baseUrl + moduleUrl+"/"+id,payload)
    return response
}
 const deletePost = async (id) => {
    console.log("Url delete: "+baseUrl + moduleUrl+"/"+id)
    const response = await axios.delete(baseUrl + moduleUrl+"/"+id)
    return response
}

const postService = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
  };
  
  export default postService;