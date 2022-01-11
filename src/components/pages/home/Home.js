import { memo, useCallback, useEffect } from "react";
import {
  Box,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';

import { useReserves } from "../../../hooks/useReserves";
import { useReserveSummary } from "../../../hooks/useReserveSummary";

export const Home = memo(() => {
  const { getReserves, loading, reserves } = useReserves();
  const { onReserveSummary, reserveSummary } = useReserveSummary();
  
  useEffect(() => {
    getReserves("2021-09-18");
    onReserveSummary({startday:"2021-09-18",reserves: reserves});
    alert(JSON.stringify(reserveSummary));
  }, [getReserves,onReserveSummary]);
  //alert(reserves.length);

  return(
    <>
<Accordion>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='left'>
          Section 1 title
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box flex='1' textAlign='left'>
          Section 2 title
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </AccordionPanel>
  </AccordionItem>
</Accordion>
      <h1>HOME</h1>
    </>
  )
});
