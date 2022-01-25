import { memo, useCallback, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Spacer,
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
  StackDivider,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

import { useReserves } from "../../../hooks/useReserves";
import { ReserveDetailModal } from "../../organisms/modal/ReserveDetailModal";
import { DatePicker } from "chakra-ui-date-input";

export const Home = memo(() => {
  const { getReserves, loading, reserves, reserveSummary } = useReserves();
  
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
        //onChange={(pickedDate) => onChangeDate(pickedDate)}
        onChange={(pickedDate) => setStartDate(pickedDate)}
      />
      </div>
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
                <Box flex='1' textAlign='left'>
                  男性:{obj.totalMale}
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
                  <Flex key={index}>
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
                      <Button onClick={() => onClickReserve(reserve)} colorScheme='teal' mr='1'>
                        詳細
                      </Button>
                    </Box>
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
  )
});
