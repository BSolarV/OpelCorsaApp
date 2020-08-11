import React, { Component, useState } from 'react';
import {
  Nav,
  NavLink,
  NavItem,
  Container,
  Row,
  Col,
  Card,
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
          <Nav defaultActiveKey="Salas">
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
              <Container>
                {salas.map((sala, index) => {
                    return (
                      <Row className="card-post" key={sala.id}>
                            <Col className="card-title">Id: {sala.id}</Col>
                            <Col className="card-text text-muted">Piso: {sala.piso}</Col>
                            <Col className="card-text text-muted">Numero: {sala.numero}</Col>
                            <Col className="card-text text-muted"><button>+</button></Col>
                      </Row>
                    )
                  })}
                </Container>
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