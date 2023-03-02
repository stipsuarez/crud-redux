import { getAllPosts } from '../../app/services/postService';
import { dataPost, initPostApi, initPostRedut, store } from '../../app/store';
import styles from './Post.module.css';
export function Post() {

    // const posts = store.getState();

    // console.log("posts component")
    // console.log(posts)
    var posts = dataPost;
    return (
        <div className="container">
            <div className="table-responsive">
                <table className="table" >
                    <thead>
                        <tr className="tableHeader">
                            <th className={styles.th}>#ID</th>
                            <td className={styles.td}>Tittle</td>
                            <td className={styles.td}>Author</td>
                            <td className={styles.td}>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                       
                        {posts.map(post => {
                            return (
                                <tr key={post.id}>
                                    <td>{post.id}</td>
                                    <td>{post.title}</td>
                                    <td>{post.profileId}</td>
                                    <td><button className='btn btn-success'>Edit</button></td>
                                </tr>)
                        })}

                    </tbody>

                </table>

            </div>
        </div>
    );
}