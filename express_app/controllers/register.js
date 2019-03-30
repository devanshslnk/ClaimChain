const ethCrypto=require('eth-crypto');
const abi=require("../family_tree_details").abi;
// const address=require("../family_tree_details").address;
const HDwalletprovider=require("truffle-hdwallet-provider");
const Web3=require("web3");
const fs=require("fs");
const session=require("express-session");

require("dotenv").config();
module.exports=(app)=>{

    app.get("/register",(req,res)=>{
        console.log(req.session.identity);
        if(req.session.identity!==undefined){
        res.render("register",{message:null});}
        else{
            res.redirect("/");
        }
    });

    app.post("/register",async (req,res)=>{
     
        
        var first_name=req.body.first_name;
        var last_name=req.body.last_name;
        var dob=req.body.dob;
        var cipher_text=JSON.parse(req.body.cipher_text);
        var parentPrivateKey=req.session.identity.privateKey;

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

            console.log(decrypted);
            var provider=new HDwalletprovider(
                process.env.PRIVATE_KEY,
                process.env.ROPSTEN_INFURA
            );

            // console.log(req.session);
            var address=req.session.contractAddress;
            const web3=new Web3(provider);
            
            const contract=new web3.eth.Contract(abi,address);
            
            // Parent
            var parentPublicKey=req.session.identity.publicKey;
            var parentCompressed=req.session.identity.compressed;
            var parentAddress=req.session.identity.address;
            console.log(parentAddress);
            
            
            // Child
            var childPrivateKey=decrypted.slice(0,66);
            var childPublicKey=ethCrypto.publicKeyByPrivateKey(
                childPrivateKey
            );
            var childAddress=ethCrypto.publicKey.toAddress(
                childPublicKey
            );
            
            var childCompressed=ethCrypto.publicKey.compress(childPublicKey);
            

            var contractReceiptMember=await contract.methods.addFamilyMember(childCompressed,first_name,last_name,dob,gender,0).send({
                from:"0x2248d96D13198CC52274f30F029C241c87b5a23c"
            });
            console.log(contractReceiptMember);
            var contractReceiptChild=await contract.methods.addChild(childCompressed,parentCompressed).send({
                from:"0x2248d96D13198CC52274f30F029C241c87b5a23c"
            });
            console.log(contractReceiptChild);

            data={
                identity:{
                    address:childAddress,
                    privateKey:childPrivateKey,
                    publicKey:childPublicKey,
                    compressed:childCompressed
                },
                familyAddress:req.session.contratAddress
            }
            var path=__dirname+"/"+childCompressed+".txt";
            fs.writeFileSync(path,JSON.stringify(data),'utf8',(err)=>{
                if(err){
                    console.log(err)
                }
            });
            res.download(path,childCompressed+".txt",(err)=>{
                
            });
            // res.render("register",{message:"success"});
        }
        catch(err){
            console.log(err)
            res.render("register",{message:"BAD MAC"});
        }
    });
}