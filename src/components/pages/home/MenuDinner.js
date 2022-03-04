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

//import { useReserves } from "../../../hooks/useReserves";
//import { ReserveDetailModal } from "../../organisms/modal/ReserveDetailModal";
//import { ReserveRaw } from "../../organisms/reserve/ReserveRaw";
//import { ReserveSummaryRaw } from "../../organisms/reserve/ReserveSummaryRaw";

export const MenuDinner = memo(() => {
	const { getDinners, dinners, dinnerSummary } = useDinners(); 
	const [startDate, setStartDate] = useState(myDateCalc.formatDate(new Date()));
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
    </>
  );
});
