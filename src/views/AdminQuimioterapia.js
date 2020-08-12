import React, { Component } from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  any,
} from "shards-react";

import sillonesService from '../services/sillones.service';
import quimioterapiaService from '../services/quimioterapia.service';

class AdminQuimioterapia extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sillones: [],
      salas: [],
      current: "Salas",
      idSala: -1,
      idSillon: -1,
      num: -1,
      floor: -1,
      descript: "Default",
    }
  }

  componentDidMount() {
    sillonesService.getAll().then((response) => {
      this.setState({
        ...this.state,
        sillones: response.status === 200 ? response.data : [],
      })
    });
    quimioterapiaService.getAll().then((response) => {
      this.setState({
        ...this.state,
        salas: response.status === 200 ? response.data : [],
      })
    });
  }

  /* Sillones Services */
  removeSillon( id ){
    var response = window.confirm("Seguro que quiere eliminar el sillon?");
    if(response){
      sillonesService.remove( id )
      .catch( (error) => { alert(error) } )
      .finally(()=> {window.location.reload(false)});
    }
  }

  addSillon( desc ){
    var content = {
      descripcion: desc,
    }
    sillonesService.create( content )
    .catch( (error) => { alert(error) } )
    .finally(()=> {window.location.reload(false)});
  }

  editSillon( id ,desc ){
    var content = {
      descripcion: desc,
    }
    sillonesService.update( id, content ).
    catch( (error) => { alert(error) } )
    .finally(()=> {window.location.reload(false)});
  }
  
  /*Quimioterapia Services*/
  removeSala( id ){
    var response = window.confirm("Seguro que quiere eliminar la sala?");
    if(response){
      quimioterapiaService.remove( id )
      .catch( (error) => { alert(error) } )
      .finally(()=> {window.location.reload(false)});
    }
      
  }
  
  addSala( num, p ){
    var content = {
      numero: num,
      piso: p,
    }
    quimioterapiaService.create( content )
    .catch( (error) => { alert(error) } )
    .finally(()=> {window.location.reload(false)});
  }

  editSala( id ,num, p){
    var content = {
      numero: num,
      piso: p,
    }
    quimioterapiaService.update( id, content )
    .catch( (error) => { alert(error) } )
    .finally(()=> {window.location.reload(false)});

  }

  myChangeHandlerP = (event) => {
    this.setState({
      ...this.state,
      floor: event.target.value});
  }
  myChangeHandlerN = (event) => {
    this.setState({
      ...this.state,
      num: event.target.value});
  }
  myChangeHandlerD = (event) => {
    this.setState({
      ...this.state,
      descript: event.target.value});
  }




  render() {

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Selector */}
      <Row>&nbsp;</Row>
        <Row>
        <Col>
          <Container>
            <Row>
              <Col>
                <Button theme="secondary" outline={this.state.current === "Salas" ? false: true} squared block eventKey="Salas" onClick={() => this.setState({
                    ...this.state,
                    current: "Salas",})}>Salas</Button>
              </Col>
              <Col>
                <Button theme="secondary" outline={this.state.current === "Sillones" ? false: true} squared block eventKey="Sillones" onClick={() => this.setState({
                    ...this.state,
                    current: "Sillones",})}>Sillones</Button>
              </Col>
            </Row>
              {/* Page Tittle */}
            <Row>
              <Col lg="12">
                <h3>{"Administración de "+this.state.current}</h3> 
              </Col>
            </Row>
            {/* Agregar Salas*/}
            {this.state.current == "Salas" && this.state.idSala == -1 ? 
            <Row>
              <Col>
              <h1>{this.state.idSala}</h1>
                <Card small >
                <CardHeader className="border-bottom">
                  <h6 className="m-0">Agregar Sala</h6>
                </CardHeader>
                <CardBody >
                  <Container>
                    <form>
                      <Row>
                      <label> Piso </label>
                      </Row>
                      <Row>
                      <input type = "number" onChange={this.myChangeHandlerP} />
                      </Row>
                      <Row>
                      <label> Numero </label>
                      </Row>
                      <Row>
                      <input type = "number" onChange={this.myChangeHandlerN} />
                      </Row>
                      <Row>&nbsp;</Row> 
                      <Row>
                      <Button onClick={ () => {
                                  this.addSala( this.state.num, this.state.floor )
                                  }}> Sumbit </Button>
                      </Row>
                    </form>
                  </Container>
                </CardBody>
                </Card>
              </Col>
            </Row>
            /* Actualizar Salas*/
            : this.state.current == "Salas" && this.state.idSala != -1 ?
            <Row>
              <Col>
              <h1>{this.state.idSala}</h1>
                <Card small >
                <CardHeader className="border-bottom">
                  <h6 className="m-0">Actualizar Sala</h6>
                </CardHeader>
                <CardBody >
                  <Container>
                    <form>
                      <Row>
                      <label> Piso </label>
                      </Row>
                      <Row>
                      <input type = "number" onChange={this.myChangeHandlerP} />
                      </Row>
                      <Row>
                      <label> Numero </label>
                      </Row>
                      <Row>
                      <input type = "number" onChange={this.myChangeHandlerN} />
                      </Row>
                      <Row>&nbsp;</Row> 
                      <Row>
                      <Button onClick={ () => {
                                  this.editSala( this.state.idSala ,this.state.num, this.state.floor )
                                  }}> Sumbit </Button>
                      </Row>
                    </form>
                  </Container>
                </CardBody>
                </Card>
              </Col>
            </Row>
            /* Agregar Sillones*/
            : this.state.current == "Sillones" && this.state.idSillon == -1 ?
            <Row>
              <Col>
              <h1>{this.state.idSillon}</h1>
                <Card small >
                <CardHeader className="border-bottom">
                  <h6 className="m-0">Agregar Sillon</h6>
                </CardHeader>
                <CardBody >
                  <Container>
                    <form>
                      <Row>
                      <label> Descripcion </label>
                      </Row>
                      <Row>
                      <input type = "text" onChange={this.myChangeHandlerD} />
                      </Row>
                      <Row>&nbsp;</Row> 
                      <Row>
                      <Button onClick={ () => {
                                  this.addSillon( this.state.descript )
                                  }}> Sumbit </Button>
                      </Row>
                    </form>
                  </Container>
                </CardBody>
                </Card>
              </Col>
            </Row>
            /* Actualizar Sillones*/
            :
            <Row>
              <Col>
              <h1>{this.state.idSillon}</h1>
                <Card small >
                <CardHeader className="border-bottom">
                  <h6 className="m-0">Actualizar Sillon</h6>
                </CardHeader>
                <CardBody >
                  <Container>
                    <form>
                      <Row>
                      <label> Descripcion </label>
                      </Row>
                      <Row>
                      <input type = "text" onChange={this.myChangeHandlerD} />
                      </Row>
                      <Row>&nbsp;</Row> 
                      <Row>
                      <Button onClick={ () => {
                                  this.editSillon( this.state.idSillon, this.state.descript )
                                  }}> Sumbit </Button>
                      </Row>
                    </form>
                  </Container>
                </CardBody>
                </Card>
              </Col>
            </Row>
            }  
          </Container>
        </Col>
        <Col>
        
        

        

        {/*Page Content*/}

        {/* Admn Salas */}
        { this.state.current === "Salas" &&
        
            
              <Card small className="mb-4">
                <CardHeader className="border-bottom">
                  <h6 className="m-0">Salas Actuales</h6>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                  <table className="table mb-0">
                    <thead className="bg-light">
                      <tr align="center">
                        <th scope="col" className="border-0">
                          ID
                        </th>
                        <th scope="col" className="border-0">
                          Piso
                        </th>
                        <th scope="col" className="border-0">
                          Numero
                        </th>
                        <th scope="col" className="border-0">
                          Sillones
                        </th>
                        <th scope="col" className="border-0">
                          Borrar
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.salas && this.state.salas.map((sala) => {
                        return (  
                          <tr align="center" onClick={() => {
                            this.setState({
                              ...this.state,
                              idSala: sala.id,})
                          }}>
                                <td className="">{sala.id}</td>
                                <td className="">{sala.piso}</td>
                                <td className="">{sala.numero}</td>
                                <td widht="70%" className=""> {sala.sillones.length !== 0 && 
                                <select label={sala.sillones.length}> {sala.sillones.length}
                                    {sala.sillones && sala.sillones.map( (sillon) => {
                                      return(<option>ID: {sillon.id}</option>)
                                    })}
                                  </select>}</td>
                                <td className=""><Button theme="primary" onClick={ () => {
                                  this.removeSala( sala.id );
                                  }}>x</Button></td>
                          </tr>
                          )
                        })}
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td align="center"><Button theme="primary" onClick={() => {
                            this.setState({
                              ...this.state,
                              idSala: "-1",})
                          }}>Nuevo</Button></td>
                        </tr>
                    </tbody>
                  </table>
                </CardBody>
              </Card>
        }
        
        {/* Admn Sillones */}
        { this.state.current === "Sillones" &&
        
              <Card small className="mb-4">
                <CardHeader className="border-bottom">
                  <h6 className="m-0">Sillones Actuales</h6>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                  <table className="table mb-0">
                    <thead className="bg-light">
                      <tr align="center">
                        <th scope="col" className="border-0">
                          ID
                        </th>
                        <th scope="col" className="border-0">
                          Descripción
                        </th>
                        <th scope="col" className="border-0">
                          Estado
                        </th>
                        <th scope="col" className="border-0">
                          Sala
                        </th>
                        <th scope="col" className="border-0">
                          Borrar
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.sillones.map((sillon) => {
                        return (  
                          <tr align="center" onClick={() => {
                            this.setState({
                              ...this.state,
                              idSillon: sillon.id,})
                          }}>
                                <td className="">{sillon.id}</td>
                                <td className="">{sillon.descripcion}</td>
                                <td className=""><span style={ 
                                  sillon.estado === "libre" ?
                                  {height: "25px",
                                  width: "25px",
                                  backgroundColor: "green",
                                  borderRadius: "50%",
                                  display: "inline-block"}
                                  :
                                  {height: "25px",
                                  width: "25px",
                                  backgroundColor: "red",
                                  borderRadius: "50%",
                                  display: "inline-block"}
                                }></span></td>
                                <td widht="70%" className=""> {sillon.sala === null ? "No hay" : sillon.sala.id}</td>
                                <td className=""><Button theme="primary" onClick={ () => {
                                  this.removeSillon( sillon.id )
                                  }}>x</Button></td>
                          </tr>
                          )
                        })}
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td align="center"><Button theme="primary" onClick={() => {
                            this.setState({
                              ...this.state,
                              idSillon: "-1",})
                          }}>Nuevo</Button></td>
                        </tr>
                    </tbody>
                  </table>
                </CardBody>
              </Card>
        }
      </Col>    
      </Row>
      </Container>
    );
  }
}

export default AdminQuimioterapia;