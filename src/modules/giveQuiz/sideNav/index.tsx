import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Heading,
  VStack,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import BasicNavButton from '@common/components/BasicNavButton'
import { GiveQuizSteps } from '../types'
import { SubmitQuizModal } from '../components/Modals/SubmitQuizModal'
import useQuizStore from '@giveQuiz/store/QuizStore'

interface SideNavContentProps {
  stage: GiveQuizSteps
  setStage: (stage: GiveQuizSteps) => void
}

const SideNavContent = ({ stage, setStage }: SideNavContentProps) => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }
  const sections = useQuizStore((state) => state.sections)
  const setCurrentQuestion = useQuizStore((state) => state.setCurrentQuestion)
  const setCurrentSection = useQuizStore((state) => state.setCurrentSection)
  const setCurrentQuestionIndex = useQuizStore((state) => state.setCurrentQuestionIndex)


  console.log("sections",sections)

  const handleQuestionBubbleClick = (questionID: string, sectionName: string, questionIndex: number): void => {
    setCurrentQuestion(questionID);
    setCurrentSection(sectionName);
    setCurrentQuestionIndex(questionIndex);
    setStage(2);
 };

  return (
    <>
    
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='flex-start'
        w='100%'
        h='100%'
        pl={6}
      >
        <Heading fontSize='xl' color='brand' pl={4} pb={6}>
          Quiz Name
        </Heading>
        <BasicNavButton isActive={stage == 0} mb={2} onClick={() => setStage(0)}>
          Instructions
        </BasicNavButton>
        {sections.map((section, index) => (
        <Accordion key = {index} w='100%' allowToggle>
          <AccordionItem border='none'>
            <AccordionButton color='v6' onClick={() => setStage(1) }>
              <Text flexGrow={1} textAlign='left' fontWeight='600'>
              {section.name}
              </Text>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4} px={0}>
            {Array.isArray(section.questions) ? section.questions.map((question, index) => (
              <Button
              key = {index}
                variant='outline'
                colorScheme='purple'
                rounded='full'
                width='1'
                ml={4}
                onClick={() => handleQuestionBubbleClick(question, section.name, index + 1)}
              >
                {index + 1}
              </Button>
            )): null}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
         ))}
        <VStack flexGrow={1} justifyContent='flex-end' w='100%' alignItems='stretch'>
          <Button variant='outline' color='v6' borderColor='v6' onClick={toggleModal}>
            Submit Quiz
          </Button>
        </VStack>
      </Flex>
      <SubmitQuizModal open={isModalOpen} toggleIsOpen={toggleModal} />
    </>
   
  )
}

export default SideNavContent
