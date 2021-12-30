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
    API.get('kuzanboapi',`/books/login?query="user_id=${id}"`)
    .then(async res => {
      alert(res.success);
      alert(JSON.stringify(res.data));
      if(res.success){
        showMessage({
          title: "ログインしました",
          status: "success"
        })
        navigate("/home");
        setLoading(false);
      }else{
        showMessage({
          title: "ユーザが存在しません",
          status: "error"
        });
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