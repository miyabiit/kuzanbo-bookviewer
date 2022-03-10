import { memo, useCallback, useEffect, useState } from "react";
import {
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
	Stack,
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
	const { getDinners, dinners, dinnerSummary, dinnerTotal } = useDinners(); 
	const [startDate, setStartDate] = useState(myDateCalc.formatDate(new Date()));
  useEffect(() => {
    getDinners(startDate);
  },[getDinners,startDate]);

	const onTestClick = () => {
		alert(dinners);
	}

  const { isOpen, onOpen, onClose } = useDisclosure();

	const showDinnerToday = (dinnersToday) => {
		let total = dinnersToday.reduce((sum, el) => sum + el[2],0);
		if(total > 0){
			return(
				dinnersToday.map((d) => (
					<Flex>
						<Box> {d[1]} </Box>
						<Spacer/>
						<Box> {d[2]} </Box>
					</Flex>
				))
			)
		}else{
			return 
		}
	}		

	const showDinnerVilla = (dateString) => {
		let arr = dinners.filter(a => a[2] == dateString).sort((a,b) => a[3] > b[3]);
		return arr.map(a => (
			<Flex>
			<Box w='300px'>{a[3]}</Box>
			<Box align="left">{a[4]}</Box>
			<Spacer/>
			<Box>{a[5]}</Box>
			</Flex>
		));
	}
			
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
			<Button onClick={() => onTestClick()} >TEST</Button>
			<Box p='1' m='2'>
				<Stack>
				{dinnerTotal.map((d) => (
					<Flex w='100%'>
						<Box>{d[0]}</Box>
						<Spacer/>
						<Box>{d[1]}</Box>
					</Flex>
				))}
				</Stack>
			</Box>
			<Box p='1' m='2' w='100%'>
				<Accordion allowMultiple>
					{dinnerSummary.map((obj, index) => (
						<AccordionItem key={index}>
							<Box as='h2' p='0' m='0' align='left'>
								<AccordionButton p='0' m='0' align='left'>
									<Box p='1' m='1' w='100%'>
										<Flex>
											<Box align='left'>{obj.date}</Box>
										</Flex>
										{showDinnerToday(obj.dinners)}
									</Box>
								</AccordionButton>
							</Box>
            	<AccordionPanel p='1'>
								<Box p='1' m='1'>
								{showDinnerVilla(obj.date)}
								</Box>
							</AccordionPanel>
						</AccordionItem>
					))}
				</Accordion>
			</Box>
    </>
  );
});
