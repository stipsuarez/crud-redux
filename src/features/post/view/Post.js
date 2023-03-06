import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {  setCurrentPost } from "../../../app/actions/postsActions";
import postService from "../../../app/services/postService";

export function Post(payload) {
    const navegator = useNavigate()
    const { id } = useParams()
    const dispatch = useDispatch()
    const initialState = {
        id: null,
        title: "",
        profileId: null
    }
    const [currentPost, setCurrentPostL] = useState(initialState)

    const getPost = id => {
        postService.getPostById(id)
            .then(response => {
                //console.log(response.data);
                setCurrentPostL(response.data);

            })
            .catch(e => {
                console.log(e);
            });
    };
    //console.log(currentPost)

    useEffect(() => {
        getPost(id);
    }, [id]);

    function goToUpdate(){
        //console.log("go to update in view",currentPost)
        dispatch(setCurrentPost(currentPost)).then( (response)=>
            navegator("/post/edit/"+currentPost.id)
        ).catch(e=>console.log(e))
        
    }

    return (
        <div className='containerC align-items-center'>
            <div className="row">
                <div className="col-12">
                    <h4>Post</h4>
                    <div>
                        <label>
                            <strong>Id:</strong>
                        </label>{" "}
                        {currentPost.id}
                    </div>
                    <div>
                        <label>
                            <strong>Title:</strong>
                        </label>{" "}
                        {currentPost.title}
                    </div>
                    <div>
                        <label>
                            <strong>Profile:</strong>
                        </label>{" "}
                        {currentPost.profileId}
                    </div>

                    <button onClick={() => goToUpdate()} className='btn btn-success'>Update</button>
                    <button onClick={() => navegator(-1)} className='btn btn-secondary'>Back</button>
                </div>
            </div>
           
           
        </div>)
}