
const ethCrypto=require('eth-crypto');

const address=require("../family_tree_details").address;
const HDwalletprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");
const solc=require("solc");
const abi=require("../family_tree_details").abi;


module.exports=(app)=>{

    app.get("/signups",(req,res)=>{
   
        res.render("signups",{message:null});

    });

    app.post("/signups",async (req,res)=>{
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
        console.log(first_name,last_name,dob,cipher_text,parentPrivateKey,gender);
        var first_name1=req.body.first_name;
        var last_name1=req.body.last_name;
        var dob1=req.body.dob;
        var cipher_text1=JSON.parse(req.body.cipher_text);
        var parentPrivateKey1=req.body.privateKey;
        var gender1=req.body.gender;
        if(gender1==="male"){
            gender1=0
        }else{
            gender1=1
        }
        console.log(first_name1,last_name1,dob1,cipher_text1,parentPrivateKey1,gender1);
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