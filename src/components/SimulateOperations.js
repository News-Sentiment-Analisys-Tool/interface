import React from 'react'
import { useSelector } from 'react-redux'
import {
  Table
} from 'react-bootstrap'

const formatDate = (date) => {
  const formated = new Date(date.setHours(date.getHours()))
  return `${(formated.getDate() + 1) > 9 ? formated.getDate() : `0${formated.getDate()}`}-${(formated.getMonth() + 1) > 9 ? formated.getMonth() : `0${formated.getMonth()}`}-${formated.getFullYear()}`
}

export const SimulateOperations = () => {
    const stockData = useSelector(state => state.stockState.stockData)
    let profit = 0.00
    let totalProfit = 0.00
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
      const { open, date } = day
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
            let price = (open > 0 ? open : (stockData[i + 1]?.open > 0 ? stockData[i + 1]?.open : stockData[i + 2]?.open)) || 0.00
            isBearTrend = false
            isBullTrend = true
            if (price > 0) {
                buyRealized = true
                profit = 0.0
                buyOperationsCount += 1
                operationData = [
                    ...operationData,
                    {
                    id,
                    profit,
                    action: 'compra',
                    open: price,
                    date
                    }
                ]
            }
        }

        if ((isBullTrend && (macd <= signal))) {
            let price = (open > 0 ? open : (stockData[i + 1]?.open > 0 ? stockData[i + 1]?.open : stockData[i + 2]?.open)) || 0.00
            isBearTrend = true
            isBullTrend = false
            if (buyRealized && price > 0) {
                profit = price - operationData[operationData.length - 1].open
                totalProfit += profit
                sellOperationsCount += 1
                operationData = [
                    ...operationData,
                    {
                    id,
                    profit,
                    action: 'venda',
                    open: price,
                    date
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
            <th>Código</th>
            <th>Operação</th>
            <th>Preço (R$)</th>
            <th>Lucro Líquido (R$))</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {
            operationData.map((item) => (
              <tr key={item.id}>
                <td>{stockData[0].symbol.split('.')[0]}</td>
                <td>{item.action}</td>
                <td>{item.open.toPrecision(4)}</td>
                <td style={{
                  background: item.profit > 0 ? 'green': (item.profit < 0 ? 'red' : '')
                }}>{item.profit.toPrecision(2)}</td>
                <td>{formatDate(item.date)}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      <br />
      <br />
      <h3 style={{
        marginTop: '50px'
      }}>Balanço consolidado</h3>
      <Table bordered hover variant="dark">
        <thead>
          <tr key={1}>
            <th>Lucro Líquido (R$)</th>
            <th>Operações de compra</th>
            <th>Operações de venda</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{
              background: totalProfit > 0 ? 'green': (totalProfit < 0 ? 'red' : '')
            }}>{totalProfit.toPrecision(2)}</td>
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