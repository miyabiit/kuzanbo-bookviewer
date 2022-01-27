import { memo } from 'react';
import {
  Box,
  Text,
  Flex,
  Spacer,
  HStack
} from '@chakra-ui/react';

export const ReserveSummaryRaw = memo( props => {
  const {summary} = props;
  const dayString = ['日','月','火','水','木','金','土'];
  
  return (
    <Box flex="1" align="left">
      <HStack>
        <Text align='left'>
          {('00' + String(summary.date.getDate())).slice(-2) + ' ' + dayString[summary.date.getDay()]}
        </Text>
        <Text align='left'>
          {`予約 ${('  ' + String(summary.reserves.length)).slice(-2)}`}
        </Text>
        <Text align='left'>
          {`総人数 ${('  ' + String(summary.totalGuest)).slice(-2)}`}
        </Text>
        <Text align='left'>
          {`大人 ${('  ' + String(summary.totalMale + summary.totalFemale)).slice(-2)}`}
        </Text>
        <Text align='left'>
          {`子供 ${('  ' + String(summary.totalGuest - summary.totalMale - summary.totalFemale)).slice(-2)}`}
        </Text>
        <Text align='left'>
          {`犬 ${('  ' + String(summary.totalDog)).slice(-2)}`}
        </Text>
      </HStack>
    </Box>
  );
});
