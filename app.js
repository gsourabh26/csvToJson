var app = require('express')();
var port = 8888;
var Converter = require("csvtojson").Converter;

app.get("/csv/to/json", function (requset, response) {
    var queryParams = requset.query;
    var csvFilePath = queryParams.q;
    if (!csvFilePath) {
        response.send({status: 400, result: {message: "No file defined to convert"}});
    }
    var con = new Converter({constructResult: false, workerNum: 2});
    require("request").get(csvFilePath).pipe(con).pipe(response);
})

app.get("/", function (request, response) {
    response.send({status: 400, result: {message: "Try api: /csv/to/json?q=link_for_csv"}});
})

app.listen(port, function () {
    console.log("server is listening on port : " + port);
})