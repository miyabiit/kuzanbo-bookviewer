import { memo, useCallback, useEffect, useState } from "react";
import {
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  VStack,
  useDisclosure,
  Box
} from '@chakra-ui/react';
//import { DatePicker } from "chakra-ui-date-input";
import { DatePicker } from '../../atoms/DatePicker';

import { useReserves } from "../../../hooks/useReserves";
import { ReserveDetailModal } from "../../organisms/modal/ReserveDetailModal";
import { ReserveRaw } from "../../organisms/reserve/ReserveRaw";
import { ReserveSummaryRaw } from "../../organisms/reserve/ReserveSummaryRaw";

export const MenuDinner = memo(() => {
  const { getReserves, loading, reserveSummary } = useReserves();

  const formatDate = (dt) => {
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth()+1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    return (y + '-' + m + '-' + d);
  };

  const [startDate, setStartDate] = useState(formatDate(new Date()));

  useEffect(() => {
    getReserves(startDate);
  },[getReserves,startDate]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectReserve, setSelectReserve] = useState([]);

  const onClickReserve = useCallback(
    (reserve) => {
      setSelectReserve(reserve);
      onOpen();
  },[onClickReserve]);

  return(
    <>
      <div>
        <DatePicker
          placeholder={startDate}
          name="pickedDate"
          dateFormat="YYYY-MM-DD"
          onChange={(pickedDate) => setStartDate(pickedDate)}
        />
      </div>
      <Accordion allowMultiple>
        {reserveSummary.map((obj,index) => (
          <AccordionItem key={index}>
            <Box as='h2' p='0' m='0' align='left'>
              <AccordionButton p='0' m='0' align='left'>
                <ReserveSummaryRaw summary={obj} />
                <AccordionIcon m='2' />
              </AccordionButton>
            </Box>
            <AccordionPanel p='1'>
              <VStack
              >
                {obj.reserves.map((reserve,index) => (
                  <Flex key={index}>
                    <ReserveRaw
                      reserve={reserve}
                      onClick={onClickReserve}
                    />
                  </Flex>
                ))}
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      <ReserveDetailModal
        isOpen = {isOpen}
        onClose = {onClose}
        reserve = {selectReserve}
      />
    </>
  );
});
