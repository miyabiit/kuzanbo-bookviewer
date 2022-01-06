import { useCallback, useState } from "react";
import API from "@aws-amplify/api";
import Amplify from "aws-amplify";

//import axios from "axios";
import config from "../aws-exports";
import { useMessage } from "./useMessage";

Amplify.configure(config);

export const useReserves = (dateString) => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [reserves, setReserves ] = useState([]);
  
  const getReserves = useCallback(() => {
      setLoading(true);
      API.get("kuzanboapi","/books/${dateString}")
      .then(async res => {
          if(res.success && res.data.records.length > 0){
              setReserves(res.data.records);
          }else{
              showMessage({title:"予約がありません。"})
          }
      })
      .catch(() => showMessage({title:"予約取得に失敗しました", status:"error"}))
      .finally(() => setLoading(false));
  },[]);
  return { getReserves, loading, reserves };
};
