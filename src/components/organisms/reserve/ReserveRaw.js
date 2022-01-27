import { memo, useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Spacer,
  Button
} from '@chakra-ui/react';

export const ReserveRaw = memo( props => {
  const {reserve, onClick} = props;
  return (
    <>
      <Box p='1'>
        {reserve.宿泊者名.value}
      </Box>
      <Box p='1'>
        {reserve.status}
      </Box>
      <Box p='1'>
        部屋{reserve.宿泊タイプ.value}
      </Box>
      <Spacer />
      <Box>
        <Button onClick={() => onClick(reserve)} colorScheme='teal' mr='1'>
          詳細
        </Button>
      </Box>
    </>
  );
});
