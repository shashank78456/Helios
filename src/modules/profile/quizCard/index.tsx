import { Square,Text,Stack,Box,Card, CardHeader, CardBody, CardFooter, Button, Heading, VStack } from '@chakra-ui/react'

const QuizCard=()=>{
    return(
        <Card width="78vw" >
            <Stack width="100%" direction="row" spacing="30vw" >
                    <Stack direction="row">
                    <Box bg="#EBE7F2" height={24} width={36} ml={12} mt={16} ></Box>
                    
                    <Stack>
                        <CardBody>
                        <Heading size='md'>Recruitment Test | Created by : Stuti Lilani</Heading>

                        <Text py='1.5'>
                        This quiz is for the recruitments of SDSLabs, PAG, DSG and InfoSec. And it is important do attend.
                        </Text>
                        <Text py='1.5'>
                        Scheduled: 26 Jun, 2021 03:00 PM
                        </Text>
                        </CardBody>

                        <CardFooter>
                        <Button mt={-10} variant='solid' colorScheme='purple' bgColor='brand'>
                            View report
                        </Button>
                        </CardFooter>
                    </Stack>
                    </Stack>
                

                <VStack color='brand' width="8%" p={2}>
                    <Text align='center' >Rank</Text>
                    <Heading fontSize='2rem' >3</Heading>
                    <Text fontSize='0.8rem' width="fit-content" align='center' >(Out of 500)</Text>
                </VStack>

            </Stack>
        </Card>
    )
}

export default QuizCard