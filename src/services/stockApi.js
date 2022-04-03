import axios from 'axios'

export const getStockData = async (params) => {
  
    const company = {
      1: 'ITUB4',
      2: 'PETR4',
      3: 'BBDC4',
      4: 'B3SA3'
    }
    
    const response = await axios.get(`${process.env.REACT_APP_STOCK_SERVICE_URL}/stock?code=${company[params.companyId]}&start=${params.startDate}&end=${params.endDate}`)
  
    return response.data.map(item => {
      return {
        ...item,
        date: new Date(item.date)
      }
    })
  }