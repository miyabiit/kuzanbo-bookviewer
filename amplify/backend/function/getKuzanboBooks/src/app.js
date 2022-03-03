/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var axios = require('axios')
var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

/**********************
 * get method *
 **********************/

// ユーザ存在確認
app.get('/books/login/:id', function(req, res) {
  const apitoken = '9fYEbPqCHWvxrscrkEKElhWg5YV2s5ixtWR9SNuv';
  const appid = 12;
  const domain = '0vnjl1ng82s3';
  const url = `https://${domain}.cybozu.com/k/v1/records.json`;
  
  req.query.app=appid;
  req.query.query=`user_id="${req.params.id}"`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Cybozu-API-Token': apitoken,
    },
    data: req.query,
  }
  axios.get(url, config)
  .then(response => {
    res.json({
      success: true,
      data: response.data
    })
  })
  .catch(error => {
    res.json({
      success: false,
      error
    })
  });
});

// 予約情報 全件取得 14days
app.get('/books/books/:date', function(req, res) {
  const apitoken = 'Wz8X2arEcgJQ7UrLarYhEU9YvyLlytBGKx7f2RSL';
  const appid = 9;
  const domain = '0vnjl1ng82s3';
  const url = `https://${domain}.cybozu.com/k/v1/records.json`;
	
  const formatDate = (dt) => {
    let y = dt.getFullYear();
    let m = ('00' + (dt.getMonth()+1)).slice(-2);
    let d = ('00' + dt.getDate()).slice(-2);
    return (y + '-' + m + '-' + d);
  };
  let dateFrom = new Date(req.params.date.replace(/-/g,"/"));
  let dateTo = new Date(req.params.date.replace(/-/g,"/"));
	dateTo.setDate(dateTo.getDate() + 14);
  const dateFromString = formatDate(dateFrom);
	const dateToString = formatDate(dateTo);

  req.query.app=appid;
  req.query.query=`チェックイン>="${dateFromString}" and チェックイン<="${dateToString}"`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Cybozu-API-Token': apitoken,
    },
    data: req.query,
  }
  axios.get(url, config)
  .then(response => {
    res.json({
      success: true,
      data: response.data
    })
  })
  .catch(error => {
    res.json({
      success: false,
      error
    })
  });
});

// 予約情報 1件取得 
app.get('/books/book/:id', function(req, res) {
  const apitoken = 'Wz8X2arEcgJQ7UrLarYhEU9YvyLlytBGKx7f2RSL';
  const appid = 9;
  const domain = '0vnjl1ng82s3';
  const url = `https://${domain}.cybozu.com/k/v1/record.json`;
  
  req.query.app=appid;
  req.query.id=req.params.id;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Cybozu-API-Token': apitoken,
    },
    data: req.query,
  }
  axios.get(url, config)
  .then(response => {
    res.json({
      success: true,
      data: response.data
    })
  })
  .catch(error => {
    res.json({
      success: false,
      error
    })
  });
});

// 夕食レコード展開必要な予約レコードID取得
app.get('/books/isdinners', function(req, res) {
  const apitoken = 'Wz8X2arEcgJQ7UrLarYhEU9YvyLlytBGKx7f2RSL';
  const appid = 9;
  const domain = '0vnjl1ng82s3';
  const url = `https://${domain}.cybozu.com/k/v1/records.json`;
  
  req.query.app=appid;
  req.query.query='isDinners not in ("レコード作成済")';
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Cybozu-API-Token': apitoken,
    },
    data: req.query,
  }
  axios.get(url, config)
  .then(response => {
		let ids = [];
		response.data.records.map( (d) => {
			ids.push(d.$id.value);
		});
    res.json({
      success: true,
      data: ids 
    })
  })
  .catch(error => {
    res.json({
      success: false,
      error
    })
  });
});

