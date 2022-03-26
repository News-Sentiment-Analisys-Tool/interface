import './App.css'

import React from 'react'
import { ChartComponent } from './components/Chart'
import { CompanyDateForm } from './components/CompanyDateForm'
import { useState } from 'react'
import {
  Container,
  Row
} from 'react-bootstrap'

function App() {
  const [params, setParams] = useState(null)

  return (
    <Container>
      <Row className='App'>
        <h1>MACD - Sentimento de Notícias</h1>
        <h3 style={{
          color: '#D3D3D3'
        }} >Moving Average Convergence Divergence (MACD) indicator</h3>
        <CompanyDateForm setValue={(data) => setParams(data)} />
      </Row>
        {params 
            && <ChartComponent params={{
              companyId: params.company,
              startDate: params.startDate,
              endDate: params.endDate
          }} />
        }
    </Container>
  );
}


export default App;
