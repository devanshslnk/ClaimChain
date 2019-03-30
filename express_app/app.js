const express=require("express");
const Web3=require("web3");
const HDwalletprovider=require("truffle-hdwallet-provider");
const bparser=require("body-parser");

const register=require("./controllers/register");
const addparent=require("./controllers/addparent");
const login=require("./controllers/login");
const signupws=require("./controllers/signupws");
const signups=require("./controllers/signups");
const birth=require("./controllers/birth");
const search=require("./controllers/search");
const home=require("./controllers/home");

const app=express();
app.set('view engine','ejs');
app.use(express.static('./public'));
app.use(bparser.urlencoded({extended:true}));
app.use(bparser.json());


app.get('/',(req,res)=>{
    res.render("index",{message:null});
});


app.listen(3000,()=>{
    console.log("listening to PORT 3000");
});


register(app);
birth(app);
search(app);
login(app);
signupws(app);
signups(app);
home(app);
addparent(app);
