import React from 'react'
import { useSelector } from 'react-redux'
import {
  Table
} from 'react-bootstrap'

export const SimulateOperations = () => {
    const stockData = useSelector(state => state.stockState.stockData)
    let initialCash = 0.00
    let investedCash = 0.00
    let checkForFirstTrend = false
    let isBullTrend
    let isBearTrend
    let buyOperationsCount = 0
    let sellOperationsCount = 0
    let operationData = []
    let id = 0
    let buyRealized = false
    
    for (const [i, day] of stockData.entries()) {
      const { macd, signal } = day.macd
      const { close, date } = day
      let hasMacdAndSignal = macd && signal
  
      if (hasMacdAndSignal && !checkForFirstTrend) {
        checkForFirstTrend = true
        if (macd > signal) {
          isBullTrend = true
          isBearTrend =false
        } 
        else if (signal > macd) {
          isBullTrend = false
          isBearTrend = true
        }
      }
  
      if(checkForFirstTrend) {
        if ((isBearTrend && (macd >= signal))) {
            let price = (close > 0 ? close : (stockData[i + 1]?.close > 0 ? stockData[i + 1]?.close : stockData[i + 2]?.close)) || 0.00
            isBearTrend = false
            isBullTrend = true
            if (price > 0) {
                buyRealized = true
                investedCash += (price || 0.00)
                buyOperationsCount += 1
                operationData = [
                    ...operationData,
                    {
                    id,
                    initialCash,
                    investedCash,
                    action: 'compra',
                    close: price,
                    date: date.toISOString().substring(0, 10),
                    }
                ]
            }
        }
  
        if ((isBullTrend && (macd <= signal))) {
            let price = (close > 0 ? close : (stockData[i + 1]?.close > 0 ? stockData[i + 1]?.close : stockData[i + 2]?.close)) || 0.00
            isBearTrend = true
            isBullTrend = false
            if (buyRealized && price > 0) {
                investedCash -= (price || 0.00)
                investedCash = investedCash * (-1)
                sellOperationsCount += 1
                operationData = [
                    ...operationData,
                    {
                    id,
                    initialCash,
                    investedCash,
                    action: 'venda',
                    close: price,
                    date: date.toISOString().substring(0, 10),
                    }
                ]
            }
        }
      }
      id += 1
    }
  
    if (stockData.length === 0) {
      return <></>
    }
  
    return (
      <>
      <h3>Ordens</h3>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Ação</th>
            <th>Preço</th>
            <th>Investido</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {
            operationData.map((item) => (
              <tr key={item.id}>
                <td>{item.action}</td>
                <td>{item.close}</td>
                <td>{item.investedCash}</td>
                <td>{item.date}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      <br />
      <br />
      <h3>Balanço consolidado</h3>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr key={1}>
            <th>Investimento Inicial</th>
            <th>Dinheiro investido</th>
            <th>Resultado</th>
            <th>Operações de compra</th>
            <th>Operações de venda</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{operationData[0]?.close || 0.00}</td>
            <td>{investedCash}</td>
            <td>{Math.abs(investedCash) - Math.abs(operationData[0]?.close || 0.00)}</td>
            <td>{buyOperationsCount}</td>
            <td>{sellOperationsCount}</td>
          </tr>
        </tbody>
      </Table>
      <br />
      <br />
      </>
    )
  }