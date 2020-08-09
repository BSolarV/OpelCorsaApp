import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
} from "shards-react";
import teamsService from '../services/teams.service';

import PageTitle from "../components/common/PageTitle";

class TeamsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teams: [],
    }
  }

  componentDidMount() {
    teamsService.getAll().then((response) => {
      this.setState({
        teams: response.status === 200 ? response.data : [],
      })
    });
  }

  render() {
    const { teams } = this.state;

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Champions League Teams" subtitle="Ayudantía" className="text-sm-left" />
        </Row>

        <Row>
          {teams.map((team, index) => {
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

export default TeamsList;