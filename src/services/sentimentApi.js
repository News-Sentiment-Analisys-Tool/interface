import axios from 'axios'
import { groupBy } from './../utils/groupBy'
import { DailyReturn } from '../domain/DailyReturn'

export const getSentimentInformation = async (params) => {

    const baseUrl = axios.create({
      baseURL: `${process.env.SENTIMENT_SERVICE_URL}`
    })
  
    const response = await baseUrl.get('/report',{
      params
    });
  
    return parseSentimentInformation(groupBy(response.data, 'created_at'))
};


const parseSentimentInformation = (obj) => {
    let data = []
    for (const item of Object.entries(obj)) {
      let sumSentimentScore = 0
      let count = 0
      for (const setence of item[1]) {
        let score = parseFloat(setence.sentiment_score)
        if (score > 0) sumSentimentScore += 1
        else if (score < 0) sumSentimentScore -= 1
        else count -=1
        count +=1
      }
  
      let obj = {
        sentiment_score: (sumSentimentScore / (count || 1)) * 10,
        ...new DailyReturn(item[0]),
      }
      data = [...data, obj]
    }
  
    return data
  }