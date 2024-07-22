import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useRef } from 'react';
import { Form, Button, Row, Card, Container, Image, Col } from 'react-bootstrap';
import AnimatedBook from './AnimatedBook';
import './Book.css'; // Import your CSS file here

function App() {
  const [searchType, setSearchType] = useState('');
  const [wizData, setWizData] = useState([]);
  const form = useRef();

  const handleSelectChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://api.potterdb.com/v1/${searchType}`);
      const json = await response.json();
      setWizData(json.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };

  return (
    <Container fluid>
      <header className="my-3 mx-1">
        <h2>WizPedia</h2>
      </header>
      <body>

        <Container fluid className='p-5'>
          <Form ref={form} name="newMessage" method="post" action="newMessage" onSubmit={handleFormSubmit} className="glassmorphism radius-20 main-color p-4 mx-auto">
            <h2 className="text-center mb-4">Find Wizard Stuff</h2>
            <Row>
              <Form.Group controlId="selectOption">
                <Form.Label>Select Option</Form.Label>
                <Form.Select value={searchType} onChange={handleSelectChange} className="shadow-sm">
                  <option value="">Select One</option>
                  <option value="books">Books</option>
                  <option value="chapters">Chapters</option>
                  <option value="characters">Wizards</option>
                  <option value="movies">Movies</option>
                  <option value="potions">Potions</option>
                  <option value="spells">Spells</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="d-flex justify-content-center my-2">
              <Button className="submit-btn radius-20 border-none shadow-sm" type="submit">
                Submit
              </Button>
            </Row>
          </Form>
        </Container>

        {wizData && searchType === 'characters' &&
          wizData.map((data) => (
            <React.Fragment key={data.id}>
              {data.attributes.image ? (
                <Card key={data.id} className="glassmorphism radius-20 main-color p-4 my-3 mx-auto">
                  < Card.Body >
                    <Container className='d-flex justify-content-center'>
                      <Image className="img-fluid radius-20 text-center" src={data.attributes.image && data.attributes.image} />
                    </Container>
                    <Card.Title className="fw-bold text-center mt-2 mb-4 fs-2">{data.attributes.name}</Card.Title>
                    <Card.Text className="text-center my-2 fs-2">{data.attributes.blood_status && data.attributes.blood_status}</Card.Text>
                    {data.attributes.animagus ? (
                      <Card.Text className="text-center mb-4 fs-2">Animagus: <span>{data.attributes.animagus}</span> </Card.Text>
                    ) : null}
                    {data.attributes.boggart ? (
                      <Card.Text className="text-center mb-4 fs-2">Boggart: <span>{data.attributes.boggart}</span> </Card.Text>
                    ) : null}
                    <Row className='my-3'>
                      {data.attributes.born ? (
                        <Card.Text className="fw-bold my-3 fs-4">Born: <span className='fw-light'>{data.attributes.born}</span> </Card.Text>
                      ) : null}
                      {data.attributes.died ? (
                        <Card.Text className="fw-bold mb-3 fs-4">Died: <span className='fw-light'>{data.attributes.died}</span> </Card.Text>
                      ) : null}
                    </Row>
                    <Row>
                      <Col md={6}>
                        {data.attributes.family_members ? (
                          <>
                            <Card.Text className="fw-bold mb-2 fs-3">Family Members: </Card.Text>
                            <ul className='mb-4'>
                              {data.attributes.family_members.map((member, index) => (<li key={index} className='my-1 p-1 fs-18'>* {member}</li>))}
                            </ul>
                          </>
                        ) : null}
                      </Col>
                      <Col md={6}>
                        <Row>
                          {data.attributes.house ? (
                            <Card.Text className="fw-bold mb-4 fs-3">House: <span className='fw-light fs-4'>{data.attributes.house}</span> </Card.Text>
                          ) : null}
                        </Row>
                        {data.attributes.titles ? (
                          <>
                            <Card.Text className="fw-bold mb-2 fs-4">Titles: </Card.Text>
                            <ul className='mb-4'>
                              {data.attributes.titles.map((title, index) => (<li key={index} className='my-1 p-1 fs-18'>* {title}</li>))}
                            </ul>
                          </>
                        ) : null}
                        {data.attributes.jobs ? (
                          <>
                            <Card.Text className="fw-bold mb-2 fs-4">Jobs: </Card.Text>
                            <ul className='mb-4'>
                              {data.attributes.jobs.map((job, index) => (<li key={index} className='my-1 p-1 fs-18'>* {job}</li>))}
                            </ul>
                          </>
                        ) : null}
                        {data.attributes.wands ? (
                          <>
                            <Card.Text className="fw-bold mb-2 fs-4">Wands: </Card.Text>
                            <ul className='mb-4'>
                              {data.attributes.wands.map((wand, index) => (<li key={index} className='my-1 p-1 fs-18'>* {wand}</li>))}
                            </ul>
                          </>
                        ) : null}
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        {data.attributes.patronus ? (
                          <Card.Text className="fw-bold mb-4 fs-4">Patronus: <span className='fw-light fs-4'>{data.attributes.patronus}</span> </Card.Text>
                        ) : null}

                        {data.attributes.nationality ? (
                          <Card.Text className="fw-bold mb-4 fs-4">Nationality: <span className='fw-light fs-4'>{data.attributes.nationality}</span> </Card.Text>
                        ) : null}

                        {data.attributes.marital_status ? (
                          <Card.Text className="fw-bold mb-4 fs-4">Marital Status: <span className='fw-light fs-4'>{data.attributes.marital_status}</span> </Card.Text>
                        ) : null}

                        {data.attributes.romances ? (
                          <>
                            <Card.Text className="fw-bold mb-2 fs-4">Romances: </Card.Text>
                            <ul className='mb-4'>
                              {data.attributes.romances.map((romance, index) => (<li key={index} className='my-1 p-1 fs-18'>* {romance}</li>))}
                            </ul>
                          </>
                        ) : null}
                      </Col>
                      <Col md={6}>
                        {data.attributes.gender ? (
                          <Card.Text className="fw-bold mb-4 fs-4">Gender: <span className='fw-light fs-4'>{data.attributes.gender}</span> </Card.Text>
                        ) : null}

                        {data.attributes.species ? (
                          <Card.Text className="fw-bold mb-4 fs-4">Species: <span className='fw-light fs-4'>{data.attributes.species}</span> </Card.Text>
                        ) : null}

                        {data.attributes.hair_color ? (
                          <Card.Text className="fw-bold mb-4 fs-4">Hair Color: <span className='fw-light fs-4'>{data.attributes.hair_color}</span> </Card.Text>
                        ) : null}

                        {data.attributes.skin_color ? (
                          <Card.Text className="fw-bold mb-4 fs-4">Skin Color: <span className='fw-light fs-4'>{data.attributes.skin_color}</span> </Card.Text>
                        ) : null}

                        {data.attributes.height ? (
                          <Card.Text className="fw-bold mb-4 fs-4">Height: <span className='fw-light fs-4'>{data.attributes.height}</span> </Card.Text>
                        ) : null}

                        {data.attributes.weight ? (
                          <Card.Text className="fw-bold mb-4 fs-4">Weight: <span className='fw-light fs-4'>{data.attributes.weight}</span> </Card.Text>
                        ) : null}
                      </Col>
                    </Row>
                    <Card.Link className="btn text-center my-4 fs-2" href={data.attributes.wiki && data.attributes.wiki}>{data.attributes.wiki && 'Learn More'}</Card.Link>
                  </Card.Body>
                </Card>
              ) : null
              }
            </React.Fragment>

          ))}
        <Container fluid>
          <ul className="align">
            {searchType === 'books' && wizData ? (
              wizData.map((data, index) => (
                <AnimatedBook key={index} bookData={data} />
              ))
            ) : null}
          </ul>
        </Container>


      </body >
    </Container >
  );
}

export default App;
