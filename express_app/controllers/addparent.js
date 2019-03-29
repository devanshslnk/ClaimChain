const ethCrypto=require('eth-crypto');
const abi=require("../family_tree_details").abi;
const address=require("../family_tree_details").address;
const HDwalletprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");

module.exports=(app)=>{

    app.get("/addparent",(req,res)=>{
        res.render("addparent",{message:null});
    });

    app.post("/addparent",async (req,res)=>{
        console.log("posted1");
        var first_name=req.body.first_name;
        var last_name=req.body.last_name;
        var dob=req.body.dob;
        var cipher_text=JSON.parse(req.body.cipher_text);
        var parentPrivateKey=req.body.privateKey;
        var gender=req.body.gender;
        if(gender==="male"){
            gender=0
        }else{
            gender=1
        }
        
        try
        {   
            var decrypted=await ethCrypto.decryptWithPrivateKey(
                parentPrivateKey,
                cipher_text
            );

            
            var provider=new HDwalletprovider(
                parentPrivateKey,
                'https://ropsten.infura.io/v3/da4d3f3021fd4ada9c1e70a4b607e74f'
            );
            const web3=new Web3(provider);
            const accounts=await web3.eth.getAccounts();
            const contract=new web3.eth.Contract(abi,address);
            
            // Parent
            var parentPublicKey=ethCrypto.publicKeyByPrivateKey(parentPrivateKey);
            var parentCompressed=ethCrypto.publicKey.compress(parentPublicKey);
            var parentAddress=ethCrypto.publicKey.toAddress(
                parentPublicKey
            );
            
            
            // Child
            var childPrivateKey=decrypted.slice(0,66);
            var childPublicKey=ethCrypto.publicKeyByPrivateKey(
                childPrivateKey
            );
            var childAdress=ethCrypto.publicKey.toAddress(
                childPublicKey
            );
            
            var childCompressed=ethCrypto.publicKey.compress(childPublicKey);
            

            var contractReceiptMember=await contract.methods.addFamilyMember(childCompressed,first_name,last_name,1,gender,0).send({
                "from":parentAddress
            });
            console.log(contractReceiptMember);
            var contractReceiptChild=await contract.methods.addChild(childCompressed,parentCompressed).send({
                "from":parentAddress
            });
            console.log(contractReceiptChild);

            

            res.render("addparent",{message:"success"});
        }
        catch(err){
            console.log(err)
            res.render("addparent",{message:"BAD MAC"});
        }
    });
}