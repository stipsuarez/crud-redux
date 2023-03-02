import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter,Link, Route, Routes } from 'react-router-dom'
import { Counter } from '../../features/counter/Counter';
import { Post } from '../../features/post/Post';
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
                                <Nav.Link  as={Link} to={'/counter'}>
                                    {/* <Link > */}
                                        Counter
                                    {/* </Link> */}
                                </Nav.Link>
                                <Nav.Link as={Link} to={'/post'}>
                                    {/* <Link  > */}
                                        Post
                                    {/* </Link> */}
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>

                    </Navbar>
                </div>
                <Routes >
                    <Route index path='/home' element={<Counter />} >
                    </Route>
                    <Route path='/post' element={<Post />} />
                    <Route path='/counter' element={<Counter />} />


                </Routes>
            </BrowserRouter>
        </>

    );
}