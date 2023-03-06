import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { acceptAction, createPost, setCurrentPost, showModalAction, updatePost } from '../../app/actions/postsActions';
import { useDispatch, useSelector } from 'react-redux';


export function EditModal({ showAlert }) {

  const initialPostState = {
    id: -1,
    title: "",
    profileId: -1
  };
  const dispatch = useDispatch();
  const [postm, setPostm] = useState(initialPostState);

  let initialState = showAlert.showModal

  const [visible, setVisible] = useState(initialState);

  const general = useSelector(state => state.general);
  

  if (visible != showAlert.showModal && (general.action === "editM" || general.action === "newM"))
    setVisible(showAlert.showModal)

  const[id,setId] =useState(general.idPost ? general.idPost : -1)
  //let id = 


  useEffect(() => {
    validateCurrent()
  })
  const validateCurrent = () => {
    //console.log("Hook Noooo fired",id,general, postm)
    if (id && id > 0 && general.currentPost && general.currentPost.id > 0) {
      if (postm && postm.id && postm.id < 0) {
        setPostm(general.currentPost)
      //  console.log("Hook fired", postm)
      }


    }
  }

  const [submitted, setSubmitted] = useState(false);



  const handleInputChangeM = async event => {
    try {
      event.preventDefault();
      const { name, value } = event.target;
      let nameL = name.replace(/M/g, '')
      //console.log("handle input ", event.target, nameL, value, postm)

      //console.log(nameL)
      let postC = { ...postm }
      //console.log("postC", postC)
      if (nameL == "title")
        postC.title = value
      else if (nameL == "profileId")
        postC.profileId = value
      setPostm(postC);
      setPostm({
        id: postC.id,
        title: postC.title,
        profileId: postC.profileId
      });
      
    } catch (e) {
      console.log("Error en handlechange: ", e)
    }
  };
  const updatePostC = () => {

    dispatch(updatePost(id, postm)).then(
      response => {
        //setPost(...post)
        setSubmitted(false);
        handleClose()
        // console.log(response);
      }
    ).catch(e => {
      console.log(e);
    });
  }

  const savePost = () => {
    const { title, profileId } = postm;

    dispatch(createPost(title, profileId))
      .then(data => {
        setPostm({
          id: data.id,
          title: data.title,
          profileId: data.profileId
        });
        setSubmitted(true);
        dispatch(setCurrentPost(data))
         console.log("after save",data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newPost = () => {
    setPostm(initialPostState);
    setSubmitted(false);
  };

  const PostPage = () => {
    //console.log("intialpost", initialPostState)
    dispatch(setCurrentPost(initialPostState)).then(
      (response) => {
        handleClose()
        setSubmitted(false)
      }
    ).catch(e => {
      console.log(e)
    })

  }
  const changeSubmitting = () => {
    //goposts
    //navegate("/posts")
    //go back
    // dispatch(showModalAction(true,id,"editM"))
    // dispatch(setId(id))
    console.log("Edit in modal",general.currentPost.id)
    setId(general.currentPost.id)
    setSubmitted(false)
  }


  const handleClose = () => {
    setVisible(false);
    dispatch(setCurrentPost(initialPostState)).then(
      response => {
        //visible.showAlert=false;
        setPostm(initialPostState)
        setVisible(false)
      }
    ).catch(e => {
      console.log(e);
    });

    dispatch(showModalAction(false, -1, null)).then(
      response => {
        //visible.showAlert=false;
        setVisible(false)
      }
    ).catch(e => {
      console.log(e);
    });
  }

  const handleAccept = () => {
    //visible.showAlert=false;
    setVisible(false);
    dispatch(acceptAction(true)).then(
      response => {
        //visible.showAlert=false;
        setVisible(false);
      }
    ).catch(e => {
      console.log(e);
    });
    return true;
  };
  //console.log("OPEN=")
  //console.log(visible)
  const handleChange = (value) => {
    //console.log("change hab...", value, { ...value })
    //if (value)
    setPostm(value)
  };

  // useEffect(() => {
  //   setViews(views + 1);
  // }, [views]);

  return (
    <div>
      {visible ? (
        <div className="container">
          {/* <button onClick={() => handleOpen()} className='btn btn-danger'>Delete</button> */}
          <Modal
            sx={{ zIndex: 99999999 }}
            open={visible}
            onClose={handleClose}
            aria-labelledby="modal-modal-calculadora"
            aria-describedby="modal-modal-calculadora"
          >
            <div className="modalAlert modal-hide">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <div className="col-12">
                      <div className="row col-12">
                        <div className="col-11 btn-danger">
                          <h1 className="modal-title bg-danger text-light">{id && id > 0 ? "Editar Post: " + id : "Crear"}</h1>
                        </div>
                        <div className='col-1'>
                          <button type="button" className="btn btn-lg btn-outline-dark" data-dismiss="modal" onClick={() => handleClose()} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="container modal-body">
                    <div className="submit-form container">
                      {submitted ? (
                        <div>
                          <h4>You submitted successfully!</h4>
                          <button className="btn btn-success" onClick={newPost}>
                            Add
                          </button>
                          <button className="btn btn-secondary" onClick={PostPage}>
                            Close
                          </button>

                          <button className="btn btn-primary" onClick={changeSubmitting}>
                            Edit {general.action=="editM"?"again":""}
                          </button>

                        </div>
                      ) : (
                        <div >
                          <div className="form-group">
                            <label htmlFor="title">{id && id > 0 ? "Editar Post: " + id : "Crear"}</label>
                            <input
                              type="text"
                              className="form-control"
                              id="title"
                              required
                              value={postm.title}
                              onChange={(event) => handleChange({ ...postm, title: event.target.value })}
                              name="title"
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="profileIdM">Profile Id</label>
                            <input
                              type="number"
                              className="form-control"
                              id="profileIdM"
                              required
                              value={postm.profileId}
                              onChange={handleInputChangeM}
                              name="profileIdM"
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
                              Close
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal >
        </div >
      ) : null
      }
    </div>
  )
}