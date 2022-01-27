import { memo, useState, useEffect } from 'react';
import {
  Box,
  Spacer,
  Button,
  HStack
} from '@chakra-ui/react';

export const ReserveRaw = memo( props => {
  const {reserve, onClick} = props;
  const [dinner, setDinner] = useState("未定");
  const [dinnerQty, setDinnerQty] = useState("0");
  const [breakfast,setBreakfast] = useState([]);
  const [villa, setVilla] = useState("未定");
  const [totalGuest, setTotalGuest] = useState(0);
  const [totalMale, setTotalMale] = useState(0);
  const [totalFemale, setTotalFemale] = useState(0);
  
  useEffect(() => {
    if(reserve.合計人数.value) setTotalGuest(Number(reserve.合計人数.value));
    if(reserve.男.value) setTotalMale(Number(reserve.男.value));
    if(reserve.女.value) setTotalFemale(Number(reserve.女.value));
    if(reserve.宿泊タイプ.value) setVilla(reserve.宿泊タイプ.value);

    let bf = [];
    if(reserve.status == 'CHECKIN'){
      (reserve.dinner_name_0.value) ? setDinner(reserve.dinner_name_0.value) : setDinner('未定');
      (reserve.dinner_qty.value) ? setDinnerQty(String(reserve.dinner_qty.value)) : setDinnerQty('不明');
      setBreakfast(["-"]);
    }
    if(reserve.status == 'STAY'){
      setDinner('未定');
      setBreakfast(["未定"]);
    }
    if(reserve.status == 'CHECKOUT'){
      setDinner('-'); 
      if(reserve.breakfast_name1.value) bf.push(reserve.breakfast_name1.value + ":" + String(reserve.breakfast_qty1.value));
      if(reserve.breakfast_name2.value) bf.push(reserve.breakfast_name2.value + ":" + String(reserve.breakfast_qty2.value));
      if(reserve.breakfast_name3.value) bf.push(reserve.breakfast_name3.value + ":" + String(reserve.breakfast_qty3.value));
      if(bf == []) setBreakfast(["未定"]);
      setBreakfast(bf);
    }
  });
  
  return (
    <Box flex="1" align="left">
      <HStack>
        <Box p='1'>
          {reserve.宿泊者名.value}
        </Box>
        <Box p='1'>
          {reserve.status}
        </Box>
        <Box p='1'>
          {`部屋:${villa}`}
        </Box>
        <Box p='1'>
          {`${totalGuest}名(大 ${totalMale + totalFemale} 子 ${totalGuest - totalMale - totalFemale})`}
        </Box>
        <Box p='1'>
          {`夕(${dinner}:${dinnerQty})`}
        </Box>
        <Box p='1'>
          {`朝(${breakfast})`}
        </Box>
        <Spacer />
        <Button onClick={() => onClick(reserve)} colorScheme='teal' mr='1'>
          詳細
        </Button>
      </HStack>
    </Box>
  );
});
