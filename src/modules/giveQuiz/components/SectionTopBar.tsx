import { useState, useEffect } from 'react'
import { HStack, Box } from '@chakra-ui/react'
import Countdown from './Countdown'
import Bubble from './Bubble'
import useQuizStore from '../store/QuizStore'

const SectionTopBar = () => {
  const answeredQuestions = useQuizStore((state) => state.answeredQuestions)
  const totalQuestion = useQuizStore((state) => state.totalQuestion)
  const markedQuestions = useQuizStore((state) => state.markedQuestions)
  const markedAnsweredQuestions = useQuizStore((state) => state.markedAnsweredQuestions)
  const [notVisitedQuestions, setNotVisitedQuestions] = useState(0)
  const [markedForReviewQuestions, setMarkedForReviewQuestions] = useState(0)
  const [answeredQuestion, setAnsweredQuestion] = useState(0)
  const [answeredAndMarkedForReviewQuestions, setAnsweredAndMarkedForReviewQuestions] = useState(0)

  useEffect(() => {
    setAnsweredQuestion(answeredQuestions.length)
  }, [answeredQuestions])

  useEffect(() => {
    setMarkedForReviewQuestions(markedQuestions.length)
  }, [markedQuestions])

  useEffect(() => {
    setAnsweredAndMarkedForReviewQuestions(markedAnsweredQuestions.length)
  }, [markedAnsweredQuestions])

  useEffect(() => {
    setNotVisitedQuestions(totalQuestion - answeredQuestions.length)
  }, [answeredQuestions, totalQuestion])

  return (
    <HStack
      top={0}
      id='top-nav'
      bg='white'
      justifyContent='space-between'
      position='sticky'
      width='100%'
      borderBottom='1px solid #F1EEF5'
      height='100%'
    >
      <HStack spacing='2.5rem' height='100%' px={12} py={3}>
        <Bubble
          Label='Unanswered'
          Value={notVisitedQuestions}
          BorderColor='v6'
          BgColor='white'
          FontColor='v6'
        />
        <Bubble
          Label='Marked for Review'
          Value={markedForReviewQuestions}
          BgColor='yellowMarkedForReview'
          BorderColor='markedForReviewBubbleBorder'
          FontColor='white'
        />
        <Bubble
          Label='Answered'
          Value={answeredQuestion}
          BgColor='green'
          BorderColor='answeredBubbleBorder'
          FontColor='white'
        />
        <Bubble
          Label='Answered & Marked for Review'
          Value={answeredAndMarkedForReviewQuestions}
          BgColor='yellowMarkedForReview'
          BorderColor='markedForReviewBubbleBorder'
          FontColor='white'
        />
      </HStack>
      <Box justifySelf='end' color='v6' bgColor='v1' py={5} px={4} height='100%'>
        <Countdown />
      </Box>
    </HStack>
  )
}

export default SectionTopBar
