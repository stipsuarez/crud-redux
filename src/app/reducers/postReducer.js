import { any } from 'prop-types';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from '../services/postService';
//This is like a service


const initialState = []
// getAllPosts().then(posts=>{
//     //console.log(posts.data)
//     //store.dispatch(initPosts(posts.data))
//     dataR= posts.data
//   })
export const postReducer = (state = initialState, action) => {
    switch (action) {
        case "@post/initPosts":
            return action.payload
        case "@post/create":
            return state.push(state.payload)

        case "@post/get":
            return state.value
        case "@post/initItems":
            return state.value += state.data


        case "@post/update":
            const id = state.id
            const current = state.find(id)
            return current = state.payload
        case "@post/delete":
            const idD = state.id
            return state.reduce(idD)
        default:
            return state
    }

}
export const initPosts = posts => {
    // console.log("data in reducer")
    // console.log(posts)
    //initialState=posts
    return {
        type: "@post/initPosts",
        payload: posts
    }
}