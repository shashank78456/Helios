import { useState,useEffect } from 'react'
import { TimeIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'
import * as io from "socket.io-client";


function Countdown() {
  const [countdown, setCountdown] = useState(0);
  const [countHours, setCountHours] = useState('00')
  const [countMinutes, setCountMinutes] = useState('00')
  const [countSeconds, setCountSeconds] = useState('00')

 
    const socket = io.connect("http://localhost:3000");
    socket.emit('join_quiz', { quizId: "64f03422df4af65f96380c43", userId: "64f03422df4af65f96380c3e" });

    // Handle timer updates from the server
    socket.on('sendTime', (timeLeft) => {
      setCountdown(timeLeft);
      // Convert 'timeLeft' to hours, minutes, and seconds and update the state
      const hours = Math.floor((timeLeft / 3600000) % 24);
      const minutes = Math.floor((timeLeft / 60000) % 60);
      const seconds = Math.floor((timeLeft / 1000) % 60);

      setCountHours(hours.toString().padStart(2, '0'));
      setCountMinutes(minutes.toString().padStart(2, '0'));
      setCountSeconds(seconds.toString().padStart(2, '0'));
      
    });

    useEffect(() => {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => {
         
          if (prevCountdown > 0) {
            return prevCountdown - 1;
          }
          return 0;
        });
      }, 1000);

      
      const hours = Math.floor((countdown / 3600) % 24);
      const minutes = Math.floor((countdown / 60) % 60);
      const seconds = Math.floor(countdown % 60);
  
      setCountHours(hours.toString().padStart(2, '0'));
      setCountMinutes(minutes.toString().padStart(2, '0'));
      setCountSeconds(seconds.toString().padStart(2, '0'));
  
      return () => clearInterval(interval);
    }, [countdown]);

   
  return (
    <Flex
      bgColor='v1'
      justifyContent='center'
      alignItems='center'
      gap='0.5rem'
      height='100%' >
      <TimeIcon color='v6' />
      <span>
        {`${countHours.toString().padStart(2, '0')} : ${countMinutes.toString().padStart(2, '0')} : ${countSeconds.toString().padStart(2, '0')}`}
      </span>
    </Flex>
  )
}

export default Countdown