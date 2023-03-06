import { configureStore } from '@reduxjs/toolkit';
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import rootReducer from './reducers';

//export var dataPost = any
//const dispatch = useDispatch();
const initialState = {
  posts:[],
  counter:2,
  general:false
};

const middleware = [thunk];

//const postRedu = postReducer(data)
export const store = configureStore({
  reducer: rootReducer,
  devTools: composeWithDevTools(applyMiddleware(...middleware)),
  initialState

});


// postService.getAllPosts().then(posts => {
//   console.log("Store init")
//   console.log(posts.data)
 
//   //store.dispatch(initPosts,posts.data)
//   //dispatch(READ_ALL_DATA.toString(),posts.data)
//   // console.log(posts.data)
//   dataPost = posts.data
//   //initialState=posts.data
//   //return posts.data
// })