// 宿泊棟マスタ取得
app.get('/books/villas', function(req, res) {
  const apitoken = 'UwgLajdR70EXFHbIdycheSYsanGeAWWN71JoZ18e';
  const appid = 13;
  const domain = '0vnjl1ng82s3';
  const url = `https://${domain}.cybozu.com/k/v1/records.json`;
	
	req.query.app=appid;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Cybozu-API-Token': apitoken,
    },
    data: req.query,
  }

	axios.get(url, config)
	.then(response => {
		res.json({
			sucess: true,
			data: response.data.records
		})
	})
	.catch(error => {
		res.json({
			sucess: false,
			error
		})
	});
});

// 夕食情報 全件取得 14days
app.get('/books/dinners/:date', function(req, res) {
  const apitoken = 'l5GglupfUlt6yX7jG4SgnTQTPb4wohzxjah0tErn';
  const appid = 17;
  const domain = '0vnjl1ng82s3';
  const url = `https://${domain}.cybozu.com/k/v1/records.json`;
	
  const formatDate = (dt) => {
    let y = dt.getFullYear();
    let m = ('00' + (dt.getMonth()+1)).slice(-2);
    let d = ('00' + dt.getDate()).slice(-2);
    return (y + '-' + m + '-' + d);
  };
  let dateFrom = new Date(req.params.date.replace(/-/g,"/"));
  let dateTo = new Date(req.params.date.replace(/-/g,"/"));
	dateTo.setDate(dateTo.getDate() + 14);
  const dateFromString = formatDate(dateFrom);
	const dateToString = formatDate(dateTo);

  req.query.app=appid;
  req.query.query=`宿泊日>="${dateFromString}" and 宿泊日<="${dateToString}"`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Cybozu-API-Token': apitoken,
    },
    data: req.query,
  }
  axios.get(url, config)
  .then(response => {
    res.json({
      success: true,
      data: response.data.records
    })
  })
  .catch(error => {
    res.json({
      success: false,
      error
    })
  });
});

/****************************
* post method *
****************************/

// 日別夕食レコード作成（1件） 
// req.value = {
//   "予約台帳ID": 99, 注）必須
//   "宿泊日": YYYY-MM-DD,
//   "夕食": XXXXXXXX,
//   "夕食数量":99 
// }
app.post('/books/setdinners', function(req, res) {
  const apitoken = 'l5GglupfUlt6yX7jG4SgnTQTPb4wohzxjah0tErn';
  const appid = 17;
  const domain = '0vnjl1ng82s3';
  const url = `https://${domain}.cybozu.com/k/v1/record.json`;
  
  req.body.app=appid;
	/*
  req.value = {
    "予約台帳ID": 1, 
    "宿泊日": "2021-9-21",
		"宿泊棟": "Po1",
    "夕食": "BBQ",
    "夕食数量": 99 
	}
	*/
	req.body.record = {
		"予約台帳ID": {"value": req.body.value.予約台帳ID},
		"宿泊日": {"value": req.body.value.宿泊日},
		"予約時宿泊棟": {"value": req.body.value.宿泊棟},
		"予約時夕食": {"value": req.body.value.夕食},
		"夕食数量": {"value" : req.body.value.夕食数量}
	}
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Cybozu-API-Token': apitoken,
    }
  }
  axios.post(url, req.body, config)
  .then(response => {
    res.json({
      success: true,
      data: response.data
    })
  })
  .catch(error => {
    res.json({
      success: false,
      error
    })
  });
});

/****************************
* put method *
****************************/

// 予約情報 夕食展開済に更新 
app.put('/books/markisdinners/:id', function(req, res) {
  const apitoken = 'Wz8X2arEcgJQ7UrLarYhEU9YvyLlytBGKx7f2RSL';
  const appid = 9;
  const domain = '0vnjl1ng82s3';
  const url = `https://${domain}.cybozu.com/k/v1/record.json`;
  
  req.body.app=appid;
  req.body.id=req.params.id;
	req.body.record = {'isDinners': {value: ['レコード作成済']}}
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Cybozu-API-Token': apitoken,
    }
  }
  axios.put(url, req.body, config)
  .then(response => {
    res.json({
      success: true,
      data: response.data
    })
  })
  .catch(error => {
    res.json({
      success: false,
      error
    })
  });
});

/****************************
* Example delete method *
****************************/

app.delete('/books', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/books/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
