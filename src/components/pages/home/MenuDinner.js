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
	Spacer,
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
			<VStack>
				{dinnerTotal.map((d) => (
					<Flex w='100%'>
						<Box>{d[0]}</Box>
						<Spacer/>
						<Box>{d[1]}</Box>
					</Flex>
				))}
				<Accordion allowMultiple>
					{dinnerSummary.map((obj, index) => (
						<AccordionItem key={index}>
							<Box as='h2' p='0' align='left'>
								<AccordionButton p='0' m='0' align='left'>
									{obj.date}:{obj.dinners}
									<AccordionIcon m='2' />
								</AccordionButton>
							</Box>
						</AccordionItem>
					))}
				</Accordion>
			</VStack>
    </>
  );
});
