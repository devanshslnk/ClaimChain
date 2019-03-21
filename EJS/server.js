var express = require ('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express ()

app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

app.get('/',function(request,response){
    response.render('index');
});

app.listen(8000,function(){
    console.log("heard on 8000");
});