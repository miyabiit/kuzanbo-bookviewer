import { memo, useCallback, useEffect } from "react";
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

export const Home = memo(() => {
  const { getReserves, loading, reserves, reserveSummary } = useReserves();
  useEffect(() => {
    getReserves("2021-09-18");
  },[getReserves]);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onClickReserve = useCallback(
    (reserve) => {
      
    }
  );
  
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
                  <Flex key={index}>
                    <Box p='1'>
                      {reserve.宿泊者名.value}
                    </Box>
                    <Spacer />
                    <Box>
                      <Button onClick={onOpen} colorScheme='teal' mr='1'>
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
      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>予約詳細</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            詳細<br/>
            詳細<br/>
            詳細<br/>
            詳細<br/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
});
