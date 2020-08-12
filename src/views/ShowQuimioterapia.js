import React, { Component, useState } from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from "shards-react";
import Select from 'react-select';

import quimioterapiaService from '../services/quimioterapia.service';
import quimioSillonService from '../services/quimioSillon.service';
import sillonesService from '../services/sillones.service';

class ShowQuimioterapia extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sala: false,
      sillones: [],
      selected: false,
    }
  }

  scream(){
    alert("AAAAAAAAAAAAAAAAAAAAAAAAh");
  }

  componentDidMount() {
    quimioterapiaService.show( this.props.match.params.id ).then((response) => {
      this.setState({
        sala: response.status === 200 ? response.data : false,
      })
    });
    sillonesService.getAll().then((response) => {
      this.setState({
        ...this.state,
        sillones: response.status === 200 ? response.data : [],
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
      quimioSillonService.remove( { data: content } ).catch( (error) => { alert(error) } );
    }
  }

  addSillon( id ){
    var content = {
      idSala: Number(this.state.sala.id),
      idSillon: Number(id),
    }
    quimioSillonService.assign( content ).catch( (error) => { alert(error) } );
  }

  editStateSillon( id, desc ){
    var content = {
      estado: desc,
    }
    if( window.confirm("Seguro que quiere cambiar el estado?") ){
      sillonesService.update(id, content).catch( (error) => { alert(error) } );
    }
  }
  
  

  render() {

    var sillonOptions = [];
    if ( this.state.sillones ) {
      for( let i = 0; i < this.state.sillones.length; i++){
        let sillon = this.state.sillones[i];
        sillonOptions.push( { value: sillon.id, label: "ID: "+sillon.id+" Estado: "+sillon.estado+" Desc: "+sillon.descripcion } );
      } 
    }
    const handleChange = e => {
      this.setState({
        ...this.state,
        selected: e.value,
      });
    }
  

    return (
      <Container fluid className="main-content-container px-4">

        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <Col><h1>Sala Número {this.state.sala.numero}</h1></Col>
          <Col><h1>Piso {this.state.sala.piso}</h1></Col>
        </Row>

        <Row>
          {this.state.sala && this.state.sala.sillones.map( (sillon) => {
            return (<Col>
              <Card small className="mb-4">
                  <CardBody>
                    <Container>
                      <Row align="center">
                        <Col lg="3">ID: {sillon.id}</Col>
                      </Row>
                      <Row align="center">
                        <Col lg="3"><span style={ 
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
                        }></span><br></br>{sillon.estado}</Col>
                        <Col lg="6">{sillon.descripcion}</Col>
                        <Col><Button block onClick={ () => {
                            var description = sillon.estado == "ocupado" ? "libre": "ocupado";
                            this.editStateSillon( sillon.id, description );
                            window.location.reload(false)
                        }}>Cambiar Estado</Button></Col>
                        <Col><Button block onClick={ () => {
                            this.removeSillon( sillon.id );
                            window.location.reload(false)
                        }}>Eliminar</Button></Col>
                      </Row>
                    </Container>
                  </CardBody>
                </Card></Col>
            )})}
        </Row>
        <Row>
          <Col lg = "10">
            <Select isSearchable options={ sillonOptions } onChange={ handleChange }/>
          </Col>
          <Col lg="2">
          <Button block onClick={ () => {
                            this.addSillon( this.state.selected );
                            window.location.reload(false)
                        }}>Añadir</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ShowQuimioterapia;