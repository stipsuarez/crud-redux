import styles from './calculatorHome.css';
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Typography, Modal } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import { useParams } from 'react-router-dom';
import { acceptAction, showModalAction } from '../../app/actions/postsActions';
import { useDispatch } from 'react-redux';


export function AlertModal({ showAlert }) {

  const dispatch = useDispatch();
  // console.log("In modal")
  // console.log(showAlert.showModal)
  let initialState = showAlert.showModal
  const [cieloRaso, setCieloRaso] = useState(initialState);
  if (cieloRaso != showAlert.showModal)
    setCieloRaso(showAlert.showModal)
  // console.log("In modal 2")
   //console.log(cieloRaso)
  const [pvc, setPvc] = useState(false);
  const [paredGypsum, setParedGypsum] = useState(false);
  const [techoGypsum, setTechoGypsum] = useState(false);
  const [calc, setCalc] = useState(null);
  const [width, setWidth] = useState(null);
  const [depth, setDepth] = useState(null);
  const [sheet, setSheet] = useState(null);
  const [calcResult, setCalcResult] = useState(null);
  const [pcvErrorMessage, setPvcErrorMessage] = useState("");
  const refForm = useRef();

  //let {showAlert} = useParams()



  // const handleOpen = (e) => {
  //   //e.preventDefault();
  //   //refForm.current.reset();
  //   setCieloRaso(!cieloRaso)
  // };
  const [general, setGeneral] = useState(showAlert.showAlert);
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

    dispatch(showModalAction(false)).then(
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
                          <h1 className="modal-title bg-danger text-light">Alerta!!!</h1>
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
                        {/* <input
              type="text"
              name="ancho"
              id="ancho-home"
              placeholder="Ancho (M)"
              onChange={e => setWidth(e.target.value)}
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  handleCalculation();
                }
              }}
            /> */}
                        <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                        {/* <input
              type="text"
              name="fondo"
              id="fondo-home"
              placeholder="Fondo (M)"
              onChange={e => setDepth(e.target.value)}
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  handleCalculation();
                }
              }}
            /> */}
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
                          className="brn btn-danger calculator-buttons-limpiar"
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