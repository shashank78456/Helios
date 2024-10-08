import axios from 'axios'
import axiosInstance from './axiosInstance'

export const checkAuth = async () => {
  try {
    const res = await axiosInstance.get('auth/user')
    return res.data
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      return e.response?.data || e.message
    }
    throw e
  }
}

export const onboard = async ({
  personalDetails,
  educationalDetails,
  socialHandles,
  user,
}: any) => {
  try {
    const res = await axiosInstance.post('auth/onboard', {
      personalDetails,
      educationalDetails,
      socialHandles,
      user,
    })
    return res.data
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      return e.response?.data || e.message
    }
    throw e
  }
}
