import { current } from "@reduxjs/toolkit";
import {
    CREATE_DATA,
    READ_ALL_DATA,
    UPDATE_DATA,
    DELETE_DATA,
    READ_ITEM_DATA,
    initPosts
  } from "../actions/types";
  
  const initialState = [];
  
  function postReducer(posts = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_DATA:
        return [...posts, payload];
  
      case READ_ALL_DATA:
        //console.log("Recuder")
        //console.log(payload)
        return payload;
  
        case initPosts:
            return payload;
       case UPDATE_DATA:
        return posts.map((post) => {
          if (post.id === payload.id) {
            return {
              ...post,
              ...payload,
            };
          } else {
            return post;
          }
        });
  
      case DELETE_DATA:
        return (posts.filter(({ id }) => id !== payload.id));
  
      case READ_ITEM_DATA:
        return posts.filter(({ id }) => id === payload.id);
  
      default:
        return posts;
    }
  };
  
  export default postReducer;