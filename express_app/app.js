const express=require("express");
const Web3=require("web3");
const HDwalletprovider=require("truffle-hdwallet-provider");
const bparser=require("body-parser");

const registeration=require("./controllers/registeration");
const login=require("./controllers/login");
const signupws=require("./controllers/signupws");
const signups=require("./controllers/signups");
const birth=require("./controllers/birth");
const search=require("./controllers/search");

const app=express();
app.set('view engine','ejs');
app.use(express.static('./public'));
app.use(bparser.urlencoded({extended:false}));
app.use(bparser.json());


app.get('/',function(request,response){
    response.render('index.ejs')
});


app.listen(3000,()=>{
    console.log("listening to PORT 3000");
});


registeration(app);
// contract_test(app);
birth(app);
search(app);


login(app);
signupws(app);
signups(app);


