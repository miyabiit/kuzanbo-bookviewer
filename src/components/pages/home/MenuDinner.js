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
import { DatePicker } from '../../atoms/DatePicker';
import { useDinners } from '../../../hooks/useDinners';
import myDateCalc from '../../../functions/myDateCalc';

export const MenuDinner = memo(() => {
	const { getDinners, dinners, dinnerSummary } = useDinners(); 
	//const [startDate, setStartDate] = useState(myDateCalc.formatDate(new Date()));
	const [startDate, setStartDate] = useState('2021-9-6');
  useEffect(() => {
    getDinners(startDate);
  },[getDinners,startDate]);

  const { isOpen, onOpen, onClose } = useDisclosure();
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
			<h1>size:{dinners.length}</h1>
			<h1>size:{dinnerSummary.length}</h1>
    </>
  );
});
