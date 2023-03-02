import { configureStore } from '@reduxjs/toolkit';
import { any } from 'prop-types';
import counterReducer from '../features/counter/counterSlice';
import {  initPosts, postReducer } from './reducers/postReducer';
import { getAllPosts } from './services/postService';

export var dataPost= any

//const postRedu = postReducer(data)
getAllPosts().then(posts=>{
  console.log(posts.data)
  store.dispatch(initPosts(posts.data))
  dataPost=posts.data
  //return posts.data
})

export const store = configureStore({
  reducer: {
    counter: counterReducer,
     posters: postReducer
  },
});



