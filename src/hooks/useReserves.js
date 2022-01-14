import { useCallback, useState } from "react";
import API from "@aws-amplify/api";
import Amplify from "aws-amplify";

//import axios from "axios";
import config from "../aws-exports";
import { useMessage } from "./useMessage";

Amplify.configure(config);

export const useReserves = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [reserves, setReserves ] = useState([]);
  const [reserveSummary, setReserveSummary] = useState([]);
  
  const getReserves = useCallback((dateString) => {
      setLoading(true);
      API.get("kuzanboapi",`/books/${dateString}`)
      .then(async res => {
          if(res.success){
            if(res.data.records.length > 0){
              setReserves(res.data.records);
              let dateArr = dateString.split("-");
              let start = new Date(dateArr[0],dateArr[1]-1,dateArr[2]);
              let targets = [];
              targets.push({"date":new Date(start), "reserves": []});
              for(let n = 0; n < 6; n++){
                start.setDate(start.getDate()+1);
                targets.push({"date":new Date(start), "reserves": []});
              };
              let date1 = new Date();
              res.data.records.map(reserve => {
                targets.map(target => {
                  date1 = new Date(reserve.チェックイン.value);
                  if(target.date.toDateString() == date1.toDateString()){
                    target.reserves.push({...reserve});
                  };
                });
              });
              setReserveSummary([...targets]);          
            }else{
              showMessage({title:"予約がありません", status:"info"})
            }
          }else{
            showMessage({title:"予約取得に失敗しました", status:"error"});
          }
      })
      .catch(() => showMessage({title:"通信に失敗しました", status:"error"}))
      .finally(() => setLoading(false));
  },[]);
  
  return { getReserves, loading, reserves, reserveSummary };
};
