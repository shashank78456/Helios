import axios from 'axios'
import axiosInstance from './axiosInstance'

export const FetchCheckResponse = async ({ quizId, responseId, body }: { quizId: string, responseId: string, body: any }) => {
  try {
    const res = await axiosInstance.patch(`/checkQuiz/response/check/${quizId}/${responseId}`, body)
    return res.data
  } catch(e: unknown) {
    if(axios.isAxiosError(e)){
      return e.response?.data || e.message
    }
    throw e;
  }
}