import { ChakraProvider } from '@chakra-ui/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import theme from '@common/theme'
import JoinUs from './modules/auth/views/joinUs'
import { Register } from './modules/auth/views/register'
import CreateQuiz from './modules/createQuiz/views/createQuiz'
import GiveQuiz from './modules/giveQuiz/views/giveQuiz'
import { Dashboard } from './modules/dashboard/Dashboard'
import useAuthStore from '@auth/store/authStore'
import { useAuth } from '@api/auth/hooks/useAuth'
import { useEffect, useState } from 'react'

function App() {
  const authStore = useAuthStore()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const { data, isLoading, isFetched, refetch } = useAuth() as any

  useEffect(() => {
    console.log(data)
    if (isFetched && !isLoading && !data) {
      refetch()
    } else if (isFetched && !isLoading && data.user !== null) {
      authStore.setUser(data.user)
      console.log(data.user)
      authStore.setOnboarded(data.onboarded)
      setIsLoggedIn(true)
    }
  }, [isFetched, isLoading, data])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isLoggedIn && !isLoading && data.user == null) {
    return (
      
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<JoinUs />} />
          <Route path='*' element={<Navigate to='/' />} />
          <Route path='/create/:quizID' element={<CreateQuiz />} />
          <Route path='/givequiz' element={<GiveQuiz />} /> 
        </Routes>
      </ChakraProvider>
    )
  }

  if (isLoggedIn && authStore.onboarded && !isLoading) {
    return (
      <ChakraProvider theme={theme}>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='*' element={<Dashboard />} />
        </Routes>
      </ChakraProvider>
    )
  }

  return (
    
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      </QueryClientProvider>
    </ChakraProvider>
    
  )
}

export default App
