import axios from 'axios'

export const getStockData = async (params) => {
  
    const company = {
      1: 'ITUB4',
      2: 'PETR4',
      3: 'BBDC4',
      4: 'B3SA3'
    }
    
    const response = await axios.get(`https://luocecslc7.execute-api.us-east-1.amazonaws.com/dev/stock?code=${company[params.companyId]}&start=${params.startDate}&end=${params.endDate}`)
  
    return response.data.map(item => {
      return {
        ...item,
        date: new Date(item.date)
      }
    })
  }