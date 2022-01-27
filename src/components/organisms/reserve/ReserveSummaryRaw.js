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
        {('00' + summary.date.getDate()).slice(-2) + ' ' + dayString[summary.date.getDay()]}
      </Text>
      <Text align='left'>
        {`予約 ${('  ' + summary.reserves.length).slice(-2)}`}
      </Text>
      <Text align='left'>
        {`総人数 ${('  ' + summary.reserves.length).slice(-2)}`}
      </Text>
      <Text align='left'>
        {`大人 ${('  ' + summary.reserves.length).slice(-2)}`}
      </Text>
      <Text align='left'>
        {`子供 ${('  ' + summary.reserves.length).slice(-2)}`}
      </Text>
      <Text align='left'>
        {`犬 ${('  ' + summary.reserves.length).slice(-2)}`}
      </Text>
      </HStack>
    </Box>
  );
});
