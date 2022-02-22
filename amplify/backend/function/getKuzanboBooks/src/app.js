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

// 予約情報 全件取得
app.get('/books/:date', function(req, res) {
  const apitoken = 'Wz8X2arEcgJQ7UrLarYhEU9YvyLlytBGKx7f2RSL';
  const appid = 9;
  const domain = '0vnjl1ng82s3';
  const url = `https://${domain}.cybozu.com/k/v1/records.json`;
  
  req.query.app=appid;
  req.query.query=`宿泊日>="${req.params.date}"`;
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
app.get('/book/:id', function(req, res) {
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
/****************************
* Example post method *
****************************/

app.post('/books', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/books/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/books', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/books/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
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
