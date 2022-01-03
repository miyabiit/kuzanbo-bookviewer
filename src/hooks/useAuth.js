import {useCallback, useState} from "react";
import { useNavigate } from "react-router-dom";
import API from "@aws-amplify/api";
import Amplify from "aws-amplify";

//import axios from "axios";
import config from "../aws-exports";
import { useMessage } from "./useMessage";

Amplify.configure(config);

export const useAuth = () => {
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  
  const login = useCallback((id) => {
    setLoading(true);
    API.get('kuzanboapi',`/books/login/${id}`)
    .then(async res => {
      //data: { records: [], totalCount: null }
      console.log("res:",res);
      console.log("count", res.data.records);
      if(res.success && res.data.records.length > 0){
        showMessage({
          title: "ログインしました",
          status: "success"
        })
        navigate("/home");
        setLoading(false);
      }else{
        showMessage({
          title: "ユーザが存在しません",
          status: "warning"
        })
        navigate("/");
        setLoading(false);
      }
    })
    .catch(() => {
      showMessage({
        title: "接続に失敗しました",
        status: "error"
      });
      navigate("/");
      setLoading(false);
    })
  },[]);
  return {login, loading};
};