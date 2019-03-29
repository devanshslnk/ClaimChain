const ethCrypto=require('eth-crypto');
const fs=require("fs");
const HDwalletprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");
const session=require("express-session");


module.exports=(app)=>{
    app.get("/home",(req,res)=>{
        console.log(req.session.identity);
        res.render("home");
    }); 

    app.get("/register",(req,res)=>{
        console.log(req.session.identity);
        res.render("register",{message:null});
    }); 
 
    app.get("/addparent",(req,res)=>{
        console.log(req.session.identity);
        res.render("addparent",{message:null});
    }); 

    app.get("/logout",(req,res)=>{
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }        
        });
        res.redirect("/");
    });
}