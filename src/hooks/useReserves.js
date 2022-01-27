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
              targets.push({
                "date":new Date(start),
                "totalMale": 0,
                "totalFemale":0,
                "totalGuest":0,
                "totalDog":0,
                "reserves": []
              });
              for(let n = 0; n < 6; n++){
                start.setDate(start.getDate()+1);
                targets.push({"date":new Date(start),
                  "totalMale": 0,
                  "totalFemale":0,
                  "totalGuest":0,
                  "totalDog":0,
                  "reserves": []
                });
              };
              let date1 = new Date();
              let dateCheckin = new Date();
              let dateCheckout = new Date();
              let dateSa = 0;
              res.data.records.map(reserve => {
                dateCheckin = new Date(reserve.チェックイン.value.replace(/-/g,"/"));
                dateCheckout = new Date(reserve.チェックアウト.value.replace(/-/g, "/"));
                dateSa = (dateCheckout - dateCheckin)/86400000;
                targets.map(target => {
                  if(target.date.toDateString() == dateCheckin.toDateString()){
                    reserve["status"] = "CHECKIN";
                    target.reserves.push({...reserve});
                    if(reserve.男.value == "") reserve.男.value = "0";
                    target.totalMale += parseInt(reserve.男.value,10);
                    if(reserve.女.value == "") reserve.女.value = "0";
                    target.totalFemale += parseInt(reserve.女.value,10);
                    if(reserve.合計人数.value == "") reserve.合計人数.value = "0";
                    target.totalGuest += parseInt(reserve.合計人数.value,10);
                    if(reserve.犬.value == "") reserve.犬.value = "0";
                    target.totalDog += parseInt(reserve.犬.value,10);
                  }
                });
                for(let i=0;i<dateSa; i++){
                  dateCheckin.setDate(dateCheckin.getDate()+1);
                  targets.map(target => {
                    if(target.date.toDateString() == dateCheckin.toDateString()){
                      if(i == (dateSa - 1)){
                        reserve["status"] = "CHECKOUT"  
                      }else{
                        reserve["status"] = "STAY"  
                      }
                      target.reserves.push({...reserve});
                      if(reserve.男.value == "") reserve.男.value = "0";
                      target.totalMale += parseInt(reserve.男.value,10);
                      if(reserve.女.value == "") reserve.女.value = "0";
                      target.totalFemale += parseInt(reserve.女.value,10);
                      if(reserve.合計人数.value == "") reserve.合計人数.value = "0";
                      target.totalGuest += parseInt(reserve.合計人数.value,10);
                      if(reserve.犬.value == "") reserve.犬.value = "0";
                      target.totalDog += parseInt(reserve.犬.value,10);
                    }
                  });
                };
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
