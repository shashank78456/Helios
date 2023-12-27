import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  VStack,
  HStack,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import InputField from '@common/components/CustomInputWithLabel'
import CustomRichTextEditor from '@common/components/CustomRichTextEditor'
import ImageUpload from './ImageUpload'
import { IQuizDetails } from '@giveQuiz/types'
import useUpdateDetails from '@createQuiz/hooks/useUpateDetails'
import { useUpdateQuizDetails } from "@createQuiz/api/useQuiz";

interface QuizDetailsProps {
  details: IQuizDetails
  setDetails: (details: IQuizDetails) => void
  quizId: string  
}

const QuizDetails = ({details, setDetails, quizId} : QuizDetailsProps) => {
  const { mutate } = useUpdateQuizDetails()
  const handleChange = (key : string, value : string) => {
    setDetails({...details, [key]: value})
  }
  const handleChangeQuizInstructions = (value? : string) => {
    setDetails({...details, instructions: value})
  }
  const handleSaveQuizDetails = () => {
    const { managers, ...rest } = details
    const updatedDetails = {
      quizMetadata: rest,
      managers: managers
    }
    mutate({quizId, body: updatedDetails })
  }
  return (
    <Box w='930px' mx='auto' my={14}>
      <Heading fontSize='3xl' color='accentBlack'>
        Quiz Details
      </Heading>
      <Grid templateColumns='repeat(5, 1fr)' templateRows='repeat(3, 1fr)' gap={6} mt={8}>
        <GridItem colSpan={3}>
          <InputField
            label='Quiz Name'
            inputProps={{
              value: details?.name,
              placeholder: 'Enter quiz name',
              onChange: (e) => handleChange('name', e.target.value),
            }}
          />
        </GridItem>
        <GridItem colSpan={2} rowSpan={3}>
          <ImageUpload />
        </GridItem>
        <GridItem colSpan={1}>
          <InputField
            label='Start Date'
            inputProps={{
              type: 'date',
              value: details?.startDate,
              onChange: (e) => handleChange('startDate', e.target.value),
            }}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <InputField
            label='Start Time'
            inputProps={{
              type: 'time',
              value: details?.startTime,
              onChange: (e) => handleChange('startTime', e.target.value),
            }}
          />
        </GridItem>
        <GridItem colSpan={1} />
        <GridItem colSpan={1}>
          <InputField
            label='End Date'
            inputProps={{
              type: 'date',
              value: details?.endDate,
              onChange: (e) => handleChange('endDate', e.target.value),
            }}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <InputField
            label='End Time'
            inputProps={{
              type: 'time',
              value: details?.endTime,
              onChange: (e) => handleChange('endTime', e.target.value),
            }}
          />
        </GridItem>
        <GridItem colSpan={1}>
          <InputField
            label='Quiz Duration'
            inputProps={{
              placeholder: 'HH:MM',
              value: details?.duration,
              onChange: (e) => handleChange('duration', e.target.value),
            }}
          />
        </GridItem>
      </Grid>
      <VStack mt={8} spacing={6} alignItems='stretch'>
        <InputField
          label='Managers'
          inputProps={{
            placeholder: 'Add managers',
            value: details?.managers?.join(', '),
            onChange: (e) => handleChange('managers', e.target.value),
          }}
          subtext='TODO: Add tags'
        />
        <InputField
          label='Access Code (Optional)'
          inputProps={{
            value: details?.accessCode,
            placeholder: 'Enter the quiz access code Eg: F4CSeb',
            onChange: (e) => handleChange('accessCode', e.target.value),
          }}
          subtext='0/15 characters'
        />
        <InputField
          label='Quiz Description'
          inputProps={{
            value: details?.description,
            placeholder: 'Enter a quiz description',
            onChange: (e) => handleChange('description', e.target.value),
          }}
          subtext='0/150 characters'
        />
        <FormControl>
          <FormLabel fontWeight='400' fontSize='sm' color='gray.500'>
            Quiz Instructions
          </FormLabel>
          <CustomRichTextEditor value={details?.instructions ?? ''} onChange={handleChangeQuizInstructions} />
        </FormControl>
      </VStack>
      <HStack justifyContent='end' my={12} gap={3}>
        <Button color='brand' colorScheme='purple' fontWeight='400' variant='outline'>
          Reset
        </Button>
        <Button color='white' colorScheme='purple' bgColor='brand' fontWeight='400' onClick={handleSaveQuizDetails}>
          Save & Continue
        </Button>
      </HStack>
    </Box>
  )
}

export default QuizDetails
