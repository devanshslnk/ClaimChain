const Web3=require('web3');
const ethCryto=require('eth-crypto');
const HDwalletprovider=require("truffle-hdwallet-provider");
const createIdentity=require("./create_identity");

module.exports=(app)=>{
    
    app.get("/birth",async (req,res)=>{
        
        // const provider=
        res.render('birth_form',{});


    });
    app.post("/birth",async (req,res)=>{
        var fatherKey=req.body.father_address;
        var timestamp=Date.now();
        var identity=createIdentity();
        // console.log(identity);
        var message=identity.address+"#"+fatherKey+"#"+timestamp;
        // var encrpted
        console.log(message);
        // var encrpted=await ethCryto.encryptWithPublicKey(
            
        // );


    });
}