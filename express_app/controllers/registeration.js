const ethCrypto=require('eth-crypto');
const abi=require("../family_tree_details").abi;
const address=require("../family_tree_details").address;
const HDwalletprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");

module.exports=(app)=>{

    app.get("/registeration",(req,res)=>{
        res.render("register",{message:null});
    });

    app.post("/registeration",async (req,res)=>{
        var first_name=req.body.first_name;
        var last_name=req.body.last_name;
        var dob=req.body.dob;
        var cipher_text=JSON.parse(req.body.cipher_text);
        var privateKey=req.body.privateKey;
        var gender=req.body.gender;
        
        try
        {   
            var decrypted=await ethCrypto.decryptWithPrivateKey(
                privateKey,
                cipher_text
            );

            var newUserPrivate=decrypted.slice(0,66);
            var provider=new HDwalletprovider(
                privateKey,
                'https://ropsten.infura.io/v3/da4d3f3021fd4ada9c1e70a4b607e74f'
            );
            const web3=new Web3(provider);
            const accounts=await web3.eth.getAccounts();
            const contract=new web3.eth.Contract(abi,address);
            
            var publicKey=ethCrypto.publicKeyByPrivateKey(privateKey);
            var compressed=ethCrypto.publicKey.compress(publicKey);
            
            var memberCount=await contract.methods.get(compressed).call();
            console.log(memberCount);
            var newUserPublic=ethCrypto.publicKeyByPrivateKey(
                newUserPrivate
            )
            var newUserCompressed=ethCrypto.publicKey.compress(newUserPublic);
            console.log(newUserCompressed);
            
            // var contractReceipt=await contract.methods.addFamilyMember()

            

            res.render("register",{message:"success"});
        }
        catch(err){
            console.log(err)
            res.render("register",{message:"BAD MAC"});
        }
    });
}