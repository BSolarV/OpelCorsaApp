import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from "shards-react";

import quimioterapiaService from '../services/quimioterapia.service';

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
 
  render() {
    const { sala } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Champions League Teams" subtitle="Ayudantía" className="text-sm-left" />
        </Row>

        <Row>
          {sala && sala.sillones.map( (sillon) => {
            return (
              <Col lg="2" key={sillon.id}>
                <Card small className="card-post mb-4">
                  <CardBody>
                    <h5 className="card-title">{sillon.id}</h5>
                    <p className="card-text text-muted">{sillon.descripcion}</p>
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

export default ShowQuimioterapia;