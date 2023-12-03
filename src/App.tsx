import { ChakraProvider } from '@chakra-ui/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import theme from '@common/theme'
import JoinUs from './modules/auth/views/joinUs'
import { Register } from './modules/auth/views/register'
import CreateQuiz from './modules/createQuiz/views/createQuiz'
import GiveQuiz from './modules/giveQuiz/views/giveQuiz'
import { Dashboard } from './modules/dashboard/views/Dashboard'
import useAuthStore from '@auth/store/authStore'
import { useAuth } from '@auth/api/useAuth' 
import { useEffect, useState } from 'react'
import OAuthPopup from "@auth/views/OAuthPopup"

function App() {
  const authStore = useAuthStore()
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  const isLoggedIn = true;

  // const { data, isLoading, isFetched, refetch } = useAuth()

  // useEffect(() => {
  //   console.log(data)
  //   if (isFetched && !isLoading && !data) {
  //     refetch()
  //   } else if (isFetched && !isLoading && data.user !== null) {
  //     authStore.setUser(data.user)
  //     console.log(data.user)
  //     authStore.setOnboarded(data.onboarded)
  //     setIsLoggedIn(true)
  //   }
  // }, [isFetched, isLoading, data])

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  if (isLoggedIn && authStore.onboarded && !isLoading) {
    return (
      <ChakraProvider theme={theme}>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='*' element={<CreateQuiz />} />
        </Routes>
      </ChakraProvider>
    )
  // }

  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/register' element={<Register />} />
        <Route path='/callback' element={<OAuthPopup/>}/>
      </Routes>
    </ChakraProvider>
  )
}

export default App
