import { useCallback, useState } from "react";
import API from "@aws-amplify/api";
import Amplify from "aws-amplify";

import config from "../aws-exports";
import { useMessage } from "./useMessage";
import myDateCalc from '../functions/myDateCalc';
import crossTotal from '../functions/clossTotal';

Amplify.configure(config);

/*
 * dinner [予約台帳ID, 予約者、宿泊日、宿泊棟、夕食メニュー、人数]
 * dinners = [dinner1, dinner2, ...]
 * dinnerSummary = [日付,[menu1,qty1],[menu2,qty2],....]
 */
export const useDinners = () => {
	const { showMessage } = useMessage();
	const [loading, setLoading] = useState(false);
	const [dinners, setDinners] = useState([]);
	const [dinnerSummary, setDinnerSummary] = useState([]);

	// kintone_records to dinners
 	// dinner [予約台帳ID, 予約者、宿泊日、宿泊棟、夕食メニュー、人数]
	const makeDinnerRecord = (dinner_records) => {
		const arr = dinner_records.map((d) => {
			let dinner_name = d.夕食.value || d.予約時夕食.value;
			let villa_name = d.宿泊棟.value || d.予約時宿泊棟.value;
			return [
				d.予約台帳ID.value,
				d.予約者.value,
				d.宿泊日.value,
				villa_name,
				dinner_name,
				d.夕食数量.value
			];
		})
		return arr;
	};

	// dinnersの集計
	// dinnerSummary = [日付,[menu1,qty1],[menu2,qty2],....]
	// term max 14 days
	const calcDinners = (dinners, fromDateString, term) => {
		let dayList = myDateCalc.getDayListByTerm(
			fromDateString, 
			term
		);
		let menuList = dinners.map((d) => {return d[4]});
		menuList = crossTotal.getUniqList(menuList);
		let data = dinners.map(d => {
			return [d[2],d[4],d[5]];
		});
		return crossTotal.getCrossTotal(
			dayList,
			menuList,
			data
		);
	};
	
	const getDinners = useCallback((dateString) => {
		setLoading(true);
		API.get("kuzanboapi",`/books/dinners/${dateString}`)
		.then(async res => {
			if(res.success){
				if(res.data.length == 0){
          showMessage({title:"夕食がありません", status:"info"});
				}else{
					setDinners(makeDinnerRecord(res.data));
					const sum = calcDinners(res.data,dateString,14)
					setDinnerSummary(
						sum
						//calcDinners(res.data,dateString,14)
					);
				}
			}else{
        showMessage({title:"夕食情報の取得に失敗しました", status:"error"});
			}
		})
    .catch((err) => showMessage({title:"通信に失敗しました", status:"error"}))
		.finally(() => setLoading(false));
	},[]);
	return {getDinners, loading, dinners, dinnerSummary };
}
