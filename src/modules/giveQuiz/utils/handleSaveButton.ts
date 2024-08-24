import { QuestionType, ResponseStatus } from '../../types'
import { displayErrorToast } from './toastNotifications'
import handleQuestionShift from '@giveQuiz/utils/handleQuestionShift'

export const handleSaveButton = async (
  answer: string,
  isCurrentQuestionMarked: boolean,
  currentQuestion: string,
  quizId: string,
  mutate: any,
  deleteResponse: any,
  questionType: any,
  nextQuestion: () => {
    currentQuestion: string
    currentQuestionIndex: number
    currentSectionIndex: number
    currentSection?: string
  } | void,
  setAnsweredQuestions: (to: string[]) => void,
  setMarkedQuestions: (to: string[]) => void,
  setMarkedAnsweredQuestions: (to: string[]) => void,
  markedAnsweredQuestions: string[],
  answeredQuestions: string[],
  markedQuestions: string[],
  queryClient: any,
) => {
  let status: ResponseStatus = ResponseStatus.unanswered
  if (!answer && !isCurrentQuestionMarked) {
    displayErrorToast('This question is unanswered and not marked for review', {
      type: 'info',
      autoClose: 2000,
    })
  } else if (!answer && isCurrentQuestionMarked) {
    status = ResponseStatus.marked
  } else if (answer && !isCurrentQuestionMarked) {
    status = ResponseStatus.answered
  } else if (answer && isCurrentQuestionMarked) {
    status = ResponseStatus.markedanswer
  }
  handleQuestionShift(
    markedAnsweredQuestions,
    answeredQuestions,
    markedQuestions,
    setMarkedAnsweredQuestions,
    setAnsweredQuestions,
    setMarkedQuestions,
    currentQuestion,
    status,
  )
  if (status === ResponseStatus.unanswered) {
    deleteResponse(
      {
        quizId,
        questionId: currentQuestion,
      },
      {
        onError: (error: any) => {
          displayErrorToast('Failed to clear response. Please try again.')
        },
      },
    )
    return nextQuestion()
  }
  const responseData = {
    selectedOptionId: questionType === QuestionType.MCQ ? answer : undefined,
    subjectiveAnswer: questionType !== QuestionType.MCQ ? answer : undefined,
    status: status,
  }
  mutate(
    {
      quizId,
      questionId: currentQuestion,
      responseData,
    },
    {
      onSuccess: () => {
        displayErrorToast('Response Saved Successfully', {
          type: 'success',
        })
        nextQuestion()
        queryClient.invalidateQueries({
          exact: true,
          queryKey: ['response', quizId, currentQuestion],
        })
      },
      onError: (error: any) => {
        displayErrorToast('Failed to save response. Please try again.')
      },
    },
  )
}
