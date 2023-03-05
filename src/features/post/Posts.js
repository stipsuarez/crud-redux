import styles from './Posts.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deletePost, getAllPosts, getPostById, showModal, showModalAction } from '../../app/actions/postsActions';
import { AlertModal } from '../modals/AlertModal';


export function Posts() {
    const navegate = useNavigate()

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllPosts());
    }, []);

    const [showAlert, setShowAlert] = useState(false)
    var posts = useSelector(state => state.posts);
    const general1 = useSelector(state => state.general);
    const [general, setGeneral] = useState(showAlert);

    let [currentPost, setcurrentPost] = useState(general1.idPost)
    //setcurrentPost(general1.idPost)
    if(currentPost!==general1.idPost && general1.idPost==-1)
    currentPost=  general1.idPost
    console.log("Genal status")
    console.log(general1, currentPost)

    //const [cieloRaso, setCieloRaso] = useState(false);
    // const storePost = store.getState().posters;

    //function reset(){
    if (!general1.showModal && general1.aceptAction && general1.idPost && general1.idPost > 0 && currentPost > 0) {
        console.log("Before delete")
        console.log(general1, currentPost)
        //setcurrentPost(-1)
        dispatch(deletePost(general1.idPost)).then(response => {

            console.log("After delete")
            //setcurrentPost(-1)
            //general1.idPost = -1
            console.log(general1.idPost, currentPost, response)
            //posts=posts.filter((prevItem) => prevItem !== response)
        }
            //setcurrentPost(-1)
            //general1.idPost=-1

            //


        ).catch(e => {
            console.log(e)
        });
    }
    //}

    const resetId = () => {

    }
    function onActionClick(action, payload) {
        setcurrentPost(payload)
        console.log(action + "  " + payload)
        if (action === "delete") {

            setShowAlert(true)
            handleOpen(payload)
            // if (general.aceptAction) {
            //     dispatch(deletePost(payload)).then(

            //     ).catch(e => {
            //         console.log(e)
            //     });
            // }
        }
        if (action === "new") {
            navegate("/post/add")
        }
        if (action === "view") {
            navegate("/post/" + payload)
        }
        if (action === "edit") {
            navegate("/post/edit/" + payload)
        }
    }

    // console.log("beforeUserdispach")
    // console.log(posts)
    const handleOpen = (id) => {
        //e.preventDefault();
        //refForm.current.reset();
        //setCieloRaso(cieloRaso)
        dispatch(showModalAction(true, id)).then(
            response => {
                //setPost(...post)
                //setSubmitted(true);
                setGeneral(response)
                console.log("Set general in POSTS handleOpen result")
                console.log(response);
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
                                                    <button onClick={() => onActionClick("edit", post.id)} className='btn btn-success'>Edit</button>
                                                    <button onClick={() => onActionClick("view", post.id)} className='btn btn-primary'>View</button>
                                                    <button onClick={() => onActionClick("delete", post.id)} className='btn btn-danger'>Delete</button>
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



        </div>
    );
}