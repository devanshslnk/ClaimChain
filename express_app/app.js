const express=require("express");
const Web3=require("web3");
const HDwalletprovider=require("truffle-hdwallet-provider");

const app=express()

const provider=new HDwalletprovider(
    '6971A7AEFA1B6643311ADD7214B58CAC41E257FB17F47CD4D5C529902FAD00A7',
    // identity.privateKey,
    'https://ropsten.infura.io/v3/da4d3f3021fd4ada9c1e70a4b607e74f'
);


web3=new Web3(provider);
if(web3.currentProvider!=='undefined'){
    console.log("provider is set");
}


web3.eth.getAccounts().then((accounts)=>{
    console.log(accounts[0]);
});




app.listen(3000,()=>{
    console.log("listening to PORT 3000");
});


