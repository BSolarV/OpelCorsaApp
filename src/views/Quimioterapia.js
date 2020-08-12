import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
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

    const salas = this.state.salas;
    var pisos = [];

    for (var i = 0; i < salas.length; i++) {
      if( !pisos.includes(salas[i].piso) ){
        pisos.push(salas[i].piso);
      }
    }
    pisos.sort();
    pisos = [0].concat(pisos);

    return (
      <Container fluid className="main-content-container px-4">

        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Salas de Quimioterapia" className="text-sm-left"/>
        </Row>

        {/*Floor Selector*/}
        <Row>
          <Col lg="1">Piso: </Col>
          <Col lg="11">
            <Container>
              <Row>
                {pisos.map((oneFloor) => {
                  return(
                    <Col> <Button outline={this.state.piso === oneFloor ? false : true} pill block onClick={() => this.setState({
                      ...this.state,
                      piso: oneFloor,})}>{oneFloor === 0 ? "Todos" : oneFloor}</Button></Col>
                  )})}
              </Row>
            </Container>
          </Col>
        </Row>
        <Row>&nbsp;</Row>
        <Row >
          {salas && salas.map((sala) => {
            return ( (this.state.piso === 0 || this.state.piso === sala.piso) &&
              <Col lg="6" key={sala.id}>
                <a  href={"/quimioterapia/show/"+sala.id} style={{textDecoration: "none", color: "inherit"}}><Card small className="card-post mb-4" >
                  <CardBody>
                    <Container>
                      <Row>
                        <Col className="card-title">Sala Nro: {sala.numero}</Col>
                        <Col className="card-title">Piso: {sala.piso}</Col>
                      </Row>
                      <Row>
                        {sala.sillones.map((sillon) => {
                          return(
                          <Col lg="3"> <span style={ 
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
                          }></span></Col>
                        )})}
                      </Row>
                    </Container>
                  </CardBody>
                </Card></a>
              </Col>
          )})}
        </Row>
      </Container>
    );
  }

}

export default Quimioterapia;  