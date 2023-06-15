import { Square,Text,Stack,Box,Card, CardHeader, CardBody, CardFooter, Button, Heading } from '@chakra-ui/react'

const QuizCard=()=>{
    return(
        <Card  width="100%" mr={20} ml={20}>
            <Stack direction="row" spacing={4}>
                <Box bg="#EBE7F2" height={28} width={32} ml={4} mt={16}></Box>
                <Stack>
                    <CardBody>
                    <Heading size='md'>Recruitment Test</Heading>

                    <Text py='2'>
                        This test is for the recruitments of SDSLabs, PAG, DSG ans InfoSec.
                    </Text>
                    <Text py='2'>
                        Scheduled: 26 Jun, 2021 03:00 pm
                    </Text>
                    </CardBody>

                    <CardFooter>
                    <Button variant='solid' colorScheme='purple' bgColor='brand'>
                        Start Quiz
                    </Button>
                    </CardFooter>
                </Stack>
            </Stack>
        </Card>
    )
}

export default QuizCard