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
  
  const getReserves = useCallback((dateString) => {
      setLoading(true);
      API.get("kuzanboapi",`/books/${dateString}`)
      .then(async res => {
          if(res.success){
            if(res.data.records.length > 0){
              //alert(JSON.stringify(res.data.records[0].チェックイン.value));
              setReserves(res.data.records);
            }else{
              showMessage({title:"予約がありません", status:"info"});
            }
          }else{
            showMessage({title:"予約取得に失敗しました", status:"error"});
          }
      })
      .catch(() => showMessage({title:"通信に失敗しました", status:"error"}))
      .finally(() => setLoading(false));
  },[]);
  return { getReserves, loading, reserves };
};
