import {useCallback, useState} from "react";
//import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useMessage } from "./useMessage";

export const useAuth = () => {
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  
  const login = useCallback((id) => {
    setLoading(true);
    console.log("useAuth1:","id")
    showMessage({
      title: "ログインしました",
      status: "success"
    });
    navigate("/home");
    setLoading(false);
  },[]);
  return {login, loading};
};