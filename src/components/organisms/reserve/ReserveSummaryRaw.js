import { memo } from 'react';
import {
  Box,
  Text,
  HStack,
  Icon
} from '@chakra-ui/react';
import {FaHotel, FaMale, FaFemale, FaChild, FaDog} from 'react-icons/fa';

export const ReserveSummaryRaw = memo( props => {
  const {summary} = props;
  const dayString = ['日','月','火','水','木','金','土'];

  return (
    <Box flex="1" align="left" boxShadow='base' rounded='md' m='1' p='2'>
      <HStack>
        <Box textAlign='left' w="40px">
          {('00' + String(summary.date.getDate())).slice(-2) + ' ' + dayString[summary.date.getDay()]}
        </Box>
        <Icon as={FaHotel}/>
        <Box align='left' w="30px">
          {('  ' + String(summary.reserves.length)).slice(-2)}
        </Box>
        <Box align='right' w="40px">
          {('  ' + String(summary.totalGuest)).slice(-2)}人
        </Box>
        <Icon as={FaMale}/>
        <Box align='left' w="30px">
          {`${('  ' + String(summary.totalMale + summary.totalFemale)).slice(-2)}`}
        </Box>
        <Icon as={FaChild}/>
        <Box align='left' w="30px">
          {`${('  ' + String(summary.totalGuest - summary.totalMale - summary.totalFemale)).slice(-2)}`}
        </Box>
        <Icon as={FaDog}/>
        <Box align='left' w="30px">
          {`${('  ' + String(summary.totalDog)).slice(-2)}`}
        </Box>
      </HStack>
    </Box>
  );
});
