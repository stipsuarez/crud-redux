import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createPost, getPostById, updatePost } from "../../../app/actions/postsActions";
import postService from "../../../app/services/postService";


export function AddPost() {
    const initialPostState = {
        id: 0,
        title: "",
        profileId: 0
    };

    const [post, setPost] = useState(initialPostState);

    const dispatch = useDispatch();


    const { id } = useParams()

    const getPost = id => {
        if (id && id > 0) {
            postService.getPostById(id)
                .then(response => {
                    // console.log(response.data);
                    setPost(response.data);

                })
                .catch(e => {
                    console.log(e);
                });
        }
    }


    useEffect(() => {
        getPost(id);
    }, [id]);




    const [submitted, setSubmitted] = useState(false);



    const handleInputChange = async event => {
        const { name, value } = event.target;
        setPost({ ...post, [name]: value });
    };
    const updatePostC = () => {
        // const data = {
        //     id: post.id,
        //     title: post.title,
        //     profileId: post.profileId
        // };
        dispatch(updatePost(id, post)).then(
            response => {
                //setPost(...post)
                setSubmitted(true);
                // console.log(response);
            }
        ).catch(e => {
            console.log(e);
        });
    }

    const savePost = () => {
        const { title, profileId } = post;

        dispatch(createPost(title, profileId))
            .then(data => {
                setPost({
                    id: data.id,
                    title: data.title,
                    profileId: data.profileId
                });
                setSubmitted(true);

                // console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newPost = () => {
        setPost(initialPostState);
        setSubmitted(false);
    };
    const navegate = useNavigate()

    const PostPage = () => {
        //goposts
        //navegate("/posts")
        //go back
        navegate(-1)
    }
    const changeSubmitting = () => {
        //goposts
        //navegate("/posts")
        //go back
        setSubmitted(false)
    }

    return (
        <div className="submit-form containerC">
            {submitted  ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newPost}>
                        Add
                    </button>
                    <button className="btn btn-secondary" onClick={PostPage}>
                        Go Back
                    </button>

                    <button className="btn btn-primary" onClick={changeSubmitting}>
                        Edit again
                    </button>

                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">{id && id > 0 ? "Editar Post: " + id : "Crear"}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={post.title}
                            onChange={handleInputChange}
                            name="title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="profileId">Profile Id</label>
                        <input
                            type="number"
                            className="form-control"
                            id="profileId"
                            required
                            value={post.profileId}
                            onChange={handleInputChange}
                            name="profileId"
                        />
                    </div>
                    <div className="align-items-stretch">
                        {id && id > 0 ?
                            <button onClick={updatePostC} className="btn btn-primary">
                                Update
                            </button>
                            :
                            <button onClick={savePost} className="btn btn-success">
                                Create
                            </button>
                        }


                        <button className="btn btn-secondary" onClick={PostPage}>
                            Go Back
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};



// import { useState } from "react";
// import { FormGroup, FormLabel } from "react-bootstrap";
// import { useDispatch } from "react-redux";
// import { UPDATE_DATA } from "../postSlice";



// export function AddPost() {
//     const dispatch = useDispatch();

//     var modelPost = {
//         "id": 0,
//         "title": "",
//         "profileId": 0
//     }
//     function inputChangedHandler(event) {
//         console.log(event)
//         console.log(event.id)
//         console.log(event.value)
//         if (event.id === "title")
//             modelPost.title = event.value
//         if (event.id === "profileId")
//             modelPost.profileId = event.value
//         setpostC(modelPost)
//         dispatch(UPDATE_DATA, modelPost)
//         //const updatedKeyword = event.target.value;
//         // May be call for search result
//     }
//     // console.log("posts component...")
//     // console.log(posts)
//     let [postC, setpostC] = useState(modelPost);

//     console.log("posts component...")
//     console.log(postC)
//     function onActionClick(action, payload) {
//         console.log(action + "  " + payload)
//         if (action === "edit") {
//             //open modal
//         }
//     }
//     return (
//         <div className='containerC'>
//             <form>
//                 <FormGroup>
//                     <FormLabel>Titulo</FormLabel>
//                     <input type={"text"} id="title" placeholder="Título" className="form-control" formTarget='title' value={modelPost.title || ""} onChange={(event) => inputChangedHandler(event.target)} ></input>
//                 </FormGroup>
//                 <FormGroup>
//                     <FormLabel>Profile Id</FormLabel>
//                     <input type={"number"} id="profileId" placeholder="Creador" className="form-control" formTarget='profileId' value={modelPost.profileId || 0} onChange={(event) => setpostC(event)} ></input>
//                 </FormGroup>
//                 <button type="submit" className='btn btn-secondary' onClick={() => onActionClick("new", { postC })}>Add post</button>
//             </form>
//         </div>)
// }