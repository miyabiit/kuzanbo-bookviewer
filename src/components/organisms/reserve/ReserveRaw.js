import { memo, useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Spacer,
  Button,
  HStack,
  VStack,
  Avatar,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

export const ReserveRaw = memo( props => {
  const {reserve, onClick} = props;
  const [dinner, setDinner] = useState("夕食未定");
  const [dinnerQty, setDinnerQty] = useState("0");
  const [breakfast,setBreakfast] = useState([]);
  const [villa, setVilla] = useState("部屋未定");
  const [totalGuest, setTotalGuest] = useState(0);
  const [totalMale, setTotalMale] = useState(0);
  const [totalFemale, setTotalFemale] = useState(0);
  const [star, setStar] = useState(false);

  useEffect(() => {
    if(reserve.合計人数.value) setTotalGuest(Number(reserve.合計人数.value));
    if(reserve.男.value) setTotalMale(Number(reserve.男.value));
    if(reserve.女.value) setTotalFemale(Number(reserve.女.value));
    if(reserve.宿泊タイプ.value) setVilla(reserve.宿泊タイプ.value);
    if(reserve.ダイヤモンド会員?.value[0]) setStar(true);
    if(reserve.リピーター?.value[0]) setStar(true);

    let bf = [];
    if(reserve.status == 'CHECKIN'){
      (reserve.dinner_name_0.value) ? setDinner(reserve.dinner_name_0.value) : setDinner('未定');
      (reserve.dinner_qty.value) ? setDinnerQty(String(reserve.dinner_qty.value)) : setDinnerQty('不明');
      setBreakfast(["-"]);
    }
    if(reserve.status == 'STAY'){
      setDinner('夕食未定');
      if(reserve.breakfast_name1.value) bf.push(reserve.breakfast_name1.value + ":" + String(reserve.breakfast_qty1.value));
      if(reserve.breakfast_name2.value) bf.push(reserve.breakfast_name2.value + ":" + String(reserve.breakfast_qty2.value));
      if(reserve.breakfast_name3.value) bf.push(reserve.breakfast_name3.value + ":" + String(reserve.breakfast_qty3.value));
      if(bf == []) setBreakfast(["朝食未定"]);
    }
    if(reserve.status == 'CHECKOUT'){
      setDinner('-');
      if(reserve.breakfast_name1.value) bf.push(reserve.breakfast_name1.value + ":" + String(reserve.breakfast_qty1.value));
      if(reserve.breakfast_name2.value) bf.push(reserve.breakfast_name2.value + ":" + String(reserve.breakfast_qty2.value));
      if(reserve.breakfast_name3.value) bf.push(reserve.breakfast_name3.value + ":" + String(reserve.breakfast_qty3.value));
      if(bf == []) setBreakfast(["朝食未定"]);
      setBreakfast(bf);
    }
  });

  return (
    <Box
      flex="1"
      align="center"
      p='1'
      m='1'
      borderWidth='1px'
      borderRadius='lg'
    >
      <VStack>
        <Flex w='100%'>
          <Box p='1' as='h4' align='left' valign='center' fontWeight='semibold' lineHeight='tight'>
            <Avatar size='xs' />&nbsp;
            {reserve.宿泊者名.value}&nbsp;&nbsp;{star && <StarIcon color='yellow.300' pb='1'/>} 
          </Box>
          <Spacer />
          <Box p='1' fontSize='md' fontWeight='bold' letterSpacing='wide'>
            {reserve.status}
          </Box>
        </Flex>
        <HStack w='100%' p='1' m='1'>
	  <Wrap>
	  <WrapItem>
          <Box p='1' w='100px' align='left' fontWeight='bold'>
            {villa}
          </Box>
          <Box p='1' fontWeight='semibold' w='100px' align='left'>
            {totalGuest}名&nbsp;&nbsp;大{totalMale + totalFemale}&bull;子{totalGuest - totalMale - totalFemale}
          </Box>
	  </WrapItem>
	  <WrapItem>
          <Box p='1' fontWeight='semibold' w='200px' align='left'>
            夕&nbsp;&nbsp;{dinner}&nbsp;&bull;&nbsp;{dinnerQty}
          </Box>
	  </WrapItem>
	  <WrapItem>
          <Box p='1' fontWeight='semibold' w='200px' align='left'>
            朝&nbsp;{`${breakfast}`}
          </Box>
	  </WrapItem>
	  </Wrap>
          <Spacer />
          <Button onClick={() => onClick(reserve)} colorScheme='teal' mr='1'>
            詳細
          </Button>
          </HStack>
      </VStack>
    </Box>
  );
});
