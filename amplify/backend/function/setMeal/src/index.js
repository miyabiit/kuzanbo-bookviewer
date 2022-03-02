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

exports.handler = async (event) => {
	const list = await axios.get(url + route, config)
	.then(res => {
		return res.data;
	})
	.catch(err => { return err});

	const nameList = await Promise.all(
		list.data.map(async (value) => {
			route = `/books/book/${value}`;
			const book = await axios.get(url + route, config)
				.then(response => {return response.data})
				.catch(err => {return err});
			return book.data.record.宿泊者名.value;
		})
	);
	return nameList;
};
