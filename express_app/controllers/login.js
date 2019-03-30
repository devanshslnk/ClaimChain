const ethCrypto=require('eth-crypto');
const abi=require("../family_tree_details").abi;
const address=require("../family_tree_details").address;
const HDwalletprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");
const session=require("express-session");
require("dotenv").config();
module.exports=(app)=>{
    app.use(session({
        key:"user_sid",
        secret:"sometext",
        resave:false,
        saveUninitialized: false,
    
    }));    
    app.get("/login",(req,res)=>{
        res.render("index",{message:null});
    });

    app.post("/",async (req,res)=>{
        var privateKey=req.body.private_key;
        var contractAddress=req.body.contract_address;
        // console.log(privateKey);
        const publicKey = ethCrypto.publicKeyByPrivateKey(
            privateKey
        );
        const address = ethCrypto.publicKey.toAddress(
            publicKey
        );
        const provider=new HDwalletprovider(
            
            process.env.PRIVATE_KEY,
            process.env.ROPSTEN_INFURA

        );
        

        const web3=new Web3(provider);
        if(web3.currentProvider!=='undefined'){
            console.log("provider is set");
        }
        
        
        const compressed=ethCrypto.publicKey.compress(
            publicKey
        );
        const contract=new  web3.eth.Contract(abi,contractAddress);
        const check = await contract.methods.contains(compressed).call();
        if(check === true){
            var identity={
                address:address,
                privateKey:privateKey,
                publicKey:publicKey
            };
            req.session.identity=identity;
            req.session.contractAddress=contractAddress;
            
            console.log("successful");
            res.redirect("/home");
        }
        else{
            
            console.log("unsuccessful");
            res.render("index",{message:"ID does not exists"});
        }
        
    });
}