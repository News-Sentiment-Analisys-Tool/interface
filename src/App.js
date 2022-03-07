import axios from 'axios'
import './App.css'

import React from 'react'
import Chart from './Chart'
import { DailyReturn } from './DailyReturn'
import { TypeChooser } from "react-stockcharts/lib/helper";
import { CompanyDateForm } from './CompanyDateForm'
import { useState, useEffect } from 'react'

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
    <div>
      <div className="App">
        <h1>MACD - Sentimento de Notícias</h1>
        <h3 style={{
          color: '#D3D3D3'
        }} >Moving Average Convergence Divergence (MACD) indicator</h3>
        <CompanyDateForm setValue={(data) => setParams(data)} />
      </div>
        {params && <ChartComponent params={{
          companyId: params.company,
          startDate: params.startDate,
          endDate: params.endDate
        }} />}
    </div>
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
    return <div>Carregando...</div>
  }

  if (state.length === 0) {
    return <div>Sem dados para o período</div>
  }

  return (
    <div>
      <TypeChooser>
          {type => <Chart type={type} data={state} />}
        </TypeChooser>
    </div>
  )

}

export default App;
