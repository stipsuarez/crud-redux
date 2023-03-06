import Modal from "@mui/material/Modal";
import {  useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import { acceptAction, showModalAction } from '../../app/actions/postsActions';
import { useDispatch, useSelector } from 'react-redux';


export function AlertModal({ showAlert }) {

  const dispatch = useDispatch();
  // console.log("In modal")
  // console.log(showAlert.showModal)
  let initialState = showAlert.showModal
  const [cieloRaso, setCieloRaso] = useState(initialState);
  const general = useSelector(state => state.general);
  if (cieloRaso != showAlert.showModal&& general.action==="delete")
    setCieloRaso(showAlert.showModal)
 
  const [calcResult, setCalcResult] = useState(null);
  const [pcvErrorMessage, setPvcErrorMessage] = useState("");
  const refForm = useRef();

  //let {showAlert} = useParams()



  // const handleOpen = (e) => {
  //   //e.preventDefault();
  //   //refForm.current.reset();
  //   setCieloRaso(!cieloRaso)
  // };
  // const [general, setGeneral] = useState(showAlert.showAlert);
  const handleClose = () => {
    //setGeneral(false)
    //cieloRaso.showAlert=false;
    setCieloRaso(false);
    // setPvc(false);
    // setParedGypsum(false);
    // setTechoGypsum(false);
    // //setCalcType("");
    // setCalcResult(null);
    // setSheet(null);
    // setPvcErrorMessage("");

    dispatch(showModalAction(false,-1,null)).then(
      response => {
        //cieloRaso.showAlert=false;
        setCieloRaso(false);

        //setPost(...post)
        //setSubmitted(true);
        // console.log("Cerrar");
        // console.log(response);
      }
    ).catch(e => {
      console.log(e);
    });
  }

  const handleAccept = () => {
    //cieloRaso.showAlert=false;
    setCieloRaso(false);
    dispatch(acceptAction(true)).then(
      response => {
        //cieloRaso.showAlert=false;
        setCieloRaso(false);

        //setPost(...post)
        //setSubmitted(true);
        // console.log("Aceptar");
        // console.log(response);
      }
    ).catch(e => {
      console.log(e);
    });
    return true;
  };

  const handleClean = e => {
    e.preventDefault();
    setCalcResult(null);
    refForm.current.reset();
  };
  const handleCalculation = async e => {
    if (e) {
      e.preventDefault();
    }
  }
  //console.log("OPEN=")
  //console.log(cieloRaso)
  return (
    <div>
      {cieloRaso ? (
        <div className="container"> 
          {/* <button onClick={() => handleOpen()} className='btn btn-danger'>Delete</button> */}
          <Modal
            sx={{ zIndex: 99999999 }}
            open={cieloRaso}
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
                          <h1 className="modal-title bg-warning text-light">Alerta!!!</h1>
                        </div>
                        <div className='col-1'>
                          <button type="button" className="btn btn-lg btn-outline-dark" data-dismiss="modal" onClick={() => handleClose()} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                  {/* <Box> */}
                  <div className="modal-body">
                    <form onSubmit={handleCalculation} ref={refForm}>
                      <div className="calculator-option-home">
                        <h1 className="modal-title btn btn-light">Deseas continuar?</h1>
                        {/* <img src={no} alt="close" onClick={handleClose} /> */}
                      </div>
                      <div className="calculator-data-home">
                       
                      </div>
                      {calcResult && (
                        <div className="calc-result-table">
                          <h2>Resultados</h2>
                          <Table striped>
                            <tbody>
                              {calcResult &&
                                calcResult.data.map(value => {
                                  return (
                                    <tr>
                                      <td>{value.label}</td>
                                      <td>{value.value}</td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </Table>
                        </div>
                      )}
                      <div className="calculator-buttons-home">
                        <button
                          className="btn btn-danger calculator-buttons-limpiar"
                          onClick={handleAccept}
                        >
                          Aceptar
                        </button>
                        <button type="submit" onClick={handleClose} className="btn btn-secondary calculator-buttons-calcular">
                          Cancelar
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* </Box> */}

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