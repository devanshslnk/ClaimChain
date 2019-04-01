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
<<<<<<< HEAD
=======

>>>>>>> 4b4a5b11bcb79adced79af66de198d28d0a460da
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
    res.render("index",{message:null});
});


app.listen(3000,()=>{
    console.log("listening to PORT 3000");
});


<<<<<<< HEAD
registeration(app);
contract_test(app);
=======
register(app);
>>>>>>> 4b4a5b11bcb79adced79af66de198d28d0a460da
birth(app);
search(app);
login(app);
signupws(app);
signups(app);
home(app);
<<<<<<< HEAD

=======
addparent(app);
contract_test(app);
>>>>>>> 4b4a5b11bcb79adced79af66de198d28d0a460da
