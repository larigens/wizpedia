import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useRef } from 'react';
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap';

function App() {
  const [searchType, setSearchType] = useState('');
  const [searchName, setSearchName] = useState('');
  const [wizData, setWizData] = useState([]);

  const form = useRef();

  const handleInputChange = (e) => {
    setSearchName(e.target.value)
  };

  const handleSelectChange = (e) => {
    setSearchType(e.target.value);
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();
    const fetchWizData = async () => {
      try {
        if (searchName) {
          const response = await fetch(`https://wizard-world-api.herokuapp.com/${searchType}?Name=${searchName}`);
          const json = await response.json();
          setWizData(json);
        }
        else {
          const response = await fetch(`https://wizard-world-api.herokuapp.com/${searchType}`);
          const json = await response.json();
          setWizData(json);
        }

      } catch (error) {
        console.error('Error fetching carrier data:', error);
      }
    };
    fetchWizData();
    setWizData([]);
    setSearchType('');
    setSearchName('');
  };

  console.log(wizData);

  return (
    <div className="App">
      <header className="App-header">
        <Container fluid className='p-5'>
          <Form ref={form} name="newMessage" method="post" action="newMessage" onSubmit={handleFormSubmit} className="glassmorphism radius-20 main-color p-4 mx-auto">
            <h2 className="text-center mb-4">Find Wizard Stuff</h2>
            <Row>
              <Col xs={12} md={6} className="mb-3">
                <Form.Group controlId="selectOption">
                  <Form.Label>Select Option</Form.Label>
                  <Form.Select value={searchType} onChange={handleSelectChange} className="shadow-sm">
                    <option value="Elixirs">Elixirs</option>
                    <option value="Houses">Houses</option>
                    <option value="Ingredients">Ingredients</option>
                    <option value="Spells">Spells</option>
                    <option value="Wizards">Wizards</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              {searchType && (
                <Col xs={12} md={6} className="mb-3">
                  <Form.Group controlId="companyInfo">
                    <Form.Label>{searchType}</Form.Label>
                    <Form.Control
                      value={searchName}
                      name={searchType}
                      onChange={handleInputChange}
                      type="text"
                      placeholder={`Enter ${searchType}`}
                      className="shadow-sm"
                    />
                  </Form.Group>
                </Col>
              )}
            </Row>
            <Row className="d-flex justify-content-center my-2">
              <Button className="submit-btn radius-20 border-none shadow-sm" type="submit">
                Submit
              </Button>
            </Row>
          </Form>
        </Container>


        {wizData &&
          wizData.map((data) => (
            <Card key={data.id} className="glassmorphism radius-20 main-color p-4 my-3 mx-auto">
              <Card.Body>
                <Card.Title className="fw-bold text-center mb-4 fs-2">{data.name}</Card.Title>
                {/* Additional details can be added here */}
              </Card.Body>
            </Card>
          ))}
      </header>
    </div>
  );
}

export default App;
