import styles from './Posts.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deletePost, getAllPosts, getPostById, setCurrentPost, setId, showModal, showModalAction } from '../../app/actions/postsActions';
import { AlertModal } from '../modals/AlertModal';
import { EditModal } from '../modals/EditModal';


export function Posts() {
    const navegate = useNavigate()

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllPosts());
    }, []);

    const [showAlert, setShowAlert] = useState(false)
    const [showAlertM, setShowAlertM] = useState(false)
    var posts = useSelector(state => state.posts);
    const general1 = useSelector(state => state.general);
    const [general, setGeneral] = useState(showAlert);

    let [currentPost, setcurrentPost] = useState(general1.idPost)
    //setcurrentPost(general1.idPost)
    if (currentPost !== general1.idPost && general1.idPost == -1)
        currentPost = general1.idPost
    // console.log("Genal status")
    // console.log(general1, currentPost)

    //const [cieloRaso, setCieloRaso] = useState(false);
    // const storePost = store.getState().posters;

    //function reset(){
    if (!general1.showModal && general1.aceptAction && general1.idPost && general1.idPost > 0 && currentPost > 0) {
        // console.log("Before delete")
        // console.log(general1, currentPost)
        //setcurrentPost(-1)
        dispatch(deletePost(general1.idPost)).then(response => {

            // console.log("After delete")
            // //setcurrentPost(-1)
            // //general1.idPost = -1
            // console.log(general1.idPost, currentPost, response)
            //posts=posts.filter((prevItem) => prevItem !== response)
        }

        ).catch(e => {
            console.log(e)
        });
    }
    //}

    function setIdPorspect(id) {
        dispatch(setId(id)).then(
            (response) => {
                setcurrentPost(id)
            }).catch(e =>
                console.log(e)
            )
    }
    function onActionClick(action, payload) {
        setcurrentPost(payload)
        console.log(action, payload)
        if (action === "delete") {
            dispatch(setCurrentPost(currentPost)).then((response) => {
                //    navegate("/post/edit/" + payload.payload.id)
                setShowAlert(true)
                handleOpen(payload,action)
            })

        }
        else if (action === "editM") {

            setShowAlertM(true)
            dispatch(setCurrentPost(payload.payload.currentPost)).then((response) => {
                //navegate("/post/edit/" + payload.payload.id)
                handleOpen(payload.payload.id, action)
            })
            
        }
        else if (action === "newM") {

            setShowAlertM(true)
            dispatch(setCurrentPost({})).then((response) => {
                //navegate("/post/edit/" + payload.payload.id)
                setShowAlert(true)
                handleOpen(-1, action)
            })
            
        }
       else if (action === "new") {
            navegate("/post/add")
        }
        else if (action === "view") {
            navegate("/post/" + payload)
        }
        else if (action === "edit") {
            dispatch(setCurrentPost(payload.payload.currentPost)).then((response) => {
                navegate("/post/edit/" + payload.payload.id)
            })

        }
    }

    // console.log("beforeUserdispach")
    // console.log(posts)
    const handleOpen = (id,action) => {
        //e.preventDefault();
        //refForm.current.reset();
        //setCieloRaso(cieloRaso)
        setIdPorspect(id)
        dispatch(showModalAction(true, id,action)).then(
            response => {
                //setPost(...post)
                //setSubmitted(true);
                setGeneral(response)
                // console.log("Set general in POSTS handleOpen result")
                // console.log(response);
            }
        ).catch(e => {
            console.log(e);
        });
        setGeneral(true)
        setShowAlert(true)
    };

    return (
        <div className='containerC'>
            <div className='row'>
                <div className='col-10'>
                    <button onClick={() => onActionClick('new', null)} className='btn btn-secondary float-end pl-10'>New Post</button>
                    <button onClick={() => onActionClick('newM', null)} className='btn btn-warning float-end pl-10'>New Post Modal</button>
                </div>
                <div className='col-12'>
                    <div className="table-responsive">
                        <table className="table" >
                            <thead>
                                <tr className="tableHeader">
                                    <th colSpan={4}>Posts</th>
                                </tr>
                                <tr className="tableHeader">
                                    <th className={styles.th}>#ID</th>
                                    <td className={styles.td}>Tittle</td>
                                    <td className={styles.td}>Author</td>
                                    <td className={styles.td}>Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                {posts && posts.length > 0 && Array.isArray(posts) ?
                                    posts.map(post => {
                                        return (
                                            <tr key={post.id}>
                                                <td>{post.id}</td>
                                                <td>{post.title}</td>
                                                <td>{post.profileId}</td>
                                                <td>
                                                    <button onClick={() => onActionClick("edit", { payload: { id: post.id, currentPost: post } })} className='btn btn-success'>Edit</button>
                                                    <button onClick={() => onActionClick("view", post.id)} className='btn btn-primary'>View</button>
                                                    <button onClick={() => onActionClick("delete", post.id)} className='btn btn-danger'>Delete</button>
                                                    <button onClick={() => onActionClick("editM", { payload: { id: post.id, currentPost: post } })} className='btn btn-success'>Edit Modal</button>
                                                    {/* <button onClick={() => handleOpen()} className='btn btn-danger'>Delete D</button> */}
                                                </td>
                                            </tr>)
                                    })
                                    :
                                    <tr >
                                        <td colSpan={4}></td>

                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>

            <AlertModal showAlert={general1} ></AlertModal>
            <EditModal showAlert={general1} ></EditModal>



        </div>
    );
}