import postService from "../services/postService";
import { CREATE_DATA, DELETE_DATA, READ_ALL_DATA, READ_ITEM_DATA, UPDATE_DATA, showModal, ACCEPT_ACTION, RESET_ID } from "./types";

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
    // return Promise.resolve(res.data);
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
var countExecuted = 0
export const deletePost = (id) => async (dispatch) => {
  try {
    // console.log("In dilete Action")
    // console.log(dispatch,id,countExecuted)
    await postService.deletePost(id).then(result=>{
      countExecuted++
    });
    dispatch({
      type: RESET_ID,
      payload: { id },
    });

    dispatch({
      type: DELETE_DATA,
      payload: { id },
    });
    
    return id
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

export const showModalAction = (value, id) => async (dispatch) => {
  try {
    //const res = await postService.getPostById(id);
    // console.log("in action showModal")
    // console.log(value)
    await dispatch({
      type: showModal,
      payload: { value, id },
    });
    return value;
  } catch (err) {
    console.log("Error show modal action");
    console.log(err);
  }
};
export const acceptAction = (value) => async (dispatch) => {
  try {
    //const res = await postService.getPostById(id);
    // console.log("in action showModal")
    // console.log(value)
    await dispatch({
      type: ACCEPT_ACTION,
      payload: { value },

    });
    return value;
  } catch (err) {
    console.log(err);
  }
};

export const resetId = () => async (dispatch) => {
  try {
    //const res = await postService.getPostById(id);
    // console.log("in action showModal")
    // console.log(value)
    await dispatch({
      type: RESET_ID,
      payload: { id: -1 },

    });
  } catch (err) {
    console.log(err);
  }
};