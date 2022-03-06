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
  Box,
	Button
} from '@chakra-ui/react';
import { DatePicker } from '../../atoms/DatePicker';
import { useDinners } from '../../../hooks/useDinners';
import myDateCalc from '../../../functions/myDateCalc';
import crossTotal from '../../../functions/clossTotal';

export const MenuDinner = memo(() => {
	const { getDinners, dinners, dinnerSummary } = useDinners(); 
	//const [startDate, setStartDate] = useState(myDateCalc.formatDate(new Date()));
	const [startDate, setStartDate] = useState("2021-9-8");
  useEffect(() => {
    getDinners(startDate);
  },[getDinners,startDate]);

	const onTestClick = () => {
		/*
		let c = ["a","b","c"];
		let r = ["x","y"];
		let d = [
			["a","x",3],
			["a","y",2],
			["a","y",2],
			["a","y",2]
		];

		let b = crossTotal.getCrossTotal(c,r,d);
		*/
	  let b = myDateCalc.getDayListByTerm("2021-9-8",14);
		alert(b);
	}

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
			<Button onClick={() => onTestClick()} >TEST</Button>
    </>
  );
});
