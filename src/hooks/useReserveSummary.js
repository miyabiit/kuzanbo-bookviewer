import { useCallback, useState } from "react";

export const useReserveSummary = () => {
  const [reserveSummary, setReserveSummary] = useState([]);
    
  const onReserveSummary = useCallback((props) => {
    const { startday, reserves} = props;  
    let start = new Date(startday);
    let targets = [];
    for(let n = 0; n < 7; n++){
      start.setDate(start.getDate()+1);
      targets.push({"date":new Date(start), "reserves": []});
    };
    let date1 = new Date();
    reserves.map(reserve => {
        targets.map(target => {
          date1 = new Date(reserve.チェックイン.value);
          if(target.date.getTime() == date1.getTime()){
            target.reserves.push(reserve);
          };
        });
    });
    setReserveSummary(targets);
  },[]);
  return { onReserveSummary, reserveSummary };
};