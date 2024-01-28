import React, { useState } from 'react'
import { Select } from 'chakra-react-select'
import { Button, HStack, Input, Select as SelectChakra, Text } from '@chakra-ui/react'
import { useLeaderboard } from '@checkQuiz/api/useLeaderboard'
import AutocheckModal from './Modals/Autocheck'
import useCheckQuizStore from '@checkQuiz/store/checkQuizStore'

interface FiltersProps {
  SearchBox?: boolean
  SelectFilter?: boolean
  totalMCQs: number
}

const Filters: React.FC<FiltersProps> = ({
  SearchBox = false,
  SelectFilter = false,
  totalMCQs,
}) => {
  const [assignees, setAssignees] = useState<any>([])
  const [isAutocheckModalOpen, setIsAutocheckModalOpen] = useState<boolean>(false)
  const [quizId] = useCheckQuizStore((state) => [state.quizId])

  const { mutate: generateLeaderboard } = useLeaderboard()

  const handleLeaderboard = () => {
    generateLeaderboard(
      { quizId },
      {
        onSuccess: () => {
          window.location.reload()
        },
      },
    )
  }

  // TODO: fetch assignees from athena
  const [availableAssignees] = useState([
    { value: '1', label: 'A' },
    { value: '2', label: 'B' },
    { value: '3', label: 'C' },
    { value: '4', label: 'D' },
    { value: '5', label: 'E' },
  ])

  const handleAssigneesChange = (selectedOptions: any) => {
    const selectedAssignees = Array.isArray(selectedOptions) ? selectedOptions : [selectedOptions]
    setAssignees(selectedAssignees)
  }

  return (
    <>
      <HStack spacing={4} alignItems='center' width='full' justifyContent='space-between' mt={6}>
        <HStack spacing={4} alignItems='center' width='full'>
          {SelectFilter && (
            <>
              <Text fontSize='0.875rem' color='#939393'>
                Assigned to:
              </Text>
              <Select
                styles={{
                  option: (provided, state) => ({
                    ...provided,
                    padding: '0.75rem',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    borderRadius: '0.25rem',
                  }),
                }}
                value={assignees}
                options={availableAssignees}
                isMulti
                placeholder='Assignees'
                onChange={handleAssigneesChange}
              />
            </>
          )}

          {SearchBox && (
            <Input
              maxWidth='20rem'
              placeholder='Search'
              variant='outline'
              borderColor='#939393'
              borderRadius='0.25rem'
              fontSize='0.875rem'
              fontWeight='600'
              color='#939393'
              _placeholder={{ color: '#939393' }}
            />
          )}

          <SelectChakra width='12rem' placeholder='Sort by' color='#939393'>
            <option value='ascending' color='#939393'>
              Progress (0-100%)
            </option>
            <option value='descending' color='#939393'>
              Progress (100-0%)
            </option>
          </SelectChakra>
        </HStack>

        <Button
          colorScheme='purple'
          bgColor='brand'
          px={6}
          py={3}
          fontSize='0.875rem'
          fontWeight='400'
          onClick={handleLeaderboard}
        >
          Generate Leaderboard
        </Button>

        <Button
          colorScheme='purple'
          bgColor='brand'
          px={6}
          py={3}
          fontSize='0.875rem'
          fontWeight='400'
          onClick={() => setIsAutocheckModalOpen(true)}
        >
          Autocheck
        </Button>
      </HStack>
      <AutocheckModal
        open={isAutocheckModalOpen}
        toggleIsOpen={() => setIsAutocheckModalOpen(!isAutocheckModalOpen)}
        totalMCQs={totalMCQs}
      />
    </>
  )
}

export default Filters
