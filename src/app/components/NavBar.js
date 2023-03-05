import { Modal } from '@mui/material';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { Counter } from '../../features/counter/Counter';
import { Home } from '../../features/home/Home';
import { AlertModal } from '../../features/modals/AlertModal';
import { AddPost } from '../../features/post/add/AddPost';
import { Posts } from '../../features/post/Posts';
import { Post } from '../../features/post/view/Post';
export function NavBar() {
    return (
        <>
            <BrowserRouter>
                <div className='container'>
                    <Navbar collapseOnSelect bg="light" expand="lg">

                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/home">
                                    {/* <Link to={"/home"} > */}
                                    Home
                                    {/* </Link> */}
                                </Nav.Link>
                                <Nav.Link as={Link} to={'/counter'}>
                                    {/* <Link > */}
                                    Counter
                                    {/* </Link> */}
                                </Nav.Link>
                                <Nav.Link as={Link} to={'/posts'}>
                                    {/* <Link  > */}
                                    Post
                                    {/* </Link> */}
                                </Nav.Link>
                                <Nav.Link as={Link} to={'/post/add'}>
                                    Add Post
                                </Nav.Link>
                                <Nav.Link as={Link} to={'/modal'}>
                                    Modal
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>

                    </Navbar>
                </div>
                <Routes >
                    <Route index path='/' element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/posts' element={<Posts />} />
                    <Route path='/post/add' element={<AddPost />} />
                    <Route path='/post/edit/:id' element={<AddPost />} />
                    <Route path='/post/:id' element={<Post />} />
                    <Route path='/counter' element={<Counter />} />
                    <Route path='/modal' element={<AlertModal />} />


                </Routes>
            </BrowserRouter>
        </>

    );
}