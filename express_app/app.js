const express=require("express");
const Web3=require("web3");
const HDwalletprovider=require("truffle-hdwallet-provider");
const bparser=require("body-parser");
const session=require("express-session");
const mongoStore=require("connect-mongo")(session);

const register=require("./controllers/register");
const addparent=require("./controllers/addparent");
const login=require("./controllers/login");
const signupws=require("./controllers/signupws");
const signups=require("./controllers/signups");
const birth=require("./controllers/birth");
const search=require("./controllers/search");
const home=require("./controllers/home");
const contract_test=require("./controllers/contract_testing");

const app=express();

app.set('view engine','ejs');
app.use(session({
    key:"user_sid",
    secret:"sometext",
    resave:false,
    saveUninitialized: false,
    store:new mongoStore({
        url:'mongodb://localhost:27017/ClaimChain',
        autoRemove:false
    })

}));
app.use(express.static('./public'));
app.use(bparser.urlencoded({extended:true}));
app.use(bparser.json());


app.get('/',(req,res)=>{
    if(req.session.identity===undefined){
    res.render("index",{message:null});
    }else{
        res.redirect("/home");
    }
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
contract_test(app);
