var express = require ('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var expressLayouts = require('express-ejs-layouts');
var app = express ()

app.use(bodyParser());
app.use(cors());
app.use(expressLayouts);


app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

app.get('/',function(request,response){
    response.render('index');
});

app.get('/search',function(request,response){
    response.render('search')
});


app.listen(8000,function(){
    console.log("heard on 8000")
});