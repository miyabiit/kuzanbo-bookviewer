import { useCallback, useState } from "react";
import API from "@aws-amplify/api";
import Amplify from "aws-amplify";

import config from "../aws-exports";
import { useMessage } from "./useMessage";

Amplify.configure(config);

/*
 * dinner [宿泊日、宿泊棟、夕食メニュー、人数]
 * dinners = [dinner1, dinner2, ...]
 * dinnerSummary = [日付,[menu1,qty1],[menu2,qty2],....]
 */
export const useDinners = () => {
	const { showMessage } = useMessage();
	const [loading, setLoading] = useState(false);
	const [dinners, setDinners] = useState([]);
	const [dinnerSummary, setDinnerSummary] = useState([]);

	
	const getDinners = useCallback((dateString) => {
		setLoading(true);
		API.get("kuzanboapi",`/books/dinners/${dateString}`)
		.then(async res => {
			if(res.success){
				if(res.data.length == 0){
          showMessage({title:"夕食がありません", status:"info"});
				}
				setDinners(res.data);
			}else{
        showMessage({title:"夕食情報の取得に失敗しました", status:"error"});
			}
		})
    .catch((err) => showMessage({title:"通信に失敗しました", status:"error"}))
		.finally(() => setLoading(false));
	},[]);
	return {getDinners, loading, dinners, dinnerSummary };
}
