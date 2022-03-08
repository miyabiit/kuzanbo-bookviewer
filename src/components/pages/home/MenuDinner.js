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
	const { getDinners, dinners, dinnerSummary,dinnerTotal } = useDinners(); 
	const [startDate, setStartDate] = useState(myDateCalc.formatDate(new Date()));
  useEffect(() => {
    getDinners(startDate);
  },[getDinners,startDate]);

	const onTestClick = () => {
		/*
		const calcDinners = (dinners, fromDateString, term) => {
			let dayList = myDateCalc.getDayListByTerm(
				fromDateString, 
				term
			);
			let menuList = dinners.map((d) => {return d[4]});
			console.log(menuList);
			menuList = crossTotal.getUniqList(menuList);
			console.log(menuList);
			let data = dinners.map(d => {
				return [d[2],d[4],d[5]];
			});
			const out =  crossTotal.getCrossTotal(
				dayList,
				menuList,
				data
			);
			return out;
		};
		const out = calcDinners(dinners, startDate, 14);
		*/
		alert(dinnerTotal);
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
			<h1>size:{dinnerTotal.length}</h1>
			<Button onClick={() => onTestClick()} >TEST</Button>
    </>
  );
});
