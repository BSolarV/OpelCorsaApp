import React, { Component, useState } from 'react';
import {
  Nav,
  NavLink,
  NavItem,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
    
    const { sillones, salas, current } = this.state;

    return (
      <Container fluid className="main-content-container px-4">

        {/* Page Selector */}
        <Row>
          <Nav activeKey="Salas">
              <NavItem>
                <NavLink eventKey="Salas" onClick={() => this.setState({
                    ...this.state,
                    current: "Salas",})}>Salas</NavLink>
              </NavItem>
              <NavItem>
                <NavLink eventKey="Sillones" onClick={() => this.setState({
                    ...this.state,
                    current: "Sillones",})}>Sillones</NavLink>
              </NavItem>
          </Nav>
        </Row>

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
                          x
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {salas.map((sala, index) => {
                        return (  
                          <tr align="center" key={sala.id}>
                                <td className="bg-info">{sala.id}</td>
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
                          <td align="center"><button>Nuevo</button></td>
                        </tr>
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        }
        {/* Admn Salas */}
        { this.state.current == "Sillones" &&
        <Container>
          <Col>
            
          </Col>
        {salas.map((sala, index) => {
            return (
              <Col lg="2" key={sala.id}>
                <Card small className="card-post mb-4">
                  <CardBody>
                    <h5 className="card-title">{sala.id}</h5>
                    <p className="card-text text-muted">{sala.numero}</p>
                  </CardBody>
                </Card>
              </Col>
            )
          })}
        </Container>
        }
        </Row>
      </Container>
    );
  }

}

export default AdminQuimioterapia;