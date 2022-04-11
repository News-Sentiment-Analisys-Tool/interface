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
  Navbar,
  Button,
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
        <Navbar.Brand href="#home">Análise Técnica - Notícias - Simulador</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <Container>
      <br />
      <Row className='App'>
        {!params  ? (
          <CompanyDateForm setValue={(data) => setParams(data)} />
        ) : (
          <Button 
          style={{
            width: '50%',
            marginLeft: '25%'
          }} 
          onClick={() => {
            window.location.reload()
          }} variant="success">
          Realizar Nova Simulação
        </Button>
        )}
      </Row>
    </Container>
    {params 
        && 
        <>
          <br />
          <br />
          <Row className='App'>
            <h3>{`${params.indicator === 1 ? 'MME':'MACD'} - Sentimento de notícias`}</h3>
          </Row>
          <ChartComponent params={{
            companyId: params.company,
            startDate: params.startDate,
            endDate: params.endDate
          }}/>
        </>
    }
    <Container> 
      <Row>
        <SimulateOperations />
      </Row>
    </Container>
    </>
  );
}


export default App;
