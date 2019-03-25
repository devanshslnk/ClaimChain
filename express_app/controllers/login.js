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
        var cpubkey=req.body.cpubkey;
        var pass=req.body.pass;
        console.log(cpubkey,pass);
        // try
        // {   
        //     var decrypted=await ethCrypto.decryptWithPrivateKey(
        //         parentPrivateKey,
        //         cipher_text
        //     );

            
        //     var provider=new HDwalletprovider(
        //         parentPrivateKey,
        //         'https://ropsten.infura.io/v3/da4d3f3021fd4ada9c1e70a4b607e74f'
        //     );
        //     const web3=new Web3(provider);
        //     const accounts=await web3.eth.getAccounts();
        //     const contract=new web3.eth.Contract(abi,address);
            
        //     // Parent
        //     var parentPublicKey=ethCrypto.publicKeyByPrivateKey(parentPrivateKey);
        //     var parentCompressed=ethCrypto.publicKey.compress(parentPublicKey);
        //     var parentAddress=ethCrypto.publicKey.toAddress(
        //         parentPublicKey
        //     );
            
            
        //     // Child
        //     var childPrivateKey=decrypted.slice(0,66);
        //     var childPublicKey=ethCrypto.publicKeyByPrivateKey(
        //         childPrivateKey
        //     );
        //     var childAdress=ethCrypto.publicKey.toAddress(
        //         childPublicKey
        //     );
        //     var childCompressed=ethCrypto.publicKey.compress(childPublicKey);
            

        //     var contractReceiptMember=await contract.methods.addFamilyMember(childCompressed,first_name,last_name,1,gender,0).send({
        //         "from":parentAddress
        //     });
        //     console.log(contractReceiptMember);
        //     var contractReceiptChild=await contract.methods.addChild(childCompressed,parentCompressed).send({
        //         "from":parentAddress
        //     });
        //     console.log(contractReceiptChild);

            

        //     res.render("login",{message:"success"});
        // }
        // catch(err){
        //     console.log(err)
        //     res.render("login",{message:"Login Failed"});
        // }
    });
}