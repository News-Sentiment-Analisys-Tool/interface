import CandleStickChartWithMACDIndicator from './CandleStickChartWithMACDIndicator'
import { getSentimentInformation } from '../services/sentimentApi'
import { getStockData } from '../services/stockApi'
import { groupReportByDate } from '../utils/groupBy'
import { TypeChooser } from "react-stockcharts/lib/helper";
import { AlertDismissible } from './AlertDismissible'
import { useDispatch, useSelector } from 'react-redux'
import { SET_MACD_DATA } from '../actions/actionTypes'
import { useState, useEffect } from 'react'
import {
  Spinner,
  Container,
  Row,
  Col
} from 'react-bootstrap'

const getReportDate = async (params) => {
    const sentimentArray = await getSentimentInformation(params)
    const stockArray = await getStockData(params)
    let arr = []  
    for (const item of Object.entries(groupReportByDate([...stockArray, ...sentimentArray], 'date'))) {
      if(item[1].length > 1) {
        arr = [...arr, {
          ...item[1][1],
          close: item[1][0]['close'],
          open: item[1][0]['open'],
          high: item[1][0]['high'],
          low: item[1][0]['low'],
          volume: item[1][0]['volume'],
        }]
      } else {
        arr = [...arr, {
            sentiment_score: item[1][0].sentiment_score || 0,
            ...item[1][0]
        }]
      }
    }

    return arr.sort((a,b) => (new Date(a.date).getTime() > new Date(b.date).getTime()? 1:-1))
  }

export function ChartComponent({ params }) {
    const [state, setState] = useState(null)
    const dispatch = useDispatch()
    const simulatorParams = useSelector(state => state.simulatorParamsState.simulatorParams)
    
    useEffect(() => {
      setState(null)
      getReportDate(params).then(data => {
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

    const getStockCalculus = (data) => {
        dispatch({
            type: SET_MACD_DATA,
            stockData: data
        })
    }
  
    return (
      <TypeChooser>
        {type => <CandleStickChartWithMACDIndicator params={simulatorParams} type={type} data={state} getStockCalculus={(data) => getStockCalculus(data)} />}
      </TypeChooser>
    )
  }
  