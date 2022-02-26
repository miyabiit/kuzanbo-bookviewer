/* Amplify Params - DO NOT EDIT
	API_KUZANBOAPI_APIID
	API_KUZANBOAPI_APINAME
	ENV
	FUNCTION_GETKUZANBOBOOKS_NAME
	REGION
Amplify Params - DO NOT EDIT */

const axios = require('axios');
const url = 'https://vpu55m0twc.execute-api.ap-northeast-1.amazonaws.com/staging' + '/books/login/yamada@kuzanbo.jp';
const config = {
	headers: {
		'Context-Type': 'application/json'
	}
}

exports.handler = async (event) => {
	let response = {}
	await axios.get(url, config)
	.then(res => {
		response = {
			status: true,
			data: res.data
		}
	})
	.catch(err => {
		response = {
			status: false,
			data: err
		}
	});
	return response;
};
