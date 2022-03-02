/* Amplify Params - DO NOT EDIT
	API_KUZANBOAPI_APIID
	API_KUZANBOAPI_APINAME
	ENV
	FUNCTION_GETKUZANBOBOOKS_NAME
	REGION
Amplify Params - DO NOT EDIT */

const axios = require('axios');
const url = `https://${process.env.API_KUZANBOAPI_APIID}.execute-api.${process.env.REGION}.amazonaws.com/${process.env.ENV}`;
let route = '/books/isdinners';
const config = {
	headers: {
		'Context-Type': 'application/json'
	}
}

const getDinnerDayList = (checkinString, checkoutString) => {
  let dateCheckin = new Date(checkinString.replace(/-/g,"/"));
  let dateCheckout = new Date(checkoutString.replace(/-/g, "/"));
  let dateSa = (dateCheckout - dateCheckin)/86400000;
	let dayList = [];
	for(let i=0; i<dateSa;i++){
		dayList.push(formatDate(getAfterDay(dateCheckin, i)));
	}
	return dayList;
}

const getAfterDay = (startDay, nDay) => {
	return new Date(startDay.setDate(startDay.getDate() + nDay));
}

const formatDate = (dt) => {
  let y = dt.getFullYear();
  let m = ('00' + (dt.getMonth()+1)).slice(-2);
  let d = ('00' + dt.getDate()).slice(-2);
  return (y + '-' + m + '-' + d);
};

exports.handler = async (event) => {
	const list = await axios.get(url + route, config)
	.then(res => {
		return res.data;
	})
	.catch(err => { return err});

	const bookList = await Promise.all(
		list.data.map(async (value) => {
			route = `/books/book/${value}`;
			const book = await axios.get(url + route, config)
				.then(response => {return response.data})
				.catch(err => {return err});
			//return book.data.record.宿泊者名.value;
			return book;
		})
	);
	//const dinnerList = await Promise.all(
	const reserve_ids = [];
	await Promise.all(
		bookList.map(async (book) => {
			const dinnerList = getDinnerDayList(
				book.data.record.チェックイン.value,
				book.data.record.チェックアウト.value
			);
			await Promise.all(
				dinnerList.map( async (dinnerDay) => {
					const value = {
    				"予約台帳ID": book.data.record.$id.value, 
    				"宿泊日": dinnerDay,
						"宿泊棟": book.data.record.宿泊タイプ.value,
    				"夕食": book.data.record.dinner_name_0.value,
    				"夕食数量": book.data.record.dinner_qty.value 
					}
					config.value = value;
					route = "/books/setdinners";
					await axios.post(url + route, config)
					.then(res => {
						reserve_ids.push(book.data.record.$id.value);
					})
					.catch(err => reserve_ids.push(err));
				})
			);
		})
	);
	return reserve_ids;
};
