import { memo } from 'react';
import {
  Box
} from '@chakra-ui/react';

export const ReserveSummaryRaw = memo( props => {
  const {summary} = props;
  return (
    <>
      <Box flex='1' textAlign='left'>
        日付:{summary.date.toDateString()}
      </Box>
      <Box flex='1' textAlign='left'>
        予約数:{summary.reserves.length}
      </Box>
      <Box flex='1' textAlign='left'>
        男性:{summary.totalMale}
      </Box>
    </>
  );
});
