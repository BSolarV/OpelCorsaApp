import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "shards-react";

import quimioterapiaService from '../services/quimioterapia.service';
import PageTitle from "../components/common/PageTitle";

class Quimioterapia extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      salas: [],
      piso: 0,
      selector: false,
    }
  }

  componentDidMount() {
    quimioterapiaService.getAll().then((response) => {
      this.setState({
        salas: response.status === 200 ? response.data : [],
      })
    });
  }

  toggle() {
    this.setState(prevState => {
      return( { 
        ...this.state, 
        open: !prevState.open })
    });
  }

  render() {
    const { salas, piso, selector } = this.state;
    const pisos = [0, ];
    for (var i = 0; i < salas.length; i++) {
      if( !pisos.includes(salas[i].piso) ){
        pisos.push(salas[i].piso);
      }
    }

    return (
      <Container fluid className="main-content-container px-4">

        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Salas de Quimioterapia" className="text-sm-left"/>
        </Row>

        {/*Floor Selector*/}
        <Dropdown open={this.state.open} toggle={this.toggle}>
        <DropdownToggle>Piso:</DropdownToggle>
          <DropdownMenu>
            {pisos.map((aFloor, index) => {
              return (
                <DropdownItem onClick={() => this.setState({
                    ...this.state, 
                    piso: aFloor,
                  })}>{aFloor == 0 && "Todos"}{aFloor != 0 && aFloor}</DropdownItem>
              )
            })}
          </DropdownMenu>
        </Dropdown> {this.state.piso}
        <Row>
          {salas.map((team, index) => {
            return (
              <Col lg="2" key={team.id}>
                <Card small className="card-post mb-4">
                  <CardBody>
                    <h5 className="card-title">{team.nombre}</h5>
                    <p className="card-text text-muted">{team.pais}</p>
                  </CardBody>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    );
  }

}

export default Quimioterapia;