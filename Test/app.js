const express=require('express');
const HDwalletprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");

var app=express();

app.get("/",(req,res)=>{
    res.send("working");
});

const provider=new HDwalletprovider(
    '6971A7AEFA1B6643311ADD7214B58CAC41E257FB17F47CD4D5C529902FAD00A7',
    // identity.privateKey,
    'https://ropsten.infura.io/v3/da4d3f3021fd4ada9c1e70a4b607e74f'
);


var web3=new Web3(provider);
if(web3.currentProvider!=='undefined'){
    console.log("provider is set");
}
var accounts=web3.eth.getAccounts().then(function(accounts){
    console.log(accounts[0]);
});
app.listen(3000,function(){
    console.log("listening to port 3000");
});

