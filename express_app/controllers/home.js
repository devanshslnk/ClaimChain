const ethCrypto=require('eth-crypto');
const fs=require("fs");
const HDwalletprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");
const session=require("express-session");


module.exports=(app)=>{
    app.get("/home",(req,res)=>{
<<<<<<< HEAD
        console.log(req.session.identity);
        res.send("working");
    }); 
=======
        
        if(req.session.identity!==undefined){
            res.render("home");
        }else{
            res.redirect("/");
        }
        
    }); 

 
>>>>>>> 4b4a5b11bcb79adced79af66de198d28d0a460da
}