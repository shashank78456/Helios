import { Modal, ModalContent, ModalOverlay, Text, Button, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { TimeIcon, CloseIcon } from '@chakra-ui/icons'
import { QuizSummaryModal } from './QuizSummaryModal'
import QuizSummaryPie from '../QuizSummaryPie'
import * as io from "socket.io-client";
import { useNavigate } from 'react-router-dom';
import { useSubmitQuiz } from '../../api/UseSubmitQuiz';

interface SubmitQuizModalProps {
  open: boolean
  toggleIsOpen: () => void
}

const socket = io.connect("http://localhost:4000");

export const SubmitQuizModal = ({ open, toggleIsOpen }: SubmitQuizModalProps) => {

  const [timeLeft, setTimeLeft] = useState('00 : 00 : 00')
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false)
  const navigate = useNavigate();

  // quiz
  const quizId = '64f03422df4af65f96380c43';

      const {mutate} = useSubmitQuiz();
      const handleQuizSubmit = async () => {
        socket.disconnect();
        mutate(quizId, { onSuccess:()=>{
          console.log(quizId);
          console.log({ quizId});
            setIsQuizSubmitted(true);
            navigate('/')
          }
        })
      }
  
  return (
    <Modal isOpen={open} onClose={toggleIsOpen} isCentered size='3xl'>
      <ModalOverlay />
      <ModalContent padding={6} borderRadius={0}>
        <Flex flexDirection='row' justifyContent='space-between' mb={6}>
          <Text fontSize='1.125rem' fontWeight='600'>
            Submit Quiz
          </Text>
          <CloseIcon
            onClick={toggleIsOpen}
            color='crossBlack'
            w='0.875rem'
            h='0.875rem'
            alignSelf='center'
          />
        </Flex>
        <Flex
          flexDirection='row'
          alignItems='center'
          justifyContent='center'
          w='full'
          bg='v1'
          px={8}
          py={4}
        >
          <TimeIcon color='v5' w={14} h={14} />
          <Flex
            flexDirection='column'
            alignItems='flex-start'
            justifyContent='center'
            w='full'
            ml={6}
          >
            <Text fontSize='1.25rem' fontWeight='600' mb={1} color='v5'>
              You still have {timeLeft} left
            </Text>
            <Text fontSize='1rem' fontWeight='400' color='v5'>
              Are you sure you want to submit ?
            </Text>
          </Flex>
        </Flex>
        <Flex flexDirection='row' alignItems='center' justifyContent='center' mt={9}>
          <QuizSummaryPie />
        </Flex>

        <Flex flexDirection='row' justifyContent='flex-end'>
          <Button
            variant='outline'
            color='v6'
            borderColor='v6'
            alignSelf='flex-end'
            mt={4}
            mr={4}
            onClick={toggleIsOpen}
          >
            Cancel
          </Button>
          <Button
            colorScheme='purple'
            bgColor='brand'
            alignSelf='flex-end'
            mt={4}
            onClick={handleQuizSubmit}
          >
            Submit
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  )
  }
