import { ChakraProvider, Spinner } from '@chakra-ui/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import theme from '@common/theme'
import JoinUs from './modules/auth/views/joinUs'
import { Register } from './modules/auth/views/register'
import CreateQuiz from './modules/createQuiz/views/createQuiz'
import GiveQuiz from './modules/giveQuiz/views/giveQuiz'
import Dashboard from './modules/dashboard/views/Dashboard'
import useAuthStore from '@auth/store/authStore'
import { useAuth } from '@auth/api/useAuth'
import { useEffect, useState } from 'react'
import GoogleCallback from '@auth/views/googleCallback'
import GithubCallback from '@auth/views/githubCallback'
import { UserRoles } from './modules/types'
import CheckQuiz from '@checkQuiz/views/checkQuiz'
import CheckQuestionView from '@checkQuiz/components/giveQuiz/CheckQuestionView'
import { TimerProvider } from './modules/giveQuiz/components/TimerContext'

function App() {
  const authStore = useAuthStore()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { data, isLoading, isFetched, refetch } = useAuth()

  useEffect(() => {
    if (isFetched && !isLoading && !data) {
      refetch()
    } else if (isFetched && !isLoading && data.user !== null) {
      authStore.setUser(data.user)
      authStore.setOnboarded(data.onboarded)
      setIsLoggedIn(true)
    }
  }, [isFetched, isLoading, data])

  if (isLoading) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spinner size='xl' />
      </div>
    )
  }

  return (
    
    <ChakraProvider theme={theme}>
      <TimerProvider>
      <Routes>
        {!isLoggedIn && !isLoading && data.user === null ? (
          <>
            <Route path='/' element={<JoinUs />} />
            <Route path='/callback/google' element={<GoogleCallback />} />
            <Route path='/callback/github' element={<GithubCallback />} />
            <Route path='*' element={<Navigate to='/' />} />
          </>
        ) : isLoggedIn && !authStore.onboarded && !isLoading ? (
          <>
            <Route path='/*' element={<Register />} />
          </>
        ) : isLoggedIn && authStore.onboarded && !isLoading ?(
          <>
            <Route path='/dashboard' element={<Dashboard />} />
            {data.user.role === UserRoles.admin && (
              <Route path='/create-quiz/:quizId' element={<CreateQuiz />} />
            )}
            <Route path='/give-quiz/:quizId' element={<GiveQuiz />} />
            <Route path='/check-quiz/:quizID/:questionIDParam' element={<CheckQuestionView />} />
            <Route path='/check-quiz/:quizID' element={<CheckQuiz />} />
            <Route path='/*' element={<Navigate to='/dashboard' />} />
          </>
        ): null}
        {/* TODO: something better than using null and make this conditional routing more elegant */}
      </Routes>
      </TimerProvider>
    </ChakraProvider>
    
  )
}

export default App