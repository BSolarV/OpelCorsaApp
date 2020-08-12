import React, { Component } from 'react';
import {
  Button,
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
import quimioSillonService from '../services/quimioSillon.service';
import sillonesService from '../services/sillones.service';

class ShowQuimioterapia extends Component {

  constructor(props) {
    super(props);
    this.sillonDropOpenToggle = this.sillonDropOpenToggle.bind(this);
    this.state = {
      sala: false,
      sillones: [],
      selected: false,
      sillonDropOpen: false 
    }
  }

  sillonDropOpenToggle() {
    this.setState(prevState => {
      return { 
        ...this.state,
        sillonDropOpen: !prevState.sillonDropOpen };
    });
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
          <Col>
            <Container>
              <Row>
                <Col>
                  {this.state.sillones && this.state.sillones.map( (sillon) => { 
                    return( <Button block outline={ this.state.selected === sillon.id ? false : true } onClick={() => {
                                this.setState({
                                  ...this.state,
                                  selected: sillon.id,})
                              }}>ID: {sillon.id}</Button> )})}
                </Col>
                
              </Row>
            </Container>
          </Col>
          <Col>
          <Button onClick={ () => {
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