import React, { useState } from 'react';
import PropTypes from "prop-types"; 
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  FormInput,
  Button,
} from "shards-react";



const Team = ({
  onSubmit
  }) => {
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');

    return(
      <Row>
        {/* Editor */}
        <Col lg="9" md="12">
          <Card small className="mb-3">
            <CardBody>
              <Form className="add-new-post">
                <FormGroup>
                  <label>Team Name</label>
                  <FormInput
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    size="lg"
                    className="mb-3"
                    placeholder="Tricolor de Paine" />
                </FormGroup>
                <FormGroup>
                  <label>Team Country</label>
                  <FormInput
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}                    
                    size="lg"
                    className="mb-3"
                    placeholder="Chile" />
                </FormGroup>
              </Form>
              <Button 
                theme="primary"
                className="mb-2 mr-1"
                onClick={(event) => onSubmit({ 'nombre': name, 'pais': country })}
                // onClick={onSubmit}
                >
                  Agregar
                </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }

Team.propTypes = {
  onSubmit: PropTypes.func,
}

Team.defaultProps = {
  onSubmit: () => {},
}

export default Team;