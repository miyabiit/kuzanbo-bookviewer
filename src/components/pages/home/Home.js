import { memo, useCallback, useEffect } from "react";
import {
  Box,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Center,
  Spinner,
  Wrap,
  WrapItem,
  VStack,
  StackDivider
} from '@chakra-ui/react';

import { useReserves } from "../../../hooks/useReserves";

export const Home = memo(() => {
  const { getReserves, loading, reserves, reserveSummary } = useReserves();
  useEffect(() => {
    getReserves("2021-09-18");
  },[getReserves]);
  
  return(
    <>
      <h2>HOME:{reserves.length}</h2>
      <Accordion>
        {reserveSummary.map((obj,index) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  日付:{obj.date.toDateString()}
                </Box>
                <Box flex='1' textAlign='left'>
                  予約数:{obj.reserves.length}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack
                divider={<StackDivider/>}
                spacing={4}
                align='stretch'
              >
                {obj.reserves.map((reserve,index) => (
                  <Box h='20px' key={index}>
                    {reserve.宿泊者名.value}
                  </Box>
                ))}
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  )
});
