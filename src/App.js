import axios from 'axios'
import './App.css'

import React from 'react'
import Chart from './Chart'
import { DailyReturn } from './DailyReturn'
import { TypeChooser } from "react-stockcharts/lib/helper";
import { CompanyDateForm } from './CompanyDateForm'
import { AlertDismissible } from './AlertDismissible'
import { useState, useEffect } from 'react'
import {
  Spinner,
  Container,
  Row,
  Col
} from 'react-bootstrap'

const groupBy = (items, key) => items.reduce(
  (result, item) => ({
    ...result,
    [item[key].substring(0, 10)]: [
      ...(result[item[key].substring(0, 10)] || []),
      item,
    ],
  }), 
  {},
);

const getSentimentData = (obj) => {
  let data = []
  for (const item of Object.entries(obj)) {
    let sumSentimentScore = 0
    for (const setence of item[1]) {
      let score = parseFloat(setence.sentiment_score)
      if (score > 0) sumSentimentScore += 1
      else if (score < 0) sumSentimentScore -= 1
    }

    let obj = {
      sentiment_score: sumSentimentScore / item[1].length,
      ...new DailyReturn(item[0]),
    }
    data = [...data, obj]
  }

  return data
}

const getSentimentInformation = async (params) => {

  const baseUrl = axios.create({
    baseURL: 'https://jriqhhw3ua.execute-api.us-east-1.amazonaws.com/dev'
  })

  const response = await baseUrl.get('/report',{
    params
  });

  return getSentimentData(groupBy(response.data, 'created_at'))
};

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

function ChartComponent({ params }) {
  const [state, setState] = useState(null)

  useEffect(() => {
    setState(null)
    getSentimentInformation(params).then(data => {
      setState(data)
    })
  }, [params])

  if (state === null) {
    return (
      <Container>
        <Row>
          <Col></Col>
          <Spinner style={{
            width: 100,
            height: 100,
            margin: 100
          }} 
            variant="success"
            animation="border"
          />
          <Col></Col>
        </Row>
      </Container>
    )
  }

  if (state.length === 0) {
    return (
      <AlertDismissible />
    )
  }

  return (
    <TypeChooser>
      {type => <Chart type={type} data={state} />}
    </TypeChooser>
  )
}

export default App;
