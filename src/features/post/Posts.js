import { dataPost } from '../../app/store';
import styles from './Posts.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { READ_ALL_DATA } from '../../app/actions/types';
import { useEffect } from 'react';
import { getAllPosts } from '../../app/actions/postsActions';


export function Posts() {
    const navegate = useNavigate()

    const addPostPage = () => {
        navegate("/post/add")
    }
    // const storePost = store.getState().posters;
    function onActionClick(action, payload) {
        console.log(action + "  " + payload)
        if (action === "edit") {
            //open modal
        }
        if (action === "new") {
            //history.go("/post/new")
        }
    }
    
    //var posts=[]
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllPosts());
    }, []);

    
    const posts = useSelector(state => state.posts);
 

    console.log("beforeUserdispach")
    console.log(posts)
    // if (postsd == null || postsd.length == 0) {
    //   posts= dispatch(getAllPosts())
    //          .then(data => {
    //         //     //     setPosts(data);
    //         //     //     // setSubmitted(true);
    //               console.log("then")
    //                   console.log(data);
    //              posts.push(data)
    //          })
    //         .catch(e => {
    //             console.log(e);
    //         });

    // }
   // var postse= posts;
    // console.log("Luego deWSS")
    // console.log(posts)
    //var posts = dataPost;


    //storePost.action("@post/initPosts")
    return (
        <div className='containerC'>
            <button onClick={() => addPostPage()} className='btn btn-primary'>New</button>
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
                        {/* {console.log("posts in view")}
                        {console.log(posts)} */}
                        {posts && posts.length > 0 && Array.isArray(posts) ?
                            posts.map(post => {
                                return (
                                    <tr key={post.id}>
                                        <td>{post.id}</td>
                                        <td>{post.title}</td>
                                        <td>{post.profileId}</td>
                                        <td>
                                            <button onClick={() => onActionClick("edit", post.id)} className='btn btn-success'>Edit</button>
                                            <button onClick={() => onActionClick("delete", post.id)} className='btn btn-danger'>Delete</button>
                                            <button onClick={() => onActionClick("view", post.id)} className='btn btn-primary'>View</button>
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
    );
}