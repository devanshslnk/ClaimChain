const ethCrypto=require('eth-crypto');
const abi=require("../family_tree_details").abi;
const address=require("../family_tree_details").address;
const HDwalletprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");

module.exports=(app)=>{

    app.get("/login",(req,res)=>{
        res.render("login",{message:null});
    });

    app.post("/login",async (req,res)=>{
        var cprivkey=req.body.cpubkey;
        console.log(cprivkey);
        try{
            const publicKey = EthCrypto.publicKeyByPrivateKey(
                cprivkey
            );
            const address = EthCrypto.publicKey.toAddress(
                publicKey
            );
            const provider=new HDwalletprovider(
                cprivkey,
                // identity.privateKey,
                'https://ropsten.infura.io/v3/da4d3f3021fd4ada9c1e70a4b607e74f'
            );
            
    
            web3=new Web3(provider);
            if(web3.currentProvider!=='undefined'){
                console.log("provider is set");
            }
            
            
            const accounts=await web3.eth.getAccounts();
            console.log(accounts[0]);
            const contract=new  web3.eth.Contract(abi,address);
            const check = await contract.methods.contains(address).call();
            if(check == true){
                console.log("successful");
            }
            else{
                console.log("unsuccessful");
            }
        }
        catch(err){
            console.log(err)
            res.render("login",{message:"BAD MAC"});
        }
    });
}