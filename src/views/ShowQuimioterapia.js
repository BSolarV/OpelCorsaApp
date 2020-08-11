import React, { Component } from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from "shards-react";

import quimioterapiaService from '../services/quimioterapia.service';
import quimioSillonService from '../services/quimioSillon.service';

import PageTitle from "../components/common/PageTitle";

class ShowQuimioterapia extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sala: false,
    }
  }

  componentDidMount() {
    quimioterapiaService.show( this.props.match.params.id ).then((response) => {
      this.setState({
        sala: response.status === 200 ? response.data : false,
      })
    });
  }
 
  removeSillon( id ){
    var response = window.confirm("Seguro que quiere eliminar el sillon?");
    if(response){
      var content = {
        idSala: Number(this.state.sala.id),
        idSillon: Number(id),
      }
      quimioSillonService.remove( { data: content } ).then( (response) => { 
        alert( response.status === 200 ? "DONE" : "NOT DONE" + response.status ) 
      }).catch( (error) => { alert(error) } );
    }
  }

  addSillon( id ){
    var response = window.confirm("Seguro que quiere eliminar el sillon?");
    if(response){
      var content = {
        idSala: Number(this.state.sala.id),
        idSillon: Number(id),
      }
      quimioSillonService.remove( { data: content } ).then( (response) => { 
        alert( response.status === 200 ? "DONE" : "NOT DONE" + response.status ) 
      }).catch( (error) => { alert(error) } );
    }
  }

  render() {
    const { sala } = this.state;
    return (
      <Container fluid className="main-content-container px-4">

        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <Col><h1>Sala Número {sala.numero}</h1></Col>
          <Col><h1>Piso {sala.piso}</h1></Col>
        </Row>

        <Row>
          {sala && sala.sillones.map( (sillon) => {
            return (
              <Card>
                  <CardBody>
                    <Container>
                      <Row align="center">
                        <Col lg="3">ID: {sillon.id}</Col>
                      </Row>
                      <Row align="center">
                        <Col lg="3"><span style={ 
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
                        }></span><br></br>{sillon.estado}</Col>
                        <Col lg="6">{sillon.descripcion}</Col>
                        <Col lg="3"><Button onClick={ () => {
                            this.removeSillon( sillon.id )
                        }}>Eliminar</Button></Col>
                      </Row>
                    </Container>
                  </CardBody>
                </Card>
            )})}
        </Row>
        <Row>
          <Col lg="10"></Col>
          <Col lg="2"></Col>
        </Row>
      </Container>
    );
  }
}

export default ShowQuimioterapia;