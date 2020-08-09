import React, { Component } from "react";
import {
  Container,
  Row,
} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Team from "../components/forms/Team";
import teamsService from '../services/teams.service';

class AddNewPost extends Component {

  constructor(props) {
    super(props);
    
    this.handleTeamSubmit = this.handleTeamSubmit.bind(this);
  }

  handleTeamSubmit(data) {
    teamsService.create(data)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  render() {

    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Add New Team" subtitle="Ayudantía" className="text-sm-left" />
        </Row>

        <Team
          onSubmit={this.handleTeamSubmit}
        ></Team>
      </Container>
    );
  }
};

export default AddNewPost;
