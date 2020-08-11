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
      // En teoría asi se obtiene el id del link.
      id: this.props.match.params.id,
      sala: false,
    }
  }

  componentDidMount() {
    quimioterapiaService.show(this.state.id).then((response) => {
      this.setState({
        sala: response.status === 200 ? response.data : [],
      })
    });
  }

  render() {
    const { sillones } = this.state.sala.sillones;
    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Sillones de la sala" subtitle="Ayudantía" className="text-sm-left" />
        </Row>

      </Container>
    );
  }
}

export default ShowQuimioterapia;