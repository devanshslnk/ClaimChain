const ethCrypto=require('eth-crypto');
const abi=require("../family_tree_details").abi;
const address=require("../family_tree_details").address;
const HDwalletprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");
const createidentity = require("./create_identity");
const byteCode=require("../family_tree_details").bytecode;
module.exports=(app)=>{

    app.get("/signupws",(req,res)=>{
        res.render("signupws",{message:null});
    });

    app.post("/signupws",async (req,res)=>{
        var first_name=req.body.first_name;
        var last_name=req.body.last_name;
        var dob=req.body.dob;
        // var public_key=JSON.parse(req.body.public_key);
        var gender=req.body.gender;
        if(gender==="male"){
            gender=0
        }else{
            gender=1
        }
        var identity=createIdentity();
        var newPublicKey=identity.publicKey;
        var newCompressed=ethCryto.publicKey.compress(
            newPublicKey
        );  

    });
}