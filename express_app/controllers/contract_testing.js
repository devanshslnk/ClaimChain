const Web3=require("web3");
const HDwalletprovider=require("truffle-hdwallet-provider");
const abi=require("../user_contract_test").abi2;
const address=require("../user_contract_test").address2;

module.exports=async (app)=>{
    app.get("/contract_test",async (req,res)=>{

        const provider=new HDwalletprovider(
            '0xa01444b4b015db9f8d45fae4a3d2cbcd7cb63f7752e78fb31eca17d797c15969',
            // identity.privateKey,
            'https://ropsten.infura.io/v3/da4d3f3021fd4ada9c1e70a4b607e74f'
        );


        web3=new Web3(provider);
        if(web3.currentProvider!=='undefined'){
            console.log("provider is set");
        }
        let publicKey;
        web3.eth.sign(web3.eth.accounts[0], web3.sha3('test'), function (err, signature) {
            var sigtest = signature
            const util = require('ethereumjs-util');
            const sig = util.fromRpcSig(sigtest);
            publicKey = util.ecrecover(util.sha3('test'), sig.v, sig.r, sig.s);
        });
        console.log(publicKey);
        const accounts=await web3.eth.getAccounts();
        // console.log(accounts[0]);
        const contract=new  web3.eth.Contract(abi,address);
        const userCount=await contract.methods.countUsers().call();
        console.log(userCount);
        res.send("contract_test");

    });
}