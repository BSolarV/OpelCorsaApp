import React, { Component, useState } from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
} from "shards-react";

import sillonesService from '../services/sillones.service';
import quimioterapiaService from '../services/quimioterapia.service';

import PageTitle from "../components/common/PageTitle";

class AdminQuimioterapia extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sillones: [],
      salas: [],
      current: "Salas",
      idSala: -1,
      idSillon: -1,
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

  render() {
    
    const { sillones, salas, current, idSala, idSillon  } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Selector */}
      <Row>&nbsp;</Row>
        <Row>
              <Col lg="6">
                <Button theme="secondary" outline={this.state.current == "Salas" ? false: true} squared block eventKey="Salas" onClick={() => this.setState({
                    ...this.state,
                    current: "Salas",})}>Salas</Button>
              </Col>
              <Col lg="6">
                <Button theme="secondary" outline={this.state.current == "Sillones" ? false: true} squared block eventKey="Sillones" onClick={() => this.setState({
                    ...this.state,
                    current: "Sillones",})}>Sillones</Button>
              </Col>
          
        </Row>
      <Row>&nbsp;</Row>

        {/* Page Tittle */}
        <Row noGutters className="">
          <PageTitle sm="4" title={"Administración "+this.state.current} className="text-sm-left" />
        </Row>

        {/*Page Content*/}

        {/* Admn Salas */}
        <Row>
        { this.state.current == "Salas" &&
        <Container>
          <Row>
            <Col>
                <h1>{this.state.idSala}</h1>
            </Col>
            <Col>
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
                      {salas && salas.map((sala, index) => {
                        return (  
                          <tr align="center" onClick={() => {
                            this.setState({
                              ...this.state,
                              idSala: sala.id,})
                          }}>
                                <td className="">{sala.id}</td>
                                <td className="">{sala.piso}</td>
                                <td className="">{sala.numero}</td>
                                <td widht="70%" className=""> {sala.sillones.length != 0 && 
                                <select label={sala.sillones.length}> {sala.sillones.length}
                                    {sala.sillones && sala.sillones.map( (sillon, indice) => {
                                      return(<option>ID: {sillon.id}</option>)
                                    })}
                                  </select>}</td>
                                <td className=""><button>x</button></td>
                          </tr>
                          )
                        })}
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td align="center"><button onClick={() => {
                            this.setState({
                              ...this.state,
                              idSala: "-1",})
                          }}>Nuevo</button></td>
                        </tr>
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        }
        
        {/* Admn Sillones */}
        { this.state.current == "Sillones" &&
        <Container>
          <Row>
          <Col>
            <h1>{this.state.idSillon}</h1>
          </Col>
          <Col>
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
                      {sillones.map((sillon) => {
                        return (  
                          <tr align="center" onClick={() => {
                            this.setState({
                              ...this.state,
                              idSillon: sillon.id,})
                          }}>
                                <td className="">{sillon.id}</td>
                                <td className="">{sillon.descripcion}</td>
                                <td className=""><span style={ 
                                  sillon.estado == "libre" ?
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
                                <td widht="70%" className=""> {sillon.sala == null ? "No hay" : sillon.sala.id}</td>
                                <td className=""><button>x</button></td>
                          </tr>
                          )
                        })}
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td align="center"><button onClick={() => {
                            this.setState({
                              ...this.state,
                              idSillon: "-1",})
                          }}>Nuevo</button></td>
                        </tr>
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        }
        </Row>
      </Container>
    );
  }
}

export default AdminQuimioterapia;