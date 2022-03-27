import './App.css'

import React from 'react'
import { ChartComponent } from './components/Chart'
import { CompanyDateForm } from './components/CompanyDateForm'
import { useState } from 'react'
import { SimulateOperations } from './components/SimulateOperations'
import logo from './assets/logo.jpg'
import {
  Container,
  Row,
  Nav,
  Navbar
} from 'react-bootstrap'



function App() {
  const [params, setParams] = useState(null)
  
  return (
    <>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          
        </Navbar.Brand>
        <Navbar.Brand href="#home">MACD - News</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <Container>
      <br />
      <Row className='App'>
        <h1>Simulador</h1>
        <CompanyDateForm setValue={(data) => setParams(data)} />
      </Row>
        {params 
            && 
            <>
              <br />
              <br />
              <h3>MACD - Sentimento de notícias</h3>
              <ChartComponent params={{
                companyId: params.company,
                startDate: params.startDate,
                endDate: params.endDate
              }}/>
            </>
        }
      <br />
      <br />
      <br />
      <Row>
        <SimulateOperations />
      </Row>
    </Container>
    </>
  );
}


export default App;
