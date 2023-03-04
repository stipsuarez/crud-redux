import postService from "../services/postService";
import { CREATE_DATA, DELETE_DATA, READ_ALL_DATA, READ_ITEM_DATA, UPDATE_DATA } from "./types";

  export const createPost = (title, profileId) => async (dispatch) => {
    try {
      const res = await postService.createPost({ title, profileId });

      dispatch({
        type: CREATE_DATA,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const getAllPosts = (data) => async (dispatch) => {
    try {
      const res = await postService.getAllPosts();
//   console.log("res")
//   console.log(res)
      dispatch({
        type: READ_ALL_DATA,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  export const updatePost = (id, data) => async (dispatch) => {
    try {
      const res = await postService.updatePost(id, data);

      dispatch({
        type: UPDATE_DATA,
        payload: data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const deletePost = (id) => async (dispatch) => {
    try {
      await postService.deletePost(id);

      dispatch({
        type: DELETE_DATA,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };

//   export const deleteAllTutorials = () => async (dispatch) => {
//     try {
//       const res = await postService.removeAll();

//       dispatch({
//         type: DELETE_ALL_TUTORIALS,
//         payload: res.data,
//       });

//       return Promise.resolve(res.data);
//     } catch (err) {
//       return Promise.reject(err);
//     }
//   };

  export const getPostById = (id) => async (dispatch) => {
    try {
      const res = await postService.getPostById(id);

      dispatch({
        type: READ_ITEM_DATA,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };